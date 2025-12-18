"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Persona } from "./vibe-app"
import { Button } from "./ui/button"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatViewProps {
  persona: Persona
  onBack: () => void
}

export function ChatView({ persona, onBack }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Initial greeting
    const greeting = getGreeting(persona.id)
    setMessages([
      {
        id: "greeting",
        role: "assistant",
        content: greeting,
        timestamp: new Date(),
      },
    ])
  }, [persona.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getGreeting = (personaId: string): string => {
    const greetings: Record<string, string> = {
      luna: "Hey there! 💜 I'm so happy you're here. What's on your mind today?",
      kai: "Yooo what's good! 😎 Ready to have some fun?",
      nova: "Hello, beautiful soul ✨ I've been waiting for someone interesting to talk to...",
      alex: "Hey! 💪 So glad you stopped by. What's going on in your world?",
    }
    return greetings[personaId] || greetings.luna
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
          persona: persona.id,
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
        content: "Oops, I got a bit distracted! Can you try again? 😅",
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

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className={cn("w-10 h-10 rounded-full bg-gradient-to-br p-0.5", persona.gradient)}>
            <img
              src={persona.avatar || "/placeholder.svg"}
              alt={persona.name}
              className="w-full h-full rounded-full object-cover bg-background"
            />
          </div>

          <div className="flex-1">
            <h2 className="font-semibold">{persona.name}</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-primary">
            <Sparkles className="w-3 h-3" />
            <span>AI</span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex animate-fade-in", message.role === "user" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2.5",
                message.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted rounded-bl-md",
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <span
                className={cn(
                  "text-[10px] mt-1 block",
                  message.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground",
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
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
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
      <div className="sticky bottom-20 bg-background/80 backdrop-blur-xl border-t border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${persona.name}...`}
            className="flex-1 bg-muted rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isTyping}
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="rounded-full w-11 h-11 bg-primary hover:bg-primary/90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
