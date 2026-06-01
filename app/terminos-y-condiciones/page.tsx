import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y Condiciones de uso de la plataforma KAIRO operada por KAIRO TECHNOLOGIES S.A.C.",
  alternates: { canonical: "https://getkairo.lat/terminos-y-condiciones" },
  robots: { index: true, follow: true },
}

const LAST_UPDATED = "01 de junio de 2025"
const LEGAL_EMAIL = "getkairoaiacademy@gmail.com"
const ENTITY = "KAIRO TECHNOLOGIES S.A.C."
const JURISDICTION = "Lima, República del Perú"

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
    id: "informacion-general",
    title: `INFORMACIÓN GENERAL`,
    content: (
      <>
        <p>{`Los presentes Términos y Condiciones de Uso (en adelante, «Términos») regulan el acceso y la utilización de la plataforma tecnológica KAIRO, disponible en https://getkairo.lat, operada por KAIRO TECHNOLOGIES S.A.C. (en adelante, «KAIRO» o «la Empresa»), persona jurídica constituida y domiciliada en Lima, República del Perú.`}</p>
        <p>{`Al acceder, registrarse o utilizar cualquier funcionalidad de la plataforma, el usuario —sea en nombre propio o en representación de una persona jurídica— declara haber leído, comprendido y aceptado en su totalidad los presentes Términos, así como la Política de Privacidad de KAIRO, la cual forma parte integrante de este instrumento.`}</p>
        <p>{`Si el usuario no estuviese de acuerdo con alguna de las disposiciones aquí contenidas, deberá abstenerse de utilizar el servicio.`}</p>
      </>
    ),
  },
  {
    id: "definiciones",
    title: `DEFINICIONES`,
    content: (
      <>
        <p>{`Para efectos de los presentes Términos, se aplicarán las siguientes definiciones:`}</p>
        <p>{`«Plataforma»: el software SaaS denominado KAIRO, accesible mediante el dominio https://getkairo.lat, incluyendo todas sus interfaces, módulos, funcionalidades y actualizaciones.`}</p>
        <p>{`«Usuario»: toda persona natural o jurídica que crea una cuenta, accede o utiliza la Plataforma, incluyendo administradores, colaboradores y representantes autorizados.`}</p>
        <p>{`«Cuenta»: acceso individualizado a la Plataforma mediante credenciales de autenticación únicas.`}</p>
        <p>{`«Datos del Usuario»: toda información, archivo, registro o contenido cargado, generado o almacenado por el Usuario dentro de la Plataforma.`}</p>
        <p>{`«Período de Prueba»: lapso de tres (3) días calendario durante el cual el Usuario puede utilizar la Plataforma sin efectuar pago alguno, bajo las condiciones establecidas en la Cláusula 7.`}</p>
        <p>{`«Licencia»: autorización no exclusiva, intransferible y revocable otorgada por KAIRO al Usuario para acceder y utilizar la Plataforma conforme a los presentes Términos.`}</p>
        <p>{`«IA» o «Inteligencia Artificial»: conjunto de sistemas, modelos y algoritmos automatizados integrados en la Plataforma para el procesamiento de datos, generación de insights y recomendaciones comerciales.`}</p>
        <p>{`«Contenido de IA»: resultados, recomendaciones, análisis, clasificaciones o cualquier output generado automáticamente por los sistemas de IA de la Plataforma.`}</p>
        <p>{`«Pago Único»: modalidad de contratación vigente bajo la cual el Usuario abona una tarifa única y determinada para acceder a la Plataforma por el período correspondiente.`}</p>
        <p>{`«Servicio»: el conjunto de funcionalidades y herramientas tecnológicas disponibles en la Plataforma.`}</p>
      </>
    ),
  },
  {
    id: "objeto-del-servicio",
    title: `OBJETO DEL SERVICIO`,
    content: (
      <>
        <p>{`KAIRO es una plataforma de Revenue Intelligence y Gestión Comercial impulsada por Inteligencia Artificial, diseñada para asistir a empresas en la organización, gestión y optimización de sus procesos comerciales. A través del Servicio, el Usuario puede:`}</p>
        <p>{`Organizar y gestionar prospectos y clientes.`}</p>
        <p>{`Centralizar información comercial y operativa.`}</p>
        <p>{`Detectar oportunidades comerciales y priorizar seguimientos.`}</p>
        <p>{`Analizar conversaciones y embudos de ventas.`}</p>
        <p>{`Identificar clientes sin seguimiento activo.`}</p>
        <p>{`Obtener análisis automatizados e insights generados por IA.`}</p>
        <p>{`Automatizar tareas de gestión comercial.`}</p>
        <p>{`Optimizar procesos de ventas y reducir la pérdida de leads.`}</p>
        <p>{`KAIRO proporciona exclusivamente herramientas tecnológicas de apoyo a la gestión comercial. La Empresa no presta servicios de consultoría, asesoría de inversión, asesoría financiera ni servicios profesionales de ninguna naturaleza. Ninguna funcionalidad de la Plataforma constituye asesoramiento profesional de ningún tipo.`}</p>
      </>
    ),
  },
  {
    id: "elegibilidad",
    title: `ELEGIBILIDAD`,
    content: (
      <>
        <p>{`Para utilizar la Plataforma, el Usuario debe:`}</p>
        <p>{`Ser mayor de dieciocho (18) años o contar con la capacidad legal plena para contratar conforme a la legislación de su domicilio.`}</p>
        <p>{`Actuar en nombre de una persona jurídica debidamente constituida, si es que el registro se realiza a título empresarial.`}</p>
        <p>{`No haber sido sancionado o inhabilitado previamente por KAIRO.`}</p>
        <p>{`Proporcionar información veraz, completa y actualizada durante el proceso de registro.`}</p>
        <p>{`Si el Usuario actúa en representación de una empresa u organización, declara y garantiza que cuenta con las facultades legales necesarias para vincular a dicha entidad con los presentes Términos.`}</p>
      </>
    ),
  },
  {
    id: "registro-de-cuenta",
    title: `REGISTRO DE CUENTA`,
    content: (
      <>
        <p>{`El acceso a la Plataforma requiere la creación de una cuenta mediante el suministro de los datos requeridos en el formulario de registro. El Usuario se compromete a:`}</p>
        <p>{`Proporcionar información veraz, exacta y actualizada.`}</p>
        <p>{`Mantener actualizados sus datos de registro en todo momento.`}</p>
        <p>{`Notificar a KAIRO de forma inmediata ante cualquier uso no autorizado de su cuenta.`}</p>
        <p>{`KAIRO se reserva el derecho de verificar la información proporcionada, rechazar solicitudes de registro o cancelar cuentas cuando detecte información incorrecta, fraudulenta o que infrinja los presentes Términos.`}</p>
      </>
    ),
  },
  {
    id: "responsabilidad-de-credenciales",
    title: `RESPONSABILIDAD DE CREDENCIALES`,
    content: (
      <>
        <p>{`El Usuario es el único responsable de la confidencialidad y custodia de sus credenciales de acceso (usuario y contraseña). KAIRO no será responsable por daños o pérdidas derivados del uso no autorizado de las credenciales del Usuario por terceros.`}</p>
        <p>{`Queda expresamente prohibido compartir las credenciales de acceso con terceros. Cualquier actividad realizada mediante las credenciales del Usuario se entenderá como realizada por éste, salvo que haya notificado a KAIRO el compromiso de su cuenta de forma oportuna.`}</p>
      </>
    ),
  },
  {
    id: "periodo-de-prueba",
    title: `PERÍODO DE PRUEBA`,
    content: (
      <>
        <p>{`KAIRO ofrece un período de prueba gratuita de tres (3) días calendario a partir del registro de la cuenta. Durante este período, el Usuario podrá acceder a las funcionalidades disponibles de la Plataforma sin costo alguno.`}</p>
        <p>{`El período de prueba es de uso personal e intransferible. KAIRO se reserva el derecho de modificar, limitar o eliminar el período de prueba en cualquier momento, con aviso previo al Usuario.`}</p>
        <p>{`Al finalizar el período de prueba, si el Usuario no ha efectuado el pago correspondiente, su acceso a la Plataforma quedará suspendido automáticamente. Los datos ingresados durante el período de prueba podrán ser conservados por un período adicional razonable, tras el cual podrán ser eliminados definitivamente.`}</p>
      </>
    ),
  },
  {
    id: "licencia-de-uso",
    title: `LICENCIA DE USO`,
    content: (
      <>
        <p>{`Sujeto al cumplimiento de los presentes Términos y al pago oportuno, KAIRO otorga al Usuario una licencia limitada, no exclusiva, no sublicenciable, intransferible y revocable para acceder y utilizar la Plataforma únicamente con fines comerciales internos legítimos.`}</p>
        <p>{`Esta licencia no confiere al Usuario ningún derecho de propiedad sobre la Plataforma, su código fuente, algoritmos, modelos de IA, diseños, marcas o cualquier otro elemento de propiedad intelectual de KAIRO.`}</p>
      </>
    ),
  },
  {
    id: "restricciones-de-uso",
    title: `RESTRICCIONES DE USO`,
    content: (
      <>
        <p>{`El Usuario se compromete a no realizar ninguna de las siguientes conductas:`}</p>
        <p>{`Copiar, reproducir, distribuir, comercializar, sublicenciar o transferir la Plataforma o cualquiera de sus componentes a terceros.`}</p>
        <p>{`Realizar ingeniería inversa, descompilar, desensamblar o intentar obtener el código fuente de la Plataforma.`}</p>
        <p>{`Utilizar la Plataforma para actividades ilícitas, fraudulentas, abusivas o que infrinjan derechos de terceros.`}</p>
        <p>{`Cargar, transmitir o almacenar en la Plataforma información falsa, engañosa, difamatoria, obscena, que infrinja derechos de autor o que viole normativas vigentes.`}</p>
        <p>{`Utilizar robots, scrapers, crawlers u otras herramientas automatizadas no autorizadas para interactuar con la Plataforma.`}</p>
        <p>{`Intentar acceder sin autorización a sistemas, servidores o redes de KAIRO.`}</p>
        <p>{`Interferir con el funcionamiento normal de la Plataforma o sobrecargar su infraestructura.`}</p>
        <p>{`Eludir medidas de seguridad o mecanismos de control de acceso implementados por KAIRO.`}</p>
        <p>{`Usar la Plataforma para ofrecer servicios competidores o para desarrollar productos similares.`}</p>
      </>
    ),
  },
  {
    id: "pagos",
    title: `PAGOS`,
    content: (
      <>
        <p>{`El acceso a la Plataforma está sujeto al pago de una tarifa única según los planes disponibles al momento de la contratación. Los precios vigentes se encuentran publicados en https://getkairo.lat y están expresados en la moneda indicada en la plataforma.`}</p>
        <p>{`El pago deberá realizarse mediante los métodos habilitados en la Plataforma. La activación del acceso completo queda condicionada a la confirmación del pago por parte del sistema de procesamiento correspondiente.`}</p>
        <p>{`KAIRO se reserva el derecho de modificar sus tarifas en cualquier momento. Las modificaciones se comunicarán con antelación razonable y no afectarán los pagos ya efectuados por el período contratado.`}</p>
      </>
    ),
  },
  {
    id: "politica-de-no-reembolso",
    title: `POLÍTICA DE NO REEMBOLSO`,
    content: (
      <>
        <p>{`TODOS LOS PAGOS REALIZADOS A KAIRO SON DEFINITIVOS, IRREVOCABLES Y NO REEMBOLSABLES.`}</p>
        <p>{`Una vez efectuado el pago, el Usuario no tendrá derecho a reembolso total o parcial bajo ninguna circunstancia, incluyendo, de manera enunciativa y no limitativa:`}</p>
        <p>{`Cancelación voluntaria de la cuenta antes del vencimiento del período contratado.`}</p>
        <p>{`Insatisfacción con las funcionalidades o resultados de la Plataforma.`}</p>
        <p>{`Incapacidad del Usuario para utilizar la Plataforma por causas ajenas a KAIRO.`}</p>
        <p>{`Cambios de necesidades comerciales o estratégicas del Usuario.`}</p>
        <p>{`Incumplimiento de los presentes Términos por parte del Usuario.`}</p>
        <p>{`El Usuario reconoce y acepta expresamente esta política al momento de efectuar el pago. Se recomienda al Usuario aprovechar el período de prueba gratuito para evaluar si el Servicio satisface sus necesidades antes de realizar cualquier pago.`}</p>
      </>
    ),
  },
  {
    id: "propiedad-intelectual",
    title: `PROPIEDAD INTELECTUAL`,
    content: (
      <>
        <p>{`La Plataforma, incluyendo su código fuente, diseño visual, interfaces, algoritmos, modelos de inteligencia artificial, logotipos, marcas, nombres comerciales, textos, gráficos y demás elementos, son propiedad exclusiva de KAIRO TECHNOLOGIES S.A.C. o de sus licenciantes, y se encuentran protegidos por las leyes de propiedad intelectual aplicables, incluyendo el Decreto Legislativo N.º 822 y demás normas concordantes.`}</p>
        <p>{`Los Datos del Usuario permanecen siendo propiedad exclusiva del Usuario. Sin embargo, al cargar datos en la Plataforma, el Usuario otorga a KAIRO una licencia no exclusiva, gratuita y limitada para procesar dichos datos con la única finalidad de prestar el Servicio contratado y mejorar las funcionalidades de la Plataforma, con respeto a las obligaciones de confidencialidad aplicables.`}</p>
      </>
    ),
  },
  {
    id: "datos-del-usuario",
    title: `DATOS DEL USUARIO`,
    content: (
      <>
        <p>{`El Usuario es el único responsable de los datos, información y contenidos que carga en la Plataforma. Al cargar datos que incluyan información de terceros (prospectos, clientes, contactos u otros), el Usuario declara y garantiza que:`}</p>
        <p>{`Cuenta con la autorización legal expresa de los titulares para tratar sus datos personales.`}</p>
        <p>{`El tratamiento de dichos datos cumple con la Ley N.º 29733 y demás normativas de protección de datos personales aplicables.`}</p>
        <p>{`Los datos no han sido obtenidos mediante medios ilícitos ni vulneran derechos de terceros.`}</p>
        <p>{`KAIRO no asume responsabilidad alguna por el contenido de los datos cargados por el Usuario, ni por las consecuencias jurídicas derivadas del tratamiento incorrecto de datos de terceros.`}</p>
      </>
    ),
  },
  {
    id: "uso-de-inteligencia-artificial",
    title: `USO DE INTELIGENCIA ARTIFICIAL`,
    content: (
      <>
        <p>{`La Plataforma integra sistemas de Inteligencia Artificial para la realización de las siguientes funciones, entre otras:`}</p>
        <p>{`Clasificación automática de leads y prospectos.`}</p>
        <p>{`Priorización comercial basada en patrones de comportamiento.`}</p>
        <p>{`Análisis automatizado de conversaciones.`}</p>
        <p>{`Generación de insights y recomendaciones comerciales.`}</p>
        <p>{`Identificación de oportunidades y riesgos comerciales.`}</p>
        <p>{`Detección de clientes sin seguimiento activo.`}</p>
        <p>{`El Usuario reconoce y acepta expresamente que:`}</p>
        <p>{`El Contenido de IA tiene carácter exclusivamente orientativo e informativo.`}</p>
        <p>{`Las recomendaciones generadas por IA no constituyen asesoría profesional de ningún tipo.`}</p>
        <p>{`Todo Contenido de IA debe ser validado, revisado y aprobado por el Usuario antes de ser utilizado para tomar decisiones comerciales.`}</p>
        <p>{`El Usuario mantiene en todo momento el control final sobre cualquier decisión comercial, sin que KAIRO asuma responsabilidad alguna por las consecuencias de decisiones adoptadas con base en el Contenido de IA.`}</p>
        <p>{`Los sistemas de IA pueden contener errores, imprecisiones o sesgos inherentes a su naturaleza tecnológica.`}</p>
      </>
    ),
  },
  {
    id: "disponibilidad-del-servicio",
    title: `DISPONIBILIDAD DEL SERVICIO`,
    content: (
      <>
        <p>{`KAIRO realizará esfuerzos razonables para mantener la Plataforma disponible de forma continua. Sin embargo, el Servicio se presta «AS IS» y «AS AVAILABLE», sin garantía alguna de disponibilidad ininterrumpida.`}</p>
        <p>{`KAIRO no garantiza que la Plataforma esté libre de errores, interrupciones, ataques informáticos u otras contingencias técnicas. El Usuario acepta que el Servicio puede sufrir interrupciones programadas o no programadas por razones de mantenimiento, actualizaciones, fallas técnicas, fuerza mayor u otras causas fuera del control razonable de la Empresa.`}</p>
      </>
    ),
  },
  {
    id: "actualizaciones-y-modificaciones",
    title: `ACTUALIZACIONES Y MODIFICACIONES`,
    content: (
      <>
        <p>{`KAIRO se reserva el derecho de modificar, actualizar, ampliar, reducir o descontinuar funcionalidades de la Plataforma en cualquier momento y sin necesidad de justificación previa, con el objetivo de mejorar el Servicio, cumplir con obligaciones legales o por razones técnicas o comerciales.`}</p>
        <p>{`Las modificaciones sustanciales serán comunicadas al Usuario con una antelación razonable a través de los medios de contacto registrados. El uso continuado de la Plataforma tras la implementación de cambios implica la aceptación de los mismos.`}</p>
      </>
    ),
  },
  {
    id: "integraciones-futuras",
    title: `INTEGRACIONES FUTURAS`,
    content: (
      <>
        <p>{`La Plataforma podrá incorporar en el futuro integraciones con servicios y plataformas de terceros (incluyendo, de forma enunciativa, CRMs, sistemas de comunicación, plataformas de pago, herramientas de productividad u otros). Dichas integraciones estarán sujetas a los términos y condiciones de los respectivos terceros proveedores, siendo el Usuario el único responsable de revisar y aceptar tales condiciones.`}</p>
        <p>{`KAIRO no asumirá responsabilidad por el funcionamiento, disponibilidad, seguridad o conducta de plataformas o servicios de terceros integrados a través de la Plataforma.`}</p>
      </>
    ),
  },
  {
    id: "ciberseguridad",
    title: `CIBERSEGURIDAD`,
    content: (
      <>
        <p>{`KAIRO implementa medidas técnicas y organizativas razonables para proteger la Plataforma y los datos almacenados, que incluyen, entre otras:`}</p>
        <p>{`Cifrado de datos en tránsito y en reposo mediante protocolos estándar de la industria.`}</p>
        <p>{`Control de accesos basado en roles y autenticación de usuarios.`}</p>
        <p>{`Registro y monitoreo de actividad dentro de la Plataforma.`}</p>
        <p>{`Mecanismos de prevención de accesos no autorizados.`}</p>
        <p>{`Procesos de gestión y respuesta ante incidentes de seguridad.`}</p>
        <p>{`Monitoreo continuo de la infraestructura tecnológica.`}</p>
        <p>{`No obstante lo anterior, el Usuario reconoce y acepta expresamente que ningún sistema de información conectado a internet puede garantizar seguridad absoluta. En consecuencia, KAIRO no puede garantizar que la Plataforma esté libre de vulnerabilidades, ataques informáticos o accesos no autorizados en todo momento.`}</p>
        <p>{`El Usuario es responsable de mantener la seguridad de sus credenciales de acceso y de los dispositivos desde los que utiliza la Plataforma.`}</p>
      </>
    ),
  },
  {
    id: "limitacion-de-responsabilidad",
    title: `LIMITACIÓN DE RESPONSABILIDAD`,
    content: (
      <>
        <p>{`EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY APLICABLE, LA RESPONSABILIDAD TOTAL Y ACUMULADA DE KAIRO FRENTE AL USUARIO, POR CUALQUIER CAUSA O TEORÍA LEGAL, NO EXCEDERÁ EN NINGÚN CASO EL MONTO TOTAL EFECTIVAMENTE PAGADO POR EL USUARIO A KAIRO DURANTE LOS TRES (3) MESES INMEDIATAMENTE ANTERIORES AL EVENTO QUE DIO ORIGEN A LA RECLAMACIÓN.`}</p>
        <p>{`KAIRO no será responsable, bajo ninguna circunstancia, por daños indirectos, incidentales, especiales, consecuentes, punitivos o lucro cesante, incluyendo de manera enunciativa:`}</p>
        <p>{`Pérdida de ingresos, ventas o clientes.`}</p>
        <p>{`Pérdida de datos o información comercial.`}</p>
        <p>{`Interrupción de actividades comerciales.`}</p>
        <p>{`Resultados comerciales no alcanzados.`}</p>
        <p>{`Decisiones adoptadas con base en el Contenido de IA.`}</p>
        <p>{`Accesos no autorizados a los datos del Usuario.`}</p>
      </>
    ),
  },
  {
    id: "exclusion-de-garantias",
    title: `EXCLUSIÓN DE GARANTÍAS`,
    content: (
      <>
        <p>{`LA PLATAFORMA SE PROPORCIONA «AS IS» (TAL CUAL) Y «AS AVAILABLE» (SEGÚN DISPONIBILIDAD), SIN GARANTÍAS DE NINGÚN TIPO, EXPRESAS, IMPLÍCITAS O LEGALES.`}</p>
        <p>{`KAIRO excluye expresamente, en la máxima medida permitida por la ley:`}</p>
        <p>{`Garantías de comerciabilidad, adecuación para un propósito particular o no infracción de derechos de terceros.`}</p>
        <p>{`Garantía de que la Plataforma estará libre de errores, interrupciones, virus o elementos dañinos.`}</p>
        <p>{`Garantía de resultados comerciales, económicos o financieros derivados del uso de la Plataforma.`}</p>
        <p>{`Garantía de exactitud, integridad o actualidad del Contenido de IA.`}</p>
        <p>{`Garantía de que la Plataforma satisfará las expectativas o requerimientos específicos del Usuario.`}</p>
      </>
    ),
  },
  {
    id: "indemnizacion",
    title: `INDEMNIZACIÓN`,
    content: (
      <>
        <p>{`El Usuario se compromete a defender, indemnizar y mantener indemne a KAIRO, sus directores, accionistas, empleados, colaboradores, proveedores y representantes legales, de y frente a cualquier reclamación, demanda, daño, pérdida, responsabilidad, costo u obligación (incluyendo honorarios razonables de abogados) que surja de o se relacione con:`}</p>
        <p>{`El uso de la Plataforma por parte del Usuario o de sus representantes.`}</p>
        <p>{`La violación de cualquier disposición de los presentes Términos.`}</p>
        <p>{`El tratamiento indebido de datos personales de terceros cargados en la Plataforma.`}</p>
        <p>{`La infracción de derechos de propiedad intelectual de terceros.`}</p>
        <p>{`Actividades ilícitas realizadas a través de la Plataforma.`}</p>
      </>
    ),
  },
  {
    id: "suspension-de-cuenta",
    title: `SUSPENSIÓN DE CUENTA`,
    content: (
      <>
        <p>{`KAIRO podrá suspender temporal o definitivamente el acceso del Usuario a la Plataforma en los siguientes supuestos:`}</p>
        <p>{`Incumplimiento de cualquier disposición de los presentes Términos.`}</p>
        <p>{`Falta de pago o irregularidades en el proceso de pago.`}</p>
        <p>{`Uso de la Plataforma para actividades ilícitas o contrarias a la moral y al orden público.`}</p>
        <p>{`Amenaza a la seguridad, integridad o funcionamiento de la Plataforma.`}</p>
        <p>{`Solicitud de autoridades competentes.`}</p>
        <p>{`En casos de suspensión por motivos de seguridad o conductas graves, KAIRO podrá actuar de forma inmediata y sin previo aviso. En los demás casos, notificará al Usuario con una antelación razonable.`}</p>
      </>
    ),
  },
  {
    id: "terminacion",
    title: `TERMINACIÓN`,
    content: (
      <>
        <p>{`El Usuario podrá solicitar la baja de su cuenta en cualquier momento, sin derecho a reembolso por el período no utilizado. KAIRO podrá dar por terminada la relación contractual con el Usuario si éste incumple los presentes Términos, sin perjuicio de las acciones legales que correspondan.`}</p>
        <p>{`Tras la terminación, KAIRO conservará los datos del Usuario por el período establecido en la Política de Privacidad, luego del cual procederá a su eliminación definitiva conforme a sus procedimientos internos.`}</p>
      </>
    ),
  },
  {
    id: "fuerza-mayor",
    title: `FUERZA MAYOR`,
    content: (
      <>
        <p>{`KAIRO no será responsable por incumplimientos o retrasos en la prestación del Servicio cuando estos obedezcan a causas fuera de su control razonable, incluyendo, de manera enunciativa: desastres naturales, pandemias, guerras, actos terroristas, huelgas, fallas en infraestructuras de internet, cortes de suministro eléctrico, disposiciones gubernamentales u otras causas de fuerza mayor o caso fortuito.`}</p>
        <p>{`En tales supuestos, KAIRO comunicará la situación al Usuario y reanudará el Servicio tan pronto como sea técnica y operativamente posible.`}</p>
      </>
    ),
  },
  {
    id: "comunicaciones-electronicas",
    title: `COMUNICACIONES ELECTRÓNICAS`,
    content: (
      <>
        <p>{`El Usuario acepta que KAIRO le remita comunicaciones relacionadas con el Servicio mediante correo electrónico u otros medios digitales, a la dirección de contacto registrada en su cuenta. Dichas comunicaciones tendrán plena validez legal.`}</p>
        <p>{`El Usuario puede gestionar sus preferencias de comunicación desde la configuración de su cuenta, sin perjuicio de las comunicaciones de carácter legal o administrativo indispensables para la correcta prestación del Servicio.`}</p>
      </>
    ),
  },
  {
    id: "cesion",
    title: `CESIÓN`,
    content: (
      <>
        <p>{`El Usuario no podrá ceder, transferir ni subrogar sus derechos u obligaciones derivados de los presentes Términos sin el consentimiento previo y por escrito de KAIRO.`}</p>
        <p>{`KAIRO podrá ceder sus derechos y obligaciones derivados de los presentes Términos, en todo o en parte, a una empresa vinculada, subsidiaria, o como consecuencia de una fusión, adquisición, reorganización societaria o transmisión de activos, sin necesidad de consentimiento previo del Usuario, quien será notificado oportunamente.`}</p>
      </>
    ),
  },
  {
    id: "modificaciones-de-los-terminos",
    title: `MODIFICACIONES DE LOS TÉRMINOS`,
    content: (
      <>
        <p>{`KAIRO se reserva el derecho de modificar los presentes Términos en cualquier momento. Las modificaciones serán publicadas en https://getkairo.lat con indicación de la fecha de entrada en vigor. Para cambios sustanciales, se comunicará al Usuario con una antelación mínima de diez (10) días hábiles.`}</p>
        <p>{`Si el Usuario continúa utilizando la Plataforma tras la entrada en vigor de las modificaciones, se entenderá que acepta los nuevos Términos. En caso de no aceptarlos, el Usuario deberá cesar el uso de la Plataforma.`}</p>
      </>
    ),
  },
  {
    id: "ley-aplicable",
    title: `LEY APLICABLE`,
    content: (
      <>
        <p>{`Los presentes Términos se rigen e interpretan de conformidad con las leyes de la República del Perú, incluyendo, de manera enunciativa: el Código Civil, el Decreto Legislativo N.º 822 (Ley sobre el Derecho de Autor), la Ley N.º 29733 (Ley de Protección de Datos Personales), el Decreto Legislativo N.º 1033 y demás normas concordantes.`}</p>
      </>
    ),
  },
  {
    id: "resolucion-de-controversias",
    title: `RESOLUCIÓN DE CONTROVERSIAS`,
    content: (
      <>
        <p>{`Toda controversia derivada de la interpretación, ejecución, incumplimiento o resolución de los presentes Términos será resuelta en primer lugar mediante negociación directa entre las partes, en un plazo máximo de quince (15) días hábiles desde que una parte notifique formalmente a la otra la existencia del conflicto.`}</p>
        <p>{`De no alcanzarse un acuerdo en dicho plazo, las partes se someten expresamente a la competencia de los Juzgados y Tribunales del Cercado de Lima, Perú, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.`}</p>
      </>
    ),
  },
  {
    id: "contacto-legal",
    title: `CONTACTO LEGAL`,
    content: (
      <>
        <p>{`Para cualquier consulta, reclamación, notificación legal o ejercicio de derechos derivados de los presentes Términos, el Usuario podrá contactar a KAIRO a través de los siguientes medios:`}</p>
        <p>{`Razón Social: KAIRO TECHNOLOGIES S.A.C.`}</p>
        <p>{`Domicilio: Lima, República del Perú.`}</p>
        <p>{`Correo electrónico legal: getkairoaiacademy@gmail.com`}</p>
        <p>{`Sitio web: https://getkairo.lat`}</p>
        <p>{`Al utilizar la Plataforma, el Usuario confirma haber leído, comprendido y aceptado íntegramente los presentes Términos y Condiciones de Uso.`}</p>
      </>
    ),
  },
]
