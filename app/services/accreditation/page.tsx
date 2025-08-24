// app/services/accreditation/page.tsx
export const metadata = { title: "Accreditation & Shared Services | Ngurra Portal" };

type ServiceTile = { title: string; desc: string; href: string };

const services: ServiceTile[] = [
  { title: "Cultural Accreditation", desc: "Accreditation for businesses to be culturally fit for purpose.", href: "/services/accreditation/cultural" },
  { title: "Marketing Support", desc: "Shared marketing, branding, and communications services.", href: "/services/accreditation/marketing" },
  { title: "HR & Admin", desc: "Human resources and administrative support for First Nations enterprises.", href: "/services/accreditation/hr-admin" },
  { title: "Finance Support", desc: "Financial clarity, control, and confidence services.", href: "/services/accreditation/finance" },
  { title: "IT & Systems", desc: "Technology, digital systems, and cyber support.", href: "/services/accreditation/it-systems" },
];

export default function AccreditationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 p-8">
      <h1 className="text-3xl font-bold text-amber-900 mb-6">Accreditation & Shared Services</h1>

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
