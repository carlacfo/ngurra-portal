// app/services/cultural/page.tsx
export const metadata = { title: "Cultural & Country | Ngurra Portal" };

type ServiceTile = { title: string; desc: string; href: string };

const services: ServiceTile[] = [
  { title: "Funerals (Sorry Business)", desc: "End-to-end cultural care and ceremony support.", href: "/services/cultural/funerals" },
  { title: "Corroboree", desc: "Ceremonial gatherings and cultural renewal.", href: "/services/cultural/corroboree" },
  { title: "Cultural Services", desc: "Workshops, immersion, protocols & advisory.", href: "/services/cultural/services" },
  { title: "Connecting to Country", desc: "On-Country experiences and guidance.", href: "/services/cultural/country" },
  { title: "Cultural Education", desc: "Programs rooted in First Nations knowledge.", href: "/services/cultural/education" },
  { title: "Country Services", desc: "Support for land & water custodianship.", href: "/services/cultural/country-services" },
  { title: "Cultural Burns", desc: "Knowledge-led fire practice on Country.", href: "/services/cultural/burns" },
  { title: "Ranger Programs", desc: "Ranger education and employment pathways.", href: "/services/cultural/rangers" },
  { title: "Land Management & Care", desc: "Planning and operations for Country care.", href: "/services/cultural/land-care" },
  { title: "Biodiversity & Carbon", desc: "Audits, monitoring and carbon farming.", href: "/services/cultural/biodiversity-carbon" },
];

export default function CulturalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 p-8">
      <h1 className="text-3xl font-bold text-amber-900 mb-6">Cultural & Country</h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {services.map((s) => (
          <a
            key={s.title}
            href={s.href}
            className="block p-5 rounded-xl bg-white border hover:bg-amber-50 transition"
          >
            <h2 className="text-lg font-semibold text-amber-800">{s.title}</h2>
            <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
          </a>
        ))}
      </div>

      <div className="mt-8">
        <a href="/services" className="text-sm text-amber-800 underline">← Back to Services</a>
      </div>
    </main>
  );
}
