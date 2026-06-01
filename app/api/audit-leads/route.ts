import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const VALID_CLINIC_TYPES = ["salud_estetica", "restaurante", "inmobiliaria", "automotriz", "educacion", "agencia_consultora", "legal", "retail", "servicios", "otro"]
const VALID_VOLUMES = ["bajo", "medio", "alto"]
const MAX_STRING_LENGTH = 500

function sanitize(value: unknown): string {
  if (typeof value !== "string") return ""
  return value
    .trim()
    .slice(0, MAX_STRING_LENGTH)
    .replace(/[<>]/g, "")
}

function isValidPayload(data: Record<string, unknown>): { valid: boolean; error?: string } {
  const fullName = sanitize(data.fullName)
  if (!fullName || fullName.length < 2) return { valid: false, error: "invalid_name" }

  const clinicName = sanitize(data.clinicName)
  if (!clinicName) return { valid: false, error: "invalid_clinic_name" }

  const contact = sanitize(data.contact)
  if (!contact || contact.length < 5) return { valid: false, error: "invalid_contact" }

  if (data.clinicType && !VALID_CLINIC_TYPES.includes(data.clinicType as string)) {
    return { valid: false, error: "invalid_clinic_type" }
  }

  if (data.monthlyConversationVolume && !VALID_VOLUMES.includes(data.monthlyConversationVolume as string)) {
    return { valid: false, error: "invalid_volume" }
  }

  return { valid: true }
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin") || ""
  const allowedOrigins = [
    "https://getkairo.lat",
    "https://www.getkairo.lat",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
  ].filter(Boolean)

  if (process.env.NODE_ENV === "production" && origin && !allowedOrigins.some((o) => origin.startsWith(o))) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 })
  }

  let data: Record<string, unknown>
  try {
    data = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 })
  }

  // Honeypot — if this field has a value, it's a bot
  if (data._website || data._hp) {
    return NextResponse.json({ ok: true })
  }

  const validation = isValidPayload(data)
  if (!validation.valid) {
    return NextResponse.json({ ok: false, error: validation.error }, { status: 400 })
  }

  const record = {
    full_name: sanitize(data.fullName),
    clinic_name: sanitize(data.clinicName),
    contact: sanitize(data.contact),
    clinic_type: VALID_CLINIC_TYPES.includes(data.clinicType as string) ? data.clinicType : null,
    uses_whatsapp:
      data.usesWhatsapp === true || data.usesWhatsapp === "si"
        ? true
        : data.usesWhatsapp === false || data.usesWhatsapp === "no"
          ? false
          : null,
    monthly_volume: VALID_VOLUMES.includes(data.monthlyConversationVolume as string) ? data.monthlyConversationVolume : null,
    main_problem: sanitize(data.mainProblem),
    source_page: sanitize(data.sourcePage),
    cta_location: sanitize(data.ctaLocation),
    time_on_page_ms: typeof data.timeOnPageBeforeClick === "number" ? Math.min(data.timeOnPageBeforeClick, 3_600_000) : null,
    scroll_depth_pct: typeof data.scrollDepth === "number" ? Math.min(Math.max(data.scrollDepth, 0), 100) : null,
    utm_source: sanitize(data.utm_source),
    utm_medium: sanitize(data.utm_medium),
    utm_campaign: sanitize(data.utm_campaign),
    utm_content: sanitize(data.utm_content),
    utm_term: sanitize(data.utm_term),
  }

  try {
    const supabase = createClient()
    const { error } = await supabase.from("audit_leads").insert(record)

    if (error) {
      console.error("[KAIRO] Supabase insert error:", error.message)
      return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 })
    }
  } catch (err) {
    console.error("[KAIRO] DB error:", err instanceof Error ? err.message : "unknown")
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
