"use client"

import { motion } from "framer-motion"
import { FileText, MessageSquare, UserCheck, CalendarX, TrendingUp, Crown } from "lucide-react"

const detections = [
  {
    icon: FileText,
    title: "Cotizaciones pendientes",
    body: "Personas que recibieron precio o propuesta, pero nunca cerraron.",
  },
  {
    icon: MessageSquare,
    title: "Consultas perdidas",
    body: "Leads que preguntaron por un tratamiento y quedaron sin seguimiento.",
  },
  {
    icon: UserCheck,
    title: "Pacientes antiguos",
    body: "Personas que ya confiaron en la clínica y podrían volver.",
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
    title: "Tratamientos de alto valor",
    body: "Interesados en implantes, carillas, ortodoncia, estética facial o paquetes premium.",
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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight tracking-tight text-foreground mb-4">
            KAIRO encuentra oportunidades que tu equipo{" "}
            <span className="text-gradient-green">no debería revisar una por una.</span>
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
              className="glass-card rounded-2xl p-6 hover:border-primary/30 hover:translate-y-[-2px] transition-all duration-300 group"
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
