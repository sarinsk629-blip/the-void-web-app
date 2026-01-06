"use client"

import { useState, useEffect } from "react"
import type { Soul } from "./mharmyraux-app"
import { SoulOrb } from "./soul-orb"
import { Heart, Zap, TrendingUp, Users } from "lucide-react"

interface PulseViewProps {
  onStartChat: (soul: Soul) => void
}

const liveSouls: Soul[] = [
  { id: "live-1", name: "Phoenix", frequency: 0.7, energy: "vibrant", auraColor: "#10b981", isOnline: true },
  { id: "live-2", name: "Spark", frequency: 0.65, energy: "vibrant", auraColor: "#14b8a6", isOnline: true },
  { id: "live-3", name: "River", frequency: 0.6, energy: "calm", auraColor: "#06b6d4", isOnline: true },
  { id: "live-4", name: "Blaze", frequency: 0.75, energy: "vibrant", auraColor: "#22c55e", isOnline: true },
  { id: "live-5", name: "Mist", frequency: 0.55, energy: "calm", auraColor: "#0ea5e9", isOnline: true },
  { id: "live-6", name: "Storm", frequency: 0.8, energy: "chaotic", auraColor: "#34d399", isOnline: true },
]

export function PulseView({ onStartChat }: PulseViewProps) {
  const [myPulse, setMyPulse] = useState(0.6)
  const [impactPoints, setImpactPoints] = useState(0)
  const [connectionsToday, setConnectionsToday] = useState(0)

  useEffect(() => {
    // Simulate pulse changes
    const interval = setInterval(() => {
      setMyPulse((prev) => {
        const change = (Math.random() - 0.5) * 0.1
        return Math.max(0.3, Math.min(0.9, prev + change))
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen px-4 py-8 relative">
      {/* Pulse background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-background to-background" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold gradient-text-pulse mb-2">The Pulse</h1>
          <p className="text-muted-foreground text-sm">Your life. Your connections. Your growth.</p>
        </div>

        {/* My Pulse Card */}
        <div className="soul-card rounded-3xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Your Pulse</span>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-400 animate-heartbeat" />
              <span className="font-mono text-emerald-400">{(myPulse * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Pulse visualization */}
          <div className="h-16 flex items-end gap-1 mb-4">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t transition-all duration-300"
                style={{
                  height: `${Math.sin((i + Date.now() / 500) * 0.5) * 30 + 50}%`,
                  opacity: 0.3 + (i / 20) * 0.7,
                }}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-emerald-400">
                <Zap className="w-4 h-4" />
                {impactPoints}
              </div>
              <div className="text-[10px] text-muted-foreground">Impact Points</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-teal-400">
                <Users className="w-4 h-4" />
                {connectionsToday}
              </div>
              <div className="text-[10px] text-muted-foreground">Connections</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-lg font-bold text-cyan-400">
                <TrendingUp className="w-4 h-4" />
                +12%
              </div>
              <div className="text-[10px] text-muted-foreground">Growth</div>
            </div>
          </div>
        </div>

        {/* Live Connections */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live on your frequency
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {liveSouls.map((soul, i) => (
              <SoulOrb
                key={soul.id}
                soul={soul}
                onClick={() => onStartChat(soul)}
                delay={i * 0.1}
                variant="pulse"
                compact
              />
            ))}
          </div>
        </div>

        {/* Impact message */}
        <div className="soul-card rounded-2xl p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Every connection you make brightens your pulse.
            <br />
            <span className="text-emerald-400">Help someone in The Void to earn Impact Points.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
