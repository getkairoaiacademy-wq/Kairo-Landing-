"use client"

import { useEffect, useRef } from "react"

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, label[for]'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (isCoarse || reduce) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let dx = mx
    let dy = my
    let rx = mx
    let ry = my
    let raf = 0

    const tick = () => {
      // dot follows pointer 1:1
      dx += (mx - dx) * 0.6
      dy += (my - dy) * 0.6
      // ring trails with inertia
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18

      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`

      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const onOver = (e: Event) => {
      const target = e.target as Element | null
      if (target?.closest?.(HOVER_SELECTOR)) {
        ring.classList.add("is-hover")
        dot.classList.add("is-hover")
      }
    }
    const onOut = (e: Event) => {
      const target = e.target as Element | null
      if (target?.closest?.(HOVER_SELECTOR)) {
        ring.classList.remove("is-hover")
        dot.classList.remove("is-hover")
      }
    }

    document.documentElement.classList.add("has-custom-cursor")
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerover", onOver, true)
    document.addEventListener("pointerout", onOut, true)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerover", onOver, true)
      document.removeEventListener("pointerout", onOut, true)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="kairo-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="kairo-cursor-ring" aria-hidden="true" />
    </>
  )
}
