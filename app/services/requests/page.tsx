"use client";

// app/services/requests/page.tsx
import { useState } from "react";

export default function RequestFormPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // For now, just show success. Later we’ll post to Supabase or email.
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 p-8">
      <h1 className="text-3xl font-bold text-amber-900">Request TLS Services</h1>
      <p className="text-stone-700 mt-2 max-w-3xl">
        For councils, agencies and businesses. TLS Office will review and match to accredited providers.
      </p>

      {sent ? (
        <div className="mt-6 rounded-2xl bg-white border p-5 text-green-700">
          Thanks — your request has been recorded. TLS Office will contact you shortly.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-2xl">
          <div className="rounded-2xl bg-white border p-5 grid gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700">Organisation / Council</label>
              <input required name="org" className="mt-1 w-full rounded-lg border p-2" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700">Region</label>
                <input required name="region" className="mt-1 w-full rounded-lg border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700">Market</label>
                <select name="market" className="mt-1 w-full rounded-lg border p-2">
                  <option>Government</option>
                  <option>Council</option>
                  <option>Private</option>
                  <option>Community</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700">Service</label>
              <select name="service" className="mt-1 w-full rounded-lg border p-2">
                <option>Funerals (Sorry Business)</option>
                <option>Biodiversity Audit</option>
                <option>Land Management & Care</option>
                <option>Cultural Education</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700">Details</label>
              <textarea name="details" rows={5} className="mt-1 w-full rounded-lg border p-2" />
            </div>
            <button className="self-start rounded-xl bg-amber-700 px-4 py-2 text-white hover:opacity-90">
              Submit request
            </button>
          </div>
        </form>
      )}

      <div className="mt-8">
        <a href="/services" className="text-sm text-amber-800 underline">← Back to Services</a>
      </div>
    </main>
  );
}
