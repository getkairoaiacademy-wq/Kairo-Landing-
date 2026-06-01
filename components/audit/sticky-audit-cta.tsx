"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useAuditModal } from "./audit-modal-context"
import { trackEvent } from "@/lib/tracking"
import { CTA_PRIMARY_SHORT } from "@/lib/constants"

// Sticky CTA — fades in after the user has scrolled ~25% of the page.
// Desktop: floating pill bottom-center.
// Mobile:  full-width bottom bar (replaces the old MobileStickyCta usage).
export function StickyAuditCta() {
  const { open, isOpen } = useAuditModal()
  const [visible, setVisible] = useState(false)
  const [shownOnce, setShownOnce] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const scrolled = window.scrollY + window.innerHeight
      const total = Math.max(doc.scrollHeight, 1)
      const pct = (scrolled / total) * 100
      setVisible(pct >= 25)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (visible && !shownOnce) {
      setShownOnce(true)
      trackEvent("audit_sticky_cta_shown")
    }
  }, [visible, shownOnce])

  const handleClick = () => {
    trackEvent("audit_sticky_cta_clicked")
    open("sticky")
  }

  // Hide while modal open to avoid stacking visual layers.
  const show = visible && !isOpen

  return (
    <>
      {/* Desktop floating pill */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <button
              type="button"
              onClick={handleClick}
              className="group flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-full glass-card border border-border/70 glow-green-sm hover:border-primary/40 transition-colors"
            >
              <span className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </span>
              <span className="text-sm text-foreground/90">
                ¿Tu negocio tiene oportunidades ocultas?
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                {CTA_PRIMARY_SHORT}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom bar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden fixed bottom-3 left-3 right-3 z-40"
          >
            <button
              type="button"
              onClick={handleClick}
              className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-[0_10px_30px_rgba(57,255,136,0.25)] glow-green-sm"
            >
              {CTA_PRIMARY_SHORT}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
