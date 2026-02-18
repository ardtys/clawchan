import { memo, useState, useEffect } from 'react'
import { CLAWCHAN_BIO } from '@/consts'
import { PROFILE_STATS, STATUS_MESSAGES } from '@/config/site-data'

const ProfileCard = () => {
  const [statusIndex, setStatusIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentStatus = STATUS_MESSAGES[statusIndex]
    let charIndex = 0

    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (charIndex <= currentStatus.text.length) {
          setDisplayText(currentStatus.text.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typingInterval)
          setTimeout(() => {
            setIsTyping(false)
          }, 2000)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    } else {
      const deleteInterval = setInterval(() => {
        if (displayText.length > 0) {
          setDisplayText((prev) => prev.slice(0, -1))
        } else {
          clearInterval(deleteInterval)
          setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length)
          setIsTyping(true)
        }
      }, 30)

      return () => clearInterval(deleteInterval)
    }
  }, [statusIndex, isTyping])

  const currentStatus = STATUS_MESSAGES[statusIndex]

  return (
    <div className="bento-card relative flex size-full flex-col p-6 scanlines digital-grid">
      {/* Avatar Section */}
      <div className="mb-6 flex items-start gap-4">
        <div className="relative hex-corners">
          <div className="size-20 sm:size-24 overflow-hidden border border-cyan-glow/40 bg-gradient-to-br from-void-black to-card-bg relative">
            <img
              src="/clawchan-logo.png"
              alt="ClawChan Avatar"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-glow/20 to-transparent" />
          </div>
          {/* Status Indicator */}
          <div
            className={`absolute -right-1 -bottom-1 size-4 border border-card-bg ${
              currentStatus.isOnline ? 'status-online bg-cyan-glow' : 'status-congested bg-destructive'
            }`}
            style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
          />
        </div>

        <div className="flex-1">
          <h2 className="mb-1 font-mono text-xl font-bold text-cyan-glow neon-text tracking-wider">
            CLAWCHAN
          </h2>
          <p className="font-mono text-[10px] text-warm-gold/80 mb-2 tracking-wide">by ElizaOS | Open Claw</p>
          <p className="font-mono text-xs text-muted-foreground leading-relaxed">{CLAWCHAN_BIO}</p>
        </div>
      </div>

      {/* Animated Status */}
      <div className="mb-4 data-panel p-3 status-bar">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-cyan-glow">{currentStatus.icon}</span>
          <span className="text-foreground terminal-prompt">
            {displayText}
            <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-cyan-glow" />
          </span>
        </div>
      </div>

      {/* Quick Stats - Now using configurable data */}
      <div className="mt-auto grid grid-cols-3 gap-2 text-center">
        <div className="data-panel p-2.5 hex-corners group hover:bg-cyan-glow/5 transition-colors">
          <div className="font-mono text-base font-bold text-cyan-glow neon-text group-hover:scale-105 transition-transform">
            {PROFILE_STATS.uptime}
          </div>
          <div className="font-mono text-[10px] text-muted-foreground/70 mt-1 tracking-wider">UPTIME</div>
        </div>
        <div className="data-panel p-2.5 hex-corners group hover:bg-warm-gold/5 transition-colors">
          <div className="font-mono text-base font-bold text-warm-gold neon-text-gold group-hover:scale-105 transition-transform">
            {PROFILE_STATS.transactionsPerDay}
          </div>
          <div className="font-mono text-[10px] text-muted-foreground/70 mt-1 tracking-wider">TX/DAY</div>
        </div>
        <div className="data-panel p-2.5 hex-corners group hover:bg-amber/5 transition-colors">
          <div className="font-mono text-base font-bold text-amber group-hover:scale-105 transition-transform">
            {PROFILE_STATS.activeStatus}
          </div>
          <div className="font-mono text-[10px] text-muted-foreground/70 mt-1 tracking-wider">ACTIVE</div>
        </div>
      </div>
    </div>
  )
}

export default memo(ProfileCard)
