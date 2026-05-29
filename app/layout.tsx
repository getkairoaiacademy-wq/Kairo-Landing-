import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/providers/lenis-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuditModalProvider } from "@/components/audit/audit-modal-context"
import { LandingIntroSequence } from "@/components/intro/landing-intro-sequence"
import "./globals.css"

const SITE_URL = "https://getkairo.lat"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KAIRO | Recupera ingresos ocultos en tu clínica",
    template: "%s | KAIRO",
  },
  description:
    "KAIRO ayuda a clínicas que atienden por WhatsApp a detectar consultas perdidas, cotizaciones pendientes y pacientes antiguos con potencial de volver. Agenda una auditoría gratuita.",
  keywords: [
    "KAIRO",
    "recuperación de ingresos",
    "clínica dental",
    "WhatsApp clínica",
    "pacientes perdidos",
    "auditoría de ingresos",
    "CRM clínica",
    "reactivación de pacientes",
    "marketing dental",
    "clínica estética",
  ],
  authors: [{ name: "KAIRO" }],
  creator: "KAIRO",
  publisher: "KAIRO",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "es_LA",
    url: SITE_URL,
    siteName: "KAIRO",
    title: "KAIRO | Recupera ingresos ocultos en tu clínica",
    description:
      "Detecta consultas perdidas, cotizaciones pendientes y pacientes antiguos con potencial de volver. Auditoría gratuita.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KAIRO — Sistema de recuperación de ingresos para clínicas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAIRO | Recupera ingresos ocultos en tu clínica",
    description:
      "Detecta consultas perdidas y pacientes con potencial de volver. Auditoría gratuita para tu clínica.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('kairo-theme')||'dark',r=t==='system'?window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light':t;document.documentElement.classList.add(r);document.body.style.backgroundColor=r==='dark'?'#050807':'#F8FAF9'}catch(e){}`,
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <ThemeProvider defaultTheme="dark" storageKey="kairo-theme">
          <AuditModalProvider>
            <LenisProvider>
              <LandingIntroSequence />
              {children}
            </LenisProvider>
          </AuditModalProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
