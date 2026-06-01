"use client"

import { useEffect, useRef } from "react"

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const bar = barRef.current
    if (!bar) return

    let raf = 0
    let queued = false

    const update = () => {
      queued = false
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      bar.style.width = `${(pct * 100).toFixed(2)}%`
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return <div ref={barRef} className="kairo-progress" aria-hidden="true" />
}
