"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WordReveal } from "@/components/effects/word-reveal"

const faqs = [
  {
    q: "¿Tengo que dar acceso a mi WhatsApp?",
    a: "No como primer paso. KAIRO puede trabajar con información que tu negocio decide compartir, como contactos, chats exportados o bases comerciales. La llamada inicial sirve para explicarte el proceso y definir qué datos usar.",
  },
  {
    q: "¿KAIRO envía mensajes automáticamente?",
    a: "No al inicio. KAIRO sugiere campañas y mensajes, pero tu equipo revisa, aprueba y ejecuta el seguimiento.",
  },
  {
    q: "¿Qué pasa en la auditoría gratuita?",
    a: "Revisamos si tu negocio tiene oportunidades comerciales recuperables, te mostramos cómo funciona KAIRO y definimos si aplica una prueba guiada de 3 días.",
  },
  {
    q: "¿La prueba gratuita de 3 días es para todos?",
    a: "No necesariamente. La activamos si tu negocio tiene suficiente información para generar un diagnóstico útil.",
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
    q: "¿Funciona solo para algún rubro específico?",
    a: "No. Funciona para cualquier negocio que venda y dé seguimiento por WhatsApp: inmobiliarias, concesionarios, restaurantes, academias, agencias, estudios jurídicos, clínicas, centros estéticos y más.",
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
          <h2 className="text-3xl sm:text-4xl lg:text-[3rem] mb-4" style={{ paddingBottom: "0.18em" }}>
            <WordReveal
              as="span"
              text="Preguntas"
              whenInView
              stagger={0.07}
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
              text="frecuentes."
              whenInView
              stagger={0.08}
              delay={0.18}
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
