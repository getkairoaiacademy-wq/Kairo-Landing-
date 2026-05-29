"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Pencil, Copy, Clock, ShieldCheck } from "lucide-react"

const bullets = [
  "KAIRO no envía mensajes sin aprobación.",
  "El seguimiento es manual o supervisado.",
  "Tu equipo mantiene el control comercial.",
  "La IA sugiere mensajes, no reemplaza criterio humano.",
  "Las campañas nacen de señales reales, no de envíos masivos.",
  "El paciente recibe contexto, no mensajes genéricos.",
]

export function HumanControlSection() {
  return (
    <section id="control" className="px-6 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-green opacity-25 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
              Control humano
            </span>
          </div>
          <h2
            className="font-display italic text-3xl sm:text-4xl lg:text-[2.85rem] leading-[1.1] tracking-tight text-foreground mb-4"
            style={{ paddingBottom: "0.15em" }}
          >
            La IA prepara. <span className="text-gradient-green">Tu equipo aprueba.</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            KAIRO no está diseñado para hacer spam. Está diseñado para que tu clínica recupere
            oportunidades reales con seguimiento contextual.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 items-center">
          {/* Left — bullets */}
          <motion.ul
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {bullets.map((b, idx) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-[18px] h-[18px] text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/90 leading-relaxed">{b}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* Right — approval panel mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55 }}
            className="glass-card rounded-2xl p-6 glow-green-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Pendiente de aprobación
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Sugerido hace 2 min</span>
              </div>
            </div>

            <div className="bg-background/60 rounded-xl p-4 mb-4 border border-border/40">
              <p className="text-xs text-muted-foreground mb-2">Para: Carlos R. · Ortodoncia</p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Hola, Carlos. Vi que habías consultado por ortodoncia hace unas semanas. Si todavía
                estás evaluándolo, podemos coordinar una evaluación gratuita y resolver dudas antes
                de decidir. ¿Te paso disponibilidad?
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Aprobar
              </button>
              <button className="px-4 py-2 rounded-full glass-card text-xs text-foreground hover:bg-primary/5 transition-colors flex items-center gap-1.5">
                <Pencil className="w-3.5 h-3.5" />
                Editar
              </button>
              <button className="px-4 py-2 rounded-full glass-card text-xs text-foreground hover:bg-primary/5 transition-colors flex items-center gap-1.5">
                <Copy className="w-3.5 h-3.5" />
                Copiar
              </button>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading text-lg sm:text-xl text-foreground/90 max-w-3xl mx-auto text-center mt-14 leading-relaxed"
        >
          KAIRO no habla por tu clínica sin permiso.{" "}
          <span className="text-primary font-medium">
            Le dice a tu equipo qué oportunidad no debería dejar pasar.
          </span>
        </motion.p>
      </div>
    </section>
  )
}
