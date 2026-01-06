"use client"

import { useState, useEffect } from "react"
import type { Soul } from "./mharmyraux-app"
import { SoulOrb } from "./soul-orb"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Send } from "lucide-react"

interface VoidViewProps {
  onStartChat: (soul: Soul) => void
}

const healingSouls: Soul[] = [
  { id: "healer-1", name: "Whisper", frequency: 0.3, energy: "healing", auraColor: "#8b5cf6", isOnline: true },
  { id: "healer-2", name: "Echo", frequency: 0.4, energy: "calm", auraColor: "#6366f1", isOnline: true },
  { id: "healer-3", name: "Serenity", frequency: 0.25, energy: "healing", auraColor: "#a855f7", isOnline: true },
  { id: "healer-4", name: "Luna", frequency: 0.35, energy: "calm", auraColor: "#7c3aed", isOnline: true },
]

export function VoidView({ onStartChat }: VoidViewProps) {
  const [painText, setPainText] = useState("")
  const [isReleasing, setIsReleasing] = useState(false)
  const [showSouls, setShowSouls] = useState(true)
  const [shadowPresence, setShadowPresence] = useState(0)

  useEffect(() => {
    // Simulate shadow presence - people watching over you
    setShadowPresence(Math.floor(Math.random() * 50) + 10)
    const interval = setInterval(() => {
      setShadowPresence((prev) => {
        const change = Math.floor(Math.random() * 10) - 3
        return Math.max(5, prev + change)
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleReleasePain = () => {
    if (!painText.trim()) return
    setIsReleasing(true)
    // Simulate AI matching
    setTimeout(() => {
      setIsReleasing(false)
      setPainText("")
      // Could trigger a matched soul here
    }, 2000)
  }

  return (
    <div className="min-h-screen px-4 py-8 relative">
      {/* Void swirl background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-background to-background" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
            animation: "void-swirl 60s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold gradient-text-void mb-2">The Void</h1>
          <p className="text-muted-foreground text-sm">Release your pain. Find someone who understands.</p>
        </div>

        {/* Shadow Presence */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex -space-x-2">
            {[...Array(Math.min(shadowPresence, 5))].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500/30 to-purple-700/30 border border-violet-500/20 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{shadowPresence} souls watching over you</span>
        </div>

        {/* Pain Release Input */}
        <div className="soul-card rounded-3xl p-6 mb-8">
          <p className="text-sm text-muted-foreground mb-4">You don&apos;t post here. You release.</p>
          <Textarea
            value={painText}
            onChange={(e) => setPainText(e.target.value)}
            placeholder="What weighs on your soul tonight?"
            className="bg-transparent border-white/10 focus:border-violet-500/50 min-h-[120px] resize-none text-sm"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-muted-foreground">Your words dissolve into the void...</span>
            <Button
              onClick={handleReleasePain}
              disabled={!painText.trim() || isReleasing}
              className="bg-violet-600 hover:bg-violet-700 rounded-full"
              size="sm"
            >
              {isReleasing ? (
                <span className="animate-pulse">Finding your match...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Release
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Healing Souls */}
        {showSouls && (
          <div>
            <h2 className="text-sm font-semibold mb-4 text-center">Souls on your frequency right now</h2>
            <div className="grid grid-cols-2 gap-4">
              {healingSouls.map((soul, i) => (
                <SoulOrb key={soul.id} soul={soul} onClick={() => onStartChat(soul)} delay={i * 0.15} variant="void" />
              ))}
            </div>
          </div>
        )}

        {/* Void message */}
        <p className="text-center text-xs text-muted-foreground mt-12">
          In The Void, there is no judgment. Only understanding.
        </p>
      </div>
    </div>
  )
}
