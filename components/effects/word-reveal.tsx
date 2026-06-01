"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { CSSProperties, ReactNode } from "react"

/**
 * Word-by-word mask reveal. Each word is wrapped in an overflow-hidden span;
 * inner span translates from translateY(110%) → 0 with stagger.
 *
 * Reveals on mount by default. Pass `whenInView` to delay until scroll.
 */
export function WordReveal({
  text,
  className = "",
  style,
  whenInView = false,
  delay = 0,
  stagger = 0.06,
  duration = 0.85,
  as = "span",
}: {
  text: string
  className?: string
  style?: CSSProperties
  whenInView?: boolean
  delay?: number
  stagger?: number
  duration?: number
  as?: "span" | "h1" | "h2" | "h3" | "p"
}) {
  const reduce = useReducedMotion()
  const words = text.split(/(\s+)/) // keep spaces

  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: reduce ? 0 : stagger,
      },
    },
  }

  const word = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { y: "115%", opacity: 0 },
        visible: {
          y: "0%",
          opacity: 1,
          transition: { duration, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        },
      }

  const animateProp = whenInView ? undefined : "visible"
  const whileInViewProp = whenInView ? "visible" : undefined

  const Tag = motion[as] as typeof motion.span

  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      animate={animateProp}
      whileInView={whileInViewProp}
      viewport={whenInView ? { once: true, margin: "-12% 0px" } : undefined}
      variants={container}
      aria-label={text}
    >
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              paddingBottom: "0.18em",
              marginBottom: "-0.18em",
            }}
          >
            <motion.span
              style={{ display: "inline-block", willChange: "transform, opacity" }}
              variants={word}
            >
              {w}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}

/**
 * Mixed editorial title: grotesk ultra-bold line + serif italic line.
 * Mirrors the dual references (Members-grotesk + Es-la-última-vez-serif).
 *
 * Use for ALL section H2s to keep typography identity consistent.
 */
export function EditorialTitle({
  grotesk,
  italic,
  groteskFirst = true,
  align = "left",
  size = "lg",
  accent,
  className = "",
  as: As = "h2",
  whenInView = true,
  staggerBlocks = 0.18,
}: {
  grotesk: ReactNode
  italic: ReactNode
  groteskFirst?: boolean
  align?: "left" | "center"
  size?: "sm" | "md" | "lg" | "xl"
  accent?: ReactNode
  className?: string
  as?: "h1" | "h2" | "h3"
  whenInView?: boolean
  staggerBlocks?: number
}) {
  const sizes = {
    sm: "text-3xl sm:text-4xl lg:text-[2.6rem]",
    md: "text-4xl sm:text-5xl lg:text-[3rem]",
    lg: "text-4xl sm:text-5xl lg:text-[3.6rem]",
    xl: "text-5xl sm:text-6xl lg:text-[4.4rem]",
  }
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left"

  const grotesque = (
    <WordReveal
      as="span"
      text={typeof grotesk === "string" ? grotesk : ""}
      whenInView={whenInView}
      stagger={0.05}
      duration={0.9}
      className="block"
      style={{
        fontFamily: "var(--font-macro)",
        fontWeight: 900,
        letterSpacing: "-0.04em",
        lineHeight: 0.92,
        textTransform: "uppercase",
      }}
    />
  )

  const cursive = (
    <WordReveal
      as="span"
      text={typeof italic === "string" ? italic : ""}
      whenInView={whenInView}
      stagger={0.07}
      delay={staggerBlocks}
      duration={1.0}
      className="block"
      style={{
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontWeight: 400,
        letterSpacing: "-0.03em",
        lineHeight: 1.02,
        color: "var(--primary)",
      }}
    />
  )

  return (
    <As className={`${sizes[size]} ${alignCls} ${className}`} style={{ paddingBottom: "0.18em" }}>
      {accent && (
        <span
          className="block mb-4 sm:mb-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.32em",
            color: "var(--muted-foreground)",
          }}
        >
          {accent}
        </span>
      )}
      {groteskFirst ? (
        <>
          {grotesque}
          {cursive}
        </>
      ) : (
        <>
          {cursive}
          {grotesque}
        </>
      )}
    </As>
  )
}
