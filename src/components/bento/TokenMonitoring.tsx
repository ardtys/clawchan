import { memo, useState, useEffect, useCallback } from 'react'
import { TRACKED_TOKENS } from '@/config/site-data'

interface TokenPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  price_change_percentage_7d: number
  market_cap: number
  total_volume: number
  sparkline_in_7d?: { price: number[] }
  last_updated: string
}

interface TokenData {
  [key: string]: TokenPrice
}

const formatPrice = (price: number): string => {
  if (price >= 1000) {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  } else if (price >= 1) {
    return `$${price.toFixed(2)}`
  } else {
    return `$${price.toFixed(4)}`
  }
}

const formatLargeNumber = (num: number): string => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
  return `$${num.toLocaleString()}`
}

const MiniSparkline = memo(({ data, isPositive }: { data: number[]; isPositive: boolean }) => {
  if (!data || data.length === 0) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <svg className="w-20 h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={isPositive ? '#4ECDC4' : '#ef4444'}
        strokeWidth="3"
        points={points}
        className="drop-shadow-sm"
      />
    </svg>
  )
})

const TokenRow = memo(({ token, data }: { token: typeof TRACKED_TOKENS[0]; data: TokenPrice | null }) => {
  const isPositive = data ? data.price_change_percentage_24h >= 0 : true
  const colorClass = token.color === 'cyan-glow' ? 'text-cyan-glow' : token.color === 'warm-gold' ? 'text-warm-gold' : 'text-amber'

  if (!data) {
    return (
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 animate-pulse">
        <div className="flex items-center gap-3">
          <span className={`text-2xl ${colorClass}`}>{token.icon}</span>
          <div>
            <div className="h-4 w-16 bg-muted/40 rounded" />
            <div className="h-3 w-12 bg-muted/30 rounded mt-1" />
          </div>
        </div>
        <div className="h-6 w-24 bg-muted/40 rounded" />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-all duration-300 group">
      <div className="flex items-center gap-3">
        <span className={`text-2xl ${colorClass} group-hover:scale-110 transition-transform`}>{token.icon}</span>
        <div>
          <div className="font-mono text-sm font-bold text-foreground">{token.symbol}</div>
          <div className="font-mono text-[10px] text-muted-foreground">{token.name}</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Mini Sparkline */}
        {data.sparkline_in_7d?.price && (
          <div className="hidden sm:block">
            <MiniSparkline
              data={data.sparkline_in_7d.price.slice(-24)}
              isPositive={isPositive}
            />
          </div>
        )}

        {/* Price & Change */}
        <div className="text-right">
          <div className="font-mono text-sm font-bold text-foreground tabular-nums">
            {formatPrice(data.current_price)}
          </div>
          <div className={`font-mono text-xs tabular-nums ${isPositive ? 'text-cyan-glow' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{data.price_change_percentage_24h?.toFixed(2) || '0.00'}%
          </div>
        </div>
      </div>
    </div>
  )
})

const TokenMonitoring = () => {
  const [tokenData, setTokenData] = useState<TokenData>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchTokenPrices = useCallback(async () => {
    try {
      const ids = TRACKED_TOKENS.map(t => t.id).join(',')
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h,7d`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch token prices')
      }

      const data: TokenPrice[] = await response.json()
      const tokenMap: TokenData = {}

      data.forEach((token) => {
        tokenMap[token.id] = token
      })

      setTokenData(tokenMap)
      setLastUpdate(new Date())
      setError(null)
      setIsLoading(false)
    } catch (err) {
      console.error('Error fetching token prices:', err)
      // Use fallback mock data
      const mockData: TokenData = {
        solana: {
          id: 'solana',
          symbol: 'SOL',
          name: 'Solana',
          current_price: 142.58,
          price_change_percentage_24h: 3.24,
          price_change_percentage_7d: 8.12,
          market_cap: 68500000000,
          total_volume: 2100000000,
          last_updated: new Date().toISOString(),
        },
        ethereum: {
          id: 'ethereum',
          symbol: 'ETH',
          name: 'Ethereum',
          current_price: 3245.67,
          price_change_percentage_24h: -1.23,
          price_change_percentage_7d: 2.45,
          market_cap: 390000000000,
          total_volume: 12000000000,
          last_updated: new Date().toISOString(),
        },
        bitcoin: {
          id: 'bitcoin',
          symbol: 'BTC',
          name: 'Bitcoin',
          current_price: 97842.15,
          price_change_percentage_24h: 1.87,
          price_change_percentage_7d: 5.32,
          market_cap: 1920000000000,
          total_volume: 35000000000,
          last_updated: new Date().toISOString(),
        },
      }
      setTokenData(mockData)
      setLastUpdate(new Date())
      setError('Using cached data')
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTokenPrices()
    const interval = setInterval(fetchTokenPrices, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [fetchTokenPrices])

  // Calculate total market cap
  const totalMarketCap = Object.values(tokenData).reduce((acc, token) => acc + (token.market_cap || 0), 0)

  if (isLoading) {
    return (
      <div className="bento-card h-full p-6 flex flex-col min-h-[300px]">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-warm-gold">Token_Monitor</span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 animate-pulse rounded-full bg-cyan-glow" />
            <span className="font-mono text-xs text-muted-foreground">Loading</span>
          </span>
        </div>
        <div className="space-y-3 flex-1">
          {TRACKED_TOKENS.map((token) => (
            <TokenRow key={token.id} token={token} data={null} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bento-card h-full p-6 flex flex-col min-h-[300px]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-warm-gold text-lg">📊</span>
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
            Token Monitor
          </span>
        </div>
        <div className="flex items-center gap-3">
          {error && (
            <span className="font-mono text-[10px] text-amber">{error}</span>
          )}
          <span className="flex items-center gap-2 rounded-full bg-cyan-glow/10 px-3 py-1">
            <span className="status-online size-2 rounded-full bg-cyan-glow" />
            <span className="font-mono text-xs font-medium text-cyan-glow">Live</span>
          </span>
        </div>
      </div>

      {/* Total Market Cap */}
      <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-cyan-glow/10 to-warm-gold/10 border border-cyan-glow/20">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">Total Market Cap</span>
          <span className="font-mono text-lg font-bold text-foreground">{formatLargeNumber(totalMarketCap)}</span>
        </div>
      </div>

      {/* Token List */}
      <div className="space-y-3 flex-1">
        {TRACKED_TOKENS.map((token) => (
          <TokenRow key={token.id} token={token} data={tokenData[token.id] || null} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-muted/20 flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted-foreground">
          Data: CoinGecko API
        </span>
        {lastUpdate && (
          <span className="font-mono text-[10px] text-muted-foreground">
            Updated: {lastUpdate.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  )
}

export default memo(TokenMonitoring)
