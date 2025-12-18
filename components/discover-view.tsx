"use client"

import { useState, useEffect } from "react"
import { Sparkles, Users, Zap } from "lucide-react"
import { personas, type Persona } from "./vibe-app"
import { PersonaCard } from "./persona-card"

interface DiscoverViewProps {
  onSelectPersona: (persona: Persona) => void
}

export function DiscoverView({ onSelectPersona }: DiscoverViewProps) {
  const [activeUsers, setActiveUsers] = useState(0)

  useEffect(() => {
    setActiveUsers(Math.floor(Math.random() * 5000) + 12000)
    const interval = setInterval(() => {
      setActiveUsers((prev) => {
        const change = Math.floor(Math.random() * 100) - 50
        return Math.max(10000, prev + change)
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative px-4 pt-12 pb-8 text-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Connections</span>
          </div>

          <h1 className="text-4xl font-bold mb-3">
            <span className="gradient-text">Vibe</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-6 max-w-sm mx-auto">
            Meet AI companions that get you. Chat, connect, and vibe.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{activeUsers.toLocaleString()} online</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Instant replies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Persona Grid */}
      <div className="px-4 pb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>Choose Your Vibe</span>
          <Sparkles className="w-4 h-4 text-primary" />
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {personas.map((persona, index) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              onClick={() => onSelectPersona(persona)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="px-4 pb-8">
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h3 className="font-semibold mb-4">Why Vibe?</h3>
          <div className="space-y-4">
            <Feature
              icon="💬"
              title="Real Conversations"
              description="AI that actually listens and responds meaningfully"
            />
            <Feature icon="🔒" title="Private & Safe" description="No sign-up required. Your chats stay yours." />
            <Feature icon="⚡" title="Always Available" description="24/7 companionship whenever you need it" />
            <Feature icon="🎭" title="Multiple Personalities" description="Find the perfect vibe for your mood" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  )
}
