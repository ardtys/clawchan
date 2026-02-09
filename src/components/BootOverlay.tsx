import { useState, useEffect } from 'react'
import BootingAnimation from './BootingAnimation'

const BootOverlay = () => {
  const [isBooting, setIsBooting] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Check if user has already booted in this session
    const booted = sessionStorage.getItem('clawchan-booted')
    if (booted === 'true') {
      setIsBooting(false)
      setShouldRender(false)
    }
  }, [])

  const handleBootComplete = () => {
    sessionStorage.setItem('clawchan-booted', 'true')
    setIsBooting(false)
    // Remove from DOM after fade out
    setTimeout(() => setShouldRender(false), 500)
  }

  if (!shouldRender) return null

  return (
    <div
      style={{
        opacity: isBooting ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: isBooting ? 'auto' : 'none',
      }}
    >
      <BootingAnimation onComplete={handleBootComplete} />
    </div>
  )
}

export default BootOverlay
