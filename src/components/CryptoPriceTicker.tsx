import { memo, useState, useEffect, useCallback } from 'react'
import { TRACKED_TOKENS } from '@/config/site-data'

interface TickerPrice {
  id: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
}

const CryptoPriceTicker = () => {
  const [prices, setPrices] = useState<TickerPrice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPrices = useCallback(async () => {
    try {
      const ids = TRACKED_TOKENS.map(t => t.id).join(',')
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      )

      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      const formattedPrices: TickerPrice[] = TRACKED_TOKENS.map(token => ({
        id: token.id,
        symbol: token.symbol,
        current_price: data[token.id]?.usd || 0,
        price_change_percentage_24h: data[token.id]?.usd_24h_change || 0,
      }))

      setPrices(formattedPrices)
      setIsLoading(false)
    } catch (err) {
      // Fallback mock data
      setPrices([
        { id: 'solana', symbol: 'SOL', current_price: 142.58, price_change_percentage_24h: 3.24 },
        { id: 'ethereum', symbol: 'ETH', current_price: 3245.67, price_change_percentage_24h: -1.23 },
        { id: 'bitcoin', symbol: 'BTC', current_price: 97842.15, price_change_percentage_24h: 1.87 },
      ])
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [fetchPrices])

  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    }
    return `$${price.toFixed(2)}`
  }

  if (isLoading) {
    return (
      <div className="w-full overflow-hidden bg-card-bg/50 border-y border-cyan-glow/10">
        <div className="flex items-center justify-center py-2">
          <span className="font-mono text-xs text-muted-foreground animate-pulse">Loading prices...</span>
        </div>
      </div>
    )
  }

  // Duplicate for seamless scroll
  const tickerItems = [...prices, ...prices, ...prices]

  return (
    <div className="w-full overflow-hidden bg-card-bg/50 border-y border-cyan-glow/10">
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {tickerItems.map((price, index) => {
            const token = TRACKED_TOKENS.find(t => t.id === price.id)
            const isPositive = price.price_change_percentage_24h >= 0

            return (
              <div
                key={`${price.id}-${index}`}
                className="inline-flex items-center gap-3 px-6 py-2"
              >
                <span className={`text-lg ${
                  token?.color === 'cyan-glow' ? 'text-cyan-glow' :
                  token?.color === 'warm-gold' ? 'text-warm-gold' : 'text-amber'
                }`}>
                  {token?.icon}
                </span>
                <span className="font-mono text-sm font-bold text-foreground">
                  {price.symbol}
                </span>
                <span className="font-mono text-sm text-foreground tabular-nums">
                  {formatPrice(price.current_price)}
                </span>
                <span className={`font-mono text-xs tabular-nums ${isPositive ? 'text-cyan-glow' : 'text-red-500'}`}>
                  {isPositive ? '+' : ''}{price.price_change_percentage_24h.toFixed(2)}%
                </span>
                <span className="text-muted-foreground/30">|</span>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }
        .ticker-content {
          display: flex;
          white-space: nowrap;
          animation: ticker 30s linear infinite;
        }
        .ticker-content:hover {
          animation-play-state: paused;
        }
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  )
}

export default memo(CryptoPriceTicker)
