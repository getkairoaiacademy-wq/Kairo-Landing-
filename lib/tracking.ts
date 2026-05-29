// Lightweight client-side tracking helpers for the landing.
// - trackEvent: dev-friendly logger + window hook for future analytics adapters.
// - getLandingSignals: snapshot of timeOnPage + scrollDepth for lead enrichment.
// No external services. Safe to call from any client component.

import { getStoredUtms, type UtmParams } from "./utm"

declare global {
  interface Window {
    __kairoLandedAt?: number
    __kairoMaxScroll?: number
    __kairoTrackingInit?: boolean
  }
}

export type LandingEvent =
  | "audit_cta_clicked"
  | "audit_modal_opened"
  | "audit_modal_closed"
  | "audit_lead_submitted"
  | "audit_lead_save_failed"
  | "audit_calendly_opened"
  | "audit_reminder_shown"
  | "audit_reminder_closed"
  | "audit_exit_intent_shown"
  | "audit_exit_intent_dismissed"
  | "audit_sticky_cta_shown"
  | "audit_sticky_cta_clicked"

export function trackEvent(event: LandingEvent | string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  // Dev log — no PII risk; replace adapter below when wiring real analytics.
  // eslint-disable-next-line no-console
  console.log(`[KAIRO] ${event}`, props ?? {})
}

export function initLandingTracking() {
  if (typeof window === "undefined") return
  if (window.__kairoTrackingInit) return
  window.__kairoTrackingInit = true
  window.__kairoLandedAt = Date.now()
  window.__kairoMaxScroll = 0

  const onScroll = () => {
    const doc = document.documentElement
    const scrolled = window.scrollY + window.innerHeight
    const total = Math.max(doc.scrollHeight, 1)
    const pct = Math.min(100, Math.round((scrolled / total) * 100))
    if (pct > (window.__kairoMaxScroll ?? 0)) window.__kairoMaxScroll = pct
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  onScroll()
}

export interface LandingSignals {
  timeOnPageMs: number
  scrollDepthPct: number
  sourcePage: string
  utm: UtmParams
}

export function getLandingSignals(): LandingSignals {
  if (typeof window === "undefined") {
    return { timeOnPageMs: 0, scrollDepthPct: 0, sourcePage: "", utm: {} }
  }
  const landed = window.__kairoLandedAt ?? Date.now()
  return {
    timeOnPageMs: Date.now() - landed,
    scrollDepthPct: window.__kairoMaxScroll ?? 0,
    sourcePage: window.location.pathname + window.location.search,
    utm: getStoredUtms(),
  }
}
