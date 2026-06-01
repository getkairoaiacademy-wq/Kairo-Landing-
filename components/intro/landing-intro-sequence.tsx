"use client"

/**
 * LandingIntroSequence v6 — Apple-style product reveal, 4s exact.
 *
 *   0–700ms    P1 CAOS         · cards flotando con blur + "Hay ingresos ocultos en tu clínica."
 *   700–1500   P2 ORDENA       · cards convergen → Base Maestra · "KAIRO analiza tu base y tus conversaciones."
 *   1500–2600  P3 INTELIGENCIA · chips FRÍO/TIBIO/CALIENTE + señales · "Detecta oportunidades, temperatura e ingreso recuperable."
 *   2600–3400  P4 RESULTADO    · 3 cards accionables · "Te dice a quién contactar, por qué y con qué mensaje."
 *   3400–4000  P5 HERO         · "Tu clínica ya tiene pacientes listos para volver. · KAIRO los encuentra." + cortina reveal
 *
 * Skip: ESC / Space / Enter / click / botón Skip. sessionStorage one-shot.
 * Reduced-motion: fade único 450ms, hero estático.
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

const SESSION_KEY = "kairo_intro_seen"
const REDUCED_DURATION = 450

const P1_END = 700
const P2_END = 1500
const P3_END = 2600
const P4_END = 3400
const P5_END = 4000
const DURATION = P5_END
const CURTAIN_AT = P5_END - 380

const expo = [0.16, 1, 0.3, 1] as const
const curtain = [0.85, 0, 0.15, 1] as const

type Tone = "amber" | "red"
const PROBLEMS: { t: string; tone: Tone; x: string; y: string; r: number; d: number }[] = [
  { t: "Consulta perdida",          tone: "red",   x: "8%",  y: "20%", r: -6, d: 0.00 },
  { t: "Cotización pendiente",      tone: "amber", x: "66%", y: "14%", r: 5,  d: 0.05 },
  { t: "Paciente antiguo",          tone: "amber", x: "14%", y: "60%", r: 4,  d: 0.08 },
  { t: "WhatsApp sin seguimiento",  tone: "red",   x: "60%", y: "62%", r: -5, d: 0.03 },
  { t: "Interesado en evaluación",  tone: "amber", x: "38%", y: "10%", r: 2,  d: 0.10 },
  { t: "No volvió a responder",     tone: "red",   x: "40%", y: "74%", r: -3, d: 0.12 },
]

const SOURCES = ["Contactos", "Chats de WhatsApp", "Servicios", "Historial"]
const SIGNALS = ["Objeción por precio", "Cotización pendiente", "Alto valor", "Listo para agendar"]
type Temp = { l: "FRÍO" | "TIBIO" | "CALIENTE"; cls: string }
const TEMPS: Temp[] = [
  { l: "FRÍO",     cls: "border-sky-400/40 bg-sky-400/10 text-sky-300" },
  { l: "TIBIO",    cls: "border-amber-400/40 bg-amber-400/10 text-amber-300" },
  { l: "CALIENTE", cls: "border-primary/50 bg-primary/15 text-primary" },
]

const RESULTS = [
  { k: "Oportunidades",        v: "detectadas",   accent: "#39FF88" },
  { k: "Ingreso recuperable",  v: "estimado",     accent: "#39FF88" },
  { k: "Campañas",             v: "recomendadas", accent: "#39FF88" },
]

const toneCls: Record<Tone, string> = {
  amber: "border-amber-500/35 bg-amber-500/10 text-amber-200",
  red:   "border-red-500/35 bg-red-500/10 text-red-200",
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
    timeoutRef.current = setTimeout(dismiss, DURATION + 60)

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
  const p5 = now >= P4_END && now < P5_END
  const curtainUp = now >= CURTAIN_AT

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="kairo-intro"
          role="dialog"
          aria-label="KAIRO"
          onClick={dismiss}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: expo } }}
          className="fixed inset-0 z-[100] overflow-hidden cursor-pointer"
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ backgroundColor: "#040706", willChange: "transform" }}
            animate={reduce ? { opacity: 0 } : curtainUp ? { y: "-100%" } : { y: "0%" }}
            transition={curtainUp ? { duration: 0.55, ease: curtain } : { duration: 0 }}
          >
            {/* depth layers */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(60% 45% at 50% 42%, rgba(57,255,136,0.10) 0%, transparent 62%)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(120% 100% at 50% 50%, transparent 30%, rgba(0,0,0,0.72) 100%)" }}
            />
            {/* faint grid for premium texture */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage: "radial-gradient(60% 50% at 50% 50%, black 40%, transparent 90%)",
              }}
            />

            {/* P1 · caos */}
            <AnimatePresence>
              {p1 && (
                <motion.div
                  key="p1"
                  className="absolute inset-0 z-10"
                  exit={{ opacity: 0, transition: { duration: 0.22, ease: expo } }}
                >
                  {PROBLEMS.map((p, i) => (
                    <motion.div
                      key={p.t}
                      className="absolute"
                      style={{ left: p.x, top: p.y }}
                      initial={{ opacity: 0, y: 14, scale: 0.92, rotate: p.r, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotate: p.r, filter: "blur(0px)" }}
                      transition={{ duration: 0.32, ease: expo, delay: p.d }}
                    >
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-md shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] ${toneCls[p.tone]}`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <span className="h-1 w-1 rounded-full bg-current opacity-80" />
                        {p.t}
                      </span>
                    </motion.div>
                  ))}
                  <motion.p
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.36, ease: expo, delay: 0.14 }}
                    className="absolute left-1/2 top-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 px-6 text-center text-3xl sm:text-5xl lg:text-6xl"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      color: "#F4F7F5",
                      lineHeight: 1.05,
                    }}
                  >
                    Hay <span style={{ color: "#39FF88" }}>ingresos ocultos</span> en tu clínica.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* P2 · ordena */}
            <AnimatePresence>
              {p2 && (
                <motion.div
                  key="p2"
                  className="absolute inset-0 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.22, ease: expo } }}
                  transition={{ duration: 0.22, ease: expo }}
                >
                  <motion.div
                    className="absolute left-1/2 top-[44%] w-[82%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-primary/30 p-4 backdrop-blur-xl"
                    style={{
                      backgroundColor: "rgba(8,12,10,0.86)",
                      boxShadow: "0 30px 90px -30px rgba(57,255,136,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                    initial={{ opacity: 0, scale: 0.92, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.42, ease: expo }}
                  >
                    <div className="mb-3 flex items-center justify-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#39FF88] animate-pulse" />
                      <span
                        className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Base Maestra
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {SOURCES.map((s, i) => (
                        <motion.div
                          key={s}
                          className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.24, ease: expo, delay: 0.16 + i * 0.05 }}
                        >
                          <span
                            className="text-[11px] text-white/90"
                            style={{ fontFamily: "var(--font-body)", fontWeight: 500 }}
                          >
                            {s}
                          </span>
                          <motion.span
                            className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#39FF88]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 540, damping: 22 }}
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
                    transition={{ duration: 0.3, ease: expo, delay: 0.18 }}
                    className="absolute bottom-[16%] left-1/2 w-full max-w-xl -translate-x-1/2 px-6 text-center text-base sm:text-xl"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      letterSpacing: "-0.015em",
                      color: "#F4F7F5",
                    }}
                  >
                    KAIRO analiza tu base y tus <span style={{ color: "#39FF88" }}>conversaciones</span>.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* P3 · inteligencia */}
            <AnimatePresence>
              {p3 && (
                <motion.div
                  key="p3"
                  className="absolute inset-0 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.22, ease: expo } }}
                  transition={{ duration: 0.22, ease: expo }}
                >
                  <div className="absolute left-1/2 top-[42%] flex w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 px-6">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {TEMPS.map((t, i) => (
                        <motion.span
                          key={t.l}
                          initial={{ opacity: 0, y: 10, scale: 0.85, filter: "blur(4px)" }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                          transition={{ duration: 0.3, ease: expo, delay: 0.04 + i * 0.08 }}
                          className={`inline-flex items-center gap-1 rounded-full border px-3.5 py-1 text-[12px] font-bold uppercase tracking-[0.16em] backdrop-blur-md ${t.cls}`}
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
                          transition={{ duration: 0.25, ease: expo, delay: 0.36 + i * 0.06 }}
                          className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/85 backdrop-blur-md"
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
                    transition={{ duration: 0.3, ease: expo, delay: 0.2 }}
                    className="absolute bottom-[16%] left-1/2 w-full max-w-xl -translate-x-1/2 px-6 text-center text-base sm:text-xl"
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

            {/* P4 · resultado accionable */}
            <AnimatePresence>
              {p4 && (
                <motion.div
                  key="p4"
                  className="absolute inset-0 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.22, ease: expo } }}
                  transition={{ duration: 0.22, ease: expo }}
                >
                  <div className="absolute left-1/2 top-[44%] grid w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-2 sm:gap-3 px-2">
                    {RESULTS.map((r, i) => (
                      <motion.div
                        key={r.k}
                        initial={{ opacity: 0, y: 18, scale: 0.94, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.36, ease: expo, delay: 0.04 + i * 0.08 }}
                        className="rounded-2xl border border-primary/25 p-3 sm:p-4 backdrop-blur-xl"
                        style={{
                          backgroundColor: "rgba(8,12,10,0.82)",
                          boxShadow: "0 24px 60px -24px rgba(57,255,136,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
                        }}
                      >
                        <div className="mb-1.5 h-1 w-6 rounded-full" style={{ backgroundColor: r.accent }} />
                        <p
                          className="text-[12px] sm:text-sm leading-tight text-white/95"
                          style={{ fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "-0.01em" }}
                        >
                          {r.k}
                        </p>
                        <p
                          className="mt-0.5 text-[10px] sm:text-[11px] uppercase tracking-[0.16em]"
                          style={{ fontFamily: "var(--font-body)", color: "rgba(57,255,136,0.85)" }}
                        >
                          {r.v}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: expo, delay: 0.22 }}
                    className="absolute bottom-[14%] left-1/2 w-full max-w-2xl -translate-x-1/2 px-6 text-center text-base sm:text-xl"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      letterSpacing: "-0.015em",
                      color: "#F4F7F5",
                    }}
                  >
                    Te dice <span style={{ color: "#39FF88" }}>a quién contactar</span>, por qué y con qué mensaje.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* P5 · hero */}
            <AnimatePresence>
              {p5 && (
                <motion.div
                  key="p5"
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2, ease: expo } }}
                  transition={{ duration: 0.28, ease: expo }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.36, ease: expo }}
                    className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 backdrop-blur-md"
                    style={{ boxShadow: "0 0 32px rgba(57,255,136,0.25)" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#39FF88]" />
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/85"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      KAIRO
                    </span>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.38, ease: expo, delay: 0.06 }}
                    className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: "#F4F7F5",
                      lineHeight: 1.05,
                    }}
                  >
                    Tu clínica ya tiene <span style={{ color: "#39FF88" }}>pacientes listos para volver</span>.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, ease: expo, delay: 0.22 }}
                    className="mt-3 text-base sm:text-xl"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      color: "rgba(244,247,245,0.78)",
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
