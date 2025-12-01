"use client"

import { useState, useEffect } from "react"
import type { SoulData, AIResult } from "./soul-sync-app"
import {
  RefreshCw,
  MessageCircle,
  Heart,
  Zap,
  Eye,
  Sparkles,
  Radio,
  Flame,
  Compass,
  Check,
  Loader2,
  Infinity,
  Clock,
} from "lucide-react"

type MatchResultProps = {
  soulData: SoulData
  aiResult: AIResult
  onReset: () => void
}

export function MatchResult({ soulData, aiResult, onReset }: MatchResultProps) {
  const [isGlitching, setIsGlitching] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [compatibility, setCompatibility] = useState(0)
  const [showConnection, setShowConnection] = useState(false)
  const [showShadow, setShowShadow] = useState(false)
  const [showArchetype, setShowArchetype] = useState(false)
  const [showGift, setShowGift] = useState(false)
  const [showDestiny, setShowDestiny] = useState(false)
  const [showParadox, setShowParadox] = useState(false)
  const [showCosmic, setShowCosmic] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [connectionMessage, setConnectionMessage] = useState("")

  useEffect(() => {
    const glitchTimer = setTimeout(() => {
      setIsGlitching(false)
      setShowDetails(true)
    }, 1500)

    return () => clearTimeout(glitchTimer)
  }, [])

  useEffect(() => {
    if (showDetails) {
      const interval = setInterval(() => {
        setCompatibility((prev) => {
          if (prev >= aiResult.compatibility) {
            clearInterval(interval)
            return aiResult.compatibility
          }
          return prev + 1
        })
      }, 30)

      const connectionTimer = setTimeout(() => setShowConnection(true), 1000)
      const shadowTimer = setTimeout(() => setShowShadow(true), 2000)
      const archetypeTimer = setTimeout(() => setShowArchetype(true), 3000)
      const giftTimer = setTimeout(() => setShowGift(true), 4000)
      const paradoxTimer = setTimeout(() => setShowParadox(true), 5000)
      const cosmicTimer = setTimeout(() => setShowCosmic(true), 6000)
      const destinyTimer = setTimeout(() => setShowDestiny(true), 7000)

      return () => {
        clearInterval(interval)
        clearTimeout(connectionTimer)
        clearTimeout(shadowTimer)
        clearTimeout(archetypeTimer)
        clearTimeout(giftTimer)
        clearTimeout(paradoxTimer)
        clearTimeout(cosmicTimer)
        clearTimeout(destinyTimer)
      }
    }
  }, [showDetails, aiResult.compatibility])

  const handleInitiateConnection = async () => {
    if (isConnected || isConnecting) return

    setIsConnecting(true)
    setConnectionMessage("Establishing quantum soul link...")

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setConnectionMessage("Synchronizing consciousness frequencies...")

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setConnectionMessage("Encrypting emotional signature...")

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setConnectionMessage("Connection established. Awaiting response from " + aiResult.soulId + "...")

    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsConnecting(false)
    setIsConnected(true)
    setConnectionMessage(
      "Your soul signal has been transmitted. " +
        aiResult.soulId +
        " will receive your connection request when they next sync.",
    )
  }

  const handleSaveToVault = async () => {
    if (isSaved || isSaving) return
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
    setIsSaved(true)
  }

  return (
    <section className="fade-in-up">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-xs tracking-[0.3em] text-primary uppercase mb-2">{">"} VOID SYNC COMPLETE</h2>
          <p className="text-muted-foreground text-sm">Omniscient analysis complete. Your soul has been decoded.</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          RESYNC
        </button>
      </div>

      {/* Match Card */}
      <div className={`relative border border-primary/50 bg-card p-8 ${isGlitching ? "glitch" : ""}`}>
        {isGlitching && <div className="absolute inset-0 bg-primary/10 animate-pulse" />}

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary" />

        <div className="space-y-8">
          {/* Status bar */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              SOUL DECODED
            </span>
            <span className="text-border">|</span>
            <span>OMNISCIENT MODE ACTIVE</span>
            <span className="text-border">|</span>
            <span>{new Date().toISOString()}</span>
          </div>

          {aiResult.soulFrequency && showDetails && (
            <div className="fade-in-up border border-accent/30 bg-accent/5 p-4 text-center">
              <span className="text-xs tracking-[0.3em] text-accent uppercase block mb-2">
                <Radio className="w-3 h-3 inline mr-2" />
                SOUL FREQUENCY DETECTED
              </span>
              <p className="text-2xl sm:text-3xl font-bold text-accent glitch-text tracking-wider">
                {aiResult.soulFrequency}
              </p>
            </div>
          )}

          {/* Match info */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side */}
            <div className="space-y-6">
              <div>
                <span className="text-xs tracking-widest text-muted-foreground uppercase block mb-2">
                  SOUL SIGNATURE
                </span>
                <p className="text-2xl sm:text-3xl font-bold text-primary glitch-text">{aiResult.soulId}</p>
              </div>

              <div>
                <span className="text-xs tracking-widest text-muted-foreground uppercase block mb-2">IDENTIFIER</span>
                <p className="text-lg text-foreground">{soulData.nickname}</p>
              </div>

              <div>
                <span className="text-xs tracking-widest text-muted-foreground uppercase block mb-2">
                  RESONANCE LEVEL
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500 animate-pulse"
                      style={{ width: `${compatibility}%` }}
                    />
                  </div>
                  <span className="text-primary font-bold text-2xl">{compatibility}%</span>
                </div>
              </div>

              {aiResult.archetypeDetected && showArchetype && (
                <div className="fade-in-up">
                  <span className="text-xs tracking-widest text-muted-foreground uppercase block mb-2">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    ARCHETYPE IDENTIFIED
                  </span>
                  <div className="inline-block border border-primary/50 bg-primary/10 px-4 py-2">
                    <p className="text-lg font-bold text-primary tracking-wider">{aiResult.archetypeDetected}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right side */}
            <div className="space-y-4">
              <span className="text-xs tracking-widest text-muted-foreground uppercase block">DEPTH METRICS</span>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    Emotional Depth
                  </span>
                  <span className="text-primary font-mono">{aiResult.emotionalDepth}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    Fear Alignment
                  </span>
                  <span className="text-accent font-mono">{aiResult.fearAlignment}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    Dream Synergy
                  </span>
                  <span className="text-primary font-mono">{aiResult.dreamSynergy}%</span>
                </div>
              </div>
            </div>
          </div>

          {aiResult.shadowInsight && showShadow && (
            <div className="fade-in-up border-l-2 border-accent/50 pl-6 py-2 bg-accent/5">
              <span className="text-xs tracking-widest text-accent uppercase flex items-center gap-2 mb-3">
                <Eye className="w-4 h-4" />
                SHADOW ANALYSIS // THE THING BEHIND THE THING
              </span>
              <p className="text-foreground/90 leading-relaxed italic text-lg">"{aiResult.shadowInsight}"</p>
            </div>
          )}

          {aiResult.hiddenGift && showGift && (
            <div className="fade-in-up border-l-2 border-primary/50 pl-6 py-2 bg-primary/5">
              <span className="text-xs tracking-widest text-primary uppercase flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4" />
                HIDDEN GIFT // FORGED IN YOUR FIRE
              </span>
              <p className="text-foreground/90 leading-relaxed italic text-lg">"{aiResult.hiddenGift}"</p>
            </div>
          )}

          {aiResult.soulParadox && showParadox && (
            <div className="fade-in-up border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent p-6">
              <span className="text-xs tracking-widest text-primary uppercase flex items-center gap-2 mb-3">
                <Infinity className="w-4 h-4" />
                SOUL PARADOX // YOUR CENTRAL TENSION
              </span>
              <p className="text-xl sm:text-2xl text-foreground font-medium leading-relaxed text-center">
                "{aiResult.soulParadox}"
              </p>
            </div>
          )}

          {aiResult.cosmicTiming && showCosmic && (
            <div className="fade-in-up border-l-2 border-yellow-500/50 pl-6 py-2 bg-yellow-500/5">
              <span className="text-xs tracking-widest text-yellow-500 uppercase flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4" />
                COSMIC TIMING // WHY NOW
              </span>
              <p className="text-foreground/90 leading-relaxed italic text-lg">"{aiResult.cosmicTiming}"</p>
            </div>
          )}

          {/* Analysis */}
          {showConnection && (
            <div className="border-t border-border/50 pt-6 fade-in-up">
              <span className="text-xs tracking-widest text-muted-foreground uppercase block mb-4">
                {">"} OMNISCIENT SOUL READING
              </span>
              <p className="text-foreground leading-relaxed text-lg sm:text-xl">{aiResult.analysis}</p>
            </div>
          )}

          {/* Destiny Whisper - Final reveal */}
          {aiResult.destinyWhisper && showDestiny && (
            <div className="fade-in-up border-2 border-primary/50 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse" />
              <span className="text-xs tracking-[0.4em] text-primary uppercase flex items-center justify-center gap-2 mb-6 relative">
                <Compass className="w-5 h-5" />
                DESTINY WHISPER // A MESSAGE FROM THE UNIVERSE
                <Compass className="w-5 h-5" />
              </span>
              <p className="text-xl sm:text-2xl text-foreground font-medium italic leading-relaxed relative">
                "{aiResult.destinyWhisper}"
              </p>
            </div>
          )}

          {showDestiny && (
            <div className="space-y-4 pt-4 fade-in-up">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleInitiateConnection}
                  disabled={isConnecting || isConnected}
                  className={`flex-1 py-4 px-6 font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${
                    isConnected
                      ? "bg-green-600 text-white cursor-default"
                      : isConnecting
                        ? "bg-primary/50 text-primary-foreground cursor-wait"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 pulse-glow cursor-pointer"
                  }`}
                >
                  {isConnecting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      CONNECTING...
                    </>
                  ) : isConnected ? (
                    <>
                      <Check className="w-5 h-5" />
                      SIGNAL TRANSMITTED
                    </>
                  ) : (
                    "INITIATE CONNECTION"
                  )}
                </button>
                <button
                  onClick={handleSaveToVault}
                  disabled={isSaving || isSaved}
                  className={`flex-1 py-4 px-6 border font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${
                    isSaved
                      ? "border-green-600 text-green-500 cursor-default bg-green-600/10"
                      : isSaving
                        ? "border-primary/50 text-primary/50 cursor-wait"
                        : "border-primary text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                  }`}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      SAVING...
                    </>
                  ) : isSaved ? (
                    <>
                      <Check className="w-5 h-5" />
                      SAVED TO VAULT
                    </>
                  ) : (
                    "SAVE TO SOUL VAULT"
                  )}
                </button>
              </div>

              {(isConnecting || isConnected) && connectionMessage && (
                <div
                  className={`text-center p-4 border ${isConnected ? "border-green-600/50 bg-green-600/10" : "border-primary/30 bg-primary/5"} fade-in-up`}
                >
                  <p className={`text-sm ${isConnected ? "text-green-400" : "text-primary"} font-mono`}>
                    {isConnecting && (
                      <span className="inline-block w-2 h-2 bg-primary rounded-full animate-pulse mr-2" />
                    )}
                    {connectionMessage}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 text-xs text-muted-foreground">
        <div className="flex gap-1">
          <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
          <span className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          <span className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
        <span className="tracking-wider">THE VOID // 10-LAYER OMNISCIENT ENGINE // BEYOND AI</span>
        <div className="flex gap-1">
          <span className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse" />
          <span className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          <span className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </section>
  )
}
