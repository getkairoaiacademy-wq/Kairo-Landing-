"use client"

import { motion } from "framer-motion"
import { Database, Thermometer, Megaphone, MessageCircle, ArrowRight } from "lucide-react"

const blocks = [
  {
    icon: Database,
    title: "Base Maestra",
    body: "Contactos limpios, organizados y priorizados.",
  },
  {
    icon: Thermometer,
    title: "Temperatura comercial",
    body: "Frío, tibio o caliente según señales reales.",
  },
  {
    icon: Megaphone,
    title: "Campañas recomendadas",
    body: "Qué grupo contactar primero y por qué.",
  },
  {
    icon: MessageCircle,
    title: "Mensajes sugeridos",
    body: "Texto listo para revisar, ajustar y enviar por WhatsApp.",
  },
]

export function WhatClinicReceivesSection() {
  return (
    <section className="px-6 py-24 lg:py-32 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight tracking-tight text-foreground mb-4">
            No recibes un reporte bonito.{" "}
            <span className="text-gradient-green">Recibes próximos pasos.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          {/* Left — 4 blocks */}
          <div className="grid sm:grid-cols-2 gap-4">
            {blocks.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <b.icon className="w-[18px] h-[18px] text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-foreground mb-1.5">
                  {b.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Right — Contact card mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-6 glow-green-sm relative"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center">
                  <span className="font-semibold text-primary text-sm">VM</span>
                </div>
                <div>
                  <p className="font-heading text-base font-semibold text-foreground">Valeria M.</p>
                  <p className="text-xs text-muted-foreground">Última interacción: hace 14 días</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary text-[10px] font-semibold uppercase tracking-wide">
                Caliente
              </span>
            </div>

            <div className="space-y-3 mb-5">
              <Row label="Servicio de interés" value="Servicio de alto valor" />
              <Row label="Objeción detectada" value="Comparando precio con otra opción" />
              <Row label="Potencial estimado" value="S/ 4,800" highlight />
              <Row label="Próximo paso" value="Seguimiento consultivo en 24h" />
            </div>

            <div className="glass-card-green rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <MessageCircle className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Mensaje sugerido
                </span>
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed">
                Hola, Valeria. Vi que estabas evaluando las opciones. ¿Te ayudamos a comparar lo
                que recibiste y resolver dudas antes de decidir?
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-medium hover:opacity-90 transition-opacity flex items-center gap-1">
                  Aprobar y enviar
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button className="px-3 py-1.5 rounded-full glass-card text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                  Editar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Row({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border/40 pb-2.5 last:border-none">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className={`text-sm font-medium ${highlight ? "text-primary" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  )
}
