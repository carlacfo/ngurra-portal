-- === Extensions & sequence ===
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";
create sequence if not exists tls_cert_seq;

-- === Config (HMAC secret) ===
create table if not exists tls_config (
  id                   integer primary key default 1,
  verification_secret  text not null
);
insert into tls_config (id, verification_secret)
values (1, encode(gen_random_bytes(32), 'hex'))
on conflict (id) do nothing;

-- === Journey progress (UI upserts here) ===
create table if not exists tls_progress (
  participant        text not null,
  pathway            text not null,
  business_name      text,
  region             text,
  market             text,
  steps              jsonb,
  ownershipVerified  boolean default false,
  certificate_number text,
  verification_code  text,
  updated_at         timestamptz not null default now(),
  primary key (participant, pathway)
);

alter table tls_progress enable row level security;
create policy "read-all-progress" on tls_progress for select to anon, authenticated using (true);
create policy "upsert-authenticated" on tls_progress for insert to authenticated with check (true);
create policy "update-authenticated" on tls_progress for update to authenticated using (true) with check (true);

-- === Authoritative accreditations (issued certs) ===
do $$ begin
  create type tls_cert_status as enum ('issued','revoked');
exception when duplicate_object then null; end $$;

create table if not exists tls_accreditations (
  id                  uuid primary key default gen_random_uuid(),
  participant         text not null,
  pathway             text not null,
  business_name       text,
  region              text,
  market              text,
  issued_at           timestamptz not null default now(),
  certificate_number  text unique not null,
  verification_code   text not null,
  status              tls_cert_status not null default 'issued',
  details             jsonb
);

alter table tls_accreditations enable row level security;
create policy "public-read-issued" on tls_accreditations for select to anon, authenticated using (status = 'issued');

-- === Public directory view ===
create or replace view tls_directory_v as
select
  business_name as "businessName",
  participant,
  pathway,
  region,
  market
from tls_accreditations
where status = 'issued';

-- === HMAC helper (hex) ===
create or replace function tls_hmac_hex(secret text, payload text)
returns text language sql immutable as $$
  select encode(hmac(payload::bytea, secret::bytea, 'sha256'), 'hex');
$$;

-- === RPC: Issue certificate (server-signed) ===
create or replace function issue_certificate(participant text, pathway text)
returns table(certificate_number text, verification_code text)
language plpgsql security definer as $$
declare
  cfg_secret text;
  cert_no text;
  vcode text;
  prog record;
begin
  select verification_secret into cfg_secret from tls_config where id = 1;
  if cfg_secret is null then
    raise exception 'TLS verification secret not configured';
  end if;

  select * into prog
  from tls_progress
  where participant = issue_certificate.participant
    and pathway = issue_certificate.pathway;

  if prog is null then
    raise exception 'No progress found for % / %', participant, pathway;
  end if;

  if coalesce(prog.ownershipVerified, false) is not true then
    raise exception 'Ownership not verified';
  end if;

  if not exists (
    select 1 from jsonb_array_elements(prog.steps) as s
    where s->>'key' = 'open_for_business' and (s->>'complete')::boolean = true
  ) then
    raise exception 'Open for Business step not complete';
  end if;

  cert_no := 'TLS-' || to_char(now(),'YYYYMMDD') || '-' || lpad(nextval('tls_cert_seq')::text, 6, '0');
  vcode := tls_hmac_hex(cfg_secret, cert_no);

  insert into tls_accreditations (
    participant, pathway, business_name, region, market,
    certificate_number, verification_code, details
  ) values (
    prog.participant, prog.pathway, prog.business_name, prog.region, prog.market,
    cert_no, vcode, jsonb_build_object('steps', prog.steps, 'ownershipVerified', prog.ownershipVerified)
  )
  returning certificate_number, verification_code
  into certificate_number, verification_code;

  update tls_progress
    set certificate_number = cert_no,
        verification_code  = vcode,
        updated_at         = now()
  where participant = prog.participant and pathway = prog.pathway;

  return;
end
$$;

-- === RPC: Verify certificate ===
create or replace function verify_certificate(cert_no text, code text)
returns setof tls_accreditations
language plpgsql security definer as $$
declare
  cfg_secret text;
  expect text;
begin
  select verification_secret into cfg_secret from tls_config where id = 1;
  if cfg_secret is null then
    raise exception 'TLS verification secret not configured';
  end if;

  expect := tls_hmac_hex(cfg_secret, cert_no);

  if lower(expect) <> lower(code) then
    return;
  end if;

  return query
    select * from tls_accreditations
    where certificate_number = cert_no and status = 'issued';
end
$$;
