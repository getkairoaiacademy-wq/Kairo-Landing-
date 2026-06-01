"use client"

import { useEffect } from "react"

/**
 * Scans the DOM for elements with class `.rv` and toggles `.is-in` when they
 * enter the viewport. Pure progressive-enhancement: if JS fails the elements
 * are still visible because the base CSS guards `.rv` opacity behind a
 * `@media (prefers-reduced-motion: no-preference)` query.
 */
export function RevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (typeof IntersectionObserver === "undefined") return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      document.querySelectorAll<HTMLElement>(".rv").forEach((el) => el.classList.add("is-in"))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in")
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "-8% 0px", threshold: 0.08 }
    )

    const scan = () => {
      document.querySelectorAll<HTMLElement>(".rv:not(.is-in)").forEach((el) => io.observe(el))
    }

    scan()

    // Re-scan when route content mutates (intro overlay removal, lazy mounts)
    const mo = new MutationObserver(() => scan())
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
