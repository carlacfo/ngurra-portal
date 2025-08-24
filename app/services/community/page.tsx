// app/services/community/page.tsx
export const metadata = { title: "Community & Family | Ngurra Portal" };

type ServiceTile = { title: string; desc: string; href: string };

const services: ServiceTile[] = [
  { title: "Employment", desc: "Job readiness, placements & apprenticeships.", href: "/services/community/employment" },
  { title: "Housing", desc: "Support for housing access & management.", href: "/services/community/housing" },
  { title: "Aged Care", desc: "Supports for Elders in community.", href: "/services/community/aged-care" },
  { title: "Education", desc: "Cultural education programs and support.", href: "/services/community/education" },
  { title: "Youth & Family", desc: "Youth engagement & family strengthening services.", href: "/services/community/youth-family" },
  { title: "Out-of-Home Care", desc: "Support for children outside their home.", href: "/services/community/out-of-home-care" },
  { title: "DV & Whole Families", desc: "Domestic violence support for families.", href: "/services/community/dv-families" },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 p-8">
      <h1 className="text-3xl font-bold text-amber-900 mb-6">Community & Family Services</h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
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
        <a href="/services" className="text-sm text-amber-800 underline">
          ← Back to Services
        </a>
      </div>
    </main>
  );
}
