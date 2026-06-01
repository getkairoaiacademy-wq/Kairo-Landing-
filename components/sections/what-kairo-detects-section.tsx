"use client"

import { motion } from "framer-motion"
import { FileText, MessageSquare, UserCheck, CalendarX, TrendingUp, Crown } from "lucide-react"
import { WordReveal } from "@/components/effects/word-reveal"

const detections = [
  {
    icon: FileText,
    title: "Cotizaciones pendientes",
    body: "Personas que recibieron precio o propuesta, pero nunca cerraron.",
  },
  {
    icon: MessageSquare,
    title: "Consultas perdidas",
    body: "Leads que preguntaron por un servicio o producto y quedaron sin seguimiento.",
  },
  {
    icon: UserCheck,
    title: "Clientes antiguos",
    body: "Personas que ya confiaron en tu negocio y podrían volver.",
  },
  {
    icon: CalendarX,
    title: "No-shows",
    body: "Citas perdidas que podrían reprogramarse con el mensaje correcto.",
  },
  {
    icon: TrendingUp,
    title: "Objeciones por precio",
    body: "Contactos que no dijeron que no; solo necesitaban una respuesta mejor.",
  },
  {
    icon: Crown,
    title: "Productos y servicios de alto valor",
    body: "Interesados en tus servicios premium, paquetes o productos de ticket alto.",
  },
]

export function WhatKairoDetectsSection() {
  return (
    <section id="detecta" className="px-6 py-24 lg:py-32 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[2.95rem] mb-4" style={{ paddingBottom: "0.18em" }}>
            <WordReveal
              as="span"
              text="KAIRO encuentra oportunidades"
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
              text="que tu equipo no debería revisar una por una."
              whenInView
              stagger={0.06}
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
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {detections.map((d, idx) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="glass-card card-premium rounded-2xl p-6 group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <d.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground mb-2 leading-snug">
                {d.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
