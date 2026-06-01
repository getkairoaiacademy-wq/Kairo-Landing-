"use client"

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { forwardRef, useRef, type MouseEvent, type ReactNode } from "react"

type Variant = "primary" | "ghost"

type Props = {
  children: ReactNode
  onClick?: () => void
  variant?: Variant
  className?: string
  showArrow?: boolean
  ariaLabel?: string
  type?: "button" | "submit"
  full?: boolean
}

/**
 * Magnetic premium CTA button.
 *  - Pointer attracts the button (±10px) with spring physics (no useState in hot path)
 *  - Inner label receives stronger pull, creating a parallax 'glide' feel
 *  - Light sweep shimmer on hover (CSS)
 *  - Halo glow scales up on hover
 *  - Touch / reduced-motion: no transform, no shimmer animation
 */
export const MagneticButton = forwardRef<HTMLButtonElement, Props>(function MagneticButton(
  { children, onClick, variant = "primary", className = "", showArrow = true, ariaLabel, type = "button", full = false },
  ref
) {
  const wrapRef = useRef<HTMLSpanElement | null>(null)
  const reduce = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 })
  // Label glides 1.6× further than button → premium parallax
  const lx = useTransform(sx, (v) => v * 1.6)
  const ly = useTransform(sy, (v) => v * 1.6)

  const onMove = (e: MouseEvent<HTMLSpanElement>) => {
    if (reduce) return
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = (e.clientX - cx) / (r.width / 2)
    const dy = (e.clientY - cy) / (r.height / 2)
    x.set(dx * 10)
    y.set(dy * 10)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    "magnetic-btn group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold text-base whitespace-nowrap select-none transition-[box-shadow,opacity] duration-300"
  const sizing = full ? "w-full px-8 py-4" : "px-8 py-4"

  const skins: Record<Variant, string> = {
    primary:
      "bg-primary text-primary-foreground glow-green hover:opacity-95",
    ghost:
      "bg-white/[0.04] text-foreground border border-white/12 hover:bg-white/[0.07] hover:border-white/25 backdrop-blur-sm",
  }

  return (
    <motion.span
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={full ? "block w-full" : "inline-block"}
    >
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`${base} ${sizing} ${skins[variant]} ${className}`}
      >
        {/* Shimmer overlay */}
        <span aria-hidden="true" className="magnetic-shimmer" />
        <motion.span
          style={{ x: lx, y: ly }}
          className="relative inline-flex items-center gap-2"
        >
          {children}
          {showArrow && (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </motion.span>
      </button>
    </motion.span>
  )
})
