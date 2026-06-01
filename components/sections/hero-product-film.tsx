"use client"

/**
 * HeroProductFilm — Product film estilo Apple Keynote del sistema KAIRO
 * Revenue Recovery. Narrativa: problema (datos dispersos con estados de
 * abandono) → KAIRO ordena → analiza señales → prioriza → revela dinero
 * recuperable (con breakdown sumando al total) → conecta hallazgo→campaña →
 * prepara mensaje → flujo final iluminado paso a paso.
 *
 * Storyboard (~15.8s):
 *   1 Problem            1.5s · oportunidades dispersas con estados
 *   2 MasterBase         1.6s · KAIRO une todo
 *   3 RevenueScan        2.0s · lee señales comerciales
 *   4 Opportunities      1.8s · prioriza dónde actuar
 *   5 RecoverableRevenue 2.4s · MOMENTO WOW · breakdown sumando
 *   6 Campaigns          2.0s · hallazgo → campaña
 *   7 Message            2.2s · mensaje sugerido + aprobación humana
 *   8 Summary            1.8s · flujo paso a paso
 *
 * Tipografía font-body (Inter Tight). Iconos lucide-react, mismo stroke.
 * Respeta prefers-reduced-motion (frame estático en hero moment).
 */

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState, type ReactElement } from "react"
import {
  FileText,
  FileSpreadsheet,
  FileArchive,
  Users,
  MessageCircle,
  Sparkles,
  Target,
  Wallet,
  AlertCircle,
  Megaphone,
  Check,
  ArrowRight,
  Database,
  Send,
  Clock,
  Search,
} from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

type SceneDef = {
  id: string
  duration: number
  Comp: (props: { active: boolean }) => ReactElement
}

/* ─────────────────────────  primitives  ───────────────────────── */

function CountUp({ to, active, prefix = "", duration = 900 }: { to: number; active: boolean; prefix?: string; duration?: number }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!active) {
      setV(0)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, to, duration])
  return (
    <span className="tabular-nums">
      {prefix}
      {v.toLocaleString("es-PE")}
    </span>
  )
}

function Caption({ children, delay = 0.5 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease, delay }}
      className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium tracking-wide text-foreground/70 sm:text-xs"
    >
      {children}
    </motion.p>
  )
}

/* ─────────────────────────  1 · problem (con estados)  ───────────────────────── */

const SCATTERED = [
  { name: "contactos.csv", Icon: FileText, x: "8%", y: "20%", r: -6, status: "Sin seguimiento", tone: "amber" as const },
  { name: "chats_whatsapp", Icon: MessageCircle, x: "62%", y: "12%", r: 5, status: "Cliente interesado", tone: "green" as const },
  { name: "cotizaciones.xlsx", Icon: FileSpreadsheet, x: "14%", y: "62%", r: 3, status: "Cotización pendiente", tone: "amber" as const },
  { name: "leads_antiguos.csv", Icon: Users, x: "66%", y: "62%", r: -4, status: "Sin respuesta", tone: "red" as const },
  { name: "conversaciones.txt", Icon: FileText, x: "40%", y: "38%", r: 2, status: "Consultó · no cerró", tone: "amber" as const },
]

function StatusFile({ name, Icon, status, tone }: { name: string; Icon: typeof FileText; status: string; tone: "amber" | "green" | "red" }) {
  const tones = {
    amber: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    green: "bg-primary/15 text-primary border-primary/30",
    red: "bg-red-500/15 text-red-400 border-red-500/25",
  }
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border/60 bg-background/90 px-2.5 py-1.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3 w-3 text-foreground/70" />
        <span className="whitespace-nowrap text-[10px] font-medium text-foreground">{name}</span>
      </div>
      <span className={`inline-flex w-fit items-center gap-1 rounded-full border px-1.5 py-0.5 text-[8px] font-medium ${tones[tone]}`}>
        <Clock className="h-2 w-2" /> {status}
      </span>
    </div>
  )
}

function ProblemScene() {
  return (
    <div className="relative h-full w-full">
      {SCATTERED.map((f, i) => (
        <motion.div
          key={f.name}
          className="absolute"
          style={{ left: f.x, top: f.y }}
          initial={{ opacity: 0, scale: 0.85, y: 8, rotate: f.r }}
          animate={{ opacity: [0, 1, 1], scale: [0.85, 1, 1], y: [8, 0, -3, 0], rotate: f.r }}
          transition={{
            opacity: { duration: 0.4, delay: 0.05 + i * 0.06, ease },
            scale: { duration: 0.4, delay: 0.05 + i * 0.06, ease },
            y: { duration: 3.4, delay: 0.05 + i * 0.06, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <StatusFile name={f.name} Icon={f.Icon} status={f.status} tone={f.tone} />
        </motion.div>
      ))}
      <motion.p
        initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
        animate={{ opacity: [0, 1, 1, 0], y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.4, ease, delay: 0.5, times: [0, 0.2, 0.7, 1] }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium tracking-wide text-foreground/75 sm:text-xs"
      >
        Tus oportunidades están dispersas
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease, delay: 1.05 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium tracking-wide text-foreground/75 sm:text-xs"
      >
        en chats, cotizaciones y bases olvidadas
      </motion.p>
    </div>
  )
}

/* ─────────────────────────  2 · master base  ───────────────────────── */

const CONVERGE = [
  { name: "contactos.csv", Icon: FileText, from: { x: "6%", y: "18%", r: -6 } },
  { name: "chats_whatsapp", Icon: MessageCircle, from: { x: "78%", y: "12%", r: 5 } },
  { name: "cotizaciones.xlsx", Icon: FileSpreadsheet, from: { x: "14%", y: "70%", r: 3 } },
  { name: "leads_antiguos.csv", Icon: Users, from: { x: "74%", y: "70%", r: -4 } },
]

function MiniChip({ name, Icon }: { name: string; Icon: typeof FileText }) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/90 px-2 py-1.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <Icon className="h-3 w-3 text-foreground/70" />
      <span className="whitespace-nowrap text-[10px] font-medium text-foreground">{name}</span>
    </div>
  )
}

function MasterBaseScene() {
  return (
    <div className="relative h-full w-full">
      {CONVERGE.map((f, i) => (
        <motion.div
          key={f.name}
          className="absolute"
          initial={{ left: f.from.x, top: f.from.y, opacity: 0, rotate: f.from.r, scale: 1 }}
          animate={{
            left: [f.from.x, f.from.x, "44%"],
            top: [f.from.y, f.from.y, "42%"],
            opacity: [0, 1, 0],
            rotate: [f.from.r, f.from.r, 0],
            scale: [1, 1, 0.7],
          }}
          transition={{ duration: 1.1, delay: 0.05 + i * 0.06, ease, times: [0, 0.2, 1] }}
        >
          <MiniChip name={f.name} Icon={f.Icon} />
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 w-[62%] max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-primary/30 bg-background/90 p-3.5 backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.9, boxShadow: "0 0 0 rgba(34,197,94,0)" }}
        animate={{
          opacity: 1,
          scale: 1,
          boxShadow: ["0 0 0 rgba(34,197,94,0)", "0 16px 48px -16px rgba(34,197,94,0.35)"],
        }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
      >
        <div className="mb-2 flex items-center gap-1.5">
          <Database className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-wide text-foreground">Base Maestra</span>
        </div>
        <div className="space-y-1">
          {[
            { l: "Contactos", n: "40", I: Users },
            { l: "Chats", n: "2 unidos", I: MessageCircle },
            { l: "Cotizaciones", n: "17", I: FileSpreadsheet },
            { l: "Historial", n: "completo", I: Clock },
          ].map((r, i) => (
            <motion.div
              key={r.l}
              className="flex items-center justify-between gap-2"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, ease, delay: 0.7 + i * 0.1 }}
            >
              <div className="flex items-center gap-1.5">
                <r.I className="h-2.5 w-2.5 text-foreground/60" />
                <span className="text-[10px] text-foreground/80">{r.l}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-semibold text-foreground">{r.n}</span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.88 + i * 0.1, type: "spring", stiffness: 500, damping: 22 }}
                  className="flex h-3 w-3 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Check className="h-2 w-2" />
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Caption delay={0.6}>KAIRO lo ordena todo.</Caption>
    </div>
  )
}

/* ─────────────────────────  3 · revenue scan  ───────────────────────── */

function RevenueScanScene() {
  const signals = [
    { l: "Intención", at: { x: "16%", y: "22%" }, line: { x1: "30%", y1: "30%", x2: "44%", y2: "46%" }, delay: 0.25 },
    { l: "Objeción", at: { x: "70%", y: "20%" }, line: { x1: "70%", y1: "28%", x2: "56%", y2: "46%" }, delay: 0.4 },
    { l: "Prioridad", at: { x: "14%", y: "66%" }, line: { x1: "28%", y1: "66%", x2: "44%", y2: "56%" }, delay: 0.55 },
    { l: "Potencial", at: { x: "72%", y: "66%" }, line: { x1: "70%", y1: "64%", x2: "56%", y2: "56%" }, delay: 0.7 },
  ]
  return (
    <div className="relative h-full w-full">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {signals.map((s) => (
          <motion.line
            key={s.l}
            x1={s.line.x1}
            y1={s.line.y1}
            x2={s.line.x2}
            y2={s.line.y2}
            stroke="currentColor"
            className="text-primary/50"
            strokeWidth="1"
            strokeDasharray="2 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease, delay: s.delay + 0.1 }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 w-[46%] max-w-[15rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border/60 bg-background/90 p-2.5 shadow-2xl backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">ML</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-foreground">María L.</p>
            <p className="truncate text-[9px] text-muted-foreground">Cotizó · no cerró</p>
          </div>
          <Search className="h-3 w-3 text-primary/70" />
        </div>
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeInOut" }}
        />
      </motion.div>

      {signals.map((s) => (
        <motion.div
          key={s.l}
          className="absolute"
          style={{ left: s.at.x, top: s.at.y }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease, delay: s.delay }}
        >
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/35 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary backdrop-blur-md">
            <Sparkles className="h-2.5 w-2.5" /> {s.l}
          </span>
        </motion.div>
      ))}

      <Caption delay={0.95}>KAIRO lee señales comerciales.</Caption>
    </div>
  )
}

/* ─────────────────────────  4 · opportunities (prioridades)  ───────────────────────── */

const OPPS = [
  { Icon: Target, n: "23", l: "Listos para retomar", prio: "Alta" as const },
  { Icon: FileText, n: "12", l: "Cotizaciones abiertas", prio: "Media" as const },
  { Icon: AlertCircle, n: "8", l: "Objeción por precio", prio: "Media" as const },
]

function OpportunitiesScene() {
  const prioTone = (p: "Alta" | "Media" | "Baja") =>
    p === "Alta"
      ? "border-primary/40 bg-primary/15 text-primary"
      : "border-border/60 bg-foreground/[0.04] text-muted-foreground"
  return (
    <div className="relative h-full w-full">
      <div className="flex h-full items-center justify-center gap-2.5 px-4 sm:gap-3">
        {OPPS.map((o, i) => {
          const isHigh = o.prio === "Alta"
          return (
            <motion.div
              key={o.l}
              className="relative flex flex-1 flex-col items-start gap-1 rounded-xl border border-border/55 bg-background/85 px-3 py-3 backdrop-blur-md"
              initial={{ opacity: 0, y: 14 }}
              animate={{
                opacity: 1,
                y: 0,
                borderColor: isHigh
                  ? ["rgba(255,255,255,0.08)", "rgba(34,197,94,0.6)"]
                  : ["rgba(255,255,255,0.08)", "rgba(34,197,94,0.4)", "rgba(255,255,255,0.08)"],
                boxShadow: isHigh ? ["0 0 0 rgba(34,197,94,0)", "0 16px 36px -18px rgba(34,197,94,0.45)"] : "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{
                opacity: { duration: 0.4, delay: 0.1 + i * 0.12, ease },
                y: { duration: 0.4, delay: 0.1 + i * 0.12, ease },
                borderColor: { duration: 0.7, delay: 0.5 + i * 0.18, ease },
                boxShadow: { duration: 0.7, delay: 0.6, ease },
              }}
            >
              <div className="flex w-full items-center justify-between">
                <o.Icon className="h-3.5 w-3.5 text-primary" />
                <span className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide ${prioTone(o.prio)}`}>
                  {o.prio}
                </span>
              </div>
              <p className="text-2xl font-bold leading-none tracking-tight text-foreground sm:text-3xl">{o.n}</p>
              <p className="text-[10px] leading-tight text-muted-foreground">{o.l}</p>
            </motion.div>
          )
        })}
      </div>
      <Caption delay={0.5}>KAIRO prioriza dónde actuar.</Caption>
    </div>
  )
}

/* ─────────────────────────  5 · recoverable revenue (HERO con breakdown)  ───────────────────────── */

const BREAKDOWN = [
  { l: "12 cotizaciones abiertas", v: 2400 },
  { l: "23 clientes con intención", v: 2100 },
  { l: "8 objeciones por precio", v: 1259 },
]

function RecoverableRevenueScene({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-background/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease }}
      />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          Ingresos recuperables
        </motion.p>
        <motion.p
          className="mt-1.5 text-5xl font-bold tracking-tight text-primary sm:text-7xl"
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, ease, delay: 0.1 }}
        >
          <CountUp to={5759} prefix="S/" active={active} duration={1300} />
        </motion.p>
        <motion.p
          className="mt-1 text-[11px] text-foreground/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.3 }}
        >
          Dinero que ya estaba en tu base
        </motion.p>

        <div className="mt-3.5 flex w-full max-w-xs flex-col gap-1">
          {BREAKDOWN.map((b, i) => (
            <motion.div
              key={b.l}
              className="flex items-center justify-between gap-2 rounded-md border border-border/40 bg-background/60 px-2 py-1 backdrop-blur-md"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease, delay: 1.5 + i * 0.18 }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span className="text-[9.5px] text-foreground/80">{b.l}</span>
              </div>
              <span className="text-[10px] font-semibold text-primary tabular-nums">
                S/{b.v.toLocaleString("es-PE")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────  6 · campaigns (hallazgo → campaña)  ───────────────────────── */

const FLOWS = [
  { from: "Cotizaciones abiertas", to: "Recuperar cotizaciones", pot: "S/699", prio: "Media" as const },
  { from: "Objeción por precio", to: "Resolver objeción", pot: "S/530", prio: "Alta" as const },
  { from: "Clientes antiguos", to: "Reactivar clientes", pot: "S/407", prio: "Media" as const },
]

function CampaignsScene() {
  return (
    <div className="relative h-full w-full">
      <div className="flex h-full flex-col items-center justify-center gap-1.5 px-3">
        {FLOWS.map((f, i) => {
          const isHigh = f.prio === "Alta"
          return (
            <motion.div
              key={f.to}
              className="flex w-full max-w-md items-center gap-2 rounded-xl border border-border/55 bg-background/85 px-2.5 py-2 backdrop-blur-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                borderColor: isHigh
                  ? ["rgba(255,255,255,0.08)", "rgba(34,197,94,0.55)"]
                  : "rgba(255,255,255,0.08)",
                boxShadow: isHigh
                  ? ["0 0 0 rgba(34,197,94,0)", "0 14px 36px -20px rgba(34,197,94,0.4)"]
                  : "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{
                opacity: { duration: 0.4, delay: 0.15 + i * 0.18, ease },
                y: { duration: 0.4, delay: 0.15 + i * 0.18, ease },
                borderColor: { duration: 0.6, delay: 0.9, ease },
                boxShadow: { duration: 0.6, delay: 0.9, ease },
              }}
            >
              {/* finding */}
              <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg bg-foreground/[0.04] px-2 py-1.5">
                <AlertCircle className="h-3 w-3 shrink-0 text-amber-400" />
                <span className="truncate text-[10px] font-medium text-foreground/85">{f.from}</span>
              </div>

              {/* arrow */}
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease, delay: 0.45 + i * 0.18 }}
              >
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
              </motion.div>

              {/* campaign */}
              <div className="flex min-w-0 flex-[1.2] items-center gap-1.5 rounded-lg bg-primary/10 px-2 py-1.5">
                <Megaphone className="h-3 w-3 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-semibold leading-tight text-foreground">{f.to}</p>
                  <p className="text-[8px] leading-tight text-muted-foreground">
                    {f.pot} · Prioridad {f.prio}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      <Caption delay={0.8}>KAIRO convierte hallazgos en campañas.</Caption>
    </div>
  )
}

/* ─────────────────────────  7 · message + approval  ───────────────────────── */

const MSG = "Hola María, vi que habías consultado por un servicio. Tengo una opción que puede ayudarte sin salirte de tu presupuesto. ¿Te gustaría que te mande los detalles?"

function useTypewriter(text: string, startMs: number, msPerChar: number) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    const start = window.setTimeout(() => {
      const id = window.setInterval(() => {
        setN((v) => {
          if (v >= text.length) {
            clearInterval(id)
            return v
          }
          return v + 1
        })
      }, msPerChar)
    }, startMs)
    return () => clearTimeout(start)
  }, [text, startMs, msPerChar])
  return text.slice(0, n)
}

function MessageScene() {
  const typed = useTypewriter(MSG, 500, 14)
  return (
    <div className="relative flex h-full items-center justify-center px-3">
      <motion.div
        className="relative w-full max-w-sm rounded-2xl border border-border/65 bg-background/90 p-3.5 shadow-2xl backdrop-blur-md"
        initial={{ opacity: 0, x: 28, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="mb-2.5 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary">ML</div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium leading-tight text-foreground">María L.</p>
            <p className="text-[9px] leading-tight text-muted-foreground">Campaña · Resolver objeción</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary">
            <Sparkles className="h-2.5 w-2.5" /> Sugerido
          </span>
        </div>
        <motion.div
          className="mb-2 inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          transition={{ delay: 0.35, duration: 0.45 }}
        >
          <AlertCircle className="h-2.5 w-2.5 text-amber-400" />
          <span className="text-[9px] font-medium text-amber-400">Objeción detectada: precio</span>
        </motion.div>
        <p className="min-h-[3.5rem] rounded-lg bg-foreground/[0.04] p-2.5 text-[10px] leading-relaxed text-foreground/90">
          {typed}
          <span className="ml-0.5 inline-block h-2.5 w-[1px] -translate-y-px animate-pulse bg-primary align-middle" />
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <motion.span
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-1.5 text-[11px] font-semibold text-primary-foreground"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            Revisar mensaje <ArrowRight className="h-3 w-3" />
          </motion.span>
          <span className="whitespace-nowrap text-[9px] text-muted-foreground">Pendiente de aprobación</span>
        </div>
        <motion.div
          className="mt-1.5 flex items-center justify-center gap-1 text-primary"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75, duration: 0.35 }}
        >
          <Check className="h-3 w-3" />
          <span className="text-[9px] font-medium">Listo para revisar · tú apruebas antes de enviar</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────  8 · summary (flujo iluminado)  ───────────────────────── */

const FLOW_STEPS = [
  { t: "Base ordenada", Icon: Database },
  { t: "Oportunidades", Icon: Target },
  { t: "Campañas", Icon: Megaphone },
  { t: "Mensajes", Icon: Send },
  { t: "Ingresos", Icon: Wallet },
]

function SummaryScene() {
  return (
    <motion.div
      className="relative flex h-full flex-col items-center justify-center px-5 text-center"
      initial={{ scale: 1.025 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.4, ease }}
    >
      <div aria-hidden className="absolute inset-0 bg-radial-green opacity-70" />

      <motion.p
        className="relative max-w-md text-base font-semibold leading-snug tracking-tight text-foreground sm:text-lg"
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease }}
      >
        KAIRO encuentra el dinero que tu negocio <span className="text-gradient-green">dejó escapar</span>.
      </motion.p>

      <div className="relative mt-5 flex items-center justify-center gap-1.5 sm:gap-2">
        {FLOW_STEPS.map((s, i) => (
          <div key={s.t} className="flex items-center gap-1.5 sm:gap-2">
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0.25, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease, delay: 0.4 + i * 0.18 }}
            >
              <motion.span
                className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15"
                initial={{ boxShadow: "0 0 0 rgba(34,197,94,0)" }}
                animate={{ boxShadow: ["0 0 0 rgba(34,197,94,0)", "0 0 18px rgba(34,197,94,0.45)"] }}
                transition={{ duration: 0.45, ease, delay: 0.4 + i * 0.18 }}
              >
                <s.Icon className="h-3 w-3 text-primary" />
              </motion.span>
              <span className="whitespace-nowrap text-[9px] font-medium text-foreground/80">{s.t}</span>
            </motion.div>
            {i < FLOW_STEPS.length - 1 && (
              <motion.span
                className="block h-px w-4 origin-left bg-primary/50 sm:w-6"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease, delay: 0.55 + i * 0.18 }}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────  timeline (~15.8s)  ───────────────────────── */

const SCENES: SceneDef[] = [
  { id: "problem",     duration: 1500, Comp: () => <ProblemScene /> },
  { id: "masterbase",  duration: 1600, Comp: () => <MasterBaseScene /> },
  { id: "scan",        duration: 2000, Comp: () => <RevenueScanScene /> },
  { id: "opps",        duration: 1800, Comp: () => <OpportunitiesScene /> },
  { id: "revenue",     duration: 2400, Comp: ({ active }) => <RecoverableRevenueScene active={active} /> },
  { id: "campaigns",   duration: 2000, Comp: () => <CampaignsScene /> },
  { id: "message",     duration: 2700, Comp: () => <MessageScene /> },
  { id: "summary",     duration: 1800, Comp: () => <SummaryScene /> },
]

function useTimeline(enabled: boolean) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (!enabled) return
    const t = setTimeout(() => setIdx((i) => (i + 1) % SCENES.length), SCENES[idx].duration)
    return () => clearTimeout(t)
  }, [idx, enabled])
  return idx
}

export function HeroProductFilm() {
  const reduce = useReducedMotion()
  const [inView, setInView] = useState(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const idx = useTimeline(!reduce && inView)
  const active = reduce ? 4 : idx
  const s = SCENES[active]

  return (
    <div ref={wrapRef} className="relative w-full font-body">
      <div aria-hidden className="pointer-events-none absolute -inset-12 rounded-[3rem] bg-primary/10 blur-[120px]" />

      <div className="relative mb-3 flex items-center justify-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          KAIRO · Revenue Recovery
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-b from-background/95 to-background/80 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            color: "var(--foreground)",
          }}
        />

        <AnimatePresence mode="sync">
          <motion.div
            key={`scene-${active}`}
            className="absolute inset-0"
            initial={{ opacity: 0, filter: "blur(8px)", scale: 1.015 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)", scale: 0.995 }}
            transition={{
              opacity: { duration: 0.55, ease },
              filter: { duration: 0.55, ease },
              scale: { duration: 0.9, ease },
            }}
          >
            <div className="absolute inset-0 p-4 sm:p-5">
              <s.Comp active={true} />
            </div>
          </motion.div>
        </AnimatePresence>

        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
      </div>

      <div className="mt-3 flex gap-1.5">
        {SCENES.map((sc, i) => (
          <span key={sc.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-foreground/10">
            <motion.span
              className="block h-full bg-primary"
              initial={false}
              animate={{ width: i < active ? "100%" : i === active ? "60%" : "0%" }}
              transition={{ duration: 0.3, ease }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
