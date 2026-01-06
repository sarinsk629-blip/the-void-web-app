"use client"

import type { Sphere } from "./mharmyraux-app"
import { cn } from "@/lib/utils"

interface SphereNavigationProps {
  currentSphere: Sphere
  onChangeSphere: (sphere: Sphere) => void
}

export function SphereNavigation({ currentSphere, onChangeSphere }: SphereNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5">
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {/* The Void */}
        <button
          onClick={() => onChangeSphere("void")}
          className={cn(
            "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
            currentSphere === "void" ? "bg-violet-500/20" : "hover:bg-white/5",
          )}
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center transition-all",
              currentSphere === "void" && "void-glow scale-110",
            )}
          >
            <div className="w-3 h-3 rounded-full bg-background/50" />
          </div>
          <span
            className={cn(
              "text-[10px] font-medium transition-colors",
              currentSphere === "void" ? "text-violet-400" : "text-muted-foreground",
            )}
          >
            Void
          </span>
        </button>

        {/* The Pulse */}
        <button
          onClick={() => onChangeSphere("pulse")}
          className={cn(
            "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
            currentSphere === "pulse" ? "bg-emerald-500/20" : "hover:bg-white/5",
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center transition-all",
              currentSphere === "pulse" && "pulse-glow scale-110 animate-heartbeat",
            )}
          >
            <div className="w-4 h-4 rounded-full bg-background/50" />
          </div>
          <span
            className={cn(
              "text-[10px] font-medium transition-colors",
              currentSphere === "pulse" ? "text-emerald-400" : "text-muted-foreground",
            )}
          >
            Pulse
          </span>
        </button>

        {/* The Zenith */}
        <button
          onClick={() => onChangeSphere("zenith")}
          className={cn(
            "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
            currentSphere === "zenith" ? "bg-amber-500/20" : "hover:bg-white/5",
          )}
        >
          <div
            className={cn(
              "w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center transition-all",
              currentSphere === "zenith" && "zenith-glow scale-110",
            )}
          >
            <div className="w-3 h-3 rounded-full bg-background/50" />
          </div>
          <span
            className={cn(
              "text-[10px] font-medium transition-colors",
              currentSphere === "zenith" ? "text-amber-400" : "text-muted-foreground",
            )}
          >
            Zenith
          </span>
        </button>
      </div>
    </nav>
  )
}
