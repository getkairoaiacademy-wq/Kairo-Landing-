"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { CTA_PRIMARY_SHORT } from "@/lib/constants"
import { useAuditModal } from "@/components/audit/audit-modal-context"

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false)
  const { open } = useAuditModal()

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="lg:hidden fixed bottom-4 left-4 right-4 z-40"
        >
          <button
            type="button"
            onClick={() => open("sticky-mobile")}
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-[0_10px_30px_rgba(57,255,136,0.25)] glow-green-sm"
          >
            {CTA_PRIMARY_SHORT}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
