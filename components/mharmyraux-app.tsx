"use client"

import { useState, useEffect } from "react"
import { PortalView } from "./portal-view"
import { VoidView } from "./void-view"
import { PulseView } from "./pulse-view"
import { ZenithView } from "./zenith-view"
import { ChatView } from "./chat-view"
import { SphereNavigation } from "./sphere-navigation"
import { ParticleField } from "./particle-field"

export type Sphere = "portal" | "void" | "pulse" | "zenith"
export type Soul = {
  id: string
  name: string
  frequency: number
  energy: "healing" | "calm" | "vibrant" | "chaotic"
  auraColor: string
  isOnline: boolean
}

export function MharmyrauxApp() {
  const [currentSphere, setCurrentSphere] = useState<Sphere>("portal")
  const [activeChatSoul, setActiveChatSoul] = useState<Soul | null>(null)
  const [soulsOnline, setSoulsOnline] = useState(0)
  const [globalPulse, setGlobalPulse] = useState(0.5)

  useEffect(() => {
    // Simulate souls online counter
    setSoulsOnline(Math.floor(Math.random() * 50000) + 127000)
    const interval = setInterval(() => {
      setSoulsOnline((prev) => {
        const change = Math.floor(Math.random() * 500) - 200
        return Math.max(100000, prev + change)
      })
      setGlobalPulse(Math.random() * 0.4 + 0.4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleEnterSphere = (sphere: Sphere) => {
    setCurrentSphere(sphere)
    setActiveChatSoul(null)
  }

  const handleStartChat = (soul: Soul) => {
    setActiveChatSoul(soul)
  }

  const handleBackFromChat = () => {
    setActiveChatSoul(null)
  }

  // If in chat mode, show chat view
  if (activeChatSoul) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <ParticleField intensity={0.3} />
        <ChatView soul={activeChatSoul} onBack={handleBackFromChat} currentSphere={currentSphere} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleField intensity={currentSphere === "zenith" ? 1 : currentSphere === "void" ? 0.3 : 0.5} />

      {/* Global Stats Header */}
      {currentSphere !== "portal" && (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setCurrentSphere("portal")}
              className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Mharmyraux
            </button>

            <div className="flex items-center gap-4">
              {/* Global Pulse */}
              <div className="flex items-center gap-2">
                <div className="relative w-3 h-3">
                  <div className="absolute inset-0 rounded-full bg-emerald-500 animate-heartbeat" />
                  <div className="absolute inset-0 rounded-full bg-emerald-500/50 animate-ping" />
                </div>
                <span className="text-xs font-mono text-emerald-400">{(globalPulse * 100).toFixed(0)}%</span>
              </div>

              {/* Souls Online */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">{soulsOnline.toLocaleString()} souls</span>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={currentSphere !== "portal" ? "pt-14 pb-24" : ""}>
        {currentSphere === "portal" && <PortalView onEnterSphere={handleEnterSphere} soulsOnline={soulsOnline} />}
        {currentSphere === "void" && <VoidView onStartChat={handleStartChat} />}
        {currentSphere === "pulse" && <PulseView onStartChat={handleStartChat} />}
        {currentSphere === "zenith" && <ZenithView onStartChat={handleStartChat} />}
      </main>

      {/* Sphere Navigation */}
      {currentSphere !== "portal" && (
        <SphereNavigation currentSphere={currentSphere} onChangeSphere={handleEnterSphere} />
      )}
    </div>
  )
}
