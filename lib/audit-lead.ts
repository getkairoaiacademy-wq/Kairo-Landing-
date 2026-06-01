// Audit lead capture — saves a lead to the API (with localStorage fallback)
// and builds Cal.com prefill data. Designed so the user is NEVER blocked by a save failure.

import { CAL_LINK } from "./constants"
import { getLandingSignals } from "./tracking"

// Tipo de negocio. Conservamos el nombre `ClinicType` por compatibilidad con el
// API y el esquema almacenado; los valores cubren negocios en general.
export type ClinicType =
  | "salud_estetica"
  | "restaurante"
  | "inmobiliaria"
  | "automotriz"
  | "educacion"
  | "agencia_consultora"
  | "legal"
  | "retail"
  | "servicios"
  | "otro"

export type ConversationVolume = "bajo" | "medio" | "alto"

export interface AuditLeadInput {
  fullName: string
  clinicName: string
  contact: string
  clinicType: ClinicType
  usesWhatsapp: boolean
  monthlyConversationVolume: ConversationVolume
  mainProblem?: string
  ctaLocation: string
}

export interface AuditLeadRecord extends AuditLeadInput {
  sourcePage: string
  timeOnPageBeforeClick: number
  scrollDepth: number
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  createdAt: string
}

const LOCAL_KEY = "kairo_audit_leads_v1"

function enrich(input: AuditLeadInput): AuditLeadRecord {
  const s = getLandingSignals()
  return {
    ...input,
    sourcePage: s.sourcePage,
    timeOnPageBeforeClick: s.timeOnPageMs,
    scrollDepth: s.scrollDepthPct,
    utm_source: s.utm.utm_source,
    utm_medium: s.utm.utm_medium,
    utm_campaign: s.utm.utm_campaign,
    utm_content: s.utm.utm_content,
    utm_term: s.utm.utm_term,
    createdAt: new Date().toISOString(),
  }
}

function persistLocal(record: AuditLeadRecord) {
  if (typeof window === "undefined") return
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    const prev = raw ? (JSON.parse(raw) as AuditLeadRecord[]) : []
    prev.push(record)
    localStorage.setItem(LOCAL_KEY, JSON.stringify(prev.slice(-25)))
  } catch {
    /* swallow — never block UX */
  }
}

export async function saveAuditLead(
  input: AuditLeadInput,
): Promise<{ ok: boolean; record: AuditLeadRecord; error?: string }> {
  const record = enrich(input)
  // Always persist locally as a safety net.
  persistLocal(record)

  try {
    const res = await fetch("/api/audit-leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      // Short timeout via AbortSignal so a slow endpoint never blocks scheduling.
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) {
      return { ok: false, record, error: `HTTP ${res.status}` }
    }
    return { ok: true, record }
  } catch (err) {
    return { ok: false, record, error: err instanceof Error ? err.message : "unknown" }
  }
}

// Cal.com prefill helper. Returns query params to pass via the inline embed config.
export interface CalPrefill {
  name?: string
  email?: string
  notes?: string
  guests?: string[]
}

export function buildCalPrefill(input?: Pick<AuditLeadInput, "fullName" | "contact" | "clinicName" | "mainProblem">): CalPrefill {
  if (!input) return {}
  const prefill: CalPrefill = {}
  if (input.fullName) prefill.name = input.fullName
  if (input.contact && /\S+@\S+\.\S+/.test(input.contact)) {
    prefill.email = input.contact
  }
  const notes: string[] = []
  if (input.clinicName) notes.push(`Negocio: ${input.clinicName}`)
  if (input.mainProblem) notes.push(`Reto: ${input.mainProblem}`)
  if (notes.length > 0) prefill.notes = notes.join("\n")
  return prefill
}

// Full external Cal.com link (used only as fallback if embed fails).
export function buildCalFallbackUrl(input?: Pick<AuditLeadInput, "fullName" | "contact">): string {
  const base = `https://cal.com/${CAL_LINK}`
  if (!input) return base
  const url = new URL(base)
  if (input.fullName) url.searchParams.set("name", input.fullName)
  if (input.contact && /\S+@\S+\.\S+/.test(input.contact)) {
    url.searchParams.set("email", input.contact)
  }
  return url.toString()
}
