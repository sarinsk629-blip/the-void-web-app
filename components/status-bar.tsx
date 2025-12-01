"use client"

import { useEffect, useState } from "react"
import { Wifi, Shield, Cpu } from "lucide-react"

type StatusBarProps = {
  soulsOnline: number
}

export function StatusBar({ soulsOnline }: StatusBarProps) {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Wifi className="w-3 h-3 text-green-500" />
            <span className="hidden sm:inline">CONNECTED</span>
          </span>
          <span className="flex items-center gap-2">
            <Shield className="w-3 h-3 text-primary" />
            <span className="hidden sm:inline">ENCRYPTED</span>
          </span>
          <span className="flex items-center gap-2">
            <Cpu className="w-3 h-3 text-accent" />
            <span className="hidden sm:inline">AI ACTIVE</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>{soulsOnline.toLocaleString()} souls online</span>
          </span>
          <span className="font-mono tracking-wider">{time}</span>
        </div>
      </div>
    </div>
  )
}
