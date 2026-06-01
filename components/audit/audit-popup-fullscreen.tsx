"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Sparkles, TrendingUp, X } from "lucide-react"
import { buildCalFallbackUrl, buildCalPrefill, saveAuditLead, type AuditLeadInput, type CalPrefill } from "@/lib/audit-lead"
import { trackEvent } from "@/lib/tracking"
import { CalEmbed } from "./cal-embed"

interface Props {
  isOpen: boolean
  onClose: () => void
  ctaLocation: string
}

// localStorage keys (with in-memory fallback if unavailable).
const K_LAST_SHOWN = "kairo_audit_popup_last_shown"
const K_SUBMITTED = "kairo_audit_popup_submitted"
const K_DISMISSED = "kairo_audit_popup_dismissed_at"

const SESSION_TIMEOUT = 30 * 60 * 1000
// Pop-up appears AFTER 40 seconds on page. Never on entry.
const FIRST_DELAY_DESKTOP = 40_000
const FIRST_DELAY_MOBILE = 40_000

const memory: Record<string, string> = {}
function storeGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return key in memory ? memory[key] : null
  }
}
function storeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    memory[key] = value
  }
}

const easeOut = [0.16, 1, 0.3, 1] as const
const emailRe = /\S+@\S+\.\S+/

type FormState = {
  clinicName: string
  fullName: string
  email: string
  privacyAccepted: boolean
  termsAccepted: boolean
  marketingConsent: boolean
}
type FieldError = Partial<Record<keyof FormState, string>>

function isTypingElsewhere(): boolean {
  const el = document.activeElement
  if (!el) return false
  const tag = el.tagName
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    (el as HTMLElement).isContentEditable === true
  )
}

export function AuditPopupFullscreen({ isOpen, onClose, ctaLocation }: Props) {
  const reduce = useReducedMotion()
  const [autoOpen, setAutoOpen] = useState(false)
  const [state, setState] = useState<FormState>({
    clinicName: "",
    fullName: "",
    email: "",
    privacyAccepted: false,
    termsAccepted: false,
    marketingConsent: false,
  })
  const [errors, setErrors] = useState<FieldError>({})
  const [submitting, setSubmitting] = useState(false)
  const [saveFailed, setSaveFailed] = useState(false)

  const [step, setStep] = useState<"form" | "calendar">("form")
  const [calPrefill, setCalPrefill] = useState<CalPrefill>({})
  const [calFallback, setCalFallback] = useState("")

  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const lastActive = useRef<HTMLElement | null>(null)

  const visible = isOpen || autoOpen
  const location = isOpen ? ctaLocation : "auto_popup_40s"

  // ---- Auto-trigger scheduler: 40s after mount, ONCE per session ----
  useEffect(() => {
    if (typeof window === "undefined") return
    // Already submitted: never auto-open.
    if (storeGet(K_SUBMITTED) === "1") return
    // Already dismissed this session: never re-open.
    if (storeGet(K_DISMISSED)) return
    // Already shown this session: never re-open.
    if (storeGet(K_LAST_SHOWN)) return
    // Skip on legal pages.
    const path = window.location.pathname
    if (path.startsWith("/politica-de-privacidad") || path.startsWith("/terminos-y-condiciones")) return

    const isMobile = window.matchMedia("(max-width: 640px)").matches
    const delay = isMobile ? FIRST_DELAY_MOBILE : FIRST_DELAY_DESKTOP

    const tryShow = () => {
      if (storeGet(K_SUBMITTED) === "1") return
      if (storeGet(K_DISMISSED)) return
      if (isOpen || isTypingElsewhere()) return
      setAutoOpen(true)
    }

    const timer = window.setTimeout(tryShow, delay)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  // ---- On open: record shown, focus, lock scroll ----
  useEffect(() => {
    if (!visible) return
    storeSet(K_LAST_SHOWN, String(Date.now()))
    trackEvent("audit_popup_shown", { location })
    lastActive.current = document.activeElement as HTMLElement | null
    const t = setTimeout(() => firstFieldRef.current?.focus(), 80)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        handleClose()
        return
      }
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
        )
        if (f.length === 0) return
        const first = f[0]
        const last = f[f.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
      lastActive.current?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  const handleClose = useCallback(() => {
    storeSet(K_DISMISSED, String(Date.now()))
    trackEvent("audit_popup_dismissed", { location })
    setAutoOpen(false)
    if (isOpen) onClose()
  }, [isOpen, onClose, location])

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((s) => ({ ...s, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }, [])

  function validate(s: FormState): FieldError {
    const e: FieldError = {}
    if (!s.clinicName.trim()) e.clinicName = "Escribe el nombre de tu negocio."
    if (!s.fullName.trim()) e.fullName = "¿Cómo te llamas?"
    if (!s.email.trim()) e.email = "Déjanos un correo para coordinar."
    else if (!emailRe.test(s.email.trim())) e.email = "Revisa el correo antes de continuar."
    if (!s.privacyAccepted) e.privacyAccepted = "Acepta la Política de Privacidad."
    if (!s.termsAccepted) e.termsAccepted = "Acepta los Términos y Condiciones."
    return e
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(state)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstKey = Object.keys(errs)[0]
      dialogRef.current?.querySelector<HTMLElement>(`[data-field="${firstKey}"]`)?.focus()
      return
    }

    setSubmitting(true)
    setSaveFailed(false)
    const input: AuditLeadInput = {
      fullName: state.fullName.trim(),
      clinicName: state.clinicName.trim(),
      contact: state.email.trim(),
      clinicType: "otro",
      usesWhatsapp: true,
      monthlyConversationVolume: "medio",
      ctaLocation: location,
      privacyAccepted: state.privacyAccepted,
      termsAccepted: state.termsAccepted,
      marketingConsent: state.marketingConsent,
    }

    const result = await saveAuditLead(input)
    storeSet(K_SUBMITTED, "1")
    trackEvent("audit_popup_submitted", { location, saved: result.ok })

    setCalPrefill(buildCalPrefill(input))
    setCalFallback(buildCalFallbackUrl(input))
    setSubmitting(false)
    setStep("calendar")
    if (!result.ok) setSaveFailed(true)
  }

  const titleId = "audit-popup-title"
  const descId = "audit-popup-desc"

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: easeOut }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
        >
          {/* Cinematic dark backdrop */}
          <button
            type="button"
            aria-label="Cerrar"
            onClick={handleClose}
            className="absolute inset-0 cursor-default"
            style={{ backgroundColor: "rgba(3, 7, 6, 0.86)", backdropFilter: "blur(8px)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(60% 50% at 50% 38%, rgba(57,255,136,0.10) 0%, transparent 62%)" }}
          />

          <motion.div
            ref={dialogRef}
            initial={{ y: reduce ? 0 : 26, opacity: 0, scale: reduce ? 1 : 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: reduce ? 0 : 16, opacity: 0, scale: reduce ? 1 : 0.985 }}
            transition={{ duration: reduce ? 0 : 0.42, ease: easeOut }}
            className={`relative grid w-full ${step === "calendar" ? "max-w-4xl grid-cols-1" : "max-w-5xl grid-cols-1 lg:grid-cols-[1.05fr_1fr]"} overflow-hidden rounded-3xl border border-white/10 max-h-[94vh]`}
            style={{ background: "linear-gradient(160deg, #0A1310 0%, #060B09 100%)" }}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Cerrar ventana"
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full text-white/55 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* LEFT — product visual (hidden in calendar step) */}
            {step === "form" && (
            <div className="relative hidden lg:flex flex-col justify-center gap-4 p-9 border-r border-white/[0.06] overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(120% 90% at 0% 0%, rgba(57,255,136,0.08) 0%, transparent 55%)" }}
              />
              <FloatingCard reduce={!!reduce} delay={0}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wide text-white/50">Ingresos recuperables</span>
                  <TrendingUp className="h-3.5 w-3.5 text-[#39FF88]" />
                </div>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-white">
                  S/ <span style={{ color: "#39FF88" }}>5,759</span>
                </p>
                <p className="mt-1 text-[11px] text-white/45">en cotizaciones y clientes sin seguimiento</p>
              </FloatingCard>

              <FloatingCard reduce={!!reduce} delay={0.12}>
                <div className="space-y-2">
                  {[
                    ["Cotizaciones abiertas", "23"],
                    ["Clientes a reactivar", "48"],
                    ["Campañas sugeridas", "12"],
                  ].map(([label, n]) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-white/65">{label}</span>
                      <span className="text-xs font-semibold text-white">{n}</span>
                    </div>
                  ))}
                </div>
              </FloatingCard>
            </div>
            )}

            {/* RIGHT — logo + form OR calendar */}
            <div className="relative flex flex-col justify-center p-7 sm:p-9 overflow-y-auto">
              {step === "form" && (
              <>
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
                <Sparkles className="h-3 w-3 text-[#39FF88]" />
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/60">Auditoría gratuita</span>
              </div>

              <h2
                id={titleId}
                className="font-heading not-italic mt-4 text-2xl sm:text-[1.9rem] font-extrabold leading-[1.08] tracking-tight text-white"
              >
                ¿Quieres ver cuánto dinero podría estar <span style={{ color: "#39FF88" }}>dormido</span> en tu clínica?
              </h2>
              <p id={descId} className="mt-2.5 text-sm leading-relaxed text-white/55">
                KAIRO analiza contactos, conversaciones y cotizaciones pendientes para detectar oportunidades de recuperación que tu equipo puede accionar por WhatsApp.
              </p>

              <form onSubmit={submit} noValidate className="mt-6 space-y-3.5">
                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                  <label htmlFor="pop-website">Website</label>
                  <input id="pop-website" name="_website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <PopupField label="Nombre del negocio" error={errors.clinicName} htmlFor="pop-clinic">
                  <input
                    ref={firstFieldRef}
                    id="pop-clinic"
                    data-field="clinicName"
                    type="text"
                    autoComplete="organization"
                    value={state.clinicName}
                    onChange={(e) => update("clinicName", e.target.value)}
                    className={popInput(!!errors.clinicName)}
                    placeholder="Ej. Estudio Aurora"
                  />
                </PopupField>

                <PopupField label="Tu nombre" error={errors.fullName} htmlFor="pop-name">
                  <input
                    id="pop-name"
                    data-field="fullName"
                    type="text"
                    autoComplete="name"
                    value={state.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className={popInput(!!errors.fullName)}
                    placeholder="Valeria Rojas"
                  />
                </PopupField>

                <PopupField label="Correo" error={errors.email} htmlFor="pop-email">
                  <input
                    id="pop-email"
                    data-field="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={state.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={popInput(!!errors.email)}
                    placeholder="valeria@negocio.com"
                  />
                </PopupField>

                {/* Consent — privacy + terms required, marketing optional */}
                <div className="space-y-2 pt-1">
                  <PopupConsent
                    id="pop-consent-privacy"
                    checked={state.privacyAccepted}
                    onChange={(v) => update("privacyAccepted", v)}
                    error={errors.privacyAccepted}
                  >
                    Acepto la{" "}
                    <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="underline hover:text-white" style={{ color: "#39FF88" }}>
                      Política de Privacidad
                    </a>
                    .
                  </PopupConsent>
                  <PopupConsent
                    id="pop-consent-terms"
                    checked={state.termsAccepted}
                    onChange={(v) => update("termsAccepted", v)}
                    error={errors.termsAccepted}
                  >
                    Acepto los{" "}
                    <a href="/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="underline hover:text-white" style={{ color: "#39FF88" }}>
                      Términos y Condiciones
                    </a>
                    .
                  </PopupConsent>
                  <PopupConsent
                    id="pop-consent-marketing"
                    checked={state.marketingConsent}
                    onChange={(v) => update("marketingConsent", v)}
                  >
                    Acepto recibir comunicaciones comerciales (opcional).
                  </PopupConsent>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ backgroundColor: "#39FF88", color: "#04110A" }}
                >
                  {submitting ? "Preparando tu auditoría…" : "Agendar mi auditoría gratuita"}
                  {!submitting && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="block w-full text-center text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  Ahora no
                </button>
              </form>
              </>
              )}

              {step === "calendar" && (
                <div className="space-y-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                      Listo. Elige tu horario.
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                      Agenda tu demo directamente acá. Si el calendario no carga, te contactamos.
                    </p>
                  </div>
                  <CalEmbed prefill={calPrefill} ctaLocation={location} fallbackUrl={calFallback} />
                  {saveFailed && (
                    <p className="text-center text-[10px] text-white/35">
                      Guardamos tu intento localmente. Si no podemos contactarte, escríbenos a soporte.
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FloatingCard({
  children,
  reduce,
  delay,
}: {
  children: React.ReactNode
  reduce: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: [0, -6, 0] }
      }
      transition={
        reduce
          ? { duration: 0 }
          : { opacity: { duration: 0.5, delay }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay } }
      }
      className="relative rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm"
      style={{ boxShadow: "0 18px 40px -24px rgba(0,0,0,0.8)" }}
    >
      {children}
    </motion.div>
  )
}

function PopupField({
  label,
  children,
  error,
  htmlFor,
}: {
  label: string
  children: React.ReactNode
  error?: string
  htmlFor?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-[11px] uppercase tracking-wide text-white/45 font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-[11px] text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

function PopupConsent({
  id,
  checked,
  onChange,
  children,
  error,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  children: React.ReactNode
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-2 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/[0.06] text-[#39FF88] focus:ring-2 focus:ring-[#39FF88]/50"
        />
        <span className="text-[11px] leading-relaxed text-white/65">{children}</span>
      </label>
      {error && (
        <p role="alert" className="ml-6 mt-0.5 text-[10px] text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

function popInput(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/35",
    "focus:outline-none focus:ring-2 focus:ring-[#39FF88]/40 transition-colors",
    hasError ? "border-red-500/60" : "border-white/12",
  ].join(" ")
}
