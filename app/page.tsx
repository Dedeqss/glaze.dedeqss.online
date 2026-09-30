"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { LoadingScreen } from "@/components/loading-screen"
import { SpaceBackground } from "@/components/space-background"
import { Navbar } from "@/components/navbar"
import { HeroView } from "@/components/hero-view"
import { CommandsView } from "@/components/commands-view"

type View = "home" | "commands"

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<View>("home")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = (next: View) => {
    setView(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="relative min-h-screen bg-[#09090b] text-white">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {!loading && (
        <>
          <SpaceBackground />
          <Navbar view={view} onNavigate={handleNavigate} />
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {view === "home" ? (
                <HeroView key="home" />
              ) : (
                <CommandsView key="commands" />
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </main>
  )
}
