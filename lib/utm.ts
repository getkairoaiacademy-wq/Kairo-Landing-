// UTM capture utility — reads from URL on first landing, persists in sessionStorage
// so it survives in-page navigation and is available on form submit.

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>

const STORAGE_KEY = "kairo_utm_v1"

export function captureUtmsFromUrl(): UtmParams {
  if (typeof window === "undefined") return {}
  try {
    const params = new URLSearchParams(window.location.search)
    const found: UtmParams = {}
    let any = false
    for (const k of UTM_KEYS) {
      const v = params.get(k)
      if (v) {
        found[k] = v
        any = true
      }
    }
    if (any) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found))
      return found
    }
    return getStoredUtms()
  } catch {
    return {}
  }
}

export function getStoredUtms(): UtmParams {
  if (typeof window === "undefined") return {}
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as UtmParams) : {}
  } catch {
    return {}
  }
}
