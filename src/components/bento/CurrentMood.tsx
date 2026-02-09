import { memo, useState, useEffect } from 'react'
import { CURRENT_MOODS } from '@/consts'

const WaveformVisualizer = memo(() => {
  return (
    <div className="flex h-8 items-end gap-[3px]">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="waveform-bar w-1.5 rounded-full bg-gradient-to-t from-warm-gold to-cyan-glow"
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  )
})

const CurrentMood = () => {
  const [moodIndex, setMoodIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setMoodIndex((prev) => (prev + 1) % CURRENT_MOODS.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentMood = CURRENT_MOODS[moodIndex]

  return (
    <div className="bento-card relative flex size-full flex-col justify-between p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs text-warm-gold uppercase tracking-wider">
          Current_Mood
        </span>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      {/* Waveform Visualizer */}
      <div className="mb-6 flex items-center justify-center">
        {isPlaying ? (
          <WaveformVisualizer />
        ) : (
          <div className="flex h-8 items-end gap-[3px]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-2 w-1.5 rounded-full bg-muted-foreground/50"
              />
            ))}
          </div>
        )}
      </div>

      {/* Current Status */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className={`size-2 rounded-full ${isPlaying ? 'bg-cyan-glow status-online' : 'bg-muted-foreground'}`} />
          <span className="font-mono text-xs text-muted-foreground">
            {isPlaying ? 'Playing' : 'Paused'}
          </span>
        </div>

        <div className="font-mono text-sm text-foreground leading-snug">
          {currentMood}
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-to-r from-warm-gold to-cyan-glow transition-all duration-100"
            style={{
              width: isPlaying ? '100%' : '0%',
              animation: isPlaying ? 'progress 5s linear infinite' : 'none',
            }}
          />
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 m-3">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-warm-gold opacity-50"
        >
          <path
            d="M4 12C4 7.58172 7.58172 4 12 4H28V20C28 24.4183 24.4183 28 20 28H4V12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </div>
  )
}

export default memo(CurrentMood)
