import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de Privacidad de KAIRO TECHNOLOGIES S.A.C. — sistema de recuperación de ingresos para negocios que atienden por WhatsApp.",
  alternates: { canonical: "https://getkairo.lat/politica-de-privacidad" },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = "Junio 2026"
const LEGAL_EMAIL = "getkairoaiacademy@gmail.com"
const ENTITY = "KAIRO TECHNOLOGIES S.A.C."
const JURISDICTION = "Lima, Perú"

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
          <Link href="/terminos-y-condiciones" className="text-xs text-primary hover:opacity-80">
            Ver Términos y Condiciones →
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
    id: "responsable",
    title: "Responsable del tratamiento",
    content: (
      <>
        <p>
          El responsable del tratamiento de los datos personales recogidos en este sitio web es <strong>{ENTITY}</strong>,
          empresa constituida en Perú con domicilio en {JURISDICTION}.
        </p>
        <p>Canal oficial para asuntos de privacidad y protección de datos: {LEGAL_EMAIL}.</p>
      </>
    ),
  },
  {
    id: "alcance",
    title: "Alcance de esta política",
    content: (
      <p>
        Esta política aplica a la información que recolectamos a través de getkairo.lat, sus subdominios, formularios,
        embed de Cal.com, sistema de auditoría gratuita y cualquier comunicación que mantengas con KAIRO. No cubre
        sitios de terceros enlazados desde nuestra plataforma.
      </p>
    ),
  },
  {
    id: "datos-recolectados",
    title: "Datos que recolectamos",
    content: (
      <>
        <p>Cuando completas un formulario de auditoría o agendas una demo, registramos:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Nombre y apellidos.</li>
          <li>Nombre del negocio o clínica.</li>
          <li>Correo electrónico y/o número de WhatsApp.</li>
          <li>Tipo de negocio, uso de WhatsApp y volumen mensual de conversaciones.</li>
          <li>Problema principal declarado (campo opcional).</li>
          <li>Consentimientos legales otorgados (privacidad, términos, marketing).</li>
          <li>Datos de la reserva en Cal.com (horario, evento, identificador).</li>
        </ul>
        <p>
          Adicionalmente, de forma automática, registramos información técnica: dirección IP truncada, agente de
          usuario, página de origen, parámetros UTM, profundidad de scroll y tiempo en página antes del clic.
        </p>
      </>
    ),
  },
  {
    id: "finalidades",
    title: "Finalidades del tratamiento",
    content: (
      <>
        <p>Usamos tus datos para:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Preparar y entregar la auditoría comercial gratuita solicitada.</li>
          <li>Coordinar y confirmar la demo agendada vía Cal.com.</li>
          <li>Contactarte sobre el estado del servicio y mejoras del producto.</li>
          <li>Cumplir obligaciones contractuales, legales y tributarias.</li>
          <li>Prevenir fraude, abuso y mantener la seguridad de la plataforma.</li>
          <li>
            Enviarte comunicaciones comerciales adicionales <em>solo si</em> marcaste el consentimiento opcional
            correspondiente.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "base-legal",
    title: "Base legal del tratamiento",
    content: (
      <p>
        El tratamiento se basa en tu consentimiento expreso al marcar las casillas obligatorias del formulario, en la
        ejecución del servicio solicitado, en el cumplimiento de obligaciones legales aplicables (Ley N° 29733 de
        Protección de Datos Personales del Perú y su reglamento) y en el interés legítimo de KAIRO en operar y mejorar
        su plataforma.
      </p>
    ),
  },
  {
    id: "consentimiento",
    title: "Consentimiento expreso",
    content: (
      <p>
        Antes de enviar cualquier formulario debes aceptar de forma explícita esta Política de Privacidad y los
        Términos y Condiciones. El consentimiento para comunicaciones comerciales es opcional y separado. Puedes
        revocar cualquier consentimiento escribiendo a {LEGAL_EMAIL}.
      </p>
    ),
  },
  {
    id: "compartir-datos",
    title: "Compartición con terceros",
    content: (
      <>
        <p>Solo compartimos datos con proveedores estrictamente necesarios para operar el servicio:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Supabase</strong> — base de datos y autenticación.</li>
          <li><strong>Vercel</strong> — hosting y entrega del sitio.</li>
          <li><strong>Cal.com</strong> — agendamiento de demos.</li>
          <li><strong>Google Workspace</strong> — correo y operaciones internas.</li>
        </ul>
        <p>
          No vendemos ni alquilamos tus datos. No los cedemos a terceros con fines publicitarios fuera de KAIRO.
        </p>
      </>
    ),
  },
  {
    id: "transferencias",
    title: "Transferencias internacionales",
    content: (
      <p>
        Algunos proveedores procesan datos fuera de Perú (Estados Unidos, Unión Europea). Estas transferencias se
        amparan en cláusulas contractuales estándar y en el consentimiento que otorgas al usar el servicio.
      </p>
    ),
  },
  {
    id: "retencion",
    title: "Plazo de conservación",
    content: (
      <p>
        Conservamos los datos del lead durante el tiempo necesario para entregar la auditoría, dar seguimiento
        comercial y cumplir obligaciones legales. Por defecto: hasta 24 meses desde la última interacción, salvo que
        solicites su eliminación antes.
      </p>
    ),
  },
  {
    id: "derechos",
    title: "Tus derechos ARCO",
    content: (
      <>
        <p>
          Conforme a la Ley N° 29733 puedes ejercer en cualquier momento los derechos de acceso, rectificación,
          cancelación y oposición sobre tus datos. También puedes retirar consentimientos y solicitar portabilidad.
        </p>
        <p>
          Escribe a {LEGAL_EMAIL} indicando el derecho que deseas ejercer. Respondemos en un plazo máximo de 20 días
          hábiles.
        </p>
      </>
    ),
  },
  {
    id: "menores",
    title: "Menores de edad",
    content: (
      <p>
        El servicio está dirigido a personas mayores de 18 años con capacidad para contratar. No recolectamos
        conscientemente datos de menores. Si detectamos un registro de un menor, lo eliminamos.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies y tecnologías similares",
    content: (
      <>
        <p>
          Usamos cookies estrictamente necesarias para que el sitio funcione, cookies analíticas para entender el uso
          agregado y cookies de Cal.com para mantener el estado del calendario embebido.
        </p>
        <p>
          Puedes bloquear cookies desde tu navegador. Algunas funcionalidades, como el embed del calendario, pueden no
          operar correctamente sin ellas.
        </p>
      </>
    ),
  },
  {
    id: "whatsapp",
    title: "Datos de WhatsApp",
    content: (
      <p>
        KAIRO no extrae automáticamente conversaciones de WhatsApp sin tu autorización explícita. Cualquier
        integración requiere conexión voluntaria y configuración previa. Mientras solo agendes una demo, no accedemos
        a tu cuenta de WhatsApp.
      </p>
    ),
  },
  {
    id: "ia",
    title: "Procesamiento por inteligencia artificial",
    content: (
      <>
        <p>
          KAIRO utiliza modelos de inteligencia artificial para identificar oportunidades comerciales (cotizaciones
          abiertas, clientes a reactivar, campañas sugeridas). Los datos que procesamos pueden ser usados de forma
          anonimizada para mejorar el desempeño del producto.
        </p>
        <p>
          Las recomendaciones de IA son orientativas y no sustituyen la decisión humana del equipo del negocio.
        </p>
      </>
    ),
  },
  {
    id: "seguridad",
    title: "Medidas de seguridad",
    content: (
      <p>
        Aplicamos cifrado en tránsito (TLS), cifrado en reposo, controles de acceso por rol, registro de auditoría,
        rate-limiting, política de contraseñas fuertes para personal y políticas de respuesta a incidentes. Ningún
        sistema es 100% inviolable; en caso de incidente notificaremos según la normativa aplicable.
      </p>
    ),
  },
  {
    id: "filiales",
    title: "Encargados y co-responsables",
    content: (
      <p>
        Solo trabajamos con encargados de tratamiento que ofrezcan garantías equivalentes en seguridad y privacidad.
        Mantenemos contratos de tratamiento de datos con cada proveedor crítico.
      </p>
    ),
  },
  {
    id: "marketing",
    title: "Comunicaciones comerciales",
    content: (
      <p>
        Solo enviamos contenido comercial adicional si activaste el consentimiento opcional al registrarte. Cada
        correo incluye un enlace de baja de un clic. También puedes pedir la baja escribiendo a {LEGAL_EMAIL}.
      </p>
    ),
  },
  {
    id: "cambios",
    title: "Cambios en esta política",
    content: (
      <p>
        Podemos actualizar esta política para reflejar cambios legales, técnicos o de producto. La versión vigente
        siempre estará publicada en esta página con la fecha de última actualización. Cambios materiales serán
        notificados por correo.
      </p>
    ),
  },
  {
    id: "reclamos",
    title: "Reclamos ante la autoridad",
    content: (
      <p>
        Si consideras que tus derechos no han sido atendidos, puedes presentar un reclamo ante la Autoridad Nacional
        de Protección de Datos Personales del Perú, dependiente del Ministerio de Justicia y Derechos Humanos.
      </p>
    ),
  },
  {
    id: "contacto",
    title: "Contacto",
    content: (
      <p>
        Para cualquier consulta sobre esta Política de Privacidad o el ejercicio de tus derechos, escríbenos a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`} className="text-primary hover:opacity-80 underline">
          {LEGAL_EMAIL}
        </a>
        . Razón social: {ENTITY}. Jurisdicción: {JURISDICTION}.
      </p>
    ),
  },
]
