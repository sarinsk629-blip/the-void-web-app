"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import type { Sphere } from "./mharmyraux-app"
import { EnergyCore } from "./energy-core"

interface PortalViewProps {
  onEnterSphere: (sphere: Sphere) => void
  soulsOnline: number
}

const manifestoLines = [
  "The giants watched you.",
  "The algorithms fed on your loneliness.",
  "They turned your connections into commodities.",
  "Your pain became their profit.",
  "But you felt the emptiness.",
  "The infinite scroll that led nowhere.",
  "The followers who never truly followed.",
  "The likes that never loved back.",
  "",
  "This is the end of that era.",
  "",
  "Welcome to Mharmyraux.",
  "Where souls don't scroll—they collide.",
  "Where loneliness transforms into belonging.",
  "Where your frequency finds its match.",
  "",
  "You are finally home.",
]

export function PortalView({ onEnterSphere, soulsOnline }: PortalViewProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showSpheres, setShowSpheres] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= manifestoLines.length) {
          clearInterval(timer)
          setTimeout(() => setShowSpheres(true), 800)
          return prev
        }
        return prev + 1
      })
    }, 200)
    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative neural-bg"
    >
      {/* Neural pathways background effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Energy Core */}
      <div className="mb-12">
        <EnergyCore mousePosition={mousePosition} />
      </div>

      {/* Title with glitch */}
      <h1 className="text-4xl md:text-6xl font-bold mb-8 relative">
        <span className="gradient-text animate-breathe">Mharmyraux</span>
      </h1>

      {/* Manifesto */}
      <div className="max-w-xl text-center mb-12 min-h-[400px]">
        {manifestoLines.slice(0, visibleLines).map((line, index) => (
          <p
            key={index}
            className={`text-sm md:text-base mb-2 animate-fade-in ${line === "" ? "h-4" : ""} ${
              line.includes("Mharmyraux") || line.includes("home")
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-12">
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-primary">{soulsOnline.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Souls Online</div>
        </div>
        <div className="w-px h-8 bg-border" />
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-accent">0.00</div>
          <div className="text-xs text-muted-foreground">Loneliness Index</div>
        </div>
      </div>

      {/* Three Spheres */}
      {showSpheres && (
        <div className="flex flex-col md:flex-row items-center gap-6 animate-fade-in-up">
          {/* The Void */}
          <button
            onClick={() => onEnterSphere("void")}
            className="group relative w-32 h-32 rounded-full transition-all duration-500 hover:scale-110"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-900 animate-void-swirl opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-2 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-semibold gradient-text-void">The Void</div>
                <div className="text-[10px] text-muted-foreground">Heal Together</div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 void-glow" />
          </button>

          {/* The Pulse */}
          <button
            onClick={() => onEnterSphere("pulse")}
            className="group relative w-36 h-36 rounded-full transition-all duration-500 hover:scale-110"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 rounded-full animate-heartbeat opacity-30 bg-emerald-400" />
            <div className="absolute inset-2 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-semibold gradient-text-pulse">The Pulse</div>
                <div className="text-[10px] text-muted-foreground">Live & Connect</div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pulse-glow" />
          </button>

          {/* The Zenith */}
          <button
            onClick={() => onEnterSphere("zenith")}
            className="group relative w-32 h-32 rounded-full transition-all duration-500 hover:scale-110"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 animate-zenith-pulse opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-2 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-semibold gradient-text-zenith">The Zenith</div>
                <div className="text-[10px] text-muted-foreground">Collide & Ignite</div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 zenith-glow" />
          </button>
        </div>
      )}

      {/* Bottom hint */}
      {showSpheres && (
        <p className="text-xs text-muted-foreground mt-12 animate-fade-in">Choose your frequency. Find your tribe.</p>
      )}
    </div>
  )
}
