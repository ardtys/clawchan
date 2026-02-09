import { useEffect, useRef, type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

const ScrollReveal = ({ children, className = '', delay = 0 }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add('fade-in-up')
              element.style.opacity = '1'
            }, delay)
            observer.unobserve(element)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
