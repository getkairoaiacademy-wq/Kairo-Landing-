"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, DollarSign, MessageCircle, TrendingUp, Megaphone, Users } from "lucide-react"
import { CTA_PRIMARY, trackEvent } from "@/lib/constants"
import { useAuditModal } from "@/components/audit/audit-modal-context"

export function HeroSection() {
  const { open } = useAuditModal()
  const handlePrimary = () => open("hero")
  const handleSecondary = () => trackEvent("landing_hero_secondary_click")

  return (
    <section className="min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-24 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-green opacity-60" />
      <motion.div
        className="absolute top-1/3 left-1/4 w-[460px] h-[460px] bg-primary opacity-[0.035] blur-[140px] rounded-full"
        animate={{ scale: [1, 1.07, 1], x: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-primary opacity-[0.025] blur-[160px] rounded-full"
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] tracking-wide uppercase text-muted-foreground font-medium">
                Exclusivo para clínicas que atienden por WhatsApp
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display text-[2.6rem] sm:text-5xl lg:text-[3.75rem] leading-[1.08] tracking-tight text-foreground mb-5"
              style={{ paddingBottom: "0.15em" }}
            >
              <span className="italic font-normal">Tu clínica ya tiene pacientes</span>{" "}
              <span className="text-gradient-green italic font-normal">listos para volver.</span>
              <br />
              <span className="font-body font-bold tracking-tight">KAIRO los encuentra.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Detecta consultas perdidas, cotizaciones pendientes y pacientes antiguos con potencial de
              volver. Agenda una{" "}
              <span className="text-foreground font-medium">Auditoría Gratuita de Ingresos Ocultos</span>{" "}
              y revisamos a quién contactar, por qué y qué mensaje enviar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-5"
            >
              <button
                type="button"
                onClick={handlePrimary}
                className="group px-7 py-3.5 text-base rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-95 transition-all duration-300 glow-green hover:scale-[1.02] inline-flex items-center gap-2"
              >
                {CTA_PRIMARY}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <Link
                href="#como-funciona"
                onClick={handleSecondary}
                className="group flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Ver cómo funciona</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs text-muted-foreground/80 text-center lg:text-left max-w-md mx-auto lg:mx-0"
            >
              Llamada guiada + 3 días de acceso gratuito si tu clínica califica. Sin automatización masiva.
              Sin mensajes sin aprobación.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="glass-card rounded-2xl p-6 glow-green relative">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                      Ingreso recuperable estimado
                    </p>
                    <p className="font-mono text-4xl font-semibold text-primary leading-none tabular-nums tracking-tight">
                      S/ 18,420
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1.5">
                      Sobre 240 contactos analizados
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  <MetricMini icon={<TrendingUp className="w-3.5 h-3.5 text-primary" />} value="38" label="Oportunidades" />
                  <MetricMini icon={<Users className="w-3.5 h-3.5 text-primary" />} value="11" label="Cotizaciones" />
                  <MetricMini icon={<Megaphone className="w-3.5 h-3.5 text-primary" />} value="3" label="Campañas" />
                </div>

                <div className="glass-card-green rounded-xl p-3 mb-3">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-2">
                    Prioridad esta semana
                  </p>
                  <div className="space-y-2">
                    <PriorityRow initials="ML" name="María L." service="Diseño de sonrisa · S/ 1,800" tag="CALIENTE" tagColor="text-primary" />
                    <PriorityRow initials="CR" name="Carlos R." service="Ortodoncia · S/ 3,200" tag="TIBIO" tagColor="text-yellow-500" />
                  </div>
                </div>

                <div className="glass-card rounded-xl p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MessageCircle className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                      Mensaje sugerido · pendiente aprobación
                    </span>
                  </div>
                  <p className="text-xs text-foreground/90 leading-relaxed">
                    Hola, María. Vi que habías consultado por diseño de sonrisa. ¿Te ayudamos a resolver
                    dudas antes de decidir?
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -top-4 -right-4 glass-card-green rounded-full px-3 py-1.5 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-medium text-foreground">Diagnóstico en vivo</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MetricMini({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass-card rounded-lg p-2.5 text-center">
      <div className="flex items-center justify-center mb-1">{icon}</div>
      <p className="font-mono text-lg font-semibold text-foreground leading-none tabular-nums">{value}</p>
      <p className="text-[10px] text-muted-foreground mt-1">{label}</p>
    </div>
  )
}

function PriorityRow({
  initials,
  name,
  service,
  tag,
  tagColor,
}: {
  initials: string
  name: string
  service: string
  tag: string
  tagColor: string
}) {
  return (
    <div className="flex items-center justify-between bg-background/40 rounded-lg px-2.5 py-2">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-foreground/5 flex items-center justify-center">
          <span className={`text-[10px] font-semibold ${tagColor}`}>{initials}</span>
        </div>
        <div>
          <p className="text-xs font-medium text-foreground">{name}</p>
          <p className="text-[10px] text-muted-foreground">{service}</p>
        </div>
      </div>
      <span className={`text-[10px] font-medium ${tagColor}`}>{tag}</span>
    </div>
  )
}
