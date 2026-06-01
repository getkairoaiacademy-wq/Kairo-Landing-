"use client"

import { motion } from "framer-motion"
import { CTA_PRIMARY } from "@/lib/constants"
import { useAuditModal } from "@/components/audit/audit-modal-context"
import { WordReveal } from "@/components/effects/word-reveal"
import { MagneticButton } from "@/components/effects/magnetic-button"

export function CtaSection() {
  const { open } = useAuditModal()
  return (
    <section className="px-6 py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-green opacity-50 pointer-events-none" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary opacity-[0.04] blur-[160px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative max-w-3xl mx-auto text-center"
      >
        <h2
          className="text-3xl sm:text-4xl lg:text-[3.4rem] mb-5"
          style={{ paddingBottom: "0.2em" }}
        >
          <WordReveal
            as="span"
            text="Antes de buscar más clientes,"
            whenInView
            stagger={0.06}
            className="block"
            style={{
              fontFamily: "var(--font-macro)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
              color: "var(--foreground)",
            }}
          />
          <WordReveal
            as="span"
            text="revisa los que ya tienes."
            whenInView
            stagger={0.07}
            delay={0.22}
            className="block text-gradient-green"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
            }}
          />
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
          Agenda una Auditoría Gratuita de Ingresos Ocultos y descubre si tu negocio tiene consultas,
          cotizaciones o clientes antiguos listos para recuperar.
        </p>

        <MagneticButton onClick={() => open("final_cta")} ariaLabel={CTA_PRIMARY}>
          {CTA_PRIMARY}
        </MagneticButton>

        <p className="text-xs text-muted-foreground/80 mt-6 max-w-md mx-auto">
          Llamada guiada. Sin compromiso. Sin automatización masiva. Con 3 días de acceso gratuito si
          tu negocio califica.
        </p>
      </motion.div>
    </section>
  )
}
