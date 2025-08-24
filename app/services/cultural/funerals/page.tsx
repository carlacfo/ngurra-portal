// app/services/cultural/funerals/page.tsx
export const metadata = { title: "Funerals (Sorry Business) | Ngurra Portal" };

export default function FuneralsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 p-8">
      <h1 className="text-3xl font-bold text-amber-900">Funerals (Sorry Business)</h1>
      <p className="text-stone-700 mt-2 max-w-3xl">
        End-to-end cultural care for Sorry Business. Access is by invitation and guided by Elders.
        Businesses must be TLS-accredited (Cultural & Business fit for purpose) to operate.
      </p>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white border p-5">
          <h2 className="text-lg font-semibold text-amber-900">Pathway (gated)</h2>
          <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm text-stone-700">
            <li>Sit in Country (Invitation)</li>
            <li>Cultural Fit for Purpose (Elders)</li>
            <li>Business Fit for Purpose (marketing, HR, admin, finance, IT)</li>
            <li>Open for Business → TLS Safety Stamp</li>
          </ol>
          <a href="/services/accreditation" className="inline-block mt-3 text-sm text-amber-800 underline">
            View accreditation →
          </a>
        </div>

        <div className="rounded-2xl bg-white border p-5">
          <h2 className="text-lg font-semibold text-amber-900">What we organise</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-stone-700">
            <li>Ceremony planning with Elders</li>
            <li>Protocols, venue/transport, community care</li>
            <li>Local, regional, or on-Country arrangements</li>
            <li>Respectful coordination with non-Indigenous providers if needed</li>
          </ul>
          <a href="/services/requests" className="inline-block mt-3 text-sm text-amber-800 underline">
            Request Sorry Business support →
          </a>
        </div>
      </section>

      <div className="mt-8">
        <a href="/services/cultural" className="text-sm text-amber-800 underline">← Back to Cultural & Country</a>
      </div>
    </main>
  );
}
