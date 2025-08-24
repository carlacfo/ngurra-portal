// app/services/leadership/page.tsx
export const metadata = { title: "Leadership & Justice | Ngurra Portal" };

type ServiceTile = { title: string; desc: string; href: string };

const services: ServiceTile[] = [
  { title: "Leadership Education", desc: "Developing future First Nations leaders.", href: "/services/leadership/education" },
  { title: "Advocacy", desc: "Policy and advocacy for community priorities.", href: "/services/leadership/advocacy" },
  { title: "Justice Diversion", desc: "Alternative justice pathways and healing.", href: "/services/leadership/justice" },
  { title: "Tourism", desc: "Cultural tourism led by First Nations operators.", href: "/services/leadership/tourism" },
  { title: "Camping & Survival", desc: "On-Country survival and cultural training.", href: "/services/leadership/camping" },
  { title: "Native Foods", desc: "Bush foods supply & agribusiness pathways.", href: "/services/leadership/native-foods" },
];

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 p-8">
      <h1 className="text-3xl font-bold text-amber-900 mb-6">Leadership & Justice</h1>

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
        <a href="/services" className="text-sm text-amber-800 underline">← Back to Services</a>
      </div>
    </main>
  );
}
