"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { createClient } from "@supabase/supabase-js";

/** Types */
type Pathway = "sorry_business" | "land_care";
type Step = { key: string; label: string; complete: boolean; locked?: boolean; date?: string };
type Participant = {
  name: string;
  pathway: Pathway;
  businessName: string;
  region: string;   // NSW/VIC/QLD/WA/SA/TAS/NT/ACT
  market: string;   // Government/Council/Private/Community
};

/** Supabase (safe to run without keys; UI still works in demo mode) */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = (supabaseUrl && supabaseAnon) ? createClient(supabaseUrl, supabaseAnon) : null as any;

/** Journey steps */
const baseSteps: Step[] = [
  { key: "invitation",        label: "Sit in Country (Invitation)", complete: false },
  { key: "cultural_fit",      label: "Cultural Fit for Purpose",    complete: false, locked: true },
  { key: "business_fit",      label: "Business Fit for Purpose",    complete: false, locked: true },
  { key: "open_for_business", label: "Open for Business",           complete: false, locked: true },
];
const startingSteps = (p: Pathway) => baseSteps.map(s => ({ ...s }));

/** Tiny UI atoms */
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "outline" | "ghost" }) {
  const { className = "", variant = "solid", ...rest } = props;
  const base = "px-3 py-2 rounded-xl text-sm transition";
  const styles =
    variant === "ghost" ? "bg-transparent hover:bg-stone-100"
      : variant === "outline" ? "border border-stone-300 hover:bg-stone-50"
      : "bg-amber-700 text-white hover:bg-amber-800";
  return <button className={`${base} ${styles} ${className}`} {...rest} />;
}
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white/95 border border-stone-200 rounded-2xl ${className}`}>{children}</div>;
}
function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
      <div className="h-full bg-amber-700" style={{ width: `${value}%` }} />
    </div>
  );
}

/** Header / Footer / Entry */
function Header() {
  return (
    <div className="sticky top-0 z-20 border-b border-amber-100/60 bg-white/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-amber-900">Ngurra Portal</div>
        <div className="text-xs text-stone-600">TLS Cultural &amp; Business Standards</div>
      </div>
    </div>
  );
}
function Footer() {
  return (
    <div className="mt-20 border-t border-stone-200/60 bg-white/70">
      <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-stone-600">
        © {new Date().getFullYear()} Ngurra Portal · “Culturally Accredited by Living Country – Fit for Purpose.”
      </div>
    </div>
  );
}
function CeremonialEntry({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center p-6 select-none">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }} className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">Ngurra Portal</motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1.2 }} className="max-w-2xl text-lg text-stone-700 mb-8">Enter in stillness. Walk with care.</motion.p>
      <Button onClick={onEnter} className="px-6 py-3 rounded-2xl">Enter</Button>
    </div>
  );
}

/** Fire-circle navigation */
function FireCircle({ onSelect }: { onSelect: (p: Pathway) => void }) {
  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold text-amber-900 mb-6">Choose Your Pathway</h1>
      <div className="relative w-[520px] h-[520px] flex items-center justify-center">
        <motion.div className="w-36 h-36 rounded-full bg-gradient-to-b from-amber-600 to-red-700 flex items-center justify-center shadow-2xl text-white font-bold"
          animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }}>
          Fire
        </motion.div>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
          <Card className="w-44 cursor-pointer hover:shadow-lg" onClick={() => onSelect("sorry_business")}><CardContent>Sorry Business</CardContent></Card>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <Card className="w-44 cursor-pointer hover:shadow-lg" onClick={() => onSelect("land_care")}><CardContent>Land Care</CardContent></Card>
        </div>
      </div>
    </div>
  );
}

/** Certificate panel (PDF + QR) */
function CertificatePanel({ participant }: { participant: Participant }) {
  const certRef = useRef<HTMLDivElement | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const certificateNumber = useMemo(() => {
    const date = new Date().toISOString().slice(0,10).replace(/-/g,"");
    return `TLS-${date}-${participant.name.replace(/\s+/g,"").slice(0,8).toUpperCase()}`;
  }, [participant.name]);

  useEffect(() => {
    const url = `https://verify.ngurra.portal/c?c=${encodeURIComponent(certificateNumber)}`;
    QRCode.toDataURL(url).then(setQrDataUrl).catch(() => setQrDataUrl(""));
  }, [certificateNumber]);

  const exportPDF = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 80;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 40, (pageHeight - imgHeight) / 2, imgWidth, imgHeight);
    pdf.save(`TLS_Certificate_${participant.name}.pdf`);
  };

  return (
    <div className="mt-6">
      <div ref={certRef} className="bg-white border rounded-2xl p-6 space-y-2 max-w-3xl">
        <div className="text-amber-900 font-semibold">TLS Cultural & Business Standards</div>
        <h3 className="text-xl font-semibold text-amber-900 mt-1">Culturally Accredited by Living Country</h3>
        <p className="text-sm text-stone-700">This certifies that the participant named below has completed the TLS dual accreditation requirements.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-3">
          <div><div className="text-stone-500">Participant</div><div className="font-semibold text-stone-800">{participant.name}</div></div>
          <div><div className="text-stone-500">Pathway</div><div className="font-semibold text-stone-800">{participant.pathway}</div></div>
          <div><div className="text-stone-500">Business</div><div className="font-semibold text-stone-800">{participant.businessName}</div></div>
          <div><div className="text-stone-500">Region / Market</div><div className="font-semibold text-stone-800">{participant.region} · {participant.market}</div></div>
          <div><div className="text-stone-500">Certificate Number</div><div className="font-semibold text-stone-800">{certificateNumber}</div></div>
        </div>
        <div className="pt-4 flex items-center gap-4">
          {qrDataUrl ? <img src={qrDataUrl} alt="QR" className="w-28 h-28" /> : <div className="text-xs text-stone-500">QR loading…</div>}
          <div className="text-xs text-stone-600">Scan to verify certificate (demo link).</div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <Button onClick={exportPDF}>Export PDF</Button>
      </div>
    </div>
  );
}

/** Pathway page with gated steps */
function PathwayPage({ path, onBack }: { path: Pathway; onBack: () => void }) {
  const [participant, setParticipant] = useState<Participant>({
    name: "Guest",
    pathway: path,
    businessName: "",
    region: "",
    market: "",
  });
  const [journey, setJourney] = useState<Step[]>(startingSteps(path));

  const gated = useMemo(() => {
    const c = journey.map(s => ({ ...s }));
    for (let i = 0; i < c.length; i++) {
      if (i === 0) continue;
      c[i].locked = !c[i - 1].complete;
    }
    return c;
  }, [journey]);

  const progress = Math.round((gated.filter(s => s.complete).length / gated.length) * 100);

  const toggleStep = (key: string) => {
    setJourney(prev => prev.map(s => s.key === key ? { ...s, complete: !s.complete, date: new Date().toISOString().slice(0,10) } : s));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <span className="font-semibold text-amber-900">Pathway: {path === "sorry_business" ? "Sorry Business" : "Land Care"}</span>
      </div>

      <Card className="mb-6">
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input className="px-3 py-2 border rounded-xl text-sm" placeholder="Participant name" value={participant.name} onChange={e => setParticipant(p => ({ ...p, name: e.target.value }))} />
            <input className="px-3 py-2 border rounded-xl text-sm" placeholder="Business name" value={participant.businessName} onChange={e => setParticipant(p => ({ ...p, businessName: e.target.value }))} />
            <select className="px-3 py-2 border rounded-xl text-sm" value={participant.region} onChange={e => setParticipant(p => ({ ...p, region: e.target.value }))}>
              <option value="">Region (State/Territory)</option>
              {["NSW","VIC","QLD","WA","SA","TAS","NT","ACT"].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select className="px-3 py-2 border rounded-xl text-sm" value={participant.market} onChange={e => setParticipant(p => ({ ...p, market: e.target.value }))}>
              <option value="">Market</option>
              {["Government","Council","Private","Community"].map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <div className="text-sm text-stone-600 self-center">100% First Nations ownership required</div>
          </div>
          <div className="pt-2">
            <div className="flex items-center justify-between text-sm mb-2"><span className="text-stone-700">Progress</span><span className="font-semibold text-amber-900">{progress}%</span></div>
            <ProgressBar value={progress} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <ol className="space-y-3">
            {gated.map((s, idx) => (
              <li key={s.key} className="flex items-start gap-3">
                <input type="checkbox" className="mt-1 h-4 w-4" disabled={s.locked} checked={s.complete} onChange={() => toggleStep(s.key)} />
                <div className="flex-1">
                  <div className="font-semibold text-amber-900">{idx + 1}. {s.label}</div>
                  {s.complete && s.date && <div className="text-xs text-stone-500 mt-1">Completed: {s.date}</div>}
                  {s.locked && !s.complete && <div className="text-xs text-stone-500 mt-1">Locked until the previous step is complete.</div>}
                </div>
              </li>
            ))}
          </ol>

          {participant.name && participant.businessName && participant.region && participant.market && gated.every(s => s.complete) && (
            <CertificatePanel participant={participant} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/** Main App */
export default function Page() {
  const [entered, setEntered] = useState(false);
  const [path, setPath] = useState<Pathway | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-green-50 to-stone-100">
      <Header />
      {!entered ? (
        <CeremonialEntry onEnter={() => setEntered(true)} />
      ) : path ? (
        <PathwayPage path={path} onBack={() => setPath(null)} />
      ) : (
        <FireCircle onSelect={(p) => setPath(p)} />
      )}
      <Footer />
    </div>
  );
}
