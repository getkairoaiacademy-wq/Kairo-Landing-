"use client"

// Cal.com inline embed wrapper — premium dark frame.
// No Calendly. No external redirect by default.
// Prefills name/email/notes from the form step.

import { useEffect, useState } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { AlertCircle, Calendar } from "lucide-react"
import { CAL_LINK, CAL_NAMESPACE } from "@/lib/constants"
import { trackEvent } from "@/lib/tracking"
import type { CalPrefill } from "@/lib/audit-lead"

interface Props {
  prefill?: CalPrefill
  ctaLocation: string
  /** Fallback url if embed fails to mount. */
  fallbackUrl?: string
}

export function CalEmbed({ prefill, ctaLocation, fallbackUrl }: Props) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
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
          action: "bookingSuccessful",
          callback: () => {
            trackEvent("audit_cal_booked", { ctaLocation })
          },
        })
        if (mounted) {
          setLoaded(true)
          trackEvent("audit_cal_opened", { ctaLocation })
        }
      } catch (err) {
        if (mounted) setError(true)
      }
    })()
    // Hard fallback if embed never mounts within 8s.
    const timeout = window.setTimeout(() => {
      if (mounted && !loaded) setError(true)
    }, 8000)
    return () => {
      mounted = false
      window.clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctaLocation])

  if (error) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center"
      >
        <AlertCircle className="h-6 w-6 text-[#39FF88]" />
        <p className="text-sm font-medium text-white">
          Ya recibimos tus datos.
        </p>
        <p className="text-xs leading-relaxed text-white/60">
          Si el calendario no carga, te contactaremos directamente para coordinar la demo.
        </p>
        {fallbackUrl && (
          <a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#39FF88] px-4 py-2 text-xs font-semibold text-[#04110A] hover:opacity-95 transition"
          >
            <Calendar className="h-3.5 w-3.5" />
            Abrir calendario
          </a>
        )}
      </div>
    )
  }

  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#060B09]"
      style={{ minHeight: 540 }}
    >
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        config={{
          layout: "month_view",
          theme: "dark",
          ...(prefill?.name ? { name: prefill.name } : {}),
          ...(prefill?.email ? { email: prefill.email } : {}),
          ...(prefill?.notes ? { notes: prefill.notes } : {}),
        }}
        style={{ width: "100%", height: "100%", minHeight: 540 }}
      />
    </div>
  )
}
