"use client"

import { motion } from "framer-motion"
import { MessageCircle, ArrowRight } from "lucide-react"

const cases = [
  {
    scenario:
      "Paciente preguntó por diseño de sonrisa, recibió precio aproximado, dijo que lo pensaría y nunca fue contactado.",
    service: "Diseño de sonrisa",
    temperature: "Tibio",
    objection: "Precio / decisión pendiente",
    nextStep: "Seguimiento consultivo",
    message:
      "Hola, Lucía. Vi que habías consultado por diseño de sonrisa. Si todavía estás evaluándolo, podemos ayudarte a comparar opciones y resolver dudas antes de decidir. ¿Te paso disponibilidad para una evaluación?",
  },
  {
    scenario:
      "Lead pidió cotización de ortodoncia invisible hace 3 semanas, recibió respuesta y la conversación quedó abierta sin cierre.",
    service: "Ortodoncia invisible",
    temperature: "Caliente",
    objection: "Comparando con otra clínica",
    nextStep: "Reactivación con caso comparativo",
    message:
      "Hola, Andrés. Hace unas semanas conversamos sobre ortodoncia invisible. ¿Avanzaste con alguna decisión? Si aún sigues evaluando, podría enviarte un par de casos similares al tuyo para que veas resultados reales.",
  },
  {
    scenario:
      "Paciente antiguo, hace 9 meses se hizo una limpieza. Nunca recibió recordatorio de seguimiento ni propuesta de tratamiento complementario.",
    service: "Reactivación paciente antiguo",
    temperature: "Frío warm-up",
    objection: "Sin contacto reciente",
    nextStep: "Mensaje de bienvenida + chequeo",
    message:
      "Hola, Rosa. Ya pasó un tiempo desde tu última limpieza. ¿Te gustaría coordinar un chequeo rápido este mes? Podemos darte prioridad de agenda como paciente recurrente.",
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
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight tracking-tight text-foreground mb-4">
            Así se ve una oportunidad recuperable{" "}
            <span className="text-gradient-green">dentro de KAIRO.</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Tres ejemplos del tipo de casos que aparecen cada semana en una clínica activa.
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
              className="glass-card rounded-2xl p-6 flex flex-col"
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
          Casos demo basados en escenarios reales recurrentes en clínicas con tratamientos de ticket
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
