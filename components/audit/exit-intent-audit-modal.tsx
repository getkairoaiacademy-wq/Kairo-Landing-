"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import { useAuditModal } from "./audit-modal-context"
import { trackEvent } from "@/lib/tracking"

// Desktop-only exit intent.
// Triggers when the cursor leaves the top of the viewport.
// Single-fire per session. Suppressed if user already opened the audit modal.

const SESSION_KEY = "kairo_exit_intent_shown"

export function ExitIntentAuditModal() {
  const { open, hasEngaged, isOpen } = useAuditModal()
  const [visible, setVisible] = useState(false)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    // Mobile / coarse pointer → never enable.
    if (window.matchMedia("(pointer: coarse)").matches) return
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return
    } catch {
      /* noop */
    }
    // Arm only after ~10s on page so we don't fire on accidental early exits.
    const t = setTimeout(() => setArmed(true), 10_000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!armed) return
    if (hasEngaged) return // user already engaged with modal — never show

    const onMouseLeave = (e: MouseEvent) => {
      // Only top edge counts as exit intent.
      if (e.clientY > 0) return
      if (e.relatedTarget) return
      setVisible(true)
      try {
        sessionStorage.setItem(SESSION_KEY, "1")
      } catch {
        /* noop */
      }
      document.removeEventListener("mouseleave", onMouseLeave)
    }
    document.addEventListener("mouseleave", onMouseLeave)
    return () => document.removeEventListener("mouseleave", onMouseLeave)
  }, [armed, hasEngaged])

  useEffect(() => {
    if (visible) trackEvent("audit_exit_intent_shown")
  }, [visible])

  const dismiss = () => {
    setVisible(false)
    trackEvent("audit_exit_intent_dismissed")
  }

  const cta = () => {
    setVisible(false)
    open("exit_intent")
  }

  if (isOpen) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] hidden lg:flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={dismiss}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-md glass-card rounded-3xl p-7 border border-border/60 glow-green-sm"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Cerrar"
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2
              id="exit-intent-title"
              className="font-display text-2xl leading-tight text-foreground pr-8"
            >
              Antes de irte:{" "}
              <span className="text-gradient-green">revisa los pacientes que ya tienes.</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Puede que tu próxima cita no venga de un anuncio nuevo, sino de una conversación
              olvidada en WhatsApp.
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={cta}
                className="group inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition-opacity glow-green-sm"
              >
                Agendar auditoría gratuita
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={dismiss}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Seguir viendo la página
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
