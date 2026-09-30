"use client"

import { motion } from "framer-motion"
import { ExternalLink, Terminal } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

type View = "home" | "commands"

export function Navbar({
  view,
  onNavigate,
}: {
  view: View
  onNavigate: (view: View) => void
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#09090b]/70 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <button
          onClick={() => onNavigate("home")}
          className="group flex items-center gap-3 transition-opacity duration-200 ease-in-out hover:opacity-80"
        >
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10">
            <img
              src="/avatar-glaze.jpg"
              alt="GLAZE bot avatar"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="text-sm font-bold tracking-[0.25em] text-[#7BB7D1]">
            GLAZE
          </span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onNavigate("commands")}
            className={`relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
              view === "commands"
                ? "text-[#7BB7D1]"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Terminal className="h-4 w-4" strokeWidth={1.5} />
            <span>Commands</span>
            {view === "commands" && (
              <motion.span
                layoutId="nav-underline"
                className="absolute inset-x-2 -bottom-[1px] h-px bg-[#7BB7D1]"
                transition={{ duration: 0.4, ease: EASE }}
              />
            )}
          </button>

          <a
            href="https://discord.gg/4FmVnRCw36"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white/60 transition-colors duration-200 ease-in-out hover:text-white"
          >
            <span>Support Server</span>
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
