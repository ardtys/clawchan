import { memo, useState, useEffect } from 'react'

// Live Updates - Easy to update through this array
const UPDATES = [
  {
    id: 1,
    type: 'feature' as const,
    title: 'Token Monitoring Live',
    description: 'Real-time crypto prices with CoinGecko API',
    date: '2026-02-13',
    isNew: true,
  },
  {
    id: 2,
    type: 'update' as const,
    title: 'Centralized Config System',
    description: 'All site data now manageable from one file',
    date: '2026-02-13',
    isNew: true,
  },
  {
    id: 3,
    type: 'announcement' as const,
    title: 'ElizaOS Integration Complete',
    description: 'Full AI agent capabilities now available',
    date: '2026-02-12',
    isNew: false,
  },
]

const typeConfig = {
  feature: { icon: '✨', color: 'text-cyan-glow', bg: 'bg-cyan-glow/10', label: 'Feature' },
  update: { icon: '🔄', color: 'text-warm-gold', bg: 'bg-warm-gold/10', label: 'Update' },
  announcement: { icon: '📢', color: 'text-amber', bg: 'bg-amber/10', label: 'News' },
  fix: { icon: '🔧', color: 'text-green-400', bg: 'bg-green-400/10', label: 'Fix' },
}

const LiveUpdates = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || UPDATES.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % UPDATES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const currentUpdate = UPDATES[currentIndex]
  const config = typeConfig[currentUpdate.type]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div
      className="bento-card h-full p-6 flex flex-col min-h-[200px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📰</span>
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
            Live Updates
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-cyan-glow status-online" />
          <span className="font-mono text-xs text-muted-foreground">
            {currentIndex + 1}/{UPDATES.length}
          </span>
        </div>
      </div>

      {/* Update Card */}
      <div className={`flex-1 rounded-lg p-4 ${config.bg} border border-current/10 transition-all duration-300`}>
        <div className="flex items-start gap-3">
          <span className="text-2xl">{config.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`font-mono text-xs font-bold uppercase ${config.color}`}>
                {config.label}
              </span>
              {currentUpdate.isNew && (
                <span className="px-2 py-0.5 bg-cyan-glow/20 text-cyan-glow text-[10px] font-mono font-bold rounded-full animate-pulse">
                  NEW
                </span>
              )}
              <span className="font-mono text-[10px] text-muted-foreground ml-auto">
                {formatDate(currentUpdate.date)}
              </span>
            </div>
            <h4 className="font-mono text-sm font-bold text-foreground mb-1 truncate">
              {currentUpdate.title}
            </h4>
            <p className="font-mono text-xs text-muted-foreground line-clamp-2">
              {currentUpdate.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {UPDATES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`size-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-cyan-glow scale-125'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to update ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(LiveUpdates)
