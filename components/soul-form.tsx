"use client"

import type React from "react"
import { useState } from "react"
import type { SoulData } from "./soul-sync-app"
import { Loader2, Key, Eye, EyeOff, AlertCircle, Sparkles } from "lucide-react"

type SoulFormProps = {
  onSync: (data: SoulData) => void
  isAnalyzing: boolean
  apiKey: string
  onApiKeyChange: (key: string) => void
  error: string | null
  hasServerApiKey: boolean
}

export function SoulForm({ onSync, isAnalyzing, apiKey, onApiKeyChange, error, hasServerApiKey }: SoulFormProps) {
  const [nickname, setNickname] = useState("")
  const [fear, setFear] = useState("")
  const [dream, setDream] = useState("")
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fear.trim() || !dream.trim() || (!hasServerApiKey && !apiKey.trim())) return

    onSync({
      nickname: nickname.trim() || "Anonymous Soul",
      fear: fear.trim(),
      dream: dream.trim(),
    })
  }

  const isValid = fear.trim().length > 10 && dream.trim().length > 10 && (hasServerApiKey || apiKey.trim().length > 0)

  return (
    <section className="fade-in-up">
      <div className="mb-8">
        <h2 className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">
          {">"} INITIATE VOID SYNC PROTOCOL
        </h2>
        <p className="text-muted-foreground text-sm">
          The AI will analyze your deepest truths and find your resonance match.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Nickname */}
        <div className="relative group">
          <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-3">Your Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onFocus={() => setFocusedField("nickname")}
            onBlur={() => setFocusedField(null)}
            placeholder="Anonymous Soul"
            className="w-full bg-input border border-border/50 px-4 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 font-mono text-sm"
          />
          <div
            className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-500 ${focusedField === "nickname" ? "w-full" : "w-0"}`}
          />
        </div>

        {/* Fear */}
        <div className="relative group">
          <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-3">
            Your Deepest Fear
          </label>
          <textarea
            value={fear}
            onChange={(e) => setFear(e.target.value)}
            onFocus={() => setFocusedField("fear")}
            onBlur={() => setFocusedField(null)}
            placeholder="Be honest. No one is judging."
            rows={4}
            className="w-full bg-input border border-border/50 px-4 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 font-mono text-sm resize-none"
          />
          <div
            className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-500 ${focusedField === "fear" ? "w-full" : "w-0"}`}
          />
          <span className="text-xs text-muted-foreground/50 mt-1 block">{fear.length}/500 characters</span>
        </div>

        {/* Dream */}
        <div className="relative group">
          <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-3">
            Your Wildest Dream
          </label>
          <textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            onFocus={() => setFocusedField("dream")}
            onBlur={() => setFocusedField(null)}
            placeholder="What would you do if you couldn't fail?"
            rows={4}
            className="w-full bg-input border border-border/50 px-4 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 font-mono text-sm resize-none"
          />
          <div
            className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-500 ${focusedField === "dream" ? "w-full" : "w-0"}`}
          />
          <span className="text-xs text-muted-foreground/50 mt-1 block">{dream.length}/500 characters</span>
        </div>

        {hasServerApiKey ? (
          <div className="relative border border-accent/30 bg-accent/5 p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-xs tracking-widest text-accent uppercase">NEURAL ENGINE ACTIVE</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Gemini-3-Pro neural engine is online and ready to analyze your soul.
            </p>
          </div>
        ) : (
          <div className="relative border border-primary/30 bg-card/50 p-6 space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-primary" />
              <span className="text-xs tracking-widest text-primary uppercase">NEURAL ENGINE AUTHENTICATION</span>
            </div>

            <div className="relative group">
              <label className="block text-xs tracking-widest text-muted-foreground uppercase mb-3">
                Google Gemini API Key
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => onApiKeyChange(e.target.value)}
                  onFocus={() => setFocusedField("apiKey")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your Gemini API key..."
                  className="w-full bg-input border border-border/50 px-4 py-4 pr-12 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 font-mono text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div
                className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-500 ${focusedField === "apiKey" ? "w-full" : "w-0"}`}
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Get your API key from{" "}
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google AI Studio
              </a>
              . Your key is never stored.
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 border border-red-500/50 bg-red-500/10 text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* AI indicator */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-100" />
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-200" />
          </div>
          <span className="tracking-wider">NEURAL NETWORK READY // THE VOID ENGINE ACTIVE</span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isValid || isAnalyzing}
          className={`
            relative w-full py-5 px-8 text-lg font-bold tracking-widest uppercase
            bg-primary text-primary-foreground
            border-2 border-primary
            transition-all duration-300
            ${
              isValid && !isAnalyzing
                ? "hover:bg-transparent hover:text-primary pulse-glow cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="glitch">ANALYZING SOUL...</span>
            </span>
          ) : (
            <>
              <span className="relative z-10">SYNC SOULS</span>
              <span className="absolute inset-0 bg-primary opacity-0 hover:opacity-20 transition-opacity" />
            </>
          )}
        </button>

        {!isValid && (
          <p className="text-xs text-muted-foreground text-center">
            {hasServerApiKey
              ? "* Share at least 10 characters for each field to enable void sync"
              : "* Share at least 10 characters for each field and provide your API key to enable void sync"}
          </p>
        )}
      </form>
    </section>
  )
}
