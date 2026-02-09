import { useState, useEffect } from 'react'
import BootingAnimation from './BootingAnimation'

interface HomeWithBootingProps {
  children: React.ReactNode
}

const HomeWithBooting = ({ children }: HomeWithBootingProps) => {
  const [isBooting, setIsBooting] = useState(true)

  useEffect(() => {
    // Check if user has already booted in this session
    const booted = sessionStorage.getItem('clawchan-booted')
    if (booted === 'true') {
      setIsBooting(false)
    }
  }, [])

  const handleBootComplete = () => {
    sessionStorage.setItem('clawchan-booted', 'true')
    setIsBooting(false)
  }

  return (
    <>
      {isBooting && <BootingAnimation onComplete={handleBootComplete} />}
      <div style={{ display: isBooting ? 'none' : 'block' }}>
        {children}
      </div>
    </>
  )
}

export default HomeWithBooting
