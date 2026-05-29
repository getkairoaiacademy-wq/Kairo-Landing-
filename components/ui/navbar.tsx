"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"
import { CTA_PRIMARY_SHORT } from "@/lib/constants"
import { useAuditModal } from "@/components/audit/audit-modal-context"

const navLinks = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#detecta", label: "Qué detecta" },
  { href: "#control", label: "Control humano" },
  { href: "#precio", label: "Plan" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const { open } = useAuditModal()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const handleAuditClick = (location: string) => open(location)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-3">
      <nav className="max-w-5xl mx-auto flex items-center justify-between h-12 px-5 rounded-full glass-card">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={resolvedTheme === "dark" ? "/logo-white.png" : "/logo-dark.png"}
            alt="KAIRO"
            width={90}
            height={24}
            className="h-5 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm rounded-full transition-colors text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="ml-1 p-2 rounded-full transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
            aria-label="Cambiar tema"
          >
            {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => handleAuditClick("navbar")}
            className="ml-2 px-4 py-1.5 text-sm rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all glow-green-sm"
          >
            {CTA_PRIMARY_SHORT}
          </button>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Cambiar tema"
          >
            {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => handleAuditClick("navbar-mobile")}
            className="px-3.5 py-1.5 text-xs rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all"
          >
            Auditoría
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-3 p-3 rounded-2xl glass-card">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm rounded-xl transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
