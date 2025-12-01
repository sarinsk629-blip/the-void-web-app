"use client"

import { useEffect, useState } from "react"

export function Manifesto() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <header className="relative">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 mb-12">
        <div className="relative">
          <div className="w-3 h-3 bg-primary rounded-full pulse-glow" />
          <div className="absolute inset-0 w-3 h-3 bg-primary rounded-full animate-ping opacity-30" />
        </div>
        <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">THE VOID // SYSTEM ACTIVE</span>
      </div>

      {/* Main headline */}
      <div
        className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-8">
          <span className="block text-foreground">The Death of the</span>
          <span className="block text-primary glitch-text mt-2">
            {'"'}Influencer{'"'}
          </span>
        </h1>
      </div>

      {/* Manifesto paragraphs */}
      <div
        className={`space-y-6 max-w-3xl transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <p className="text-xl sm:text-2xl text-foreground font-semibold tracking-wide">I am done.</p>

        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          I am done with apps that trade my loneliness for ad revenue. I am done swiping on faces like I{"'"}m shopping
          for a human. I am done with the
          {'"'}highlight reel{'"'} that makes me feel like I{"'"}m failing at life.
        </p>

        <p className="text-foreground text-lg sm:text-xl font-medium border-l-2 border-primary pl-4">
          We have 5,000 followers but nobody to call when we are crying.
        </p>

        <div className="pt-4">
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            I am building something different. It{"'"}s called <span className="text-primary font-bold">The Void</span>.
          </p>

          <div className="flex flex-wrap gap-4 my-6 text-xs tracking-widest text-muted-foreground">
            <span className="border border-border/50 px-3 py-1">NO PHOTOS</span>
            <span className="border border-border/50 px-3 py-1">NO FILTERS</span>
            <span className="border border-border/50 px-3 py-1">NO STATUS GAMES</span>
          </div>

          <p className="text-foreground text-lg font-medium">
            It connects <span className="text-primary">souls</span>, not profiles.
          </p>
        </div>

        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed italic">
          I have lost everything in my life, so I am building this from the bottom. I have nothing left to hide.
        </p>

        <p className="text-foreground text-lg sm:text-xl font-semibold pt-4 border-t border-border/30">
          If you are tired of feeling alone in a crowded digital world...
          <span className="block text-primary mt-2 glitch-text">join me.</span>
        </p>
      </div>
    </header>
  )
}
