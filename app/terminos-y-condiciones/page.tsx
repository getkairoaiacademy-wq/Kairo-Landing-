import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y Condiciones de KAIRO TECHNOLOGIES S.A.C. — sistema de recuperación de ingresos para negocios que atienden por WhatsApp.",
  alternates: { canonical: "https://getkairo.lat/terminos-y-condiciones" },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = "Junio 2026"
const LEGAL_EMAIL = "getkairoaiacademy@gmail.com"
const ENTITY = "KAIRO TECHNOLOGIES S.A.C."
const JURISDICTION = "Lima, Perú"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al inicio
        </Link>

        <header className="mb-10">
          <p className="text-[10px] uppercase tracking-[0.18em] text-primary mb-3">Legal</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Términos y Condiciones
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">
            Última actualización: {LAST_UPDATED} · {ENTITY} · {JURISDICTION}
          </p>
        </header>

        <nav aria-label="Índice" className="mb-10 rounded-2xl border border-border/60 bg-card/40 p-5">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-3">Contenido</p>
          <ol className="space-y-1.5 text-sm">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-foreground/80 hover:text-primary transition-colors">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="prose prose-invert max-w-none text-[15px] leading-relaxed text-foreground/85 space-y-10">
          {SECTIONS.map((s, i) => (
            <Section key={s.id} id={s.id} number={i + 1} title={s.title}>
              {s.content}
            </Section>
          ))}
        </article>

        <footer className="mt-16 border-t border-border/60 pt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al inicio
          </Link>
          <Link href="/politica-de-privacidad" className="text-xs text-primary hover:opacity-80">
            Ver Política de Privacidad →
          </Link>
        </footer>
      </div>
    </main>
  )
}

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-3">
        <span className="text-primary mr-2">{number}.</span>
        {title}
      </h2>
      <div className="space-y-3 text-foreground/80">{children}</div>
    </section>
  )
}

const SECTIONS: { id: string; title: string; content: React.ReactNode }[] = [
  {
    id: "identificacion",
    title: "Identificación del titular",
    content: (
      <p>
        El presente sitio web y el servicio KAIRO son operados por <strong>{ENTITY}</strong>, empresa constituida en
        Perú con domicilio en {JURISDICTION}. Canal oficial de contacto legal: {LEGAL_EMAIL}.
      </p>
    ),
  },
  {
    id: "aceptacion",
    title: "Aceptación de los términos",
    content: (
      <p>
        Al usar este sitio, completar un formulario, agendar una demo o contratar el servicio, declaras haber leído y
        aceptado de forma libre, expresa e informada estos Términos y Condiciones, así como la Política de Privacidad.
        Si no estás de acuerdo, debes abstenerte de usar el servicio.
      </p>
    ),
  },
  {
    id: "objeto",
    title: "Objeto del servicio",
    content: (
      <p>
        KAIRO es un sistema SaaS que utiliza inteligencia artificial sobre datos del propio negocio para identificar
        oportunidades comerciales: cotizaciones abiertas, clientes a reactivar, conversaciones perdidas y campañas
        sugeridas. KAIRO entrega análisis, estimaciones y recomendaciones, no ejecuta ventas por sí mismo.
      </p>
    ),
  },
  {
    id: "capacidad",
    title: "Capacidad legal",
    content: (
      <p>
        Para contratar KAIRO debes ser mayor de 18 años con capacidad para obligarte y, si contratas a nombre de una
        persona jurídica, contar con poder suficiente para representarla.
      </p>
    ),
  },
  {
    id: "registro",
    title: "Registro y veracidad de datos",
    content: (
      <p>
        Te comprometes a proporcionar información veraz, completa y actualizada en formularios, auditorías y
        agendamientos. La entrega de datos falsos o de terceros sin autorización es responsabilidad exclusiva del
        usuario.
      </p>
    ),
  },
  {
    id: "auditoria-gratuita",
    title: "Auditoría gratuita",
    content: (
      <p>
        La auditoría comercial gratuita ofrecida en este sitio es de carácter informativo. Los números y oportunidades
        mostrados son estimaciones basadas en patrones del sector y en los datos compartidos voluntariamente. No
        constituyen una promesa de ingresos futuros.
      </p>
    ),
  },
  {
    id: "prueba-gratuita",
    title: "Prueba gratuita de 3 días",
    content: (
      <p>
        KAIRO puede ofrecer una <strong>prueba gratuita de 3 (tres) días</strong> sobre el servicio activo. Durante ese
        período tienes acceso a las funcionalidades habilitadas para la prueba. Al término de los 3 días, si no
        cancelas y has contratado el servicio, se activa el cobro acordado conforme al plan elegido.
      </p>
    ),
  },
  {
    id: "modelo-pago",
    title: "Modelo de pago",
    content: (
      <p>
        Salvo indicación expresa en una oferta puntual, KAIRO opera bajo un modelo de <strong>pago único (one-time)
        </strong> por la implementación contratada. No se trata de una suscripción de cobro recurrente automático,
        salvo que el usuario elija expresamente un plan recurrente y lo autorice.
      </p>
    ),
  },
  {
    id: "no-reembolso",
    title: "Política de no reembolso",
    content: (
      <p>
        Una vez confirmado el pago e iniciada la implementación del servicio, los montos abonados no son
        reembolsables, <em>salvo disposición legal aplicable</em> o defecto comprobado e imputable a KAIRO. La prueba
        gratuita de 3 días existe precisamente para validar el servicio antes del pago.
      </p>
    ),
  },
  {
    id: "facturacion",
    title: "Facturación e impuestos",
    content: (
      <p>
        Los precios anunciados pueden o no incluir tributos según el país del cliente. KAIRO emite el comprobante
        correspondiente (factura o boleta) conforme a la normativa peruana. El cliente es responsable de cualquier
        retención o tributo aplicable en su jurisdicción.
      </p>
    ),
  },
  {
    id: "ia-limitaciones",
    title: "Limitaciones de la inteligencia artificial",
    content: (
      <>
        <p>
          KAIRO utiliza modelos de IA que pueden producir resultados imprecisos, incompletos o sesgados. Las
          recomendaciones son orientativas y deben ser revisadas por una persona del equipo del negocio antes de
          ejecutarse comercialmente.
        </p>
        <p>
          KAIRO no garantiza ingresos específicos, conversiones, citas, ventas o cualquier resultado económico
          puntual. Los resultados dependen del seguimiento, equipo y contexto comercial de cada negocio.
        </p>
      </>
    ),
  },
  {
    id: "whatsapp-responsabilidad",
    title: "Uso de WhatsApp y mensajería",
    content: (
      <>
        <p>
          El usuario es responsable de cumplir las políticas de WhatsApp Business, Meta y la normativa de protección
          al consumidor al utilizar campañas, plantillas, automatizaciones o mensajes generados a partir de las
          recomendaciones de KAIRO.
        </p>
        <p>
          Está prohibido usar KAIRO para spam, mensajes no solicitados sin consentimiento, suplantación de identidad o
          contenido ilegal. KAIRO podrá suspender el servicio ante usos abusivos.
        </p>
      </>
    ),
  },
  {
    id: "uso-aceptable",
    title: "Uso aceptable",
    content: (
      <>
        <p>El usuario se compromete a no:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Realizar ingeniería inversa, descompilar o intentar acceder al código fuente.</li>
          <li>Revender, sublicenciar o ceder el acceso al servicio sin autorización escrita.</li>
          <li>Sobrecargar la infraestructura mediante scraping, bots o ataques.</li>
          <li>Usar el servicio para fines ilegales o contrarios a la moral y buenas costumbres.</li>
        </ul>
      </>
    ),
  },
  {
    id: "propiedad-intelectual",
    title: "Propiedad intelectual",
    content: (
      <p>
        El software, marca, logotipos, contenido del sitio, modelos, prompts internos y materiales de marketing son
        propiedad de {ENTITY} o de sus licenciantes. El acceso al servicio no implica cesión de derechos de propiedad
        intelectual, salvo la licencia de uso limitada y revocable concedida durante la vigencia del contrato.
      </p>
    ),
  },
  {
    id: "datos-cliente",
    title: "Datos del cliente",
    content: (
      <p>
        Los datos cargados por el cliente en KAIRO son y siguen siendo de propiedad del cliente. KAIRO actúa como
        encargado de tratamiento conforme a la Política de Privacidad. Tras la terminación del contrato y luego del
        plazo de retención técnico, los datos podrán ser eliminados o devueltos a solicitud.
      </p>
    ),
  },
  {
    id: "disponibilidad",
    title: "Disponibilidad del servicio",
    content: (
      <p>
        KAIRO se entrega bajo el principio de <em>mejores esfuerzos</em> (best-effort). Pueden existir interrupciones
        por mantenimiento, fallos de proveedores (hosting, base de datos, modelos de IA) o causas de fuerza mayor.
        KAIRO no garantiza disponibilidad ininterrumpida ni asume responsabilidad por lucro cesante derivado de
        ventanas de indisponibilidad.
      </p>
    ),
  },
  {
    id: "responsabilidad",
    title: "Limitación de responsabilidad",
    content: (
      <p>
        En la máxima medida permitida por ley, la responsabilidad total de KAIRO frente al cliente por cualquier
        reclamo asociado al servicio se limita al monto efectivamente pagado por el cliente en los últimos 12 meses.
        KAIRO no responde por daños indirectos, lucro cesante, pérdida de datos no atribuible a su culpa, ni por
        decisiones comerciales del cliente basadas en las recomendaciones.
      </p>
    ),
  },
  {
    id: "indemnidad",
    title: "Indemnidad",
    content: (
      <p>
        El cliente mantendrá indemne a KAIRO frente a cualquier reclamo de terceros derivado del uso indebido del
        servicio, del incumplimiento de estos términos o de la normativa aplicable (incluida la de protección de
        datos y mensajería).
      </p>
    ),
  },
  {
    id: "terminacion",
    title: "Terminación",
    content: (
      <p>
        KAIRO podrá suspender o terminar el acceso del cliente, sin reembolso, en casos de incumplimiento grave,
        fraude, abuso, riesgo legal o reputacional. El cliente puede dejar de usar el servicio en cualquier momento,
        sin que ello dé derecho a reembolso de pagos únicos ya ejecutados.
      </p>
    ),
  },
  {
    id: "modificaciones",
    title: "Modificaciones del servicio y de estos términos",
    content: (
      <p>
        KAIRO podrá actualizar funcionalidades, planes y estos Términos. Los cambios materiales serán comunicados con
        antelación razonable por los canales de contacto registrados. El uso continuado del servicio implica la
        aceptación de la nueva versión.
      </p>
    ),
  },
  {
    id: "ley-aplicable",
    title: "Ley aplicable y jurisdicción",
    content: (
      <p>
        Estos Términos se rigen por las leyes de la República del Perú. Cualquier controversia será sometida
        previamente a un intento de negociación de buena fe y, en su defecto, a los tribunales competentes de{" "}
        {JURISDICTION}, renunciando las partes a cualquier otro fuero que pudiera corresponderles.
      </p>
    ),
  },
  {
    id: "comunicaciones",
    title: "Comunicaciones",
    content: (
      <p>
        Las comunicaciones oficiales se realizarán al correo registrado por el usuario. Toda notificación a KAIRO
        deberá dirigirse a {LEGAL_EMAIL}.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "Contacto",
    content: (
      <p>
        Para cualquier consulta sobre estos Términos y Condiciones escríbenos a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`} className="text-primary hover:opacity-80 underline">
          {LEGAL_EMAIL}
        </a>
        . Razón social: {ENTITY}. Jurisdicción: {JURISDICTION}.
      </p>
    ),
  },
]
