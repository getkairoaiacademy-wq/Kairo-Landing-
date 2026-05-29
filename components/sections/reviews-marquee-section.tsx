"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

// Placeholders: testimonios + retratos generados por IA (GAN, xsgames.co).
// Reemplazar por testimonios y fotos reales cuando estén disponibles.
const reviews = [
  {
    quote: "Nos ayudó a ver cotizaciones que nunca habíamos vuelto a contactar.",
    name: "Dra. Valeria Rojas",
    company: "Clínica Dental Aurora",
    role: "Odontología estética",
    photo: "https://xsgames.co/randomusers/assets/avatars/female/68.jpg",
  },
  {
    quote: "Antes revisábamos WhatsApp sin prioridad. Ahora sabemos a quién escribir primero.",
    name: "Dr. Martín Salazar",
    company: "Sonrisa Lima Studio",
    role: "Clínica dental",
    photo: "https://xsgames.co/randomusers/assets/avatars/male/42.jpg",
  },
  {
    quote: "KAIRO nos hizo pensar distinto: no faltaban leads, faltaba seguimiento.",
    name: "Dra. Camila Torres",
    company: "Dermavita Estética",
    role: "Medicina estética",
    photo: "https://xsgames.co/randomusers/assets/avatars/female/24.jpg",
  },
  {
    quote: "La Base Maestra nos ordenó conversaciones que estaban completamente perdidas.",
    name: "Dr. Alonso Méndez",
    company: "Implant Center Perú",
    role: "Implantes dentales",
    photo: "https://xsgames.co/randomusers/assets/avatars/male/15.jpg",
  },
  {
    quote: "Lo más valioso fue recibir mensajes sugeridos, no solo una lista de contactos.",
    name: "Dra. Renata Castillo",
    company: "Clínica Estética Nova",
    role: "Estética facial",
    photo: "https://xsgames.co/randomusers/assets/avatars/female/53.jpg",
  },
]

function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <article
      className="shrink-0 w-[300px] sm:w-[340px] glass-card rounded-2xl p-5 mx-2.5 flex flex-col justify-between hover:border-primary/25 transition-colors duration-300"
      tabIndex={0}
    >
      <div>
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
          <Quote className="w-3.5 h-3.5 text-primary" />
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed mb-5">{r.quote}</p>
      </div>
      <div className="pt-3 border-t border-border/40 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={r.photo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover ring-1 ring-border/60 shrink-0 bg-muted"
        />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground leading-tight truncate">{r.name}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{r.company}</p>
          <p className="text-[10px] text-muted-foreground/70 mt-0.5 truncate">{r.role}</p>
        </div>
      </div>
    </article>
  )
}

export function ReviewsMarqueeSection() {
  const doubled = [...reviews, ...reviews]

  return (
    <section aria-label="Equipos clínicos usando KAIRO" className="px-6 py-20 lg:py-24 relative">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="text-center text-xs sm:text-sm uppercase tracking-[0.18em] text-muted-foreground mb-10"
        >
          Equipos clínicos que entienden el valor de recuperar antes de invertir más
        </motion.p>
      </div>

      {/* Marquee container — full bleed for elegant fade */}
      <div className="relative max-w-7xl mx-auto overflow-hidden marquee-mask">
        {/* Auto-marquee desktop (CSS animation); scroll-snap fallback for reduced-motion */}
        <div
          className="flex marquee-track motion-reduce:overflow-x-auto motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:scrollbar-hidden"
          role="list"
        >
          {doubled.map((r, idx) => (
            <div
              key={`${r.name}-${idx}`}
              role="listitem"
              aria-hidden={idx >= reviews.length ? true : undefined}
              className="motion-reduce:snap-start"
            >
              <ReviewCard r={r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
