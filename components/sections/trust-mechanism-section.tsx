"use client"

import { motion } from "framer-motion"
import { Phone, Upload, Sparkles, ShieldCheck } from "lucide-react"

const steps = [
  {
    icon: Phone,
    title: "Agendas una llamada breve",
    body: "Te explicamos qué tipo de datos puede analizar KAIRO y resolvemos tus dudas antes de iniciar.",
  },
  {
    icon: Upload,
    title: "Compartes solo la información necesaria",
    body: "Puedes trabajar con contactos, chats exportados o una base comercial. Tú decides qué compartir y cómo avanzar.",
  },
  {
    icon: Sparkles,
    title: "Recibes oportunidades accionables",
    body: "KAIRO organiza la información y muestra contactos prioritarios, campañas recomendadas y mensajes sugeridos para revisar.",
  },
]

export function TrustMechanismSection() {
  return (
    <section className="px-6 py-24 lg:py-32 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight tracking-tight text-foreground mb-4">
            Un diagnóstico guiado, con control de tu clínica.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            KAIRO trabaja con la información que tu clínica decide compartir. El objetivo no es invadir
            tus conversaciones, sino ayudarte a encontrar oportunidades comerciales que ya existen.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group relative"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display text-2xl text-muted-foreground/40 leading-none">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-2.5 text-xs text-muted-foreground"
        >
          <ShieldCheck className="w-4 h-4 text-primary/80" />
          <span>
            KAIRO no envía mensajes sin aprobación. Tu equipo mantiene el control del seguimiento.
          </span>
        </motion.div>
      </div>
    </section>
  )
}
