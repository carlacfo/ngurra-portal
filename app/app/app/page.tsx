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
