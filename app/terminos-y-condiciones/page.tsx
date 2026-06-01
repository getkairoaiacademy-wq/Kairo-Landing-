import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y Condiciones de uso de KAIRO — sistema de recuperación de ingresos para clínicas y negocios que venden por WhatsApp.",
  alternates: { canonical: "https://getkairo.lat/terminos-y-condiciones" },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = "1 de junio de 2026"

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
            Última actualización: {LAST_UPDATED}
          </p>
        </header>

        <div className="mb-10 rounded-2xl border border-primary/30 bg-primary/5 p-4">
          <p className="text-sm font-semibold text-primary">
            Aviso importante
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">
            KAIRO entrega análisis, estimaciones y recomendaciones comerciales. No garantiza
            ingresos, ventas, citas, pagos ni resultados específicos.
          </p>
        </div>

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
          <Link
            href="/politica-de-privacidad"
            className="text-xs text-primary hover:opacity-80 transition-opacity"
          >
            Política de Privacidad →
          </Link>
        </footer>
      </div>
    </main>
  )
}

function Section({ id, number, title, children }: { id: string; number: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight mb-3 text-foreground">
        {number}. {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

const SECTIONS: { id: string; title: string; content: React.ReactNode }[] = [
  {
    id: "identificacion",
    title: "Identificación de KAIRO",
    content: (
      <>
        <p>
          KAIRO (en adelante, "KAIRO", "nosotros" o "el Servicio") es operado por{" "}
          <strong>[RAZÓN SOCIAL — pendiente de confirmación]</strong>, con correo de contacto{" "}
          <strong>[CORREO LEGAL]</strong> y jurisdicción <strong>[PAÍS / JURISDICCIÓN]</strong>.
        </p>
      </>
    ),
  },
  {
    id: "descripcion",
    title: "Descripción del servicio",
    content: (
      <p>
        KAIRO es una plataforma SaaS de recuperación de ingresos para clínicas y negocios que venden y
        dan seguimiento por WhatsApp. Analiza contactos, conversaciones, cotizaciones pendientes y
        clientes antiguos para detectar oportunidades comerciales, generar una Base Maestra,
        clasificar leads (frío / tibio / caliente), recomendar campañas y sugerir mensajes
        personalizados.
      </p>
    ),
  },
  {
    id: "naturaleza-saas",
    title: "Naturaleza SaaS",
    content: (
      <p>
        KAIRO es un servicio en la nube prestado bajo modalidad SaaS. El acceso se realiza a través
        de internet, no se entrega licencia de software descargable, y la infraestructura, soporte y
        actualizaciones son responsabilidad de KAIRO.
      </p>
    ),
  },
  {
    id: "publico-objetivo",
    title: "Público objetivo",
    content: (
      <p>
        El Servicio está dirigido a negocios formales — principalmente clínicas dentales, estéticas,
        dermatológicas, de medicina estética, ortodoncia, depilación láser, así como otros negocios
        que gestionan ventas y seguimiento por WhatsApp. No está dirigido a consumidores finales
        ni a menores de edad.
      </p>
    ),
  },
  {
    id: "uso-permitido",
    title: "Uso permitido",
    content: (
      <>
        <p>El usuario puede utilizar KAIRO para:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Analizar y organizar contactos y conversaciones de su propio negocio.</li>
          <li>Recibir recomendaciones de campañas y mensajes.</li>
          <li>Coordinar el seguimiento comercial con su equipo.</li>
          <li>Medir resultados comerciales recuperados.</li>
        </ul>
      </>
    ),
  },
  {
    id: "uso-prohibido",
    title: "Uso prohibido",
    content: (
      <>
        <p>Queda expresamente prohibido:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Usar KAIRO para enviar spam o comunicaciones no consentidas.</li>
          <li>Cargar datos de personas sin contar con base legal o autorización.</li>
          <li>Intentar acceder a cuentas, datos o sistemas que no pertenezcan al usuario.</li>
          <li>Realizar ingeniería inversa o intentar vulnerar la seguridad del Servicio.</li>
          <li>Revender, sublicenciar o redistribuir el Servicio sin autorización escrita.</li>
          <li>Usar KAIRO para fines ilegales, fraudulentos o que afecten derechos de terceros.</li>
        </ul>
      </>
    ),
  },
  {
    id: "responsabilidad-cliente",
    title: "Responsabilidad del cliente",
    content: (
      <p>
        El cliente es responsable de la veracidad y legitimidad de los datos que carga en KAIRO,
        de contar con el consentimiento o base legal necesarios para procesar datos de sus pacientes
        o leads, y del uso que su equipo le dé a las recomendaciones generadas por la plataforma.
      </p>
    ),
  },
  {
    id: "no-garantia",
    title: "No garantía de ingresos",
    content: (
      <p className="font-medium text-foreground">
        KAIRO entrega análisis, estimaciones y recomendaciones comerciales. No garantiza ingresos,
        ventas, citas, pagos ni resultados específicos. Los resultados dependen del producto, el
        mercado, el equipo comercial y la ejecución del cliente.
      </p>
    ),
  },
  {
    id: "estimaciones",
    title: "Estimaciones de recuperación",
    content: (
      <p>
        Las cifras de "ingresos recuperables", "oportunidades detectadas" y similares son
        estimaciones basadas en los datos cargados y en heurísticas del producto. No constituyen
        promesa de pago, facturación ni cierre comercial.
      </p>
    ),
  },
  {
    id: "ia",
    title: "Limitaciones de la IA",
    content: (
      <p>
        KAIRO usa modelos de inteligencia artificial para clasificar contactos, detectar señales y
        sugerir mensajes. La IA puede equivocarse o producir resultados imprecisos. Las decisiones
        comerciales finales son responsabilidad del equipo humano del cliente.
      </p>
    ),
  },
  {
    id: "prueba-demo",
    title: "Demo y prueba gratuita",
    content: (
      <p>
        La auditoría / demo gratuita es una sesión de revisión sin compromiso. La duración, el alcance
        y los términos de cualquier prueba gratuita posterior se comunican durante esa sesión y
        pueden variar.
      </p>
    ),
  },
  {
    id: "planes",
    title: "Planes y pagos",
    content: (
      <p>
        Cuando aplique, los planes, precios, formas de pago y políticas de facturación se acuerdan
        por escrito con cada cliente o se publican en una sección dedicada del sitio. Esta landing
        no constituye una oferta vinculante de planes hasta que el cliente y KAIRO firmen un acuerdo
        o acepten expresamente los términos comerciales del plan.
      </p>
    ),
  },
  {
    id: "propiedad-intelectual",
    title: "Propiedad intelectual",
    content: (
      <p>
        El Servicio, su marca, su código y sus contenidos son propiedad de KAIRO. El cliente
        conserva la propiedad de los datos que carga. KAIRO recibe una licencia limitada para
        procesar esos datos exclusivamente con el fin de prestar el Servicio.
      </p>
    ),
  },
  {
    id: "privacidad",
    title: "Privacidad y datos",
    content: (
      <p>
        El tratamiento de datos personales se rige por nuestra{" "}
        <Link href="/politica-de-privacidad" className="text-primary underline-offset-2 hover:underline">
          Política de Privacidad
        </Link>
        , que forma parte de estos Términos.
      </p>
    ),
  },
  {
    id: "disponibilidad",
    title: "Disponibilidad",
    content: (
      <p>
        Hacemos esfuerzos razonables para mantener el Servicio disponible, pero no garantizamos
        disponibilidad continua sin interrupciones. Pueden existir ventanas de mantenimiento,
        incidentes de proveedores o eventos de fuerza mayor que afecten el Servicio.
      </p>
    ),
  },
  {
    id: "terceros",
    title: "Proveedores terceros",
    content: (
      <p>
        Para prestar el Servicio usamos proveedores como Supabase, Vercel, Cal.com y, cuando aplica,
        WhatsApp y servicios de email transaccional. La disponibilidad y términos de esos
        proveedores también pueden afectar la operación del Servicio.
      </p>
    ),
  },
  {
    id: "limitacion-responsabilidad",
    title: "Limitación de responsabilidad",
    content: (
      <p>
        En la máxima medida permitida por la ley, KAIRO no será responsable por daños indirectos,
        lucro cesante, pérdida de oportunidades comerciales, daños reputacionales o pérdida de datos
        derivados del uso o imposibilidad de uso del Servicio.
      </p>
    ),
  },
  {
    id: "modificaciones",
    title: "Modificaciones",
    content: (
      <p>
        Podemos modificar estos Términos para reflejar cambios legales, operativos o de producto.
        Notificaremos cambios materiales en el sitio o por los canales de contacto con el cliente.
        El uso continuado del Servicio después de la modificación implica aceptación.
      </p>
    ),
  },
  {
    id: "ley-aplicable",
    title: "Ley aplicable y jurisdicción",
    content: (
      <p>
        Estos Términos se rigen por las leyes de <strong>[PAÍS / JURISDICCIÓN]</strong>. Cualquier
        controversia se someterá a los tribunales competentes de dicha jurisdicción, salvo norma
        imperativa en contrario.
      </p>
    ),
  },
  {
    id: "contacto-terms",
    title: "Contacto",
    content: (
      <p>
        Para consultas sobre estos Términos, escríbenos a <strong>[CORREO LEGAL / SOPORTE]</strong>.
      </p>
    ),
  },
]
