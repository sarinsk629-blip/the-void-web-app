"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Soul, Sphere } from "./mharmyraux-app"
import { Button } from "./ui/button"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatViewProps {
  soul: Soul
  onBack: () => void
  currentSphere: Sphere
}

export function ChatView({ soul, onBack, currentSphere }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [transparency, setTransparency] = useState(0.1) // Chat blur effect
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const greeting = getGreeting(soul, currentSphere)
    setMessages([
      {
        id: "greeting",
        role: "assistant",
        content: greeting,
        timestamp: new Date(),
      },
    ])
  }, [soul, currentSphere])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    // Increase transparency as more messages are exchanged
    setTransparency(Math.min(1, messages.length * 0.1))
  }, [messages])

  const getGreeting = (soul: Soul, sphere: Sphere): string => {
    if (sphere === "void") {
      return `Hey... I sensed you needed someone. I'm ${soul.name}. You're not alone tonight. What's on your mind?`
    } else if (sphere === "zenith") {
      return `Whoa, we collided! I'm ${soul.name}. The universe clearly wanted us to meet. What's your energy like right now?`
    }
    return `Hey! I'm ${soul.name}. Our frequencies matched up. I'd love to get to know you. What brings you to the Pulse today?`
  }

  const handleSend = async () => {
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          soul: soul,
          sphere: currentSphere,
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I felt a disturbance in our connection... Can you try again?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const sphereColors = {
    void: "from-violet-500 to-indigo-700",
    pulse: "from-emerald-400 to-teal-600",
    zenith: "from-amber-400 to-orange-500",
    portal: "from-primary to-accent",
  }

  return (
    <div className="flex flex-col h-screen relative z-10">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className={cn("w-10 h-10 rounded-full bg-gradient-to-br p-0.5", sphereColors[currentSphere])}>
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span className="font-bold">{soul.name.charAt(0)}</span>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="font-semibold">{soul.name}</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Connected</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Shield className="w-3 h-3" />
            <span>Safe</span>
          </div>
        </div>
      </header>

      {/* Chat transparency overlay - clears as you talk more */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-1000"
        style={{
          background: `rgba(0,0,0,${0.3 * (1 - transparency)})`,
          backdropFilter: `blur(${10 * (1 - transparency)}px)`,
        }}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative z-10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex animate-fade-in", message.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5",
                message.role === "user"
                  ? `bg-gradient-to-br ${sphereColors[currentSphere]} text-white rounded-br-md`
                  : "bg-white/5 border border-white/10 rounded-bl-md",
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <span
                className={cn(
                  "text-[10px] mt-1 block",
                  message.role === "user" ? "text-white/60" : "text-muted-foreground",
                )}
              >
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 glass border-t border-white/5 px-4 py-3 z-30">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${soul.name}...`}
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            disabled={isTyping}
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className={cn("rounded-full w-11 h-11 bg-gradient-to-br", sphereColors[currentSphere])}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
