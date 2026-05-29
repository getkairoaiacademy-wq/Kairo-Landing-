"use client"

/**
 * LandingIntroSequence
 *
 * Overlay cinemático de ~3s que se monta sobre el hero ya renderizado.
 * NO bloquea LCP: el hero está debajo, listo. El overlay sólo se desvanece.
 *
 * Una sola vez por sesión (sessionStorage). Respeta prefers-reduced-motion.
 * Saltar manual con botón o tecla ESC / Space / Enter.
 *
 * Comportamiento mobile: secuencia abreviada (~2.4s), menos cards alrededor.
 * No toca login/auth/Cognito/sessions/registro/recovery.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const SESSION_KEY = "kairo_intro_seen"

type IntroFrame = {
  id: string
  kind: "signal" | "card" | "metric" | "headline" | "tagline"
  text: string
  sub?: string
  start: number // ms
  end: number // ms
}

const DESKTOP_FRAMES: IntroFrame[] = [
  { id: "f0", kind: "signal",   text: "Revisando señales comerciales",                 start: 250,  end: 900  },
  { id: "f1", kind: "card",     text: "Cotizaciones pendientes",     sub: "Requieren seguimiento",   start: 700,  end: 1500 },
  { id: "f2", kind: "card",     text: "Pacientes antiguos",          sub: "Potencial de retorno",    start: 1100, end: 1900 },
  { id: "f3", kind: "metric",   text: "38",                          sub: "oportunidades detectadas", start: 1500, end: 2200 },
  { id: "f4", kind: "metric",   text: "S/ 18,420",                   sub: "recuperable estimado",     start: 1900, end: 2600 },
  { id: "f5", kind: "headline", text: "Tu clínica ya tiene pacientes listos para volver.",            start: 2300, end: 3200 },
  { id: "f6", kind: "tagline",  text: "KAIRO los encuentra.",                                          start: 2800, end: 3200 },
]

const MOBILE_FRAMES: IntroFrame[] = [
  { id: "m0", kind: "signal",   text: "Revisando señales comerciales",                 start: 200,  end: 700  },
  { id: "m1", kind: "metric",   text: "38",                          sub: "oportunidades",            start: 700,  end: 1300 },
  { id: "m2", kind: "metric",   text: "S/ 18,420",                   sub: "recuperable estimado",     start: 1100, end: 1800 },
  { id: "m3", kind: "headline", text: "Tu clínica ya tiene pacientes listos para volver.",            start: 1700, end: 2400 },
  { id: "m4", kind: "tagline",  text: "KAIRO los encuentra.",                                          start: 2100, end: 2400 },
]

const DESKTOP_DURATION = 3200
const MOBILE_DURATION = 2400

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
  const [isMobile, setIsMobile] = useState(false)
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

    const mobile = window.matchMedia("(max-width: 640px)").matches
    setIsMobile(mobile)

    // Reduced motion: fade muy breve sin animación compleja.
    if (reduce) {
      setVisible(true)
      timeoutRef.current = setTimeout(dismiss, 500)
      return
    }

    setVisible(true)
    startRef.current = performance.now()

    const duration = mobile ? MOBILE_DURATION : DESKTOP_DURATION
    const tick = () => {
      const t = performance.now() - startRef.current
      setNow(t)
      if (t < duration) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    timeoutRef.current = setTimeout(dismiss, duration + 200)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [disabled, reduce, dismiss])

  // Teclado: ESC / Space / Enter saltan
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

  // Bloquear scroll mientras el overlay está activo (suave, sin shift)
  useEffect(() => {
    if (!visible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [visible])

  const frames = useMemo(() => (isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES), [isMobile])
  const duration = isMobile ? MOBILE_DURATION : DESKTOP_DURATION
  const progress = Math.min(now / duration, 1)

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="kairo-intro"
          role="dialog"
          aria-label="Diagnóstico KAIRO en progreso"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] bg-[#040706] text-[#F4F7F5] overflow-hidden"
        >
          {/* Glow ambiental verde sutil */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, rgba(57,255,136,0.10) 0%, rgba(57,255,136,0.04) 35%, transparent 70%)",
            }}
          />

          {/* Scan line sutil */}
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(57,255,136,0.55) 50%, transparent 100%)",
                top: 0,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: ["0vh", "100vh"], opacity: [0.0, 0.6, 0.0] }}
              transition={{ duration: 2.2, ease: "linear", repeat: 1 }}
            />
          )}

          {/* Grid container */}
          <div className="relative h-full w-full flex flex-col items-center justify-center px-6">
            {/* Cards laterales (desktop only) */}
            {!isMobile && !reduce && (
              <>
                <FloatingCard
                  className="hidden lg:flex absolute top-[18%] left-[8%] w-[220px]"
                  delay={0.6}
                  title="Cotización pendiente"
                  body="Requiere seguimiento"
                />
                <FloatingCard
                  className="hidden lg:flex absolute top-[24%] right-[8%] w-[220px]"
                  delay={0.9}
                  title="Paciente antiguo"
                  body="Potencial de retorno"
                />
                <FloatingCard
                  className="hidden lg:flex absolute bottom-[22%] left-[10%] w-[220px]"
                  delay={1.3}
                  title="Objeción por precio"
                  body="Mensaje consultivo sugerido"
                />
                <FloatingCard
                  className="hidden lg:flex absolute bottom-[18%] right-[10%] w-[220px]"
                  delay={1.6}
                  title="Lead caliente"
                  body="Prioridad alta"
                />
              </>
            )}

            {/* Centro: secuencia */}
            <div className="relative w-full max-w-2xl mx-auto text-center">
              {/* Eyebrow estable arriba */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF88] animate-pulse" aria-hidden="true" />
                <span className="font-body text-[11px] uppercase tracking-[0.18em] text-[#8F9893]">
                  KAIRO · análisis comercial
                </span>
              </div>

              <div className="relative min-h-[180px] sm:min-h-[220px] flex items-center justify-center">
                {frames.map((f) => {
                  const active = now >= f.start && now <= f.end
                  const phase = reduce ? 1 : active ? 1 : 0
                  return (
                    <FrameSlot key={f.id} frame={f} active={phase === 1} reduce={!!reduce} />
                  )
                })}
              </div>

              {/* Barra de "análisis" */}
              <div className="mt-10 w-full max-w-sm mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-[10px] uppercase tracking-[0.22em] text-[#8F9893]">
                    Preparando diagnóstico comercial
                  </span>
                  <span className="font-mono text-[10px] text-[#8F9893] tabular-nums">
                    {Math.round(progress * 100)}%
                  </span>
                </div>
                <div className="relative h-[2px] w-full bg-white/8 overflow-hidden rounded-full">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#39FF88] rounded-full"
                    style={{ width: `${progress * 100}%`, transition: "width 80ms linear" }}
                  />
                </div>
              </div>
            </div>

            {/* Skip */}
            <button
              type="button"
              onClick={dismiss}
              className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 font-body text-[11px] uppercase tracking-[0.18em] text-[#8F9893] hover:text-[#F4F7F5] transition-colors px-3 py-2 rounded-full border border-white/10 hover:border-white/30"
              aria-label="Saltar intro"
            >
              Saltar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FrameSlot({ frame, active, reduce }: { frame: IntroFrame; active: boolean; reduce: boolean }) {
  const initial = reduce ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(8px)" }
  const animate = active ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -8, filter: "blur(6px)" }

  if (frame.kind === "signal") {
    return (
      <motion.p
        aria-hidden={!active}
        initial={initial}
        animate={animate}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center font-body text-sm sm:text-base text-[#8F9893]"
      >
        {frame.text}
        <span className="inline-block ml-1 animate-pulse">…</span>
      </motion.p>
    )
  }

  if (frame.kind === "card") {
    return (
      <motion.div
        aria-hidden={!active}
        initial={initial}
        animate={animate}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="px-5 py-3 rounded-xl border border-[#39FF88]/25 bg-[#39FF88]/[0.04] text-left">
          <p className="font-body font-semibold text-sm text-[#F4F7F5]">{frame.text}</p>
          {frame.sub && <p className="font-body text-xs text-[#8F9893] mt-0.5">{frame.sub}</p>}
        </div>
      </motion.div>
    )
  }

  if (frame.kind === "metric") {
    return (
      <motion.div
        aria-hidden={!active}
        initial={initial}
        animate={animate}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <p className="font-body font-bold tabular-nums text-5xl sm:text-6xl text-[#39FF88] leading-none tracking-tight">
          {frame.text}
        </p>
        {frame.sub && (
          <p className="font-body text-xs sm:text-sm text-[#8F9893] mt-3 uppercase tracking-[0.18em]">
            {frame.sub}
          </p>
        )}
      </motion.div>
    )
  }

  if (frame.kind === "headline") {
    return (
      <motion.h2
        aria-hidden={!active}
        initial={initial}
        animate={animate}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center font-display italic text-2xl sm:text-3xl lg:text-4xl text-[#F4F7F5] leading-[1.15] max-w-xl mx-auto px-4"
        style={{ letterSpacing: "-0.02em", paddingBottom: "0.25rem" }}
      >
        {frame.text}
      </motion.h2>
    )
  }

  // tagline
  return (
    <motion.p
      aria-hidden={!active}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex items-center justify-center font-display text-2xl sm:text-3xl lg:text-4xl text-[#39FF88] leading-tight"
      style={{ letterSpacing: "-0.02em" }}
    >
      {frame.text}
    </motion.p>
  )
}

function FloatingCard({
  className = "",
  delay = 0,
  title,
  body,
}: {
  className?: string
  delay?: number
  title: string
  body: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      className={`${className} px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm`}
    >
      <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[#39FF88] mb-1">{title}</p>
      <p className="font-body text-xs text-[#8F9893]">{body}</p>
    </motion.div>
  )
}
