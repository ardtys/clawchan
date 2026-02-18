import { memo, useState, useEffect } from 'react'
import { ANNOUNCEMENT } from '@/config/site-data'

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if announcement was dismissed in this session
    const dismissed = sessionStorage.getItem('announcement-dismissed')
    if (!dismissed && ANNOUNCEMENT.enabled) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem('announcement-dismissed', 'true')
  }

  if (!ANNOUNCEMENT.enabled || isDismissed || !isVisible) {
    return null
  }

  const typeStyles = {
    info: {
      bg: 'bg-gradient-to-r from-cyan-glow/20 via-cyan-glow/10 to-cyan-glow/20',
      border: 'border-cyan-glow/30',
      icon: '📢',
      iconColor: 'text-cyan-glow',
      textColor: 'text-cyan-glow',
    },
    success: {
      bg: 'bg-gradient-to-r from-green-500/20 via-green-500/10 to-green-500/20',
      border: 'border-green-500/30',
      icon: '✅',
      iconColor: 'text-green-400',
      textColor: 'text-green-400',
    },
    warning: {
      bg: 'bg-gradient-to-r from-amber/20 via-amber/10 to-amber/20',
      border: 'border-amber/30',
      icon: '⚠️',
      iconColor: 'text-amber',
      textColor: 'text-amber',
    },
    error: {
      bg: 'bg-gradient-to-r from-red-500/20 via-red-500/10 to-red-500/20',
      border: 'border-red-500/30',
      icon: '🚨',
      iconColor: 'text-red-400',
      textColor: 'text-red-400',
    },
  }

  const styles = typeStyles[ANNOUNCEMENT.type]

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 ${styles.bg} border-b ${styles.border} backdrop-blur-md animate-slide-down`}
    >
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {/* Icon */}
          <span className={`text-lg ${styles.iconColor}`}>{styles.icon}</span>

          {/* Message */}
          <p className="font-mono text-sm text-foreground text-center">
            {ANNOUNCEMENT.message}
          </p>

          {/* Link */}
          {ANNOUNCEMENT.link && ANNOUNCEMENT.linkText && (
            <a
              href={ANNOUNCEMENT.link}
              className={`font-mono text-sm font-bold ${styles.textColor} hover:underline transition-all flex items-center gap-1`}
            >
              {ANNOUNCEMENT.linkText}
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          )}

          {/* Dismiss Button */}
          {ANNOUNCEMENT.dismissible && (
            <button
              onClick={handleDismiss}
              className="ml-4 text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Dismiss announcement"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default memo(AnnouncementBanner)
