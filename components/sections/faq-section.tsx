"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "¿Tengo que dar acceso a mi WhatsApp?",
    a: "No como primer paso. KAIRO puede trabajar con información que tu clínica decide compartir, como contactos, chats exportados o bases comerciales. La llamada inicial sirve para explicarte el proceso y definir qué datos usar.",
  },
  {
    q: "¿KAIRO envía mensajes automáticamente?",
    a: "No al inicio. KAIRO sugiere campañas y mensajes, pero tu equipo revisa, aprueba y ejecuta el seguimiento.",
  },
  {
    q: "¿Qué pasa en la auditoría gratuita?",
    a: "Revisamos si tu clínica tiene oportunidades comerciales recuperables, te mostramos cómo funciona KAIRO y definimos si aplica una prueba guiada de 3 días.",
  },
  {
    q: "¿La prueba gratuita de 3 días es para todos?",
    a: "No necesariamente. La activamos si tu clínica tiene suficiente información para generar un diagnóstico útil.",
  },
  {
    q: "¿KAIRO garantiza ingresos?",
    a: "No. KAIRO identifica oportunidades y estima potencial recuperable. Los resultados dependen de la calidad de la base, ticket promedio y ejecución del seguimiento.",
  },
  {
    q: "¿Qué datos necesito para empezar?",
    a: "Puedes empezar con contactos, chats exportados, servicios principales, precios aproximados y horarios de atención.",
  },
  {
    q: "¿Funciona solo para clínicas dentales?",
    a: "No. Funciona para clínicas dentales, estéticas, dermatológicas, medicina estética, ortodoncia, implantes, carillas, depilación láser y tratamientos de alto valor atendidos por WhatsApp.",
  },
  {
    q: "¿Qué pasa si mi base está desordenada?",
    a: "Justamente ese es el punto. KAIRO está diseñado para convertir datos desordenados en una Base Maestra comercial priorizada.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="px-6 py-24 lg:py-32 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-tight tracking-tight text-foreground mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-muted-foreground text-base">
            Las dudas más comunes antes de agendar la auditoría.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-2 sm:p-4"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, idx) => (
              <AccordionItem
                key={f.q}
                value={`item-${idx}`}
                className="border-b border-border/40 last:border-none px-4"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-medium text-foreground hover:text-primary hover:no-underline py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 pr-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
