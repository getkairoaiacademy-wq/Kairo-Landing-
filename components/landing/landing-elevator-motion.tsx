"use client"

// Landing Elevator Motion — premium 5-act sequence explaining KAIRO in ~12s.
// Acts: 1) WhatsApp chaos  2) KAIRO scans  3) Base Maestra  4) Revenue recovery  5) CTA hint
// Respects prefers-reduced-motion. Lazy assets only — pure SVG/CSS + Framer Motion.

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Flame, MessageCircle, Sparkles, TrendingUp, Snowflake, Sun } from "lucide-react"

const ACTS = 5
const ACT_MS = 2600 // 5 acts × 2.6s ≈ 13s total cycle
const easeOut = [0.16, 1, 0.3, 1] as const

export function LandingElevatorMotion() {
  const reduce = useReducedMotion()
  const [act, setAct] = useState(0)

  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setAct((a) => (a + 1) % ACTS), ACT_MS)
    return () => window.clearInterval(t)
  }, [reduce])

  if (reduce) {
    // Static fallback for accessibility — show the final state (Base Maestra + metrics).
    return (
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#060B09] p-6 sm:p-10">
        <MasterBaseCard />
        <div className="mt-6"><RecoveryMetricsCard /></div>
      </div>
    )
  }

  return (
    <div
      className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10"
      style={{
        background: "linear-gradient(160deg, #0A1310 0%, #060B09 60%, #04100C 100%)",
        boxShadow: "0 60px 120px -60px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(57,255,136,0.04)",
        minHeight: 460,
      }}
      aria-label="KAIRO en movimiento: del caos al ingreso recuperable"
    >
      {/* ambient green glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 50% 30%, rgba(57,255,136,0.08) 0%, transparent 65%)" }}
      />
      {/* stage progress bar */}
      <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 p-3">
        {Array.from({ length: ACTS }).map((_, i) => (
          <div key={i} className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-[#39FF88]"
              initial={false}
              animate={{ scaleX: i < act ? 1 : i === act ? 1 : 0 }}
              transition={i === act ? { duration: ACT_MS / 1000, ease: "linear" } : { duration: 0.2 }}
              style={{ originX: 0 }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex h-[460px] items-center justify-center p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {act === 0 && (
            <motion.div key="act-1" {...fadeStage}>
              <Act1Chaos />
            </motion.div>
          )}
          {act === 1 && (
            <motion.div key="act-2" {...fadeStage}>
              <Act2Scan />
            </motion.div>
          )}
          {act === 2 && (
            <motion.div key="act-3" {...fadeStage}>
              <Act3MasterBase />
            </motion.div>
          )}
          {act === 3 && (
            <motion.div key="act-4" {...fadeStage}>
              <Act4Revenue />
            </motion.div>
          )}
          {act === 4 && (
            <motion.div key="act-5" {...fadeStage}>
              <Act5Cta />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const fadeStage = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.5, ease: easeOut },
} as const

// ===================== ACTS =====================

const CHAOS_MESSAGES = [
  "¿Cuánto cuesta?",
  "Lo veo y te aviso",
  "¿Hay horarios?",
  "Me interesa",
  "Quiero agendar",
  "¿Tienen carillas?",
  "¿Aceptan tarjeta?",
  "Cotización pendiente",
]

function Act1Chaos() {
  return (
    <div className="relative w-full max-w-2xl">
      <p className="mb-4 text-center text-[10px] uppercase tracking-[0.2em] text-white/40">
        Acto 1 — El caos comercial
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {CHAOS_MESSAGES.map((msg, i) => (
          <motion.div
            key={msg}
            initial={{ opacity: 0, y: 18, rotate: (i % 2 === 0 ? -1 : 1) * 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: easeOut }}
            className="rounded-xl border border-white/10 bg-white/[0.035] p-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <MessageCircle className="h-3 w-3 text-white/40" />
              <span className="text-[9px] uppercase tracking-wide text-white/35">WhatsApp</span>
            </div>
            <p className="text-[12px] leading-tight text-white/80">{msg}</p>
          </motion.div>
        ))}
      </div>
      <p className="mt-5 text-center text-xs text-white/45">
        Conversaciones, cotizaciones y contactos desordenados.
      </p>
    </div>
  )
}

function Act2Scan() {
  return (
    <div className="relative w-full max-w-xl">
      <p className="mb-4 text-center text-[10px] uppercase tracking-[0.2em] text-[#39FF88]">
        Acto 2 — KAIRO analiza
      </p>
      <div className="relative mx-auto h-44 w-full max-w-md overflow-hidden rounded-2xl border border-[#39FF88]/20 bg-black/40">
        {/* Scanner line */}
        <motion.div
          initial={{ y: -8 }}
          animate={{ y: 180 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, #39FF88, transparent)", boxShadow: "0 0 22px rgba(57,255,136,0.7)" }}
        />
        {/* Grid of "rows being processed" */}
        <div className="grid grid-cols-3 gap-1.5 p-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 0.7, 0.15] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
              className="h-3.5 rounded bg-[#39FF88]/30"
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-[10px]">
        {["Normaliza", "Detecta duplicados", "Cruza chats", "Clasifica"].map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-white/70"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function Act3MasterBase() {
  return (
    <div className="w-full max-w-2xl">
      <p className="mb-4 text-center text-[10px] uppercase tracking-[0.2em] text-white/50">
        Acto 3 — Base Maestra
      </p>
      <MasterBaseCard />
    </div>
  )
}

function MasterBaseCard() {
  const rows = [
    { name: "María L.", svc: "Carillas", temp: "caliente", obj: "Precio" },
    { name: "Ana R.", svc: "Implante", temp: "tibio", obj: "Tiempo" },
    { name: "Diego M.", svc: "Limpieza", temp: "frio", obj: "—" },
    { name: "Lucía P.", svc: "Ortodoncia", temp: "caliente", obj: "Cuotas" },
  ] as const

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-[#39FF88]" />
          <span className="text-[10px] uppercase tracking-wide text-white/60">Base Maestra · 142 contactos</span>
        </div>
        <span className="text-[10px] text-white/35">Hoy</span>
      </div>
      <div className="grid grid-cols-[1.2fr_1fr_0.8fr_1fr] gap-3 border-b border-white/[0.04] bg-white/[0.02] px-4 py-2 text-[9px] uppercase tracking-wide text-white/40">
        <span>Contacto</span>
        <span>Interés</span>
        <span>Temp.</span>
        <span>Objeción</span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {rows.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.08 }}
            className="grid grid-cols-[1.2fr_1fr_0.8fr_1fr] items-center gap-3 px-4 py-2.5 text-xs"
          >
            <span className="font-medium text-white">{r.name}</span>
            <span className="text-white/65">{r.svc}</span>
            <TempBadge temp={r.temp} />
            <span className="text-white/55">{r.obj}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function TempBadge({ temp }: { temp: "caliente" | "tibio" | "frio" }) {
  const cfg = {
    caliente: { label: "Caliente", color: "#39FF88", bg: "rgba(57,255,136,0.12)", Icon: Flame },
    tibio: { label: "Tibio", color: "#FFB35C", bg: "rgba(255,179,92,0.12)", Icon: Sun },
    frio: { label: "Frío", color: "#9FB4D7", bg: "rgba(159,180,215,0.12)", Icon: Snowflake },
  }[temp]
  const Icon = cfg.Icon
  return (
    <span
      className="inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ color: cfg.color, backgroundColor: cfg.bg }}
    >
      <Icon className="h-2.5 w-2.5" />
      {cfg.label}
    </span>
  )
}

function Act4Revenue() {
  return (
    <div className="w-full max-w-xl">
      <p className="mb-4 text-center text-[10px] uppercase tracking-[0.2em] text-white/50">
        Acto 4 — Ingreso recuperable estimado
      </p>
      <RecoveryMetricsCard />
      <p className="mt-3 text-center text-[10px] text-white/35">
        Cifras estimadas a partir de tu base. No constituyen promesa de ingresos.
      </p>
    </div>
  )
}

function RecoveryMetricsCard() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-[#39FF88]/25 bg-[#39FF88]/[0.05] p-5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wide text-white/55">Ingresos recuperables</span>
          <TrendingUp className="h-3.5 w-3.5 text-[#39FF88]" />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-2 font-display text-4xl font-extrabold tracking-tight text-white"
        >
          S/ <span style={{ color: "#39FF88" }}>18,420</span>
        </motion.p>
        <p className="mt-1 text-[11px] text-white/50">Estimado a partir de tu base actual</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { v: "32", l: "Oportunidades" },
          { v: "7", l: "Leads calientes" },
          { v: "3", l: "Campañas sugeridas" },
        ].map((m, i) => (
          <motion.div
            key={m.l}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"
          >
            <p className="font-display text-xl font-bold text-white">{m.v}</p>
            <p className="mt-0.5 text-[9px] uppercase tracking-wide text-white/45">{m.l}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Act5Cta() {
  return (
    <div className="w-full max-w-md text-center">
      <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#39FF88]">
        Acto 5 — Tu turno
      </p>
      <p className="font-display text-2xl sm:text-3xl font-extrabold leading-[1.1] tracking-tight text-white">
        Encuentra los pacientes que tu clínica <span style={{ color: "#39FF88" }}>ya tiene</span> listos para volver.
      </p>
      <p className="mt-3 text-sm text-white/55">
        La auditoría es gratuita. Te mostramos qué hay dormido en tu base.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#39FF88]/30 bg-[#39FF88]/[0.08] px-4 py-2 text-xs text-[#39FF88]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#39FF88]/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#39FF88]" />
        </span>
        Cupos limitados esta semana
      </motion.div>
    </div>
  )
}
