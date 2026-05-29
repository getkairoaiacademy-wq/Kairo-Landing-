"use client"

import { motion, useInView, useMotionValue, animate } from "framer-motion"
import { useEffect, useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { CTA_PRIMARY } from "@/lib/constants"
import { useAuditModal } from "@/components/audit/audit-modal-context"

const metrics = [
  { value: 240, label: "Contactos analizados", suffix: "" },
  { value: 38, label: "Oportunidades detectadas", suffix: "" },
  { value: 11, label: "Cotizaciones pendientes", suffix: "" },
  { value: 9, label: "Pacientes antiguos recuperables", suffix: "" },
  { value: 6, label: "Objeciones por precio", suffix: "" },
  { value: 3, label: "Campañas recomendadas", suffix: "" },
]

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const mv = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v).toLocaleString()}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, to, suffix, mv])

  return <span ref={ref}>0{suffix}</span>
}

export function DiagnosisExampleSection() {
  const { open } = useAuditModal()
  return (
    <section id="aha" className="px-6 py-24 lg:py-32 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card mb-5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
              Ejemplo de diagnóstico
            </span>
          </div>
          <h2
            className="font-display italic text-3xl sm:text-4xl lg:text-[2.85rem] leading-[1.1] tracking-tight text-foreground mb-4"
            style={{ paddingBottom: "0.15em" }}
          >
            Lo que KAIRO puede revelar en una{" "}
            <span className="text-gradient-green">base desordenada</span>.
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Así se vería el primer reporte que recibe una clínica después de la auditoría inicial.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12 glow-green relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-3">
                Ingreso recuperable estimado
              </p>
              <p className="font-mono text-6xl sm:text-7xl lg:text-[5.5rem] font-semibold text-primary leading-none tracking-tight tabular-nums">
                S/<CountUp to={18420} />
              </p>
              <p className="text-sm text-muted-foreground mt-4 max-w-md leading-relaxed">
                Estimación basada en valor promedio de los tratamientos en cola y tasa típica de
                recuperación con seguimiento contextual.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  className="glass-card-green rounded-xl p-4"
                >
                  <p className="font-mono text-3xl font-semibold text-foreground leading-none tabular-nums">
                    <CountUp to={m.value} />
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-snug">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2"
        >
          <p className="text-xs text-muted-foreground max-w-xl">
            Ejemplo demo basado en una clínica ficticia. Los resultados reales dependen de la calidad
            de la base, ticket promedio y ejecución del seguimiento.
          </p>
          <button
            type="button"
            onClick={() => open("diagnosis_example")}
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            {CTA_PRIMARY}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
