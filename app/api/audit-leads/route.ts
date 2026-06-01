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

  // Accept new companyName or legacy clinicName.
  const companyName = sanitize(data.companyName) || sanitize(data.clinicName)
  if (!companyName || companyName.length < 2) return { valid: false, error: "invalid_company_name" }

  const email = sanitize(data.email) || (typeof data.contact === "string" && /\S+@\S+\.\S+/.test(data.contact) ? sanitize(data.contact) : "")
  if (!email || !/\S+@\S+\.\S+/.test(email)) return { valid: false, error: "invalid_email" }

  const phone = sanitize(data.phone) || (typeof data.contact === "string" && !/\S+@\S+\.\S+/.test(data.contact) ? sanitize(data.contact) : "")
  if (!phone || phone.length < 6) return { valid: false, error: "invalid_phone" }

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

  // Legal consents — privacy + terms must be explicitly true.
  if (data.privacyAccepted !== true || data.termsAccepted !== true) {
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 400 })
  }

  // Derive canonical email + phone with legacy `contact` fallback.
  const emailVal = sanitize(data.email) || (typeof data.contact === "string" && /\S+@\S+\.\S+/.test(data.contact) ? sanitize(data.contact) : "")
  const phoneVal = sanitize(data.phone) || (typeof data.contact === "string" && !/\S+@\S+\.\S+/.test(data.contact) ? sanitize(data.contact) : "")
  const companyVal = sanitize(data.companyName) || sanitize(data.clinicName)

  const record = {
    full_name: sanitize(data.fullName),
    company_name: companyVal,
    // Legacy column kept populated for back-compat — same value as company_name.
    clinic_name: companyVal,
    email: emailVal,
    phone: phoneVal,
    // Legacy column "contact" still receives email (downstream tools may rely on it).
    contact: emailVal || phoneVal,
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
    privacy_accepted: true,
    terms_accepted: true,
    marketing_consent: data.marketingConsent === true,
    booking_status: "pending",
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
