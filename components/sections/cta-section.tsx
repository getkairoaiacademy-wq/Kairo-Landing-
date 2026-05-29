"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { CTA_PRIMARY } from "@/lib/constants"
import { useAuditModal } from "@/components/audit/audit-modal-context"

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
          className="font-display italic text-3xl sm:text-4xl lg:text-[3.2rem] leading-[1.12] tracking-tight text-foreground mb-5"
          style={{ paddingBottom: "0.15em" }}
        >
          Antes de buscar más pacientes,{" "}
          <span className="text-gradient-green">revisa los que ya tienes.</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
          Agenda una Auditoría Gratuita de Ingresos Ocultos y descubre si tu clínica tiene consultas,
          cotizaciones o pacientes antiguos listos para recuperar.
        </p>

        <button
          type="button"
          onClick={() => open("final_cta")}
          className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-95 transition-all duration-300 glow-green hover:scale-[1.02]"
        >
          {CTA_PRIMARY}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-xs text-muted-foreground/80 mt-6 max-w-md mx-auto">
          Llamada guiada. Sin compromiso. Sin automatización masiva. Con 3 días de acceso gratuito si
          tu clínica califica.
        </p>
      </motion.div>
    </section>
  )
}
