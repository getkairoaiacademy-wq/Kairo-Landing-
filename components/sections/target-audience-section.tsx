"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

const forYou = [
  "Clínicas que atienden por WhatsApp.",
  "Clínicas con base de contactos o pacientes antiguos.",
  "Clínicas con tratamientos de ticket medio o alto.",
  "Clínicas con cotizaciones pendientes.",
  "Clínicas con equipo de recepción o ventas.",
  "Clínicas que quieren recuperar antes de invertir más en anuncios.",
]

const notForYou = [
  "Clínicas sin base de contactos.",
  "Clínicas que no atienden por WhatsApp.",
  "Negocios que quieren hacer spam masivo.",
  "Clínicas que buscan ingresos garantizados sin seguimiento.",
  "Equipos que no quieren accionar campañas ni registrar resultados.",
]

export function TargetAudienceSection() {
  return (
    <section className="px-6 py-24 lg:py-32 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight tracking-tight text-foreground mb-4">
            KAIRO funciona mejor cuando tu clínica ya tiene{" "}
            <span className="text-gradient-green">oportunidades por recuperar.</span>
          </h2>
          <p className="text-muted-foreground text-base">
            Si te identificas con la izquierda, la auditoría tiene sentido. Si caes en la derecha,
            ahorra tu tiempo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-7 border-primary/20"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Para quién es</h3>
            </div>
            <ul className="space-y-3">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground/90 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-2xl p-7"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Para quién no es
              </h3>
            </div>
            <ul className="space-y-3">
              {notForYou.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 glass-card-green rounded-2xl p-6 text-center max-w-3xl mx-auto"
        >
          <p className="font-heading text-lg text-foreground mb-2">
            Si no vemos oportunidades claras, te lo decimos.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La auditoría sirve para saber si KAIRO realmente puede ayudarte. Si tu clínica todavía no
            tiene suficiente base, volumen o información para generar un diagnóstico útil, te lo
            diremos directamente.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
