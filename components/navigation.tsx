"use client"

import { MessageCircle, Compass, User } from "lucide-react"
import { cn } from "@/lib/utils"

type NavTab = "chat" | "discover" | "profile"

interface NavigationProps {
  activeTab: NavTab
  onTabChange: (tab: NavTab) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "discover" as const, icon: Compass, label: "Discover" },
    { id: "chat" as const, icon: MessageCircle, label: "Chat" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-6 rounded-xl transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <div className={cn("p-2 rounded-xl transition-all duration-200", isActive && "bg-primary/20")}>
                <Icon className={cn("w-6 h-6", isActive && "animate-pulse-ring")} />
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
