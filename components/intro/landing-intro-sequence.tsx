"use client"

/**
 * LandingIntroSequence v5 — Micro-demo de 4s (Apple-style).
 *
 * Comunica en 4 segundos el sistema KAIRO Revenue Recovery para clínicas:
 *
 *   0–800ms    P1 PROBLEMA · cards-problema flotando + headline
 *              "Tu clínica tiene ingresos ocultos en WhatsApp."
 *   800–1800   P2 ANÁLISIS · cards convergen a panel central
 *              fuentes (Contactos · Chats · Servicios · Historial)
 *              "KAIRO analiza tu base."
 *   1800–2800  P3 DETECCIÓN · chips temperatura + señales
 *              FRÍO · TIBIO · CALIENTE · Cotización pendiente · Alto valor · Listo
 *              "Detecta oportunidades, temperatura e ingreso recuperable."
 *   2800–4000  P4 PROMESA · "Tu clínica ya tiene pacientes listos para volver."
 *              "KAIRO los encuentra." → cortina reveal hero
 *
 * Skip: ESC / Space / Enter / click / botón Skip. sessionStorage one-shot.
 * Reduced-motion: fade único 450ms.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

const SESSION_KEY = "kairo_intro_seen"
const REDUCED_DURATION = 450

const P1_END = 800
const P2_END = 1800
const P3_END = 2800
const P4_END = 4000
const DURATION = P4_END

const expo = [0.16, 1, 0.3, 1] as const
const curtain = [0.85, 0, 0.15, 1] as const

type Tone = "amber" | "red" | "green"

const PROBLEMS: { t: string; tone: Tone; x: string; y: string; r: number }[] = [
  { t: "Consulta perdida",        tone: "red",   x: "10%", y: "22%", r: -5 },
  { t: "Cotización pendiente",    tone: "amber", x: "68%", y: "16%", r: 4 },
  { t: "Paciente antiguo",        tone: "amber", x: "16%", y: "62%", r: 3 },
  { t: "WhatsApp sin seguimiento", tone: "red",  x: "62%", y: "62%", r: -4 },
]

const SOURCES = ["Contactos", "Chats", "Servicios", "Historial"]
const SIGNALS = ["Cotización pendiente", "Alto valor", "Listo para agendar"]
type Temp = { l: "FRÍO" | "TIBIO" | "CALIENTE"; cls: string }
const TEMPS: Temp[] = [
  { l: "FRÍO",     cls: "border-sky-400/40 bg-sky-400/10 text-sky-300" },
  { l: "TIBIO",    cls: "border-amber-400/40 bg-amber-400/10 text-amber-300" },
  { l: "CALIENTE", cls: "border-primary/45 bg-primary/15 text-primary" },
]

const toneCls: Record<Tone, string> = {
  amber: "border-amber-500/35 bg-amber-500/12 text-amber-300",
  red:   "border-red-500/35 bg-red-500/12 text-red-300",
  green: "border-primary/40 bg-primary/15 text-primary",
}

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
    timeoutRef.current = setTimeout(dismiss, DURATION + 100)

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

  const p1 = now < P1_END
  const p2 = now >= P1_END && now < P2_END
  const p3 = now >= P2_END && now < P3_END
  const p4 = now >= P3_END && now < P4_END
  const curtainUp = now >= P4_END - 400

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="kairo-intro"
          role="dialog"
          aria-label="KAIRO"
          onClick={dismiss}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: expo } }}
          className="fixed inset-0 z-[100] overflow-hidden cursor-pointer"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundColor: "#040706", willChange: "transform" }}
            animate={reduce ? { opacity: 0 } : curtainUp ? { y: "-100%" } : { y: "0%" }}
            transition={curtainUp ? { duration: 0.55, ease: curtain } : { duration: 0 }}
          >
            {/* glow + vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(65% 50% at 50% 45%, rgba(57,255,136,0.08) 0%, transparent 60%)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(110% 90% at 50% 50%, transparent 35%, rgba(0,0,0,0.6) 100%)" }}
            />

            {/* P1 · problema  */}
            <AnimatePresence>
              {p1 && (
                <motion.div
                  key="p1"
                  className="absolute inset-0 z-10"
                  exit={{ opacity: 0, transition: { duration: 0.25, ease: expo } }}
                >
                  {PROBLEMS.map((p, i) => (
                    <motion.div
                      key={p.t}
                      className="absolute"
                      style={{ left: p.x, top: p.y }}
                      initial={{ opacity: 0, y: 10, scale: 0.9, rotate: p.r }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotate: p.r }}
                      transition={{ duration: 0.28, ease: expo, delay: 0.04 + i * 0.05 }}
                    >
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-md ${toneCls[p.tone]}`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <span className="h-1 w-1 rounded-full bg-current" />
                        {p.t}
                      </span>
                    </motion.div>
                  ))}
                  <motion.p
                    initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.35, ease: expo, delay: 0.18 }}
                    className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-6 text-center text-2xl sm:text-4xl lg:text-5xl"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      letterSpacing: "-0.025em",
                      color: "#F4F7F5",
                      lineHeight: 1.1,
                    }}
                  >
                    Tu clínica tiene <span style={{ color: "#39FF88" }}>ingresos ocultos</span> en WhatsApp.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* P2 · análisis */}
            <AnimatePresence>
              {p2 && (
                <motion.div
                  key="p2"
                  className="absolute inset-0 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25, ease: expo } }}
                  transition={{ duration: 0.25, ease: expo }}
                >
                  <motion.div
                    className="absolute left-1/2 top-[42%] w-[78%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-primary/30 p-4 backdrop-blur-md"
                    style={{ backgroundColor: "rgba(8,12,10,0.85)" }}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1, boxShadow: "0 20px 60px -20px rgba(57,255,136,0.35)" }}
                    transition={{ duration: 0.35, ease: expo }}
                  >
                    <div className="mb-2 flex items-center justify-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#39FF88] animate-pulse" />
                      <span
                        className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Base Maestra
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {SOURCES.map((s, i) => (
                        <motion.div
                          key={s}
                          className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5"
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.22, ease: expo, delay: 0.15 + i * 0.06 }}
                        >
                          <span
                            className="text-[11px] text-white/85"
                            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                          >
                            {s}
                          </span>
                          <motion.span
                            className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#39FF88]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 520, damping: 22 }}
                          >
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3.5">
                              <path d="M5 12l4 4 10-10" />
                            </svg>
                          </motion.span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: expo, delay: 0.15 }}
                    className="absolute bottom-[18%] left-1/2 -translate-x-1/2 whitespace-nowrap text-base sm:text-lg"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      letterSpacing: "-0.015em",
                      color: "#F4F7F5",
                    }}
                  >
                    KAIRO analiza tu base<span style={{ color: "#39FF88" }}>.</span>
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* P3 · detección */}
            <AnimatePresence>
              {p3 && (
                <motion.div
                  key="p3"
                  className="absolute inset-0 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25, ease: expo } }}
                  transition={{ duration: 0.25, ease: expo }}
                >
                  <div className="absolute left-1/2 top-[40%] flex w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 px-6">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {TEMPS.map((t, i) => (
                        <motion.span
                          key={t.l}
                          initial={{ opacity: 0, y: 8, scale: 0.85 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.28, ease: expo, delay: 0.05 + i * 0.07 }}
                          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em] backdrop-blur-md ${t.cls}`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {t.l}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      {SIGNALS.map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, ease: expo, delay: 0.32 + i * 0.06 }}
                          className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-white/85 backdrop-blur-md"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          <span className="h-1 w-1 rounded-full bg-[#39FF88]" />
                          {s}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: expo, delay: 0.18 }}
                    className="absolute bottom-[18%] left-1/2 w-full max-w-xl -translate-x-1/2 px-6 text-center text-base sm:text-lg"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      letterSpacing: "-0.015em",
                      color: "#F4F7F5",
                    }}
                  >
                    Detecta oportunidades, temperatura e <span style={{ color: "#39FF88" }}>ingreso recuperable</span>.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* P4 · promesa */}
            <AnimatePresence>
              {p4 && (
                <motion.div
                  key="p4"
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25, ease: expo } }}
                  transition={{ duration: 0.3, ease: expo }}
                >
                  <motion.p
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.4, ease: expo }}
                    className="max-w-2xl text-2xl sm:text-4xl lg:text-5xl"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      letterSpacing: "-0.025em",
                      color: "#F4F7F5",
                      lineHeight: 1.1,
                    }}
                  >
                    Tu clínica ya tiene{" "}
                    <span style={{ color: "#39FF88" }}>pacientes listos para volver</span>.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: expo, delay: 0.3 }}
                    className="mt-3 text-base sm:text-lg"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      color: "rgba(244,247,245,0.75)",
                    }}
                  >
                    KAIRO los encuentra<span style={{ color: "#39FF88" }}>.</span>
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* skip */}
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
