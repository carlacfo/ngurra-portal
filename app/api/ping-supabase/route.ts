import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase.rpc("now"); // Postgres NOW()
  if (error) return NextResponse.json({ ok:false, error:error.message });
  return NextResponse.json({ ok:true, now:data });
}
