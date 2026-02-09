import { memo, useState, useRef } from 'react'

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="bento-card relative size-full overflow-hidden hex-corners">
      {/* Video Element - Always Muted */}
      <video
        ref={videoRef}
        src="/video.mp4"
        className="absolute inset-0 size-full object-cover"
        loop
        muted
        playsInline
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Gradient Overlay - Lighter for visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-card-bg/80 via-transparent to-transparent" />

      {/* Logo Cover Overlay - Hide ChatGPT logo */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-card-bg/60 to-transparent" />

      {/* Bottom Right Logo Cover - Hide ChatGPT logo */}
      <div className="absolute bottom-0 right-0 w-32 h-24 bg-gradient-to-tl from-card-bg/60 to-transparent" />

      {/* Content Overlay */}
      <div className="relative z-10 flex size-full flex-col justify-between p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-cyan-glow neon-text uppercase tracking-widest terminal-prompt">
            DIGITAL_ARCHIVE
          </span>
          <div className="flex items-center gap-2">
            {/* Live Indicator */}
            <div className="flex items-center gap-1.5 data-panel px-2.5 py-1.5 backdrop-blur-sm">
              <span className={`size-2 ${isPlaying ? 'bg-cyan-glow status-online' : 'bg-muted-foreground'}`} style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />
              <span className="font-mono text-[10px] text-cyan-glow uppercase tracking-wider">
                {isPlaying ? 'LIVE' : 'PAUSED'}
              </span>
            </div>
            {/* Silent Mode Indicator */}
            <div className="flex items-center gap-1.5 data-panel px-2.5 py-1.5 backdrop-blur-sm">
              <svg className="size-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                SILENT
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="space-y-3">
          {/* Title */}
          <div>
            <h3 className="mb-1 font-mono text-base font-bold text-cyan-glow neon-text uppercase tracking-wide">
              DATA STREAM ACTIVE
            </h3>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              MONITORING DIGITAL VOID ACTIVITY
            </p>
          </div>

          {/* Play Button & Progress */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="flex size-11 items-center justify-center border border-cyan-glow/50 bg-gradient-to-br from-cyan-glow/20 to-warm-gold/20 transition-all hover:scale-105 hover:border-cyan-glow active:scale-95 hex-corners"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="size-4 text-cyan-glow" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="size-4 text-cyan-glow ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Waveform Visualization */}
            <div className="flex flex-1 items-center gap-[2px]">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 transition-all duration-150 ${
                    isPlaying ? 'bg-cyan-glow' : 'bg-muted-foreground/30'
                  }`}
                  style={{
                    height: isPlaying
                      ? `${Math.random() * 20 + 8}px`
                      : '4px',
                    animationDelay: `${i * 50}ms`,
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(VideoShowcase)
