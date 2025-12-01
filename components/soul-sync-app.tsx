"use client"

import { useState, useEffect } from "react"
import { Manifesto } from "./manifesto"
import { SoulForm } from "./soul-form"
import { MatchResult } from "./match-result"
import { MatrixBackground } from "./matrix-background"
import { StatusBar } from "./status-bar"

export type SoulData = {
  nickname: string
  fear: string
  dream: string
}

export type AIResult = {
  soulId: string
  compatibility: number
  analysis: string
  emotionalDepth: number
  fearAlignment: number
  dreamSynergy: number
  shadowInsight?: string
  archetypeDetected?: string
  soulFrequency?: string
  hiddenGift?: string
  destinyWhisper?: string
  soulParadox?: string
  cosmicTiming?: string
}

export default function SoulSyncApp() {
  const [showMatch, setShowMatch] = useState(false)
  const [soulData, setSoulData] = useState<SoulData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [soulsOnline, setSoulsOnline] = useState(0)
  const [apiKey, setApiKey] = useState("")
  const [aiResult, setAiResult] = useState<AIResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasServerApiKey, setHasServerApiKey] = useState(false)

  useEffect(() => {
    fetch("/api/check-api-key")
      .then((res) => res.json())
      .then((data) => setHasServerApiKey(data.hasApiKey))
      .catch(() => setHasServerApiKey(false))

    const interval = setInterval(() => {
      setSoulsOnline((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1
        const newValue = prev + change
        return Math.max(847, Math.min(1203, newValue))
      })
    }, 3000)

    setSoulsOnline(Math.floor(Math.random() * 300) + 850)

    return () => clearInterval(interval)
  }, [])

  const handleSync = async (data: SoulData) => {
    setSoulData(data)
    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze-soul", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fear: data.fear,
          dream: data.dream,
          apiKey: hasServerApiKey ? undefined : apiKey,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to analyze soul")
      }

      setAiResult(result)
      setShowMatch(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setShowMatch(false)
    setSoulData(null)
    setAiResult(null)
    setError(null)
  }

  return (
    <div className="relative min-h-screen bg-black text-foreground overflow-x-hidden scanline">
      <MatrixBackground />
      <StatusBar soulsOnline={soulsOnline} />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <Manifesto />

        {/* Glowing separator */}
        <div className="relative my-16">
          <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
          <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent blur-md opacity-50" />
        </div>

        {/* Form or Match Result */}
        {!showMatch ? (
          <SoulForm
            onSync={handleSync}
            isAnalyzing={isAnalyzing}
            apiKey={apiKey}
            onApiKeyChange={setApiKey}
            error={error}
            hasServerApiKey={hasServerApiKey}
          />
        ) : (
          <MatchResult soulData={soulData!} aiResult={aiResult!} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 py-8 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-xs tracking-widest">
            {">"} THE VOID v0.0.1 // POWERED BY GEMINI-3-PRO NEURAL ENGINE
          </p>
          <p className="text-muted-foreground/50 text-xs mt-2 tracking-wider">NO TRACKING. NO ADS. NO BULLSH*T.</p>
        </div>
      </footer>
    </div>
  )
}
