import type React from "react"
import type { Metadata } from "next"
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/providers/lenis-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuditModalProvider } from "@/components/audit/audit-modal-context"
import { LandingIntroSequence } from "@/components/intro/landing-intro-sequence"
import { CustomCursor } from "@/components/effects/custom-cursor"
import { GrainOverlay } from "@/components/effects/grain-overlay"
import { ScrollProgress } from "@/components/effects/scroll-progress"
import { RevealOnScroll } from "@/components/effects/reveal-on-scroll"
import "./globals.css"

const SITE_URL = "https://getkairo.lat"

const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-grotesk",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-editorial",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-numeric",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "KAIRO | Encuentra ingresos ocultos en tu base de clientes",
    template: "%s | KAIRO",
  },
  description:
    "KAIRO ayuda a negocios que venden por WhatsApp a detectar consultas perdidas, cotizaciones sin cierre y clientes inactivos con potencial de volver. Agenda una auditoría gratuita de ingresos ocultos.",
  keywords: [
    "KAIRO",
    "recuperación de ingresos",
    "ingresos ocultos",
    "ventas por WhatsApp",
    "clientes perdidos",
    "auditoría de ingresos",
    "reactivación de clientes",
    "cotizaciones sin cierre",
    "seguimiento de leads",
    "CRM WhatsApp",
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
    title: "KAIRO | Encuentra ingresos ocultos en tu base de clientes",
    description:
      "Detecta consultas perdidas, cotizaciones sin cierre y clientes inactivos con potencial de volver. Auditoría gratuita.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KAIRO — Sistema de recuperación de ingresos para negocios que venden por WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAIRO | Encuentra ingresos ocultos en tu base de clientes",
    description:
      "Detecta consultas perdidas y clientes con potencial de volver. Auditoría gratuita para tu negocio.",
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
    <html
      lang="es"
      className={`light ${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('kairo-theme-v2')||'light',r=t==='system'?window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light':t;document.documentElement.classList.add(r);document.body.style.backgroundColor=r==='dark'?'#050807':'#F8FAF9'}catch(e){}`,
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <ThemeProvider defaultTheme="light" storageKey="kairo-theme-v2">
          <AuditModalProvider>
            <LenisProvider>
              <LandingIntroSequence />
              <ScrollProgress />
              <GrainOverlay />
              <CustomCursor />
              <RevealOnScroll />
              {children}
            </LenisProvider>
          </AuditModalProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
