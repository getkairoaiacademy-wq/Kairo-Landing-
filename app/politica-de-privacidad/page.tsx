import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de Privacidad de KAIRO TECHNOLOGIES S.A.C. — plataforma SaaS de Revenue Intelligence con IA.",
  alternates: { canonical: "https://getkairo.lat/politica-de-privacidad" },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = "01 de junio de 2025"
const LEGAL_EMAIL = "getkairoaiacademy@gmail.com"
const ENTITY = "KAIRO TECHNOLOGIES S.A.C."
const JURISDICTION = "Lima, República del Perú"

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
            Versión vigente: {LAST_UPDATED} · {ENTITY} · {JURISDICTION}
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
    id: "introduccion",
    title: `INTRODUCCIÓN`,
    content: (
      <>
        <p>{`KAIRO TECHNOLOGIES S.A.C. (en adelante, «KAIRO», «nosotros» o «la Empresa») reconoce que la privacidad de sus usuarios es un valor fundamental. La presente Política de Privacidad (en adelante, «Política») describe de manera transparente cómo recopilamos, utilizamos, almacenamos, protegemos y en qué circunstancias compartimos los datos personales de quienes acceden y utilizan la plataforma KAIRO, disponible en https://getkairo.lat.`}</p>
        <p>{`Esta Política ha sido redactada conforme a los principios y exigencias de la Ley N.º 29733, Ley de Protección de Datos Personales del Perú, su Reglamento aprobado mediante Decreto Supremo N.º 003-2013-JUS, y tiene en cuenta como referencia internacional el Reglamento General de Protección de Datos de la Unión Europea (RGPD/GDPR).`}</p>
        <p>{`Al registrarse y utilizar la Plataforma, el Usuario manifiesta haber leído y aceptado las disposiciones de la presente Política en su totalidad.`}</p>
      </>
    ),
  },
  {
    id: "responsable-del-tratamiento",
    title: `RESPONSABLE DEL TRATAMIENTO`,
    content: (
      <>
        <p>{`De conformidad con el artículo 18 de la Ley N.º 29733, el responsable del banco de datos personales es:`}</p>
        <p>{`Razón Social: KAIRO TECHNOLOGIES S.A.C.`}</p>
        <p>{`Nombre Comercial: KAIRO`}</p>
        <p>{`Domicilio: Lima, República del Perú.`}</p>
        <p>{`Correo electrónico: getkairoaiacademy@gmail.com`}</p>
        <p>{`Sitio web: https://getkairo.lat`}</p>
      </>
    ),
  },
  {
    id: "datos-que-recopilamos",
    title: `DATOS QUE RECOPILAMOS`,
    content: (
      <>
        <p>{`3.1 Datos proporcionados directamente por el Usuario`}</p>
        <p>{`Al registrarse y utilizar la Plataforma, el Usuario nos proporciona la siguiente información:`}</p>
        <p>{`Datos de identificación: nombre, apellidos, correo electrónico, número de teléfono.`}</p>
        <p>{`Datos de la organización: nombre de la empresa, cargo, sector.`}</p>
        <p>{`Datos de autenticación: contraseña (almacenada de forma cifrada).`}</p>
        <p>{`Datos de facturación: información necesaria para la gestión del pago.`}</p>
        <p>{`3.2 Datos Técnicos Recopilados Automáticamente`}</p>
        <p>{`Al interactuar con la Plataforma, recopilamos automáticamente la siguiente información técnica:`}</p>
        <p>{`Dirección IP y datos de geolocalización aproximada.`}</p>
        <p>{`Tipo y versión del navegador y sistema operativo.`}</p>
        <p>{`Datos del dispositivo (modelo, identificadores técnicos).`}</p>
        <p>{`Páginas visitadas, tiempo de sesión y patrones de navegación.`}</p>
        <p>{`Logs de actividad y acceso dentro de la Plataforma.`}</p>
        <p>{`Métricas de uso de funcionalidades.`}</p>
        <p>{`Datos generados por cookies y tecnologías de rastreo (ver Cláusula 13).`}</p>
      </>
    ),
  },
  {
    id: "datos-que-el-usuario-carga",
    title: `DATOS QUE EL USUARIO CARGA`,
    content: (
      <>
        <p>{`La Plataforma permite al Usuario cargar, registrar y almacenar datos relacionados con su actividad comercial, que pueden incluir datos personales de terceros. Esta categoría comprende, de manera enunciativa:`}</p>
        <p>{`Información de prospectos y clientes: nombres, correos electrónicos, teléfonos, cargos, empresas.`}</p>
        <p>{`Conversaciones comerciales y registros de interacciones.`}</p>
        <p>{`Notas internas, historial de seguimiento y observaciones.`}</p>
        <p>{`Archivos adjuntos e información operativa cargada por el Usuario.`}</p>
        <p>{`Información comercial sensible del negocio del Usuario.`}</p>
        <p>{`El Usuario actúa como responsable autónomo del tratamiento respecto de los datos de terceros que carga en la Plataforma, y KAIRO actúa como encargado del tratamiento. El Usuario garantiza a KAIRO que cuenta con la base legal correspondiente para el tratamiento de dichos datos conforme a la Ley N.º 29733.`}</p>
      </>
    ),
  },
  {
    id: "datos-tecnicos-recopilados-automaticamen",
    title: `DATOS TÉCNICOS RECOPILADOS AUTOMÁTICAMENTE`,
    content: (
      <>
        <p>{`Adicionalmente a lo indicado en la Cláusula 3.2, los sistemas de KAIRO registran automáticamente eventos de actividad para garantizar la seguridad, el correcto funcionamiento de la Plataforma y el cumplimiento de obligaciones legales. Estos datos incluyen:`}</p>
        <p>{`Registros de acceso (timestamps, IP, dispositivos).`}</p>
        <p>{`Eventos de auditoría (creación, modificación y eliminación de registros).`}</p>
        <p>{`Alertas de seguridad y accesos sospechosos.`}</p>
        <p>{`Datos de rendimiento y diagnóstico técnico.`}</p>
      </>
    ),
  },
  {
    id: "finalidades-del-tratamiento",
    title: `FINALIDADES DEL TRATAMIENTO`,
    content: (
      <>
        <p>{`KAIRO trata los datos personales con las siguientes finalidades:`}</p>
        <p>{`Prestación del Servicio: gestión de cuentas, autenticación, acceso y funcionalidades de la Plataforma.`}</p>
        <p>{`Procesamiento de pagos: gestión de transacciones y facturación.`}</p>
        <p>{`Soporte técnico: atención a consultas, incidencias y reclamaciones del Usuario.`}</p>
        <p>{`Mejora del Servicio: análisis de uso, detección de errores, optimización de la Plataforma.`}</p>
        <p>{`Entrenamiento y mejora de sistemas de IA: con datos anonimizados o seudonimizados cuando sea aplicable.`}</p>
        <p>{`Seguridad: detección, prevención e investigación de actividades fraudulentas o no autorizadas.`}</p>
        <p>{`Comunicaciones: notificaciones operativas, de seguridad y comerciales con base en el consentimiento del Usuario.`}</p>
        <p>{`Cumplimiento legal: atención a requerimientos de autoridades competentes y cumplimiento de obligaciones legales.`}</p>
      </>
    ),
  },
  {
    id: "base-legal-del-tratamiento",
    title: `BASE LEGAL DEL TRATAMIENTO`,
    content: (
      <>
        <p>{`El tratamiento de datos personales por parte de KAIRO se sustenta en las siguientes bases legales conforme a la Ley N.º 29733:`}</p>
        <p>{`Ejecución del contrato: tratamiento necesario para la prestación del Servicio contratado.`}</p>
        <p>{`Consentimiento del titular: para comunicaciones comerciales y cookies no esenciales.`}</p>
        <p>{`Interés legítimo: para mejora del Servicio, seguridad y prevención del fraude.`}</p>
        <p>{`Cumplimiento de una obligación legal: cuando sea requerido por autoridades competentes.`}</p>
      </>
    ),
  },
  {
    id: "uso-de-inteligencia-artificial",
    title: `USO DE INTELIGENCIA ARTIFICIAL`,
    content: (
      <>
        <p>{`La Plataforma utiliza sistemas de Inteligencia Artificial para procesar y analizar los datos del Usuario con las siguientes finalidades específicas:`}</p>
        <p>{`Clasificación y puntuación de leads.`}</p>
        <p>{`Análisis automático de conversaciones comerciales.`}</p>
        <p>{`Detección de patrones y oportunidades comerciales.`}</p>
        <p>{`Generación de insights, recomendaciones y alertas personalizadas.`}</p>
        <p>{`El Usuario es informado de que:`}</p>
        <p>{`El procesamiento automatizado de datos no produce decisiones con efectos jurídicos significativos para el Usuario o sus clientes sin intervención humana.`}</p>
        <p>{`Los outputs generados por IA son de naturaleza orientativa y requieren validación humana.`}</p>
        <p>{`KAIRO implementa mecanismos de supervisión para mitigar sesgos en sus sistemas de IA.`}</p>
        <p>{`En la medida en que el RGPD o regulaciones internacionales sean aplicables a los datos de ciudadanos de sus respectivas jurisdicciones, el Usuario podrá ejercer su derecho a no ser objeto de decisiones exclusivamente automatizadas con arreglo a dichas normativas.`}</p>
      </>
    ),
  },
  {
    id: "conservacion-de-datos",
    title: `CONSERVACIÓN DE DATOS`,
    content: (
      <>
        <p>{`KAIRO conservará los datos personales por los siguientes períodos:`}</p>
        <p>{`Datos de cuenta activa: durante todo el período en que el Usuario mantenga una cuenta activa.`}</p>
        <p>{`Datos tras cancelación de cuenta: hasta seis (6) meses adicionales a la cancelación, salvo obligación legal de conservación por mayor plazo.`}</p>
        <p>{`Datos de facturación y transacciones: mínimo cinco (5) años conforme a la normativa tributaria vigente.`}</p>
        <p>{`Logs de seguridad y auditoría: mínimo dos (2) años.`}</p>
        <p>{`Datos del período de prueba no convertidos en suscripción: hasta treinta (30) días tras la finalización del período de prueba.`}</p>
        <p>{`Transcurridos los plazos indicados, los datos serán eliminados de forma segura o anonimizados de manera irreversible.`}</p>
      </>
    ),
  },
  {
    id: "seguridad-de-la-informacion",
    title: `SEGURIDAD DE LA INFORMACIÓN`,
    content: (
      <>
        <p>{`KAIRO implementa un conjunto de medidas técnicas y organizativas razonables para proteger los datos personales frente a accesos no autorizados, destrucción, pérdida, alteración, divulgación o cualquier otra forma de tratamiento indebido. Estas medidas incluyen:`}</p>
        <p>{`Cifrado de datos en tránsito mediante protocolos TLS/SSL.`}</p>
        <p>{`Cifrado de datos en reposo en los servidores de almacenamiento.`}</p>
        <p>{`Control de accesos basado en roles con principio de mínimo privilegio.`}</p>
        <p>{`Autenticación segura para acceso a sistemas internos.`}</p>
        <p>{`Monitoreo continuo de seguridad e infraestructura.`}</p>
        <p>{`Registros de auditoría de accesos y operaciones críticas.`}</p>
        <p>{`Procedimientos de respuesta ante incidentes de seguridad.`}</p>
        <p>{`Evaluaciones periódicas de vulnerabilidades.`}</p>
        <p>{`Sin perjuicio de lo anterior, ningún sistema de información conectado a internet puede garantizar seguridad absoluta. KAIRO no puede garantizar la invulnerabilidad de sus sistemas frente a ataques informáticos sofisticados o eventos imprevistos.`}</p>
      </>
    ),
  },
  {
    id: "comparticion-de-datos-con-proveedores",
    title: `COMPARTICIÓN DE DATOS CON PROVEEDORES`,
    content: (
      <>
        <p>{`KAIRO puede compartir datos personales con proveedores de servicios tecnológicos y de infraestructura que actúan como encargados del tratamiento, exclusivamente para la prestación del Servicio. Estos proveedores pueden incluir:`}</p>
        <p>{`Proveedores de infraestructura en la nube (servidores, almacenamiento).`}</p>
        <p>{`Proveedores de servicios de IA y procesamiento de lenguaje natural.`}</p>
        <p>{`Procesadores de pagos y pasarelas de cobro.`}</p>
        <p>{`Herramientas de análisis de uso y rendimiento.`}</p>
        <p>{`Proveedores de servicios de seguridad informática.`}</p>
        <p>{`Todos los proveedores con acceso a datos personales se encuentran vinculados contractualmente a obligaciones de confidencialidad y protección de datos equivalentes a las establecidas en la presente Política.`}</p>
        <p>{`KAIRO no vende, alquila ni cede datos personales de sus usuarios a terceros con fines comerciales.`}</p>
      </>
    ),
  },
  {
    id: "transferencias-internacionales",
    title: `TRANSFERENCIAS INTERNACIONALES`,
    content: (
      <>
        <p>{`Los datos personales tratados por KAIRO pueden ser transferidos o almacenados en servidores ubicados fuera del territorio peruano, incluyendo países de la Unión Europea y los Estados Unidos de América, en los que operan proveedores de infraestructura tecnológica de KAIRO.`}</p>
        <p>{`KAIRO garantiza que dichas transferencias se realizan con las salvaguardas adecuadas, incluyendo la suscripción de cláusulas contractuales tipo, y conforme a los requisitos establecidos en el artículo 15 de la Ley N.º 29733 y su Reglamento.`}</p>
      </>
    ),
  },
  {
    id: "cookies-y-tecnologias-similares",
    title: `COOKIES Y TECNOLOGÍAS SIMILARES`,
    content: (
      <>
        <p>{`13.1 ¿Qué son las cookies?`}</p>
        <p>{`Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del Usuario cuando accede a la Plataforma. Permiten reconocer al Usuario en visitas sucesivas y mejorar su experiencia de uso.`}</p>
        <p>{`13.2 Tipos de cookies utilizadas`}</p>
        <p>{`La Plataforma utiliza las siguientes categorías de cookies:`}</p>
        <p>{`Cookies esenciales: necesarias para el funcionamiento técnico de la Plataforma, la gestión de sesiones y la autenticación. No pueden desactivarse sin afectar el funcionamiento del Servicio.`}</p>
        <p>{`Cookies analíticas: permiten analizar el comportamiento de los usuarios de forma agregada y anonimizada para mejorar la usabilidad y el rendimiento de la Plataforma.`}</p>
        <p>{`Cookies funcionales: permiten recordar preferencias del Usuario (idioma, configuraciones, módulos frecuentes) para personalizar la experiencia.`}</p>
        <p>{`Cookies de rendimiento: recopilan información técnica sobre el desempeño de la Plataforma (tiempos de carga, errores, disponibilidad) con fines de diagnóstico y mejora técnica.`}</p>
        <p>{`13.3 Gestión del consentimiento`}</p>
        <p>{`Al acceder por primera vez a la Plataforma, el Usuario recibirá un aviso de cookies que le permitirá aceptar o rechazar las cookies no esenciales. Las cookies esenciales no requieren consentimiento previo, ya que son indispensables para el funcionamiento del Servicio.`}</p>
        <p>{`El Usuario podrá modificar sus preferencias de cookies en cualquier momento desde la configuración de privacidad de su cuenta o desde la configuración de su navegador. La desactivación de determinadas cookies puede afectar la funcionalidad o disponibilidad de ciertas características de la Plataforma.`}</p>
      </>
    ),
  },
  {
    id: "derechos-del-titular-de-los-datos",
    title: `DERECHOS DEL TITULAR DE LOS DATOS`,
    content: (
      <>
        <p>{`De conformidad con la Ley N.º 29733, el Usuario, en calidad de titular de datos personales, tiene los siguientes derechos:`}</p>
        <p>{`Derecho de Acceso (A): conocer qué datos personales suyos son tratados por KAIRO, con qué finalidades y por cuánto tiempo.`}</p>
        <p>{`Derecho de Rectificación (R): solicitar la corrección de datos inexactos, incompletos o desactualizados.`}</p>
        <p>{`Derecho de Cancelación o Supresión (C): solicitar la eliminación de sus datos cuando, entre otros supuestos, ya no sean necesarios para la finalidad que motivó su recopilación.`}</p>
        <p>{`Derecho de Oposición (O): oponerse al tratamiento de sus datos cuando existan motivos legítimos fundados en su situación particular.`}</p>
        <p>{`Derecho a la portabilidad: solicitar la entrega de sus datos en un formato estructurado y legible por máquina.`}</p>
        <p>{`Derecho a no ser objeto de decisiones automatizadas: salvo las excepciones legales aplicables.`}</p>
      </>
    ),
  },
  {
    id: "procedimiento-para-ejercer-derechos-arco",
    title: `PROCEDIMIENTO PARA EJERCER DERECHOS ARCO`,
    content: (
      <>
        <p>{`Para ejercer cualquiera de los derechos indicados en la Cláusula 14, el Usuario deberá remitir una solicitud escrita al correo electrónico getkairoaiacademy@gmail.com, indicando:`}</p>
        <p>{`Nombre completo y datos de identificación del titular o su representante legal.`}</p>
        <p>{`Derecho que desea ejercer.`}</p>
        <p>{`Descripción clara y concreta de la solicitud.`}</p>
        <p>{`Documentos o antecedentes que fundamenten la solicitud, de ser necesario.`}</p>
        <p>{`KAIRO responderá a la solicitud dentro del plazo de veinte (20) días hábiles contados desde su recepción, conforme al artículo 24 de la Ley N.º 29733. Si la solicitud no cumple con los requisitos indicados, KAIRO solicitará al titular la información faltante dentro de los cinco (5) días hábiles siguientes.`}</p>
      </>
    ),
  },
  {
    id: "menores-de-edad",
    title: `MENORES DE EDAD`,
    content: (
      <>
        <p>{`La Plataforma está destinada exclusivamente a personas mayores de dieciocho (18) años con capacidad legal para contratar. KAIRO no recopila intencionalmente datos personales de menores de edad. Si KAIRO tuviese conocimiento de haber recopilado datos de menores de manera inadvertida, procederá a eliminarlos de forma inmediata.`}</p>
        <p>{`Si un padre, madre o tutor legal tuviese conocimiento de que su hijo menor de edad ha proporcionado datos personales a KAIRO sin su consentimiento, deberá contactar a la Empresa a través del correo indicado en la Cláusula 20.`}</p>
      </>
    ),
  },
  {
    id: "retencion-y-eliminacion-de-datos",
    title: `RETENCIÓN Y ELIMINACIÓN DE DATOS`,
    content: (
      <>
        <p>{`Cuando un Usuario solicite la eliminación de su cuenta o cuando se cumplan los plazos de conservación establecidos, KAIRO procederá a:`}</p>
        <p>{`Eliminar de forma segura los datos de identificación y datos personales del Usuario.`}</p>
        <p>{`Anonimizar los datos que deban conservarse con fines estadísticos, de seguridad o legales.`}</p>
        <p>{`Eliminar o desasociar los datos de terceros cargados por el Usuario, salvo que exista una obligación legal de conservación.`}</p>
        <p>{`La eliminación se realizará mediante procedimientos técnicos que garanticen la imposibilidad de recuperación de los datos.`}</p>
      </>
    ),
  },
  {
    id: "incidentes-de-seguridad",
    title: `INCIDENTES DE SEGURIDAD`,
    content: (
      <>
        <p>{`En caso de que KAIRO detecte un incidente de seguridad que afecte o pueda afectar los datos personales de los Usuarios, la Empresa seguirá el siguiente protocolo:`}</p>
        <p>{`Identificación y contención inmediata del incidente.`}</p>
        <p>{`Evaluación del alcance e impacto sobre los datos personales afectados.`}</p>
        <p>{`Notificación a los Usuarios afectados en un plazo razonable cuando el incidente implique un riesgo elevado para sus derechos y libertades, conforme a lo exigido por la normativa aplicable.`}</p>
        <p>{`Notificación a la Autoridad Nacional de Protección de Datos Personales (ANPDP) cuando sea requerido por ley.`}</p>
        <p>{`Adopción de medidas correctivas para prevenir incidentes similares en el futuro.`}</p>
      </>
    ),
  },
  {
    id: "cambios-en-la-politica",
    title: `CAMBIOS EN LA POLÍTICA`,
    content: (
      <>
        <p>{`KAIRO se reserva el derecho de modificar la presente Política en cualquier momento para reflejar cambios en sus prácticas de privacidad, actualizaciones normativas o mejoras en el Servicio. Las modificaciones serán publicadas en https://getkairo.lat con indicación de la fecha de entrada en vigor.`}</p>
        <p>{`Para cambios sustanciales que afecten los derechos de los Usuarios, KAIRO notificará a los usuarios registrados por correo electrónico con una antelación mínima de diez (10) días antes de la entrada en vigor de la nueva versión.`}</p>
        <p>{`Si el Usuario no estuviese de acuerdo con las modificaciones, deberá cesar el uso de la Plataforma y podrá solicitar la eliminación de su cuenta conforme al procedimiento establecido.`}</p>
      </>
    ),
  },
  {
    id: "contacto-para-privacidad",
    title: `CONTACTO PARA PRIVACIDAD`,
    content: (
      <>
        <p>{`Para cualquier consulta, solicitud, reclamación o ejercicio de derechos relacionados con el tratamiento de datos personales, el Usuario puede contactar a KAIRO a través de los siguientes canales:`}</p>
        <p>{`Correo electrónico: getkairoaiacademy@gmail.com`}</p>
        <p>{`Asunto sugerido: «Solicitud de Privacidad — [Nombre del Titular]»`}</p>
        <p>{`Sitio web: https://getkairo.lat`}</p>
        <p>{`Si el Usuario considera que sus derechos han sido vulnerados, tiene derecho a presentar una reclamación ante la Autoridad Nacional de Protección de Datos Personales del Perú (ANPDP), conforme a los procedimientos establecidos en la Ley N.º 29733.`}</p>
        <p>{`Al utilizar la Plataforma KAIRO, el Usuario confirma haber leído, comprendido y aceptado íntegramente la presente Política de Privacidad.`}</p>
      </>
    ),
  },
]
