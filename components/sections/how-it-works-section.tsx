"use client"

import { motion } from "framer-motion"
import { FileSpreadsheet, Database, Send } from "lucide-react"

const steps = [
  {
    icon: FileSpreadsheet,
    title: "Preparas tus datos con guía",
    body: "Te indicamos qué información usar: contactos, chats exportados, servicios y precios aproximados.",
  },
  {
    icon: Database,
    title: "KAIRO crea tu Base Maestra",
    body: "Ordena contactos, cruza conversaciones, detecta señales comerciales y clasifica cada oportunidad.",
  },
  {
    icon: Send,
    title: "Tu equipo ejecuta con control",
    body: "KAIRO recomienda campañas y mensajes. Tu equipo revisa, aprueba y envía.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="px-6 py-24 lg:py-32 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight tracking-tight text-foreground mb-4">
            De WhatsApp desordenado a{" "}
            <span className="text-gradient-green">campañas listas para accionar.</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Tres pasos. Sin trabajo administrativo pesado. Sin software por aprender.
          </p>
        </motion.div>

        <div className="relative">
          {/* Line connector — desktop */}
          <div className="hidden md:block absolute top-[2.75rem] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center md:text-left md:items-start">
                  <div className="w-[5.5rem] h-[5.5rem] rounded-2xl glass-card-green flex items-center justify-center mb-5 relative">
                    <step.icon className="w-7 h-7 text-primary" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
