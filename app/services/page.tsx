// app/services/page.tsx
export const metadata = { title: "Living Services | Ngurra Portal" };

type Cat = { href: string; title: string; points: string[] };

const Category = ({ href, title, points }: Cat) => (
  <a
    href={href}
    className="block rounded-2xl border border-stone-200 bg-white p-6 hover:shadow-md transition"
  >
    <div className="text-xl font-semibold text-amber-900">{title}</div>
    <ul className="mt-3 list-disc pl-5 text-sm text-stone-700 space-y-1">
      {points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
    <div className="mt-3 text-sm text-amber-800 underline">Explore →</div>
  </a>
);

export default function ServicesHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-green-50 to-stone-100">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-bold text-amber-900">Living Services</h1>
        <p className="text-stone-700 mt-2">
          Business and community services available through TLS — culturally accredited, 100% First Nations–owned.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <Category
            href="/services/accreditation"
            title="Accreditation & Shared Supports"
            points={[
              "TLS Accreditation (Invitation → Cultural fit → Business fit → Safety Stamp)",
              "Shared Services Hub: Marketing, HR, Admin, Finance, IT",
              "Knowledge Centre: training & onboarding"
            ]}
          />
          <Category
            href="/services/community"
            title="Community & Family"
            points={[
              "Employment, Housing, Aged Care, Education",
              "Youth & Family, Out-of-Home Care",
              "Domestic Violence & whole-family support"
            ]}
          />
          <Category
            href="/services/cultural"
            title="Cultural & Country"
            points={[
              "Funerals (Sorry Business), Corroboree, Cultural services",
              "Connecting to Country, Cultural burns, Rangers",
              "Land management & care, Biodiversity audits & carbon"
            ]}
          />
          <Category
            href="/services/leadership"
            title="Leadership & Justice"
            points={[
              "Leadership education, Advocacy",
              "Tourism, Camping & survival, Native foods",
              "Justice diversionary programs"
            ]}
          />
        </div>

        <div className="mt-10">
          <a href="/" className="text-sm text-amber-800 underline">← Back to portal home</a>
        </div>
      </div>
    </div>
  );
}
