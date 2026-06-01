"use client"

import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { BETA_PRICE, RECOVERY_PRICE, CTA_PRIMARY } from "@/lib/constants"
import { useAuditModal } from "@/components/audit/audit-modal-context"
import { WordReveal } from "@/components/effects/word-reveal"
import { MagneticButton } from "@/components/effects/magnetic-button"

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
            className="text-3xl sm:text-4xl lg:text-[3rem] mb-4"
            style={{ paddingBottom: "0.18em" }}
          >
            <WordReveal
              as="span"
              text="Una sola cita recuperada"
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
              text="puede justificar KAIRO."
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
          <p className="text-muted-foreground text-base leading-relaxed">
            El precio no es el centro de la decisión. La auditoría te muestra primero si KAIRO aplica
            para tu negocio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-card card-premium rounded-3xl p-8 sm:p-10 lg:p-12 glow-green relative overflow-hidden max-w-3xl mx-auto"
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

            <MagneticButton onClick={() => open("pricing")} ariaLabel={CTA_PRIMARY}>
              {CTA_PRIMARY}
            </MagneticButton>

            <p className="text-xs text-muted-foreground mt-4">
              Acceso anticipado para las primeros negocios. 3 días de uso guiado si tu negocio
              califica tras la auditoría.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
