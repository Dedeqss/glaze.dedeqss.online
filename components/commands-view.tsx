"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Lock, Terminal } from "lucide-react"
import { CATEGORIES, COMMANDS, type Command } from "@/lib/commands-data"

const EASE = [0.16, 1, 0.3, 1] as const

function CommandCard({ command }: { command: Command }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASE }}
      whileHover={{ y: -4 }}
      className="group flex flex-col gap-4 rounded-xl border border-white/5 bg-[#121212] p-5 transition-colors duration-200 ease-in-out hover:border-[#ffffff]/40"
    >
      <div className="flex items-center gap-2">
        <Terminal
          className="h-4 w-4 text-white/30 transition-colors duration-200 ease-in-out group-hover:text-[#ffffff]"
          strokeWidth={1.5}
        />
        <h3 className="font-mono text-base font-bold text-white">
          {command.name}
        </h3>
      </div>

      <p className="text-sm leading-relaxed text-white/45">{command.desc}</p>

      <div className="mt-auto flex flex-col gap-2 border-t border-white/5 pt-4">
        <div className="flex items-start gap-2 text-xs">
          <span className="shrink-0 font-medium text-white/40">Arguments:</span>
          <code className="font-mono text-[#ffffff]">{command.args}</code>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="shrink-0 font-medium text-white/40">Access:</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 font-medium text-white/70">
            <Lock className="h-3 w-3" strokeWidth={1.5} />
            {command.access}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function CommandsView() {
  const [active, setActive] = useState<string>("All")

  const filtered = useMemo(() => {
    if (active === "All") return COMMANDS
    return COMMANDS.filter((c) => c.category === active)
  }, [active])

  return (
    <motion.section
      key="commands"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto min-h-screen max-w-6xl px-6 pb-24 pt-28"
    >
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Command Reference
        </h2>
        <p className="mt-2 text-sm text-white/45">
          A complete registry of every module, argument, and access level.
        </p>
      </div>

      <div className="scrollbar-none -mx-6 mb-10 flex gap-2 overflow-x-auto px-6 pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`relative shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ease-in-out ${
              active === cat
                ? "text-black"
                : "border border-white/10 text-white/60 hover:text-white"
            }`}
          >
            {active === cat && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-[#ffffff]"
                transition={{ duration: 0.4, ease: EASE }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((command) => (
            <CommandCard key={command.name} command={command} />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  )
}
