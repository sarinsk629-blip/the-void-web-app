"use client"

interface EnergyCoreProps {
  mousePosition: { x: number; y: number }
}

export function EnergyCore({ mousePosition }: EnergyCoreProps) {
  const offsetX = (mousePosition.x - 0.5) * 20
  const offsetY = (mousePosition.y - 0.5) * 20

  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40">
      {/* Outer glow rings */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl animate-pulse" />
      <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl animate-energy-core" />

      {/* Main core */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-violet-500 to-accent animate-energy-core"
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Inner core */}
      <div
        className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 via-primary/50 to-transparent backdrop-blur-sm"
        style={{
          transform: `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />

      {/* Center point */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-white/80 blur-sm" />
      </div>

      {/* Orbiting particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/60"
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${i * 60}deg) translateX(60px) translateY(-50%)`,
            animation: `energy-core ${8 + i}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
}
