"use client"

import { useState } from "react"
import { Navigation } from "./navigation"
import { ChatView } from "./chat-view"
import { DiscoverView } from "./discover-view"
import { ProfileView } from "./profile-view"

export type Persona = {
  id: string
  name: string
  tagline: string
  avatar: string
  gradient: string
  online: boolean
}

export const personas: Persona[] = [
  {
    id: "luna",
    name: "Luna",
    tagline: "Warm & Empathetic",
    avatar: "/beautiful-woman-avatar-purple-aesthetic.jpg",
    gradient: "from-pink-500 to-purple-600",
    online: true,
  },
  {
    id: "kai",
    name: "Kai",
    tagline: "Witty & Playful",
    avatar: "/cool-guy-avatar-blue-aesthetic.jpg",
    gradient: "from-blue-500 to-cyan-500",
    online: true,
  },
  {
    id: "nova",
    name: "Nova",
    tagline: "Mysterious & Deep",
    avatar: "/mysterious-woman-avatar-dark-aesthetic.jpg",
    gradient: "from-purple-600 to-indigo-700",
    online: true,
  },
  {
    id: "alex",
    name: "Alex",
    tagline: "Confident & Supportive",
    avatar: "/friendly-person-avatar-warm-aesthetic.jpg",
    gradient: "from-orange-500 to-pink-500",
    online: true,
  },
]

export function VibeApp() {
  const [activeTab, setActiveTab] = useState<"chat" | "discover" | "profile">("discover")
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersona(persona)
    setActiveTab("chat")
  }

  const handleBackToDiscover = () => {
    setSelectedPersona(null)
    setActiveTab("discover")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-20">
        {activeTab === "discover" && <DiscoverView onSelectPersona={handleSelectPersona} />}
        {activeTab === "chat" && selectedPersona && (
          <ChatView persona={selectedPersona} onBack={handleBackToDiscover} />
        )}
        {activeTab === "chat" && !selectedPersona && <DiscoverView onSelectPersona={handleSelectPersona} />}
        {activeTab === "profile" && <ProfileView />}
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
