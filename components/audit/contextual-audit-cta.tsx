"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useAuditModal } from "./audit-modal-context"

interface Props {
  ctaLocation: string
  title?: string
  body?: string
  buttonLabel?: string
  benefits?: string[]
  className?: string
}

const DEFAULT_BENEFITS = [
  "Cotizaciones abandonadas",
  "Clientes antiguos recuperables",
  "Campañas recomendadas",
  "Mensajes sugeridos",
]

export function ContextualAuditCta({
  ctaLocation,
  title = "¿Quieres ver esto con los datos de tu negocio?",
  body = "En la auditoría revisamos si tu negocio tiene oportunidades recuperables y te mostramos cómo KAIRO las convierte en campañas.",
  buttonLabel = "Agendar auditoría gratuita",
  benefits = DEFAULT_BENEFITS,
  className = "",
}: Props) {
  const { open } = useAuditModal()

  return (
    <section className={`px-6 py-12 lg:py-14 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border border-border/60 glow-green-sm relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative grid sm:grid-cols-[1fr_auto] gap-5 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] uppercase tracking-wide font-semibold mb-2.5">
              <Sparkles className="w-3 h-3" />
              Auditoría gratuita
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-foreground leading-snug">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-xl">{body}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {benefits.map((b) => (
                <span
                  key={b}
                  className="px-2 py-0.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-[10px] font-medium"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => open(ctaLocation)}
            className="group shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition-opacity glow-green-sm"
          >
            {buttonLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </motion.div>
    </section>
  )
}
