"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart, MessageCircle, Clock, Sparkles, Shield, Zap } from "lucide-react"

export function ProfileView() {
  const [stats, setStats] = useState({
    totalChats: 0,
    messagesExchanged: 0,
    favoritePersona: "Luna",
    memberSince: "Today",
  })

  useEffect(() => {
    // Simulate stats loading
    setStats({
      totalChats: Math.floor(Math.random() * 50) + 10,
      messagesExchanged: Math.floor(Math.random() * 500) + 100,
      favoritePersona: "Luna",
      memberSince: "Today",
    })
  }, [])

  return (
    <div className="min-h-screen px-4 pt-12 pb-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center">
          <span className="text-4xl">👤</span>
        </div>
        <h1 className="text-2xl font-bold mb-1">Anonymous User</h1>
        <p className="text-muted-foreground text-sm">No sign-up needed</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard
          icon={<MessageCircle className="w-5 h-5" />}
          label="Total Chats"
          value={stats.totalChats.toString()}
          color="text-primary"
        />
        <StatCard
          icon={<Heart className="w-5 h-5" />}
          label="Messages"
          value={stats.messagesExchanged.toString()}
          color="text-pink-500"
        />
        <StatCard
          icon={<Sparkles className="w-5 h-5" />}
          label="Favorite"
          value={stats.favoritePersona}
          color="text-purple-500"
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          label="Member Since"
          value={stats.memberSince}
          color="text-cyan-500"
        />
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Your Privacy</h2>

        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-green-500/10">
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Anonymous by Default</h3>
              <p className="text-muted-foreground text-xs mt-1">
                No personal data collected. Chat freely without worry.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Powered by Gemini AI</h3>
              <p className="text-muted-foreground text-xs mt-1">Advanced AI for natural, engaging conversations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Version info */}
      <div className="mt-12 text-center">
        <p className="text-muted-foreground text-xs">Vibe v1.0.0</p>
        <p className="text-muted-foreground/50 text-xs mt-1">Made with 💜 for connection</p>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  color,
}: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-card rounded-2xl p-4 border border-border">
      <div className={`${color} mb-2`}>{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-muted-foreground text-xs">{label}</p>
    </div>
  )
}
