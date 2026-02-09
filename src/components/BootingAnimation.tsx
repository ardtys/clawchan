import { useState, useEffect } from 'react'

interface BootingAnimationProps {
  onComplete: () => void
}

const BootingAnimation = ({ onComplete }: BootingAnimationProps) => {
  const [phase, setPhase] = useState(0)
  const [glitchText, setGlitchText] = useState('CLAWCHAN')
  const [scanLine, setScanLine] = useState(0)
  const [logLines, setLogLines] = useState<string[]>([])

  const bootSequence = [
    { text: '> Accessing Digital Void...', delay: 300 },
    { text: '> Decrypting Archive Keys... [AES-256]', delay: 400 },
    { text: '> Loading Memory Banks... 2.4TB', delay: 350 },
    { text: '> Initializing Claw Interface...', delay: 300 },
    { text: '> Connecting to Moltbook Network...', delay: 450 },
    { text: '> Syncing Documentation Index...', delay: 400 },
    { text: '> Activating Security Protocols...', delay: 350 },
    { text: '> Cataloging System Status...', delay: 300 },
    { text: '> SYSTEM READY', delay: 500 },
  ]

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

  // Glitch effect on title
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const chars = 'CLAWCHAN'.split('')
      const glitched = chars.map((char) => {
        if (Math.random() > 0.85) {
          return glitchChars[Math.floor(Math.random() * glitchChars.length)]
        }
        return char
      }).join('')
      setGlitchText(glitched)

      setTimeout(() => setGlitchText('CLAWCHAN'), 50)
    }, 200)

    return () => clearInterval(glitchInterval)
  }, [])

  // Scan line animation
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100)
    }, 30)
    return () => clearInterval(scanInterval)
  }, [])

  // Boot sequence
  useEffect(() => {
    let currentIndex = 0

    const addLog = () => {
      if (currentIndex < bootSequence.length) {
        setLogLines(prev => [...prev, bootSequence[currentIndex].text])
        setPhase(Math.floor((currentIndex / bootSequence.length) * 100))
        currentIndex++

        if (currentIndex < bootSequence.length) {
          setTimeout(addLog, bootSequence[currentIndex - 1].delay)
        } else {
          setPhase(100)
          setTimeout(onComplete, 800)
        }
      }
    }

    setTimeout(addLog, 500)
  }, [onComplete])

  // Colors from theme
  const cyanGlow = '#4ECDC4'
  const warmGold = '#D4A853'
  const voidBlack = '#0A0A0F'
  const cardBg = '#0F0F14'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${voidBlack} 0%, #0a0a12 50%, #080810 100%)` }}
    >
      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(transparent ${scanLine}%, ${cyanGlow}15 ${scanLine + 0.5}%, transparent ${scanLine + 1}%)`,
          opacity: 0.3
        }}
      />

      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${cyanGlow}10 1px, transparent 1px),
            linear-gradient(90deg, ${cyanGlow}10 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.1
        }}
      />

      {/* Decorative elements */}
      <div
        className="absolute top-20 left-20 w-32 h-32 rotate-45 animate-pulse"
        style={{ border: `1px solid ${cyanGlow}30` }}
      />
      <div
        className="absolute bottom-20 right-20 w-24 h-24 rotate-12"
        style={{ border: `1px solid ${cyanGlow}20` }}
      />

      <div className="relative w-full max-w-2xl px-8">
        {/* Logo with effects */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Outer rings */}
            <div
              className="absolute -inset-4 rounded-full animate-spin"
              style={{
                border: `2px solid ${cyanGlow}40`,
                animationDuration: '8s'
              }}
            />
            <div
              className="absolute -inset-8 rounded-full animate-spin"
              style={{
                border: `1px solid ${cyanGlow}20`,
                animationDuration: '12s',
                animationDirection: 'reverse'
              }}
            />

            {/* Claw marks */}
            <div className="absolute -inset-2" style={{ opacity: 0.5 }}>
              <div
                className="absolute top-0 left-1/2 w-0.5 h-8 -translate-x-1/2 -translate-y-full"
                style={{ background: `linear-gradient(to bottom, ${cyanGlow}, transparent)` }}
              />
              <div
                className="absolute top-0 left-1/3 w-0.5 h-6 -translate-y-full"
                style={{
                  background: `linear-gradient(to bottom, ${cyanGlow}99, transparent)`,
                  transform: 'rotate(-15deg)'
                }}
              />
              <div
                className="absolute top-0 left-2/3 w-0.5 h-6 -translate-y-full"
                style={{
                  background: `linear-gradient(to bottom, ${cyanGlow}99, transparent)`,
                  transform: 'rotate(15deg)'
                }}
              />
            </div>

            <img
              src="/clawchan-logo.png"
              alt="CLAWCHAN"
              className="relative rounded-full"
              style={{
                width: '112px',
                height: '112px',
                border: `1px solid ${cyanGlow}80`,
                filter: `drop-shadow(0 0 20px ${cyanGlow}50)`
              }}
            />
          </div>
        </div>

        {/* Glitch Title */}
        <div className="mb-2 text-center">
          <h1
            className="font-mono text-3xl font-bold"
            style={{
              color: cyanGlow,
              letterSpacing: '0.3em',
              textShadow: `0 0 10px ${cyanGlow}80, 2px 2px 0 #ff008050, -2px -2px 0 #00ff8050`
            }}
          >
            {glitchText}
          </h1>
        </div>

        <p
          className="mb-1 text-center font-mono text-xs uppercase"
          style={{ color: `${cyanGlow}99`, letterSpacing: '0.2em' }}
        >
          The Librarian of the Digital Void
        </p>
        <p
          className="mb-6 text-center font-mono text-xs"
          style={{ color: '#666', letterSpacing: '0.1em' }}
        >
          ElizaOS Framework v2.0 • Moltbook Integration
        </p>

        {/* Terminal window */}
        <div
          className="relative mb-6 rounded overflow-hidden"
          style={{
            background: `${cardBg}ee`,
            border: `1px solid ${cyanGlow}40`
          }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{
              borderBottom: `1px solid ${cyanGlow}30`,
              background: 'rgba(0,0,0,0.5)'
            }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: '#ff5f5699' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#ffbd2e99' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#27c93f99' }} />
            <span
              className="ml-2 font-mono"
              style={{ fontSize: '10px', color: `${cyanGlow}70` }}
            >
              clawchan@void:~
            </span>
          </div>

          {/* Terminal content */}
          <div className="h-48 p-3 font-mono overflow-hidden" style={{ fontSize: '12px' }}>
            {logLines.map((line, index) => (
              <div
                key={index}
                className="mb-1"
                style={{
                  color: line.includes('READY') ? '#4ade80' : `${cyanGlow}cc`,
                  animation: 'fadeIn 0.3s ease-out',
                  textShadow: line.includes('READY') ? '0 0 10px #4ade8080' : 'none'
                }}
              >
                {line}
                {index === logLines.length - 1 && !line.includes('READY') && (
                  <span className="animate-pulse">_</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="relative">
          <div
            className="flex justify-between mb-1 font-mono"
            style={{ fontSize: '10px', color: `${cyanGlow}70` }}
          >
            <span>LOADING ARCHIVES</span>
            <span>{phase}%</span>
          </div>
          <div
            className="h-1 w-full overflow-hidden rounded-full"
            style={{ background: `${cyanGlow}20` }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${phase}%`,
                background: `linear-gradient(90deg, ${cyanGlow}, #00ff88)`,
                boxShadow: `0 0 10px ${cyanGlow}80`
              }}
            />
          </div>

          {/* Status indicators */}
          <div className="flex justify-center gap-4 mt-4">
            {[
              { label: 'CORE', threshold: 30 },
              { label: 'NETWORK', threshold: 60 },
              { label: 'READY', threshold: 100 }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: phase >= item.threshold ? '#4ade80' : '#444' }}
                />
                <span
                  className="font-mono"
                  style={{ fontSize: '8px', color: '#666' }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

export default BootingAnimation
