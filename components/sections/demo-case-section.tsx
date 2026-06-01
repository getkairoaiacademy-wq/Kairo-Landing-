"use client"

import { motion } from "framer-motion"
import { MessageCircle, ArrowRight } from "lucide-react"
import { WordReveal } from "@/components/effects/word-reveal"

const cases = [
  {
    scenario:
      "Cliente pidió cotización de un departamento, recibió el precio, dijo que lo pensaría y nunca fue contactado de nuevo.",
    service: "Cotización inmobiliaria",
    temperature: "Tibio",
    objection: "Precio / decisión pendiente",
    nextStep: "Seguimiento consultivo",
    message:
      "Hola, Lucía. Vi que habías consultado por el departamento en San Isidro. Si todavía lo estás evaluando, puedo enviarte opciones de financiamiento y resolver dudas antes de decidir. ¿Te paso disponibilidad para una visita?",
  },
  {
    scenario:
      "Lead pidió presupuesto de un programa hace 3 semanas, recibió respuesta y la conversación quedó abierta sin cierre.",
    service: "Programa / matrícula",
    temperature: "Caliente",
    objection: "Comparando con otra opción",
    nextStep: "Reactivación con caso comparativo",
    message:
      "Hola, Andrés. Hace unas semanas conversamos sobre el programa. ¿Avanzaste con alguna decisión? Si aún sigues evaluando, puedo enviarte un par de casos de alumnos similares para que veas resultados reales.",
  },
  {
    scenario:
      "Cliente antiguo, hace 9 meses hizo su última compra. Nunca recibió recordatorio de seguimiento ni una nueva propuesta.",
    service: "Reactivación cliente antiguo",
    temperature: "Frío warm-up",
    objection: "Sin contacto reciente",
    nextStep: "Mensaje de bienvenida + oferta",
    message:
      "Hola, Rosa. Ya pasó un tiempo desde tu última compra con nosotros. Tenemos algo que creo que te va a interesar. ¿Te gustaría que te dé prioridad como cliente recurrente este mes?",
  },
]

export function DemoCaseSection() {
  return (
    <section className="px-6 py-24 lg:py-32 relative">
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
              text="Así se ve una oportunidad recuperable"
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
              text="dentro de KAIRO."
              whenInView
              stagger={0.08}
              delay={0.24}
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
          <p className="text-muted-foreground text-base leading-relaxed">
            Tres ejemplos del tipo de casos que aparecen cada semana en un negocio activo.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          {cases.map((c, idx) => (
            <motion.article
              key={c.service}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card card-premium rounded-2xl p-6 flex flex-col"
            >
              <p className="text-xs text-muted-foreground leading-relaxed mb-5 italic border-l-2 border-primary/40 pl-3">
                "{c.scenario}"
              </p>

              <dl className="space-y-2.5 mb-5">
                <Detail label="Servicio" value={c.service} />
                <Detail label="Temperatura" value={c.temperature} accent />
                <Detail label="Objeción" value={c.objection} />
                <Detail label="Próximo paso" value={c.nextStep} />
              </dl>

              <div className="glass-card-green rounded-xl p-3.5 mt-auto">
                <div className="flex items-center gap-1.5 mb-2">
                  <MessageCircle className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Mensaje sugerido
                  </span>
                </div>
                <p className="text-[12.5px] text-foreground/90 leading-relaxed">{c.message}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-xs text-muted-foreground text-center mt-8 max-w-xl mx-auto"
        >
          Casos demo basados en escenarios reales recurrentes en negocios con ventas de ticket
          medio a alto. Los nombres son ficticios.
        </motion.p>
      </div>
    </section>
  )
}

function Detail({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[10px] uppercase tracking-wide text-muted-foreground shrink-0">{label}</dt>
      <dd className={`text-xs font-medium text-right ${accent ? "text-primary" : "text-foreground"}`}>
        {value}
      </dd>
    </div>
  )
}
