import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Demo verification endpoint.
 * Works without Supabase, returns dummy response.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const cert_no = url.searchParams.get("c") || "";
  const code = url.searchParams.get("v") || "";

  const urlEnv = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!urlEnv || !serviceKey) {
    return NextResponse.json(
      { ok: true, demo: true, message: "Supabase not configured yet", cert_no, code },
      { status: 200 }
    );
  }

  const supabase = createClient(urlEnv, serviceKey);
  const { data, error } = await supabase.rpc("verify_certificate", { cert_no, code });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return NextResponse.json({ ok: true, valid: false }, { status: 404 });
  }

  const cert = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({ ok: true, valid: true, certificate: cert }, { status: 200 });
}
