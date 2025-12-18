"use client"

import { cn } from "@/lib/utils"
import type { Persona } from "./vibe-app"

interface PersonaCardProps {
  persona: Persona
  onClick: () => void
  delay?: number
}

export function PersonaCard({ persona, onClick, delay = 0 }: PersonaCardProps) {
  return (
    <button
      onClick={onClick}
      className="animate-fade-in group relative overflow-hidden rounded-2xl bg-card border border-border p-4 text-left transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br",
          persona.gradient,
        )}
      />

      <div className="relative">
        {/* Avatar */}
        <div className="relative mb-3">
          <div className={cn("w-16 h-16 rounded-full bg-gradient-to-br p-0.5", persona.gradient)}>
            <img
              src={persona.avatar || "/placeholder.svg"}
              alt={persona.name}
              className="w-full h-full rounded-full object-cover bg-background"
            />
          </div>
          {persona.online && (
            <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-background" />
          )}
        </div>

        {/* Info */}
        <h3 className="font-semibold text-base">{persona.name}</h3>
        <p className="text-muted-foreground text-xs">{persona.tagline}</p>

        {/* CTA */}
        <div
          className={cn("mt-3 text-xs font-medium bg-gradient-to-r bg-clip-text text-transparent", persona.gradient)}
        >
          Start chatting →
        </div>
      </div>
    </button>
  )
}
