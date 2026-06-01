import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de Privacidad de KAIRO — sistema de recuperación de ingresos para clínicas y negocios que venden por WhatsApp.",
  alternates: { canonical: "https://getkairo.lat/politica-de-privacidad" },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = "1 de junio de 2026"

export default function PrivacyPage() {
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
            Política de Privacidad
          </h1>
          <p className="mt-3 text-xs text-muted-foreground">
            Última actualización: {LAST_UPDATED}
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
          <Link
            href="/terminos-y-condiciones"
            className="text-xs text-primary hover:opacity-80 transition-opacity"
          >
            Términos y Condiciones →
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
    id: "responsable",
    title: "Identidad del responsable",
    content: (
      <>
        <p>
          El responsable del tratamiento de los datos personales recabados a través de este sitio es{" "}
          <strong>KAIRO</strong> (en adelante, "KAIRO", "nosotros").
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-foreground/80">
          <li>Razón social / responsable legal: [RAZÓN SOCIAL — pendiente de confirmación]</li>
          <li>Correo legal y de privacidad: [CORREO LEGAL]</li>
          <li>Jurisdicción: [PAÍS / JURISDICCIÓN]</li>
          <li>Sitio web: getkairo.lat</li>
        </ul>
        <p className="text-xs text-muted-foreground">
          Los campos entre corchetes serán completados con los datos legales finales antes del lanzamiento comercial formal.
        </p>
      </>
    ),
  },
  {
    id: "que-es-kairo",
    title: "Qué es KAIRO",
    content: (
      <p>
        KAIRO es una plataforma SaaS dirigida a clínicas y negocios que venden por WhatsApp.
        Ayuda a recuperar oportunidades comerciales mediante el análisis de contactos, conversaciones,
        cotizaciones pendientes, clientes antiguos y campañas recomendadas. No reemplaza al equipo
        comercial: le indica a quién contactar, por qué y con qué mensaje.
      </p>
    ),
  },
  {
    id: "datos-landing",
    title: "Datos recopilados en esta landing",
    content: (
      <>
        <p>Cuando completas un formulario o agendas una demo, recopilamos:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Nombre completo.</li>
          <li>Nombre del negocio o clínica.</li>
          <li>Correo electrónico.</li>
          <li>Teléfono o WhatsApp.</li>
          <li>Fecha y hora del envío.</li>
          <li>Fuente, página de origen y referrer.</li>
          <li>Parámetros UTM (utm_source, utm_medium, utm_campaign, utm_term, utm_content).</li>
          <li>Estado de agendamiento de la demo.</li>
          <li>Información mínima de interacción con el formulario (tiempo en página, profundidad de scroll).</li>
        </ul>
      </>
    ),
  },
  {
    id: "datos-plataforma",
    title: "Datos procesados dentro de la plataforma",
    content: (
      <>
        <p>
          Si una clínica usa KAIRO como cliente, la plataforma procesa los datos que la propia clínica carga.
          Esto puede incluir:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Contactos, teléfonos y correos cargados por la clínica.</li>
          <li>Conversaciones de WhatsApp exportadas por la clínica.</li>
          <li>Servicios de interés y cotizaciones registradas.</li>
          <li>Estados comerciales, objeciones, seguimientos y resultados.</li>
          <li>Métricas de recuperación de ingresos.</li>
        </ul>
        <p className="text-sm text-foreground/75">
          La clínica es responsable de contar con la base legal y los consentimientos necesarios para
          cargar y procesar datos de sus pacientes o leads dentro de KAIRO.
        </p>
      </>
    ),
  },
  {
    id: "finalidades",
    title: "Finalidades",
    content: (
      <>
        <p>Usamos los datos para:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Contactar a personas interesadas en KAIRO.</li>
          <li>Coordinar la auditoría o demo agendada.</li>
          <li>Activar pruebas o cuentas de clientes.</li>
          <li>Dar seguimiento comercial a leads que lo soliciten.</li>
          <li>Operar y prestar el servicio SaaS.</li>
          <li>Analizar los datos cargados por la clínica dentro de su propia cuenta.</li>
          <li>Detectar oportunidades comerciales y recomendar campañas y mensajes.</li>
          <li>Mejorar la experiencia y la seguridad del producto.</li>
        </ul>
      </>
    ),
  },
  {
    id: "base-legal",
    title: "Base legal y consentimiento",
    content: (
      <p>
        Tratamos los datos sobre la base del consentimiento que otorgas al enviar el formulario, así como
        en el interés legítimo de prestar y mejorar el servicio. Cuando aplique, separaremos el
        consentimiento para comunicaciones comerciales del consentimiento estrictamente necesario para
        coordinar la demo y prestar el servicio.
      </p>
    ),
  },
  {
    id: "proveedores",
    title: "Proveedores tecnológicos",
    content: (
      <>
        <p>Para operar KAIRO utilizamos proveedores tecnológicos profesionales:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Supabase</strong> — almacenamiento de leads y datos de la plataforma.</li>
          <li><strong>Vercel</strong> — hosting, CDN y entrega del sitio.</li>
          <li><strong>Cal.com</strong> — agendamiento de demos y reuniones.</li>
          <li>Herramientas de analítica web (cuando se utilicen).</li>
          <li>Proveedores de email transaccional (cuando se utilicen).</li>
        </ul>
        <p>
          Estos proveedores actúan como encargados del tratamiento bajo contratos y políticas de
          seguridad que limitan el uso de los datos a la prestación del servicio.
        </p>
      </>
    ),
  },
  {
    id: "responsabilidad-clinica",
    title: "Responsabilidad de la clínica",
    content: (
      <p>
        Si tu clínica utiliza KAIRO para procesar datos de pacientes, leads o conversaciones,
        eres responsable de contar con la autorización o base legal necesaria para hacerlo y de
        cumplir con la normativa de protección de datos aplicable a tu jurisdicción.
      </p>
    ),
  },
  {
    id: "seguridad",
    title: "Seguridad",
    content: (
      <>
        <p>Aplicamos buenas prácticas de seguridad técnicas y organizativas:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Tráfico cifrado mediante HTTPS / TLS.</li>
          <li>Cabeceras de seguridad: HSTS, CSP, X-Content-Type-Options, Referrer-Policy.</li>
          <li>Row Level Security (RLS) y políticas de acceso en Supabase.</li>
          <li>Variables de entorno y secretos almacenados fuera del repositorio.</li>
          <li>Rate limiting en endpoints públicos.</li>
          <li>Restricción de lectura pública de leads.</li>
          <li>Acceso interno limitado a personal autorizado.</li>
        </ul>
        <p className="text-sm text-foreground/75">
          Ningún sistema es 100% infalible. Si detectamos un incidente que pueda afectar tus datos,
          actuaremos según las obligaciones legales aplicables.
        </p>
      </>
    ),
  },
  {
    id: "conservacion",
    title: "Conservación",
    content: (
      <p>
        Conservaremos los datos mientras exista una relación comercial, una solicitud activa o una
        finalidad legítima relacionada con el servicio, salvo solicitud expresa de eliminación por
        parte del titular o mandato legal en contrario.
      </p>
    ),
  },
  {
    id: "derechos",
    title: "Derechos del titular",
    content: (
      <>
        <p>Puedes ejercer en cualquier momento tus derechos de:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Acceso a tus datos.</li>
          <li>Rectificación de datos inexactos.</li>
          <li>Cancelación o eliminación.</li>
          <li>Oposición al tratamiento.</li>
          <li>Revocación del consentimiento.</li>
          <li>Portabilidad cuando aplique.</li>
        </ul>
        <p>
          Para ejercer estos derechos, escríbenos a <strong>[CORREO LEGAL / SOPORTE]</strong> indicando
          el derecho que deseas ejercer y los datos para identificarte.
        </p>
      </>
    ),
  },
  {
    id: "transferencias",
    title: "Transferencias internacionales",
    content: (
      <p>
        Algunos de nuestros proveedores tecnológicos (Supabase, Vercel, Cal.com) pueden almacenar datos
        en servidores ubicados fuera de tu país. Estos proveedores ofrecen estándares contractuales y
        técnicos reconocidos a nivel internacional para la protección de datos.
      </p>
    ),
  },
  {
    id: "menores",
    title: "Menores de edad",
    content: (
      <p>
        KAIRO no está dirigido a menores de edad y no recopilamos intencionalmente datos de personas
        menores de edad. Si crees que un menor nos ha enviado datos, contáctanos para eliminarlos.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios a esta política",
    content: (
      <p>
        Podemos actualizar esta Política de Privacidad para reflejar cambios legales, operativos o de
        producto. La fecha de la última actualización aparece al inicio de este documento.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "Contacto",
    content: (
      <p>
        Para cualquier consulta sobre privacidad o protección de datos, escríbenos a{" "}
        <strong>[CORREO LEGAL / SOPORTE]</strong>.
      </p>
    ),
  },
]
