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
      const glitched = chars.map((char, i) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
         style={{ background: 'linear-gradient(180deg, #050508 0%, #0a0a12 50%, #080810 100%)' }}>

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `linear-gradient(transparent ${scanLine}%, rgba(0, 255, 255, 0.1) ${scanLine + 0.5}%, transparent ${scanLine + 1}%)`
        }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-5"
           style={{
             backgroundImage: `
               linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }}
      />

      {/* Hexagon decorations */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-cyan-500/20 rotate-45 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-24 h-24 border border-cyan-500/10 rotate-12" />
      <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-purple-500/20 -rotate-12 animate-pulse" />

      <div className="relative w-full max-w-2xl px-8">
        {/* Logo with claw effect */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Outer ring */}
            <div className="absolute -inset-4 border-2 border-cyan-500/30 rounded-full animate-spin"
                 style={{ animationDuration: '8s' }} />
            <div className="absolute -inset-8 border border-cyan-500/10 rounded-full animate-spin"
                 style={{ animationDuration: '12s', animationDirection: 'reverse' }} />

            {/* Claw marks effect */}
            <div className="absolute -inset-2 opacity-50">
              <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gradient-to-b from-cyan-400 to-transparent -translate-x-1/2 -translate-y-full" />
              <div className="absolute top-0 left-1/3 w-0.5 h-6 bg-gradient-to-b from-cyan-400/70 to-transparent -translate-y-full rotate-[-15deg]" />
              <div className="absolute top-0 left-2/3 w-0.5 h-6 bg-gradient-to-b from-cyan-400/70 to-transparent -translate-y-full rotate-[15deg]" />
            </div>

            <img
              src="/clawchan-logo.png"
              alt="CLAWCHAN"
              className="relative size-28 rounded-full border border-cyan-500/50"
              style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))' }}
            />
          </div>
        </div>

        {/* Glitch Title */}
        <div className="mb-2 text-center">
          <h1 className="font-mono text-3xl font-bold tracking-[0.3em]"
              style={{
                color: '#00ffff',
                textShadow: '0 0 10px rgba(0, 255, 255, 0.5), 2px 2px 0 rgba(255, 0, 128, 0.3), -2px -2px 0 rgba(0, 255, 128, 0.3)'
              }}>
            {glitchText}
          </h1>
        </div>

        <p className="mb-1 text-center font-mono text-[10px] tracking-[0.2em] text-cyan-500/70 uppercase">
          The Librarian of the Digital Void
        </p>
        <p className="mb-6 text-center font-mono text-[8px] text-gray-600 tracking-wider">
          ElizaOS Framework v2.0 • Moltbook Integration Active
        </p>

        {/* Terminal window */}
        <div className="relative mb-6 rounded border border-cyan-500/30 overflow-hidden"
             style={{ background: 'rgba(0, 10, 20, 0.8)' }}>
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-cyan-500/20 bg-black/50">
            <div className="w-2 h-2 rounded-full bg-red-500/70" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
            <div className="w-2 h-2 rounded-full bg-green-500/70" />
            <span className="ml-2 font-mono text-[10px] text-cyan-500/50">clawchan@void:~</span>
          </div>

          {/* Terminal content */}
          <div className="h-48 p-3 font-mono text-xs overflow-hidden">
            {logLines.map((line, index) => (
              <div
                key={index}
                className={`mb-1 ${
                  line.includes('READY')
                    ? 'text-green-400'
                    : line.includes('ERROR')
                    ? 'text-red-400'
                    : 'text-cyan-400/80'
                }`}
                style={{
                  animation: 'fadeIn 0.3s ease-out',
                  textShadow: line.includes('READY') ? '0 0 10px rgba(74, 222, 128, 0.5)' : 'none'
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
          <div className="flex justify-between mb-1 font-mono text-[10px] text-cyan-500/50">
            <span>LOADING ARCHIVES</span>
            <span>{phase}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-cyan-900/30">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${phase}%`,
                background: 'linear-gradient(90deg, #00ffff, #00ff88)',
                boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
              }}
            />
          </div>

          {/* Status indicators */}
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${phase > 30 ? 'bg-green-400' : 'bg-gray-600'}`} />
              <span className="font-mono text-[8px] text-gray-500">CORE</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${phase > 60 ? 'bg-green-400' : 'bg-gray-600'}`} />
              <span className="font-mono text-[8px] text-gray-500">NETWORK</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${phase >= 100 ? 'bg-green-400' : 'bg-gray-600'}`} />
              <span className="font-mono text-[8px] text-gray-500">READY</span>
            </div>
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
