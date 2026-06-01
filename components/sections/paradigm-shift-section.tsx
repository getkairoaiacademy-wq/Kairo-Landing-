"use client"

import { motion } from "framer-motion"
import { WordReveal } from "@/components/effects/word-reveal"

const situations = [
  "Preguntaron precio y nadie volvió a escribirles.",
  "Recibieron una cotización y nunca se cerró.",
  "Dijeron \"lo voy a pensar\" y quedaron enterrados en WhatsApp.",
  "Faltaron a su cita y nadie la reprogramó.",
  "Fueron clientes antiguos y nadie los volvió a contactar.",
  "Pidieron información de un servicio o producto de alto valor y no hubo seguimiento.",
]

export function ParadigmShiftSection() {
  return (
    <section className="px-6 py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-green opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-[3.1rem] mb-4"
            style={{ paddingBottom: "0.18em" }}
          >
            <WordReveal
              as="span"
              text="No estás perdiendo clientes."
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
              text="Estás perdiendo seguimiento."
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
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Muchos clientes no dijeron que no. Solo preguntaron, dudaron, pidieron precio o dejaron la
            conversación abierta.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {situations.map((s, idx) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card card-premium rounded-xl p-5 flex items-start gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" aria-hidden="true" />
              <p className="text-sm text-foreground/90 leading-relaxed">{s}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <p className="font-heading text-lg sm:text-xl text-foreground/90 max-w-2xl mx-auto">
            KAIRO convierte ese desorden en una{" "}
            <span className="text-primary font-medium">lista clara de oportunidades comerciales</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
