"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CheckCircle2, X } from "lucide-react"
import {
  buildCalPrefill,
  buildCalFallbackUrl,
  saveAuditLead,
  type AuditLeadInput,
  type CalPrefill,
  type ClinicType,
  type ConversationVolume,
} from "@/lib/audit-lead"
import { trackEvent } from "@/lib/tracking"
import { CalEmbed } from "./cal-embed"

interface Props {
  isOpen: boolean
  onClose: () => void
  ctaLocation: string
}

type FormState = {
  fullName: string
  clinicName: string
  contact: string
  clinicType: ClinicType | ""
  usesWhatsapp: "" | "si" | "no"
  monthlyConversationVolume: ConversationVolume | ""
  mainProblem: string
}

const initialState: FormState = {
  fullName: "",
  clinicName: "",
  contact: "",
  clinicType: "",
  usesWhatsapp: "",
  monthlyConversationVolume: "",
  mainProblem: "",
}

type FieldError = Partial<Record<keyof FormState, string>>

const CLINIC_OPTIONS: { value: ClinicType; label: string }[] = [
  { value: "salud_estetica", label: "Salud, clínica o estética" },
  { value: "restaurante", label: "Restaurante o gastronomía" },
  { value: "inmobiliaria", label: "Inmobiliaria" },
  { value: "automotriz", label: "Concesionario / automotriz" },
  { value: "educacion", label: "Academia o educación" },
  { value: "agencia_consultora", label: "Agencia o consultora" },
  { value: "legal", label: "Estudio jurídico" },
  { value: "retail", label: "Tienda o retail" },
  { value: "servicios", label: "Empresa de servicios" },
  { value: "otro", label: "Otro" },
]

const VOLUME_OPTIONS: { value: ConversationVolume; label: string }[] = [
  { value: "bajo", label: "Bajo" },
  { value: "medio", label: "Medio" },
  { value: "alto", label: "Alto" },
]

function validate(state: FormState): FieldError {
  const errors: FieldError = {}
  if (!state.fullName.trim()) errors.fullName = "Tu nombre es requerido."
  if (!state.clinicName.trim()) errors.clinicName = "Nombre del negocio requerido."
  if (!state.contact.trim()) {
    errors.contact = "Email o WhatsApp requerido."
  } else {
    const v = state.contact.trim()
    const isEmail = /\S+@\S+\.\S+/.test(v)
    const isPhone = /^[+\d\s().-]{7,}$/.test(v)
    if (!isEmail && !isPhone) errors.contact = "Ingresa un email o número válido."
  }
  if (!state.clinicType) errors.clinicType = "Selecciona el tipo de negocio."
  if (!state.usesWhatsapp) errors.usesWhatsapp = "Indica si atienden por WhatsApp."
  if (!state.monthlyConversationVolume) errors.monthlyConversationVolume = "Selecciona un volumen."
  return errors
}

export function AuditLeadModal({ isOpen, onClose, ctaLocation }: Props) {
  const [state, setState] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FieldError>({})
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState<"form" | "success">("form")
  const [calPrefill, setCalPrefill] = useState<CalPrefill>({})
  const [calFallback, setCalFallback] = useState<string>("")

  const dialogRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const lastActiveElement = useRef<HTMLElement | null>(null)

  // Reset on open.
  useEffect(() => {
    if (isOpen) {
      setStep("form")
      setErrors({})
      lastActiveElement.current = document.activeElement as HTMLElement | null
      // Focus first field after mount.
      const t = setTimeout(() => firstFieldRef.current?.focus(), 60)
      return () => clearTimeout(t)
    } else {
      // Restore focus on close.
      lastActiveElement.current?.focus?.()
    }
  }, [isOpen])

  // Body scroll lock + ESC + focus trap.
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
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
    document.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKey)
    }
  }, [isOpen, onClose])

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((s) => ({ ...s, [key]: value }))
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e))
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(state)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Focus first invalid input for keyboard users.
      const firstKey = Object.keys(errs)[0]
      const node = dialogRef.current?.querySelector<HTMLElement>(`[data-field="${firstKey}"]`)
      node?.focus()
      return
    }

    setSubmitting(true)
    const input: AuditLeadInput = {
      fullName: state.fullName.trim(),
      clinicName: state.clinicName.trim(),
      contact: state.contact.trim(),
      clinicType: state.clinicType as ClinicType,
      usesWhatsapp: state.usesWhatsapp === "si",
      monthlyConversationVolume: state.monthlyConversationVolume as ConversationVolume,
      mainProblem: state.mainProblem.trim() || undefined,
      ctaLocation,
    }

    const hpField = document.getElementById("audit-website") as HTMLInputElement | null
    if (hpField?.value) {
      setSubmitting(false)
      setStep("success")
      setCalPrefill(buildCalPrefill(input))
      setCalFallback(buildCalFallbackUrl(input))
      return
    }

    setCalPrefill(buildCalPrefill(input))
    setCalFallback(buildCalFallbackUrl(input))

    const result = await saveAuditLead(input)
    if (!result.ok && process.env.NODE_ENV !== "production") {
      // Dev-only: never surfaced to user; never blocks scheduling.
      trackEvent("audit_lead_save_failed", { reason: result.error, ctaLocation })
    } else if (result.ok) {
      trackEvent("audit_lead_submitted", { ctaLocation })
    }
    setSubmitting(false)
    setStep("success")
  }

  const titleId = "audit-modal-title"
  const descId = "audit-modal-desc"

  const headerCopy = useMemo(
    () =>
      step === "form"
        ? {
            title: "Prepara tu auditoría gratuita",
            desc: "Completa estos datos para que la llamada sea más útil y podamos mostrarte oportunidades cercanas al tipo de negocio que tienes.",
          }
        : {
            title: "Listo. Elige tu horario.",
            desc: "Agenda tu demo directamente acá. Sin salir de la página.",
          },
    [step],
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          aria-hidden={false}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`relative w-full ${step === "success" ? "sm:max-w-3xl" : "sm:max-w-lg"} max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl glass-card border border-border/60 glow-green-sm p-6 sm:p-7`}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar formulario"
              className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-5 pr-8">
              <h2
                id={titleId}
                className="font-display text-2xl sm:text-[1.75rem] leading-tight text-foreground"
              >
                {headerCopy.title}
              </h2>
              <p id={descId} className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {headerCopy.desc}
              </p>
            </div>

            {step === "form" ? (
              <form onSubmit={submit} noValidate className="space-y-4">
                {/* Honeypot — invisible to users, catches bots */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                  <label htmlFor="audit-website">Website</label>
                  <input id="audit-website" name="_website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <Field label="Nombre completo" error={errors.fullName} htmlFor="audit-fullName">
                  <input
                    ref={firstFieldRef}
                    id="audit-fullName"
                    data-field="fullName"
                    type="text"
                    autoComplete="name"
                    value={state.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className={inputClass(!!errors.fullName)}
                    placeholder="Valeria Rojas"
                  />
                </Field>

                <Field label="Nombre del negocio" error={errors.clinicName} htmlFor="audit-clinic">
                  <input
                    id="audit-clinic"
                    data-field="clinicName"
                    type="text"
                    autoComplete="organization"
                    value={state.clinicName}
                    onChange={(e) => update("clinicName", e.target.value)}
                    className={inputClass(!!errors.clinicName)}
                    placeholder="Ej. Estudio Aurora"
                  />
                </Field>

                <Field
                  label="Email o WhatsApp"
                  error={errors.contact}
                  htmlFor="audit-contact"
                  hint="Donde podamos coordinar la llamada."
                >
                  <input
                    id="audit-contact"
                    data-field="contact"
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    value={state.contact}
                    onChange={(e) => update("contact", e.target.value)}
                    className={inputClass(!!errors.contact)}
                    placeholder="valeria@negocio.com o +51 999 999 999"
                  />
                </Field>

                <Field
                  label="Tipo de negocio"
                  error={errors.clinicType}
                  htmlFor="audit-clinicType"
                >
                  <select
                    id="audit-clinicType"
                    data-field="clinicType"
                    value={state.clinicType}
                    onChange={(e) => update("clinicType", e.target.value as ClinicType)}
                    className={inputClass(!!errors.clinicType)}
                  >
                    <option value="" disabled>
                      Selecciona…
                    </option>
                    {CLINIC_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="¿Atienden por WhatsApp?" error={errors.usesWhatsapp}>
                  <div className="grid grid-cols-2 gap-2" data-field="usesWhatsapp" tabIndex={-1}>
                    {(["si", "no"] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => update("usesWhatsapp", v)}
                        aria-pressed={state.usesWhatsapp === v}
                        className={chipClass(state.usesWhatsapp === v, !!errors.usesWhatsapp)}
                      >
                        {v === "si" ? "Sí" : "No"}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field
                  label="Volumen mensual de conversaciones"
                  error={errors.monthlyConversationVolume}
                >
                  <div
                    className="grid grid-cols-3 gap-2"
                    data-field="monthlyConversationVolume"
                    tabIndex={-1}
                  >
                    {VOLUME_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => update("monthlyConversationVolume", o.value)}
                        aria-pressed={state.monthlyConversationVolume === o.value}
                        className={chipClass(
                          state.monthlyConversationVolume === o.value,
                          !!errors.monthlyConversationVolume,
                        )}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field
                  label="Principal problema actual (opcional)"
                  htmlFor="audit-problem"
                  hint="Una línea es suficiente. Te ayudará a preparar mejor la llamada."
                >
                  <textarea
                    id="audit-problem"
                    value={state.mainProblem}
                    onChange={(e) => update("mainProblem", e.target.value)}
                    rows={2}
                    maxLength={240}
                    className={inputClass(false) + " resize-none"}
                    placeholder="Ej. Muchas cotizaciones que nunca cierran."
                  />
                </Field>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-2 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed glow-green-sm"
                >
                  {submitting ? "Preparando…" : "Continuar a calendario"}
                  {!submitting && (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </button>

                <p className="text-[11px] text-muted-foreground/80 text-center leading-relaxed">
                  No es un registro. No necesitas crear cuenta. Solo usamos estos datos para preparar
                  mejor tu auditoría.
                </p>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3 glass-card-green rounded-xl p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground/90 leading-relaxed">
                    Datos guardados. Elige un horario para tu demo directamente debajo.
                  </p>
                </div>

                <CalEmbed prefill={calPrefill} ctaLocation={ctaLocation} fallbackUrl={calFallback} />

                <button
                  type="button"
                  onClick={onClose}
                  className="block mx-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cerrar y seguir explorando
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  children,
  error,
  hint,
  htmlFor,
}: {
  label: string
  children: React.ReactNode
  error?: string
  hint?: string
  htmlFor?: string
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium"
      >
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-[11px] text-muted-foreground/80">{hint}</p>}
      {error && (
        <p role="alert" className="text-[11px] text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return [
    "w-full px-3.5 py-2.5 rounded-xl bg-background/60 border text-sm text-foreground placeholder:text-muted-foreground/70",
    "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-colors",
    hasError ? "border-red-500/60" : "border-border/70",
  ].join(" ")
}

function chipClass(active: boolean, hasError: boolean) {
  return [
    "px-3 py-2.5 rounded-xl text-sm border transition-colors",
    active
      ? "bg-primary/15 text-primary border-primary/40"
      : "bg-background/60 text-foreground/90 border-border/70 hover:border-primary/40",
    hasError && !active ? "border-red-500/40" : "",
  ].join(" ")
}
