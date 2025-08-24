// app/services/cultural/biodiversity-carbon/page.tsx
export const metadata = { title: "Biodiversity Audits & Carbon | Ngurra Portal" };

export default function BiodiversityCarbonPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 p-8">
      <h1 className="text-3xl font-bold text-amber-900">Biodiversity Audits & Carbon</h1>
      <p className="text-stone-700 mt-2 max-w-3xl">
        On-Country biodiversity assessments led by First Nations rangers and Elders. 
        Audits can support cultural fire programs, land management, stewardship reporting, and carbon projects.
      </p>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white border p-5">
          <h2 className="text-lg font-semibold text-amber-900">What’s included</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-stone-700">
            <li>Baseline ecological survey & monitoring plan</li>
            <li>Indigenous ecological knowledge integration</li>
            <li>Data collection (flora/fauna, water, soil)</li>
            <li>GIS mapping & photo records</li>
            <li>Report & recommendations (cultural burns, restoration)</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white border p-5">
          <h2 className="text-lg font-semibold text-amber-900">How to engage</h2>
          <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm text-stone-700">
            <li>Confirm region & land tenure; identify custodians/Elders</li>
            <li>Define objectives (compliance, stewardship, carbon, restoration)</li>
            <li>Fieldwork schedule with ranger teams</li>
            <li>Draft → review with Elders → final report</li>
          </ol>
          <a href="/services/requests" className="inline-block mt-3 text-sm text-amber-800 underline">
            Request a biodiversity audit →
          </a>
        </div>
      </section>

      <div className="mt-8">
        <a href="/services/cultural" className="text-sm text-amber-800 underline">← Back to Cultural & Country</a>
      </div>
    </main>
  );
}
