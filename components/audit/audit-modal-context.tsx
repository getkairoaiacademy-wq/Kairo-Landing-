"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { AuditPopupFullscreen } from "./audit-popup-fullscreen"
import { initLandingTracking, trackEvent } from "@/lib/tracking"
import { captureUtmsFromUrl } from "@/lib/utm"

interface AuditModalContextValue {
  isOpen: boolean
  /** open the modal, recording where the click came from */
  open: (ctaLocation: string) => void
  /** close the modal */
  close: () => void
  /** true once the user has interacted (opened modal at least once) — used to suppress reminders */
  hasEngaged: boolean
}

const AuditModalContext = createContext<AuditModalContextValue | null>(null)

export function AuditModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [ctaLocation, setCtaLocation] = useState<string>("unknown")
  const [hasEngaged, setHasEngaged] = useState(false)

  // Initialize landing tracking + UTMs once.
  useEffect(() => {
    initLandingTracking()
    captureUtmsFromUrl()
  }, [])

  const open = useCallback((location: string) => {
    setCtaLocation(location)
    setIsOpen(true)
    setHasEngaged(true)
    trackEvent("audit_cta_clicked", { location })
    trackEvent("audit_modal_opened", { location })
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    trackEvent("audit_modal_closed", { location: ctaLocation })
  }, [ctaLocation])

  const value = useMemo<AuditModalContextValue>(
    () => ({ isOpen, open, close, hasEngaged }),
    [isOpen, open, close, hasEngaged],
  )

  return (
    <AuditModalContext.Provider value={value}>
      {children}
      <AuditPopupFullscreen isOpen={isOpen} onClose={close} ctaLocation={ctaLocation} />
    </AuditModalContext.Provider>
  )
}

export function useAuditModal(): AuditModalContextValue {
  const ctx = useContext(AuditModalContext)
  if (!ctx) {
    // Fail-safe: if a button is rendered outside the provider, return a no-op
    // shim so it doesn't crash. Won't happen in our app but cheap to guarantee.
    return {
      isOpen: false,
      open: () => {},
      close: () => {},
      hasEngaged: false,
    }
  }
  return ctx
}
