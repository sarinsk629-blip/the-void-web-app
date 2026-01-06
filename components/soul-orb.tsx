"use client"

import type { Soul } from "./mharmyraux-app"
import { cn } from "@/lib/utils"

interface SoulOrbProps {
  soul: Soul
  onClick: () => void
  delay?: number
  variant?: "void" | "pulse" | "zenith"
  compact?: boolean
}

export function SoulOrb({ soul, onClick, delay = 0, variant = "void", compact = false }: SoulOrbProps) {
  const variantStyles = {
    void: "from-violet-500 to-indigo-700 hover:void-glow",
    pulse: "from-emerald-400 to-teal-600 hover:pulse-glow",
    zenith: "from-amber-400 to-orange-500 hover:zenith-glow",
  }

  const frequencyBars = Math.ceil(soul.frequency * 5)

  return (
    <button
      onClick={onClick}
      className={cn(
        "soul-card rounded-2xl p-4 text-center transition-all duration-500 hover:scale-105 animate-fade-in-up",
        compact && "p-3",
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Soul orb */}
      <div className="relative mx-auto mb-3" style={{ width: compact ? 48 : 64, height: compact ? 48 : 64 }}>
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-br transition-all duration-300",
            variantStyles[variant],
          )}
          style={{ backgroundColor: soul.auraColor }}
        />
        <div className="absolute inset-1 rounded-full bg-background/60 backdrop-blur flex items-center justify-center">
          <span className={cn("font-bold", compact ? "text-sm" : "text-lg")}>{soul.name.charAt(0)}</span>
        </div>
        {soul.isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
        )}
      </div>

      {/* Name */}
      <p className={cn("font-semibold mb-1", compact && "text-xs")}>{soul.name}</p>

      {/* Frequency visualization */}
      {!compact && (
        <div className="flex items-center justify-center gap-0.5 h-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 rounded-full transition-all",
                i < frequencyBars ? "bg-current opacity-80" : "bg-current opacity-20",
              )}
              style={{
                height: `${40 + i * 15}%`,
                color: soul.auraColor,
                animation: i < frequencyBars ? `waveform ${1 + i * 0.2}s ease-in-out infinite` : "none",
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Energy label */}
      <p className="text-[10px] text-muted-foreground mt-1 capitalize">{soul.energy}</p>
    </button>
  )
}
