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
  companyName: string
  phone: string
  email: string
  privacyAccepted: boolean
  termsAccepted: boolean
  marketingConsent: boolean
}

const initialState: FormState = {
  fullName: "",
  companyName: "",
  phone: "",
  email: "",
  privacyAccepted: false,
  termsAccepted: false,
  marketingConsent: false,
}

type FieldError = Partial<Record<keyof FormState, string>>

const emailRe = /\S+@\S+\.\S+/
const phoneRe = /^[+\d\s().-]{7,}$/

function validate(state: FormState): FieldError {
  const errors: FieldError = {}
  if (!state.fullName.trim() || state.fullName.trim().length < 2) errors.fullName = "Tu nombre es requerido."
  if (!state.companyName.trim() || state.companyName.trim().length < 2) errors.companyName = "Nombre de la empresa requerido."
  if (!state.phone.trim()) errors.phone = "Tu WhatsApp o número es requerido."
  else if (!phoneRe.test(state.phone.trim())) errors.phone = "Ingresa un número válido."
  if (!state.email.trim()) errors.email = "Correo requerido."
  else if (!emailRe.test(state.email.trim())) errors.email = "Ingresa un correo válido."
  if (!state.privacyAccepted) errors.privacyAccepted = "Debes aceptar la Política de Privacidad."
  if (!state.termsAccepted) errors.termsAccepted = "Debes aceptar los Términos y Condiciones."
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

  useEffect(() => {
    if (isOpen) {
      setStep("form")
      setErrors({})
      lastActiveElement.current = document.activeElement as HTMLElement | null
      const t = setTimeout(() => firstFieldRef.current?.focus(), 60)
      return () => clearTimeout(t)
    } else {
      lastActiveElement.current?.focus?.()
    }
  }, [isOpen])

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
      const firstKey = Object.keys(errs)[0]
      const node = dialogRef.current?.querySelector<HTMLElement>(`[data-field="${firstKey}"]`)
      node?.focus()
      return
    }

    setSubmitting(true)
    const input: AuditLeadInput = {
      fullName: state.fullName.trim(),
      companyName: state.companyName.trim(),
      email: state.email.trim(),
      phone: state.phone.trim(),
      ctaLocation,
      privacyAccepted: state.privacyAccepted,
      termsAccepted: state.termsAccepted,
      marketingConsent: state.marketingConsent,
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
            title: "Agenda tu demo de KAIRO",
            desc: "Te pedimos estos datos para coordinar tu demo. No hacemos spam.",
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

                <Field label="Nombre" error={errors.fullName} htmlFor="audit-fullName">
                  <input
                    ref={firstFieldRef}
                    id="audit-fullName"
                    data-field="fullName"
                    type="text"
                    autoComplete="name"
                    value={state.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className={inputClass(!!errors.fullName)}
                    placeholder="Tu nombre"
                  />
                </Field>

                <Field label="Nombre de la empresa" error={errors.companyName} htmlFor="audit-company">
                  <input
                    id="audit-company"
                    data-field="companyName"
                    type="text"
                    autoComplete="organization"
                    value={state.companyName}
                    onChange={(e) => update("companyName", e.target.value)}
                    className={inputClass(!!errors.companyName)}
                    placeholder="Nombre de tu clínica o empresa"
                  />
                </Field>

                <Field label="WhatsApp o número de contacto" error={errors.phone} htmlFor="audit-phone">
                  <input
                    id="audit-phone"
                    data-field="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={state.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass(!!errors.phone)}
                    placeholder="Ej. +51 999 999 999"
                  />
                </Field>

                <Field label="Correo" error={errors.email} htmlFor="audit-email">
                  <input
                    id="audit-email"
                    data-field="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={state.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass(!!errors.email)}
                    placeholder="correo@empresa.com"
                  />
                </Field>

                {/* Consent block — privacy + terms required, marketing optional */}
                <div className="space-y-2.5 pt-1">
                  <ConsentCheckbox
                    id="audit-consent-privacy"
                    checked={state.privacyAccepted}
                    onChange={(v) => update("privacyAccepted", v)}
                    error={errors.privacyAccepted}
                  >
                    Acepto la{" "}
                    <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:opacity-80">
                      Política de Privacidad
                    </a>
                    .
                  </ConsentCheckbox>
                  <ConsentCheckbox
                    id="audit-consent-terms"
                    checked={state.termsAccepted}
                    onChange={(v) => update("termsAccepted", v)}
                    error={errors.termsAccepted}
                  >
                    Acepto los{" "}
                    <a href="/terminos-y-condiciones" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:opacity-80">
                      Términos y Condiciones
                    </a>
                    .
                  </ConsentCheckbox>
                  <ConsentCheckbox
                    id="audit-consent-marketing"
                    checked={state.marketingConsent}
                    onChange={(v) => update("marketingConsent", v)}
                  >
                    Acepto recibir comunicaciones comerciales de KAIRO (opcional).
                  </ConsentCheckbox>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-2 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed glow-green-sm"
                >
                  {submitting ? "Preparando…" : "Agendar demo"}
                  {!submitting && (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </button>

                <p className="text-[11px] text-muted-foreground/80 text-center leading-relaxed">
                  No es un registro. No necesitas crear cuenta. Solo usamos estos datos para coordinar
                  tu demo.
                </p>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3 glass-card-green rounded-xl p-3">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-foreground/90 leading-relaxed">
                    Listo. Recibimos tus datos. Ahora elige una fecha para tu demo.
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

function ConsentCheckbox({
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
      <label htmlFor={id} className="flex items-start gap-2.5 cursor-pointer group">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border/70 bg-background/60 text-primary focus:ring-2 focus:ring-primary/40"
        />
        <span className="text-[12px] leading-relaxed text-foreground/80 group-hover:text-foreground">
          {children}
        </span>
      </label>
      {error && (
        <p role="alert" className="ml-6 mt-0.5 text-[11px] text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
