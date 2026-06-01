"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import { AUDIT_CTA_URL, CTA_PRIMARY_SHORT, trackEvent } from "@/lib/constants"

const footerLinks = {
  producto: [
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Qué detecta", href: "#detecta" },
    { label: "Control humano", href: "#control" },
    { label: "Plan Recovery", href: "#precio" },
    { label: "FAQ", href: "#faq" },
  ],
  recursos: [
    { label: "Casos demo", href: "#aha" },
    { label: "Soporte", href: "#" },
  ],
  legal: [
    { label: "Privacidad", href: "#" },
    { label: "Términos", href: "#" },
  ],
}

export function FooterSection() {
  const { resolvedTheme } = useTheme()

  return (
    <footer className="px-6 py-16 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="block mb-4">
              <Image
                src={resolvedTheme === "dark" ? "/logo-white.png" : "/logo-dark.png"}
                alt="KAIRO"
                width={100}
                height={28}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs mb-4 leading-relaxed">
              Sistema de recuperación de ingresos para negocios que atienden por WhatsApp.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-4">Producto</h4>
            <ul className="space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-heading text-sm font-semibold text-foreground mt-6 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold text-foreground mb-4">Empieza</h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Diagnóstico gratuito de ingresos ocultos. Sin compromiso.
            </p>
            <Link
              href={AUDIT_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("landing_cta_audit_click", { location: "footer" })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity glow-green-sm"
            >
              {CTA_PRIMARY_SHORT}
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © KAIRO. Sistema de recuperación de ingresos para negocios.
          </p>
          <p className="text-xs text-muted-foreground">
            Beta privada activa · <span className="text-primary font-medium">Cupos limitados</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
