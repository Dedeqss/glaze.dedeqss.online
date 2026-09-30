"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

type Star = {
  left: string
  top: string
  size: number
  duration: number
  delay: number
}

type Shooter = {
  top: string
  left: string
  duration: number
  delay: number
  repeatDelay: number
  distance: number
}

function useStableRandom<T>(count: number, factory: (i: number) => T): T[] {
  return useMemo(
    () => Array.from({ length: count }, (_, i) => factory(i)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count],
  )
}

export function SpaceBackground() {
  const stars = useStableRandom<Star>(70, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 5,
  }))

  const shooters = useStableRandom<Shooter>(5, (i) => ({
    top: `${Math.random() * 55}%`,
    left: `${Math.random() * 60 + 20}%`,
    duration: Math.random() * 0.6 + 0.7,
    delay: i * 2.4 + Math.random() * 2,
    repeatDelay: Math.random() * 7 + 8,
    distance: Math.random() * 160 + 220,
  }))

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#09090b]"
    >
      {/* subtle radial depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(123,183,209,0.08),transparent_55%)]" />

      {/* drifting particles */}
      {stars.map((star, i) => (
        <motion.span
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1], y: [0, -12, 0] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* shooting stars */}
      {shooters.map((s, i) => (
        <motion.span
          key={`shooter-${i}`}
          className="absolute h-px w-24 bg-gradient-to-r from-transparent via-[#7BB7D1] to-white"
          style={{
            top: s.top,
            left: s.left,
            rotate: "45deg",
            transformOrigin: "left center",
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, s.distance],
            y: [0, s.distance],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: s.repeatDelay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  )
}
