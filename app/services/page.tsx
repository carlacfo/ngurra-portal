"use client";

import Link from "next/link";

export default function ServicesLanding() {
  const categories = [
    {
      name: "Accreditation & Shared Services",
      description: "Cultural accreditation and shared business services (Marketing, HR, Admin, Finance, IT).",
      href: "/services/accreditation",
    },
    {
      name: "Community & Family",
      description: "Employment, Housing, Aged Care, Education, Youth & Family, Out of Home Care, DV & Whole Families.",
      href: "/services/community",
    },
    {
      name: "Cultural & Country",
      description: "Cultural Services, Corroboree, Land Care, Ranger Programs, Native Foods, Biodiversity Audits.",
      href: "/services/cultural",
    },
    {
      name: "Leadership & Justice",
      description: "Leadership Education, Advocacy, Justice Diversion, Tourism, Survival Experiences.",
      href: "/services/leadership",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50 p-8">
      <h1 className="text-3xl font-bold text-center text-amber-900 mb-8">
        Living Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="block p-6 rounded-2xl shadow-md bg-white hover:bg-amber-50 transition"
          >
            <h2 className="text-xl font-semibold text-amber-800 mb-2">{cat.name}</h2>
            <p className="text-gray-600 text-sm">{cat.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
