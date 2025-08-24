
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient"; // relative to /app/services/directory

type Provider = {
  businessName: string;
  participant: string;
  pathway: string;
  region: string;
  market: string;
  certNo: string;
  issued_at: string | null;
};

const REGIONS = ["All", "NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"];
const MARKETS = ["All", "Government", "Council", "Private", "Community"];

export const metadata = { title: "TLS Directory | Ngurra Portal" };

export default function DirectoryPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Provider[]>([]);
  const [region, setRegion] = useState("All");
  const [market, setMarket] = useState("All");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const q = supabase.from("tls_directory_v").select("*");
    const { data, error } = await q;
    if (error) setError(error.message);
    setRows((data as Provider[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const regionOk = region === "All" || r.region === region;
      const marketOk = market === "All" || r.market === market;
      return regionOk && marketOk;
    });
  }, [rows, region, market]);

  async function onVerify(certNo: string) {
    const v = window.prompt("Enter verification code for " + certNo);
    if (!v) return;
    try {
      const res = await fetch(`/api/verify?c=${encodeURIComponent(certNo)}&v=${encodeURIComponent(v)}`);
      const json = await res.json();
      if (json.ok && json.valid) {
        alert(`✅ Verified: ${certNo}`);
      } else {
        alert(`❌ Not valid for ${certNo}`);
      }
    } catch (e) {
      alert("Verification error. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-green-50 to-stone-100">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold text-amber-900">TLS Directory</h1>
        <p className="text-stone-700 mt-2">
          Providers with a <b>TLS Safety Stamp</b>, culturally accredited by Living Country.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-stone-700">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">Market</label>
            <select
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
            >
              {MARKETS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="self-end">
            <button
              onClick={load}
              className="rounded-xl bg-amber-700 px-4 py-2 text-white hover:opacity-90"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading && <div className="mt-8 text-stone-700">Loading…</div>}
        {error && <div className="mt-4 text-red-700 text-sm">Error: {error}</div>}

        {!loading && filtered.length === 0 && (
          <div className="mt-8 text-stone-700">
            No providers match your filters yet.
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div key={p.certNo} className="rounded-2xl border bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-amber-900">{p.businessName}</div>
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                  TLS Safety Stamp
                </span>
              </div>
              <div className="text-sm text-stone-600 mt-1">{p.participant}</div>
              <div className="text-sm text-stone-700 mt-3">
                <b>Region:</b> {p.region} &nbsp; • &nbsp; <b>Market:</b> {p.market}
              </div>
              <div className="text-sm text-stone-700 mt-1">
                <b>Pathway:</b> {p.pathway.replace("_", " ")}
              </div>
              <div className="text-sm text-stone-700 mt-1">
                <b>Certificate:</b> {p.certNo}
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => onVerify(p.certNo)}
                  className="rounded-xl border px-3 py-2 text-sm hover:bg-stone-50"
                >
                  Verify
                </button>
                <a
                  href="/services/requests"
                  className="rounded-xl bg-amber-700 px-3 py-2 text-sm text-white hover:opacity-90"
                >
                  Request engagement
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a href="/services" className="text-sm text-amber-800 underline">
            ← Back to Services
          </a>
        </div>
      </div>
    </main>
  );
}
