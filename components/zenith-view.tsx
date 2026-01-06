"use client"

import { useState, useEffect } from "react"
import type { Soul } from "./mharmyraux-app"
import { SoulOrb } from "./soul-orb"
import { Zap, Sparkles } from "lucide-react"

interface ZenithViewProps {
  onStartChat: (soul: Soul) => void
}

const zenithSouls: Soul[] = [
  { id: "zenith-1", name: "Blaze", frequency: 0.9, energy: "chaotic", auraColor: "#fbbf24", isOnline: true },
  { id: "zenith-2", name: "Nova", frequency: 0.85, energy: "vibrant", auraColor: "#f97316", isOnline: true },
  { id: "zenith-3", name: "Comet", frequency: 0.95, energy: "chaotic", auraColor: "#fb923c", isOnline: true },
  { id: "zenith-4", name: "Flare", frequency: 0.88, energy: "vibrant", auraColor: "#fcd34d", isOnline: true },
  { id: "zenith-5", name: "Ignite", frequency: 0.92, energy: "chaotic", auraColor: "#fdba74", isOnline: true },
  { id: "zenith-6", name: "Solar", frequency: 0.87, energy: "vibrant", auraColor: "#fde047", isOnline: true },
  { id: "zenith-7", name: "Radiant", frequency: 0.91, energy: "chaotic", auraColor: "#facc15", isOnline: true },
  { id: "zenith-8", name: "Ember", frequency: 0.86, energy: "vibrant", auraColor: "#fca5a1", isOnline: true },
]

export function ZenithView({ onStartChat }: ZenithViewProps) {
  const [collisionReady, setCollisionReady] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [matchedSoul, setMatchedSoul] = useState<Soul | null>(null)

  useEffect(() => {
    // Simulate random "sync drop" countdown
    const randomStart = Math.floor(Math.random() * 30) + 10
    setCountdown(randomStart)

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCollisionReady(true)
          setTimeout(() => setCollisionReady(false), 5000)
          return Math.floor(Math.random() * 60) + 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleCollide = (soul: Soul) => {
    setMatchedSoul(soul)
    setTimeout(() => {
      onStartChat(soul)
      setMatchedSoul(null)
    }, 1500)
  }

  return (
    <div className="min-h-screen px-4 py-8 relative">
      {/* Zenith background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-background to-background" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(251,191,36,0.4) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold gradient-text-zenith mb-2">The Zenith</h1>
          <p className="text-muted-foreground text-sm">High energy. Instant collisions. Find your spark.</p>
        </div>

        {/* Sync Drop Timer */}
        <div className="soul-card rounded-3xl p-6 mb-8 text-center">
          {collisionReady ? (
            <div className="animate-zenith-pulse">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-amber-400 font-bold text-lg">SYNC DROP ACTIVE!</p>
              <p className="text-xs text-muted-foreground">Everyone is visible. Collide now!</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-2">Next Global Sync in</p>
              <div className="text-4xl font-mono font-bold text-amber-400">
                {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Stay alert. The world synchronizes at random.</p>
            </>
          )}
        </div>

        {/* Collision Match Animation */}
        {matchedSoul && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur">
            <div className="text-center animate-collision">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mx-auto mb-4 zenith-glow" />
              <p className="text-xl font-bold text-amber-400">Collision with {matchedSoul.name}!</p>
            </div>
          </div>
        )}

        {/* High Energy Souls */}
        <div>
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            High frequency souls
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {zenithSouls.map((soul, i) => (
              <SoulOrb key={soul.id} soul={soul} onClick={() => handleCollide(soul)} delay={i * 0.1} variant="zenith" />
            ))}
          </div>
        </div>

        {/* Zenith rules */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            In The Zenith, you don&apos;t swipe—you <span className="text-amber-400">collide</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
