"use client"

import { motion } from "framer-motion"
import { Loader2, ShieldCheck } from "lucide-react"

const EASE = [0.16, 1, 0.3, 1] as const

export function LoadingScreen() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b]"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col items-center gap-8"
      >
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <Loader2 className="h-8 w-8 animate-spin text-[#7BB7D1]" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#7BB7D1]" strokeWidth={1.5} />
            <p className="text-sm font-medium tracking-wide text-white/90">
              Verifying secure connection...
            </p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
            className="text-xs tracking-wide text-white/40"
          >
            Checking browser capabilities...
          </motion.p>
        </div>

        <div className="h-px w-48 overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.4, ease: EASE, repeat: Infinity }}
            className="h-full w-1/2 bg-[#7BB7D1]"
          />
        </div>
      </motion.div>

      <p className="absolute bottom-8 text-[11px] tracking-widest text-white/20">
        GLAZE SECURITY GATEWAY
      </p>
    </motion.div>
  )
}
