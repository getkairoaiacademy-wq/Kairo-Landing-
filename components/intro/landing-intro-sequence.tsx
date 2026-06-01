"use client"

/**
 * LandingIntroSequence v4 — Kinetic, corta y fluida (~2.5s)
 *
 * Tres líneas-problema aparecen y se difuminan en secuencia rápida, luego el
 * wordmark KAIRO + cierre, y una cortina superior despeja hacia el hero.
 *
 *   0–1380ms : "Clientes olvidados" → "Cotizaciones abiertas" → "Ingresos ocultos"
 *              (cada línea ~460ms, blur-in / blur-out vertical)
 *   1380–1940ms: wordmark "KAIRO los encuentra."
 *   1940–2500ms: cortina sube (clip/translate) revelando el hero
 *
 * Skip: ESC / Space / Enter / click. sessionStorage one-shot.
 * Reduced-motion: fade único 400ms. No bloquea scroll tras salir.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

const SESSION_KEY = "kairo_intro_seen"
const REDUCED_DURATION = 450

const LINES = ["Clientes olvidados.", "Cotizaciones abiertas.", "Ingresos ocultos."]
const LINE_MS = 460
const PHRASES_END = LINES.length * LINE_MS // 1380
const WORDMARK_END = PHRASES_END + 560 // 1940
const DURATION = WORDMARK_END + 560 // ~2500

const expo = [0.16, 1, 0.3, 1] as const
const curtain = [0.85, 0, 0.15, 1] as const

export function LandingIntroSequence({
  onComplete,
  disabled = false,
}: {
  onComplete?: () => void
  disabled?: boolean
}) {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [now, setNow] = useState(0)
  const startRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const dismiss = useCallback(() => {
    setVisible(false)
    try { sessionStorage.setItem(SESSION_KEY, "1") } catch {}
    onComplete?.()
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [onComplete])

  useEffect(() => {
    setMounted(true)
    if (disabled) return

    let seen = false
    try { seen = sessionStorage.getItem(SESSION_KEY) === "1" } catch {}
    if (seen) return

    if (reduce) {
      setVisible(true)
      timeoutRef.current = setTimeout(dismiss, REDUCED_DURATION)
      return
    }

    setVisible(true)
    startRef.current = performance.now()

    const tick = () => {
      const t = performance.now() - startRef.current
      setNow(t)
      if (t < DURATION) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    timeoutRef.current = setTimeout(dismiss, DURATION + 120)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [disabled, reduce, dismiss])

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => {
      if (["Escape", " ", "Enter"].includes(e.key)) {
        e.preventDefault()
        dismiss()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [visible, dismiss])

  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [visible])

  if (!mounted) return null

  const phraseIdx = Math.min(Math.floor(now / LINE_MS), LINES.length - 1)
  const inPhrases = now < PHRASES_END
  const inWordmark = now >= PHRASES_END && now < DURATION
  const curtainUp = now >= WORDMARK_END

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="kairo-intro"
          role="dialog"
          aria-label="KAIRO"
          onClick={dismiss}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: expo } }}
          className="fixed inset-0 z-[100] overflow-hidden cursor-pointer"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundColor: "#040706", willChange: "transform" }}
            animate={reduce ? { opacity: 0 } : curtainUp ? { y: "-100%" } : { y: "0%" }}
            transition={curtainUp ? { duration: 0.7, ease: curtain } : { duration: 0 }}
          >
            {/* Glow + vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(70% 55% at 50% 45%, rgba(57,255,136,0.07) 0%, transparent 60%)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(110% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)" }}
            />

            {/* Líneas-problema en secuencia */}
            <div className="absolute inset-0 flex items-center justify-center px-6 z-10">
              <AnimatePresence mode="wait">
                {inPhrases && (
                  <motion.p
                    key={phraseIdx}
                    initial={{ opacity: 0, y: 20, filter: "blur(14px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: expo }}
                    className="text-center text-3xl sm:text-5xl lg:text-6xl"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      letterSpacing: "-0.03em",
                      color: "#F4F7F5",
                      paddingBottom: "0.14em",
                    }}
                  >
                    {LINES[phraseIdx]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Wordmark + cierre */}
            {inWordmark && (
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10 text-center">
                <span className="block overflow-hidden" style={{ paddingBottom: "0.1em" }}>
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.6, ease: expo }}
                    className="block text-[16vw] sm:text-[12vw] lg:text-[9rem] leading-[0.9]"
                    style={{
                      fontFamily: "var(--font-macro)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      color: "#F4F7F5",
                    }}
                  >
                    KAIRO
                  </motion.span>
                </span>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="mt-2 text-base sm:text-lg"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    color: "rgba(244,247,245,0.7)",
                  }}
                >
                  los encuentra<span className="text-[#39FF88]">.</span>
                </motion.p>
              </div>
            )}

            {/* Skip */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); dismiss() }}
              className="absolute bottom-7 right-7 sm:bottom-9 sm:right-9 text-[10px] uppercase tracking-[0.42em] text-white/35 hover:text-white/85 transition-colors duration-300 px-3 py-2 z-20"
              aria-label="Saltar intro"
              style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              Skip
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
