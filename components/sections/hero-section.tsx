"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { CTA_PRIMARY, trackEvent } from "@/lib/constants"
import { useAuditModal } from "@/components/audit/audit-modal-context"
import { MagneticButton } from "@/components/effects/magnetic-button"
import { HeroProductFilm } from "@/components/sections/hero-product-film"

const easeOut = [0.16, 1, 0.3, 1] as const

export function HeroSection() {
  const { open } = useAuditModal()
  const handlePrimary = () => open("hero")
  const handleSecondary = () => trackEvent("landing_hero_secondary_click")

  return (
    <section className="relative overflow-hidden px-6 pt-32 lg:pt-36 pb-20 lg:pb-28">
      <div aria-hidden className="absolute inset-0 hero-gradient pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] tracking-wide uppercase text-muted-foreground font-medium">
            Para negocios que venden por WhatsApp
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
          className="font-heading not-italic text-[2.6rem] leading-[1.06] sm:text-6xl sm:leading-[1.04] lg:text-[4.25rem] lg:leading-[1.02] font-extrabold tracking-[-0.03em] text-foreground text-balance"
        >
          Encuentra <span className="text-gradient-green">ingresos ocultos</span> en tu base de clientes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut, delay: 0.15 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          KAIRO analiza tus contactos, conversaciones y cotizaciones para detectar oportunidades,
          recomendar campañas y preparar mensajes listos para revisar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut, delay: 0.25 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MagneticButton onClick={handlePrimary} variant="primary" ariaLabel={CTA_PRIMARY}>
            {CTA_PRIMARY}
          </MagneticButton>
          <Link
            href="#como-funciona"
            onClick={handleSecondary}
            className="group flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-foreground/80 hover:text-foreground transition-colors"
          >
            <span>Ver cómo funciona</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-5 text-xs text-muted-foreground"
        >
          Sin mensajes automáticos sin aprobación. Tú decides qué se envía.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            “Descubrimos cotizaciones olvidadas y oportunidades que no estábamos siguiendo.”
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.3 }}
        className="relative z-10 mt-16 lg:mt-20 max-w-4xl mx-auto"
      >
        <HeroProductFilm />
      </motion.div>
    </section>
  )
}
