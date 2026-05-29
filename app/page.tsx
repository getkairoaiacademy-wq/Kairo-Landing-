import { Navbar } from "@/components/ui/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { ReviewsMarqueeSection } from "@/components/sections/reviews-marquee-section"
import { TrustMechanismSection } from "@/components/sections/trust-mechanism-section"
import { ParadigmShiftSection } from "@/components/sections/paradigm-shift-section"
import { DiagnosisExampleSection } from "@/components/sections/diagnosis-example-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { WhatKairoDetectsSection } from "@/components/sections/what-kairo-detects-section"
import { WhatClinicReceivesSection } from "@/components/sections/what-clinic-receives-section"
import { HumanControlSection } from "@/components/sections/human-control-section"
import { DemoCaseSection } from "@/components/sections/demo-case-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { TargetAudienceSection } from "@/components/sections/target-audience-section"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaSection } from "@/components/sections/cta-section"
import { FooterSection } from "@/components/sections/footer-section"
import { ContextualAuditCta } from "@/components/audit/contextual-audit-cta"
import { StickyAuditCta } from "@/components/audit/sticky-audit-cta"
import { AuditReminder60s } from "@/components/audit/audit-reminder-60s"
import { ExitIntentAuditModal } from "@/components/audit/exit-intent-audit-modal"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KAIRO",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Sistema de recuperación de ingresos para clínicas que atienden por WhatsApp. Detecta consultas perdidas, cotizaciones pendientes y pacientes con potencial de volver.",
  url: "https://getkairo.lat",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Auditoría gratuita de ingresos ocultos",
  },
  provider: {
    "@type": "Organization",
    name: "KAIRO",
    url: "https://getkairo.lat",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* 1. Hero */}
      <HeroSection />

      {/* 1.5 Reviews marquee — early social proof */}
      <ReviewsMarqueeSection />

      {/* 2. Trust mechanism */}
      <TrustMechanismSection />

      {/* 3. Paradigm shift */}
      <ParadigmShiftSection />

      {/* 4. Aha moment / diagnosis example */}
      <DiagnosisExampleSection />

      {/* Contextual CTA after diagnosis example */}
      <ContextualAuditCta
        ctaLocation="ctx_after_diagnosis"
        title="¿Quieres ver este reporte con los datos de tu clínica?"
        body="En la auditoría revisamos si tu base tiene oportunidades recuperables y te mostramos cómo KAIRO las convierte en campañas accionables."
      />

      {/* 5. How it works */}
      <HowItWorksSection />

      {/* 6. What KAIRO detects */}
      <WhatKairoDetectsSection />

      {/* 7. What clinic receives */}
      <WhatClinicReceivesSection />

      {/* 8. Human control / no spam */}
      <HumanControlSection />

      {/* Contextual CTA after human control */}
      <ContextualAuditCta
        ctaLocation="ctx_after_human_control"
        title="¿Quieres ver cómo se vería esto en tu equipo?"
        body="Te mostramos cómo KAIRO sugiere mensajes y campañas sin reemplazar el criterio de tu equipo comercial."
        benefits={["Sin automatización masiva", "Tu equipo aprueba", "Mensajes contextuales"]}
      />

      {/* 9. Social proof / demo cases */}
      <DemoCaseSection />

      {/* 10. Pricing / value anchor */}
      <PricingSection />

      {/* Contextual CTA after pricing */}
      <ContextualAuditCta
        ctaLocation="ctx_after_pricing"
        title="Antes de hablar de plan, validemos si aplica a tu clínica."
        body="La auditoría te muestra primero si KAIRO encuentra oportunidades reales. El precio se discute después."
        buttonLabel="Agendar auditoría"
        benefits={["Cupos limitados", "Sin compromiso", "Llamada guiada"]}
      />

      {/* 11. For whom / not for whom */}
      <TargetAudienceSection />

      {/* 12. FAQ */}
      <FaqSection />

      {/* Contextual CTA after FAQ */}
      <ContextualAuditCta
        ctaLocation="ctx_after_faq"
        title="¿Resolviste tus dudas? Reserva tu auditoría."
        body="Una llamada guiada para revisar si tu clínica tiene ingresos ocultos recuperables."
      />

      {/* 13. Final CTA */}
      <CtaSection />

      <FooterSection />

      {/* Lead capture reminders */}
      <StickyAuditCta />
      <AuditReminder60s />
      <ExitIntentAuditModal />
    </main>
  )
}
