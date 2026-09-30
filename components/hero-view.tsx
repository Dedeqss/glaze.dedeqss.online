"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Plus } from "lucide-react"
import { useEffect, useState } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

const ROTATING_WORDS = [
  "dominance",
  "control",
  "authority",
  "precision",
  "supremacy",
]

function RotatingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  const word = ROTATING_WORDS[index]

  return (
    <span className="relative inline-block align-baseline text-[#7BB7D1]">
      {/* invisible sizer keeps layout width stable to the widest word */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        supremacy
      </span>

      {/* clipping window so words slide in/out cleanly */}
      <span className="absolute inset-x-0 bottom-0 top-[-0.15em] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={word}
            initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-110%", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-block whitespace-nowrap leading-[1.15]"
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* underline that gently breathes */}
      <motion.span
        aria-hidden="true"
        animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
        className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-[#7BB7D1]"
      />
    </span>
  )
}

export function HeroView() {
  return (
    <motion.section
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex min-h-screen items-center justify-center px-6 pt-16"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >

        <motion.h1
          variants={item}
          className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Absolute <RotatingWord /> over your server infrastructure.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/50 sm:text-lg"
        >
          GLAZE is an advanced, high-performance Discord bot engineered for
          untouchable security, comprehensive logging, and precise moderation.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <motion.a
            href="https://discord.com/oauth2/authorize?client_id=1527958276195487834&permissions=8&integration_type=0&scope=bot"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#7BB7D1] px-6 py-3 text-sm font-bold text-black transition-colors duration-200 ease-in-out hover:bg-[#8ec4da] sm:w-auto"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Add bot to your server
          </motion.a>

          <motion.a
            href="https://discord.gg/DNDHycacgf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#7BB7D1] bg-transparent px-6 py-3 text-sm font-bold text-[#7BB7D1] transition-colors duration-200 ease-in-out hover:bg-[#7BB7D1]/10 sm:w-auto"
          >
            Join our support server
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
