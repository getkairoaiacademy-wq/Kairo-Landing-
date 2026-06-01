"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, X } from "lucide-react"
import { useAuditModal } from "./audit-modal-context"
import { trackEvent } from "@/lib/tracking"

// Desktop-only soft reminder.
// Triggers when user has been ~60s on the page OR scrolled ≥40%.
// One time per session. Dismissed permanently for that session.
// Hidden if the audit modal has already been opened.

const SESSION_KEY = "kairo_reminder_60s_dismissed"

export function AuditReminder60s() {
  const { open, isOpen, hasEngaged } = useAuditModal()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") setDismissed(true)
    } catch {
      /* noop */
    }
  }, [])

  useEffect(() => {
    if (dismissed || visible) return
    let stopped = false

    const timer = window.setTimeout(() => {
      if (!stopped) setVisible(true)
    }, 60_000)

    const onScroll = () => {
      const doc = document.documentElement
      const scrolled = window.scrollY + window.innerHeight
      const total = Math.max(doc.scrollHeight, 1)
      const pct = (scrolled / total) * 100
      if (pct >= 40) {
        setVisible(true)
        stopped = true
        window.removeEventListener("scroll", onScroll)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      stopped = true
      window.clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [dismissed, visible])

  useEffect(() => {
    if (visible) trackEvent("audit_reminder_shown", { reminder: "60s" })
  }, [visible])

  const dismiss = () => {
    setDismissed(true)
    setVisible(false)
    try {
      sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      /* noop */
    }
    trackEvent("audit_reminder_closed", { reminder: "60s" })
  }

  const cta = () => {
    open("reminder_60s")
    dismiss()
  }

  const show = visible && !dismissed && !isOpen && !hasEngaged

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          role="complementary"
          aria-label="Recordatorio de auditoría gratuita"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="hidden lg:block fixed bottom-24 right-6 z-30 w-[340px] glass-card rounded-2xl p-5 border border-border/70 glow-green-sm"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Cerrar recordatorio"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <p className="font-heading text-base font-semibold text-foreground pr-6 leading-snug">
            Tu base podría tener clientes listos para volver.
          </p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Agenda una auditoría gratuita y descubre si tienes cotizaciones, consultas o clientes
            antiguos esperando seguimiento.
          </p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            <Pill>Cotizaciones abandonadas</Pill>
            <Pill>Clientes antiguos</Pill>
            <Pill>Campañas sugeridas</Pill>
          </div>

          <button
            type="button"
            onClick={cta}
            className="group mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95 transition-opacity"
          >
            Reservar auditoría
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
      {children}
    </span>
  )
}
