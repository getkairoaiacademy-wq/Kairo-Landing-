"use client"

import { motion } from "framer-motion"
import { Check, Sparkles, ArrowRight } from "lucide-react"
import { BETA_PRICE, RECOVERY_PRICE, CTA_PRIMARY } from "@/lib/constants"
import { useAuditModal } from "@/components/audit/audit-modal-context"

const includes = [
  "Auditoría inicial de ingresos ocultos",
  "Base Maestra organizada y priorizada",
  "Campañas recomendadas con razonamiento",
  "Contactos priorizados por temperatura",
  "Mensajes sugeridos para revisar y enviar",
  "Reportes de recuperación semanales",
  "KAIRO Academy (guías de uso)",
  "Soporte inicial de implementación",
]

export function PricingSection() {
  const { open } = useAuditModal()
  return (
    <section id="precio" className="px-6 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-green opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
              Beta privada abierta
            </span>
          </div>
          <h2
            className="font-display italic text-3xl sm:text-4xl lg:text-[2.85rem] leading-[1.1] tracking-tight text-foreground mb-4"
            style={{ paddingBottom: "0.15em" }}
          >
            Una sola cita recuperada{" "}
            <span className="text-gradient-green">puede justificar KAIRO.</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            El precio no es el centro de la decisión. La auditoría te muestra primero si KAIRO aplica
            para tu clínica.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 sm:p-10 lg:p-12 glow-green relative overflow-hidden max-w-3xl mx-auto"
        >
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                  Plan Recovery · Beta privada
                </p>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-body font-bold text-5xl sm:text-6xl text-foreground leading-none tabular-nums tracking-tight">
                    {BETA_PRICE}
                  </span>
                  <span className="text-muted-foreground text-sm">/mes</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Plan completo desde{" "}
                  <span className="text-foreground font-medium">{RECOVERY_PRICE}/mes</span> al cerrar
                  beta.
                </p>
              </div>
              <span className="self-start sm:self-end px-3 py-1.5 rounded-full bg-primary/15 text-primary text-[11px] font-semibold uppercase tracking-wide">
                Cupos limitados
              </span>
            </div>

            <div className="h-px bg-border/60 my-8" />

            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {includes.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="flex items-start gap-2.5"
                >
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground/90">{item}</span>
                </motion.li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => open("pricing")}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-95 transition-all duration-300 glow-green hover:scale-[1.02]"
            >
              {CTA_PRIMARY}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-xs text-muted-foreground mt-4">
              Acceso anticipado para las primeras clínicas. 3 días de uso guiado si tu clínica
              califica tras la auditoría.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
