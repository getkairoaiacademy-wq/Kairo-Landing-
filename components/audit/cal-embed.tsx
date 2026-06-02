"use client"

// Cal.com inline embed wrapper — premium dark frame.
// Inline only. No external redirect. No "Abrir calendario" CTA.
// Prefills name/email/notes/metadata from the form step.

import { useEffect, useRef, useState } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { AlertCircle } from "lucide-react"
import { CAL_LINK, CAL_NAMESPACE, sanitizeCalLink } from "@/lib/constants"
import { trackEvent } from "@/lib/tracking"
import type { CalPrefill } from "@/lib/audit-lead"

interface Props {
  prefill?: CalPrefill
  ctaLocation: string
  /** Optional fallback url — intentionally NOT rendered as a CTA. Kept for prop compat. */
  fallbackUrl?: string
}

export function CalEmbed({ prefill, ctaLocation }: Props) {
  const safeCalLink = sanitizeCalLink(CAL_LINK)
  const [error, setError] = useState(!safeCalLink)
  const loadedRef = useRef(false)

  useEffect(() => {
    if (!safeCalLink) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[CalEmbed] Invalid CAL_LINK — expected user/event slug, got:", CAL_LINK)
      }
      return
    }
    let mounted = true
    ;(async () => {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE })
        const darkVars = {
          "cal-brand": "#39FF88",
          "cal-text": "#FFFFFF",
          "cal-text-emphasis": "#FFFFFF",
          "cal-bg": "#060B09",
          "cal-bg-emphasis": "#0A1310",
          "cal-bg-muted": "#0A1310",
          "cal-border": "rgba(255,255,255,0.10)",
          "cal-border-emphasis": "rgba(57,255,136,0.30)",
          "cal-border-subtle": "rgba(255,255,255,0.06)",
        }
        cal("ui", {
          theme: "dark",
          cssVarsPerTheme: { dark: darkVars, light: darkVars },
          hideEventTypeDetails: false,
          layout: "month_view",
        })
        cal("on", {
          action: "linkReady",
          callback: () => {
            loadedRef.current = true
            if (mounted) trackEvent("audit_cal_opened", { ctaLocation })
          },
        })
        cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            trackEvent("audit_cal_booked", { ctaLocation })
          },
        })
      } catch {
        if (mounted) setError(true)
      }
    })()
    // Hard error only if embed never signals readiness in 12s.
    const timeout = window.setTimeout(() => {
      if (mounted && !loadedRef.current) setError(true)
    }, 12000)
    return () => {
      mounted = false
      window.clearTimeout(timeout)
    }
  }, [ctaLocation, safeCalLink])

  if (error || !safeCalLink) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center"
      >
        <AlertCircle className="h-6 w-6 text-[#39FF88]" />
        <p className="text-sm font-medium text-white">
          No pudimos cargar el calendario.
        </p>
        <p className="text-xs leading-relaxed text-white/60">
          Ya tenemos tus datos y te contactaremos directamente para coordinar tu demo.
        </p>
      </div>
    )
  }

  // Build config: only include fields if defined to avoid empty prefill.
  const config: Record<string, unknown> = {
    layout: "month_view",
    theme: "dark",
  }
  if (prefill?.name) config.name = prefill.name
  if (prefill?.email) config.email = prefill.email
  if (prefill?.notes) config.notes = prefill.notes
  if (prefill?.metadata) config.metadata = prefill.metadata

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#060B09]"
      style={{ minHeight: 720 }}
    >
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={safeCalLink}
        config={config as never}
        style={{ width: "100%", height: "720px", overflow: "scroll" }}
      />
    </div>
  )
}
