"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { createClient } from "@supabase/supabase-js";

type Pathway = "sorry_business" | "land_care";

interface Step {
  key: string;
  label: string;
  complete: boolean;
}

interface Participant {
  name: string;
  pathway: Pathway;
  businessName: string;
  region: string;
  market: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Steps for each pathway
const steps: Record<Pathway, Step[]> = {
  sorry_business: [
    { key: "invitation", label: "Sit in Country (Invitation)", complete: false },
    { key: "understanding", label: "Understand Cultural Purpose", complete: false },
    { key: "fit_for_purpose", label: "Prove Fit for Purpose", complete: false },
    { key: "open_for_business", label: "Open for Sorry Business", complete: false },
  ],
  land_care: [
    { key: "invitation", label: "Sit in Country (Invitation)", complete: false },
    { key: "understanding", label: "Understand Biodiversity Purpose", complete: false },
    { key: "fit_for_purpose", label: "Prove Fit for Purpose", complete: false },
    { key: "open_for_business", label: "Open for Land Care", complete: false },
  ],
};

// Fire circle entry
function FireCircle({ onSelect }: { onSelect: (p: Pathway) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50">
      <motion.div
        className="w-64 h-64 rounded-full bg-orange-200 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, dura
