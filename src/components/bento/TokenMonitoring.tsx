import { memo, useState, useEffect } from 'react'

interface TokenData {
  name: string
  symbol: string
  logo: string
  badge: string
  badgeColor: string
  contractAddress: string
  price: string
  mcap: string
  priceChange: string
  holders: string
  liquidity: string
  isPositive: boolean
  dexScreenerUrl?: string
}

// Real contract addresses for tokens
const TOKEN_CONTRACTS = {
  // Solana tokens
  elizaOS: 'DuMbhu7mvQvqQHGcnikDgb4XegXJRyhUBfdU22uELiZA',
  clawchanSol: '3naeJLbMzPL23ocgDLUDoHwH1S7Hk5Fx83joThHwBAGS',
  // Base chain tokens
  clawchanBase: '0x51b6fda0038c00ca619faf8b2601a1861f8bcf16',
}

const TokenMonitoring = () => {
  const [tokens, setTokens] = useState<TokenData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        console.log('Fetching token data...')
        // Fetch ElizaOS, CLAWCHAN (Solana), and CLAWCHAN (Base) token data from DexScreener
        const [elizaResponse, clawchanSolResponse, clawchanBaseResponse] = await Promise.all([
          fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_CONTRACTS.elizaOS}`),
          fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_CONTRACTS.clawchanSol}`),
          fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_CONTRACTS.clawchanBase}`)
        ])
        const elizaData = await elizaResponse.json()
        const clawchanSolData = await clawchanSolResponse.json()
        const clawchanBaseData = await clawchanBaseResponse.json()
        console.log('ElizaOS data:', elizaData)
        console.log('CLAWCHAN (Solana) data:', clawchanSolData)
        console.log('CLAWCHAN (Base) data:', clawchanBaseData)

        const formatNumber = (num: number): string => {
          if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`
          if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`
          if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`
          return `$${num.toFixed(2)}`
        }

        const formatPrice = (price: number): string => {
          if (price >= 1) return `$${price.toFixed(4)}`
          return `$${price.toFixed(8)}`
        }

        const newTokens: TokenData[] = []

        // Process CLAWCHAN (Base) data - prioritize first
        if (clawchanBaseData.pairs && clawchanBaseData.pairs.length > 0) {
          const pair = clawchanBaseData.pairs[0]
          newTokens.push({
            name: 'CLAWCHAN',
            symbol: '$CLAWCHAN',
            logo: '/clawchan-logo.png',
            badge: 'BASE CHAIN',
            badgeColor: 'cyan-glow',
            contractAddress: TOKEN_CONTRACTS.clawchanBase,
            price: formatPrice(parseFloat(pair.priceUsd || '0')),
            mcap: formatNumber(parseFloat(pair.fdv || '0')),
            priceChange: `${parseFloat(pair.priceChange?.h24 || '0').toFixed(2)}%`,
            holders: 'N/A',
            liquidity: formatNumber(parseFloat(pair.liquidity?.usd || '0')),
            isPositive: parseFloat(pair.priceChange?.h24 || '0') >= 0,
            dexScreenerUrl: `https://dexscreener.com/base/${TOKEN_CONTRACTS.clawchanBase}`,
          })
        }

        // Process CLAWCHAN (Solana) data
        if (clawchanSolData.pairs && clawchanSolData.pairs.length > 0) {
          const pair = clawchanSolData.pairs[0]
          newTokens.push({
            name: 'CLAWCHAN',
            symbol: '$CLAWCHAN',
            logo: '/clawchan-logo.png',
            badge: 'SOLANA',
            badgeColor: 'amber',
            contractAddress: TOKEN_CONTRACTS.clawchanSol.slice(0, 20) + '...',
            price: formatPrice(parseFloat(pair.priceUsd || '0')),
            mcap: formatNumber(parseFloat(pair.fdv || '0')),
            priceChange: `${parseFloat(pair.priceChange?.h24 || '0').toFixed(2)}%`,
            holders: 'N/A',
            liquidity: formatNumber(parseFloat(pair.liquidity?.usd || '0')),
            isPositive: parseFloat(pair.priceChange?.h24 || '0') >= 0,
            dexScreenerUrl: 'https://dexscreener.com/solana/3naeJLbMzPL23ocgDLUDoHwH1S7Hk5Fx83joThHwBAGS',
          })
        }

        // Process ElizaOS data
        if (elizaData.pairs && elizaData.pairs.length > 0) {
          const pair = elizaData.pairs[0]
          newTokens.push({
            name: 'elizaOS',
            symbol: '$elizaOS',
            logo: '/eliza-token.png',
            badge: 'SOLANA',
            badgeColor: 'warm-gold',
            contractAddress: TOKEN_CONTRACTS.elizaOS.slice(0, 27) + '...',
            price: formatPrice(parseFloat(pair.priceUsd || '0')),
            mcap: formatNumber(parseFloat(pair.fdv || '0')),
            priceChange: `${parseFloat(pair.priceChange?.h24 || '0').toFixed(2)}%`,
            holders: 'N/A',
            liquidity: formatNumber(parseFloat(pair.liquidity?.usd || '0')),
            isPositive: parseFloat(pair.priceChange?.h24 || '0') >= 0,
            dexScreenerUrl: 'https://dexscreener.com/solana/cgp7xjsfxsyawnjq65v1mruvf3lp65fkeymsgdmbs4tc',
          })
        }

        if (newTokens.length > 0) {
          setTokens(newTokens)
          console.log('Token data updated successfully')
        } else {
          console.warn('No token data available, using fallback')
          // Use fallback if no data
          setTokens([
            {
              name: 'CLAWCHAN',
              symbol: '$CLAWCHAN',
              logo: '/clawchan-logo.png',
              badge: 'BASE CHAIN',
              badgeColor: 'cyan-glow',
              contractAddress: TOKEN_CONTRACTS.clawchanBase,
              price: '$0.00000000',
              mcap: '$0.00',
              priceChange: '0.00%',
              holders: 'N/A',
              liquidity: '$0.00',
              isPositive: true,
              dexScreenerUrl: `https://dexscreener.com/base/${TOKEN_CONTRACTS.clawchanBase}`,
            },
            {
              name: 'CLAWCHAN',
              symbol: '$CLAWCHAN',
              logo: '/clawchan-logo.png',
              badge: 'SOLANA',
              badgeColor: 'amber',
              contractAddress: TOKEN_CONTRACTS.clawchanSol.slice(0, 20) + '...',
              price: '$0.00000000',
              mcap: '$0.00',
              priceChange: '0.00%',
              holders: 'N/A',
              liquidity: '$0.00',
              isPositive: true,
              dexScreenerUrl: 'https://dexscreener.com/solana/3naeJLbMzPL23ocgDLUDoHwH1S7Hk5Fx83joThHwBAGS',
            },
            {
              name: 'elizaOS',
              symbol: '$elizaOS',
              logo: '/eliza-token.png',
              badge: 'SOLANA',
              badgeColor: 'warm-gold',
              contractAddress: TOKEN_CONTRACTS.elizaOS.slice(0, 27) + '...',
              price: '$0.00285602',
              mcap: '$27.60M',
              priceChange: '-4.82%',
              holders: '6,053',
              liquidity: '$343.70K',
              isPositive: false,
              dexScreenerUrl: 'https://dexscreener.com/solana/cgp7xjsfxsyawnjq65v1mruvf3lp65fkeymsgdmbs4tc',
            },
          ])
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch token data:', error)
        // Fallback to static data on error
        setTokens([
          {
            name: 'CLAWCHAN',
            symbol: '$CLAWCHAN',
            logo: '/clawchan-logo.png',
            badge: 'BASE CHAIN',
            badgeColor: 'cyan-glow',
            contractAddress: TOKEN_CONTRACTS.clawchanBase,
            price: '$0.00000000',
            mcap: '$0.00',
            priceChange: '0.00%',
            holders: 'N/A',
            liquidity: '$0.00',
            isPositive: true,
            dexScreenerUrl: `https://dexscreener.com/base/${TOKEN_CONTRACTS.clawchanBase}`,
          },
          {
            name: 'CLAWCHAN',
            symbol: '$CLAWCHAN',
            logo: '/clawchan-logo.png',
            badge: 'SOLANA',
            badgeColor: 'amber',
            contractAddress: TOKEN_CONTRACTS.clawchanSol.slice(0, 20) + '...',
            price: '$0.00000000',
            mcap: '$0.00',
            priceChange: '0.00%',
            holders: 'N/A',
            liquidity: '$0.00',
            isPositive: true,
            dexScreenerUrl: 'https://dexscreener.com/solana/3naeJLbMzPL23ocgDLUDoHwH1S7Hk5Fx83joThHwBAGS',
          },
          {
            name: 'elizaOS',
            symbol: '$elizaOS',
            logo: '/eliza-token.png',
            badge: 'SOLANA',
            badgeColor: 'warm-gold',
            contractAddress: TOKEN_CONTRACTS.elizaOS.slice(0, 27) + '...',
            price: '$0.00285602',
            mcap: '$27.60M',
            priceChange: '-4.82%',
            holders: '6,053',
            liquidity: '$343.70K',
            isPositive: false,
            dexScreenerUrl: 'https://dexscreener.com/solana/cgp7xjsfxsyawnjq65v1mruvf3lp65fkeymsgdmbs4tc',
          },
        ])
        setIsLoading(false)
      }
    }

    fetchTokenData()
    const interval = setInterval(fetchTokenData, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (isLoading) {
    return (
      <div className="bento-card h-full p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="h-6 w-48 animate-pulse rounded bg-muted/30" />
            <div className="flex items-center gap-2">
              <span className="size-2 animate-pulse rounded-full bg-cyan-glow" />
              <span className="font-mono text-xs text-muted-foreground">Loading</span>
            </div>
          </div>
          <div className="h-4 w-32 animate-pulse rounded bg-muted/30" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-xl bg-muted/30" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bento-card h-full p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-mono text-xl font-bold text-foreground">
            Live Network Monitoring
          </h2>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-cyan-glow status-online" />
            <span className="font-mono text-xs text-muted-foreground">
              Live
            </span>
          </div>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          Last update: {currentTime.toLocaleTimeString()}
        </p>
      </div>

      {/* Token Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((token, index) => {
          const CardWrapper = token.dexScreenerUrl ? 'a' : 'div'
          const cardProps = token.dexScreenerUrl
            ? {
                href: token.dexScreenerUrl,
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : {}

          return (
            <CardWrapper
              key={index}
              className="rounded-xl border border-border bg-card-bg/50 p-4 transition-all hover:border-warm-gold/30 cursor-pointer"
              {...cardProps}
            >
            {/* Badge */}
            <div className="mb-3">
              <span
                className={`inline-block rounded-full px-2 py-1 font-mono text-[9px] font-medium uppercase tracking-wider bg-${token.badgeColor}/10 text-${token.badgeColor}`}
              >
                {token.badge}
              </span>
            </div>

            {/* Token Header */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-warm-gold/20 to-cyan-glow/20 text-2xl overflow-hidden">
                {token.logo.startsWith('/') || token.logo.startsWith('http') ? (
                  <img
                    src={token.logo}
                    alt={token.name}
                    className="size-full object-cover"
                  />
                ) : (
                  token.logo
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-mono text-base font-semibold text-foreground">
                    {token.name}
                  </h3>
                  <svg
                    className="size-3 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  {token.symbol}
                </p>
              </div>
            </div>

            {/* Contract Address */}
            <div className="mb-4">
              <p className="mb-1 font-mono text-[9px] font-medium uppercase tracking-wider text-warm-gold">
                Contract Address
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 truncate rounded bg-muted/30 px-2 py-1 font-mono text-xs text-foreground">
                  {token.contractAddress}
                </code>
                <button
                  onClick={() => copyToClipboard(token.contractAddress)}
                  className="flex size-6 items-center justify-center rounded bg-muted/30 transition-colors hover:bg-warm-gold/20"
                >
                  <svg
                    className="size-3 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Price */}
              <div>
                <div className="mb-1 flex items-center gap-1">
                  <svg
                    className="size-3 text-warm-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-mono text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                    Price
                  </span>
                </div>
                <p className="font-mono text-sm font-semibold text-foreground">
                  {token.price}
                </p>
              </div>

              {/* MCAP */}
              <div>
                <div className="mb-1 flex items-center gap-1">
                  <svg
                    className="size-3 text-cyan-glow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                  <span className="font-mono text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                    MCAP
                  </span>
                </div>
                <p className="font-mono text-sm font-semibold text-foreground">
                  {token.mcap}
                </p>
              </div>

              {/* Holders */}
              <div>
                <div className="mb-1 flex items-center gap-1">
                  <svg
                    className="size-3 text-amber"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="font-mono text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                    Holders
                  </span>
                </div>
                <p className="font-mono text-sm font-semibold text-foreground">
                  {token.holders}
                </p>
              </div>

              {/* Liquidity */}
              <div>
                <div className="mb-1 flex items-center gap-1">
                  <svg
                    className="size-3 text-cyan-glow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  <span className="font-mono text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                    Liquidity
                  </span>
                </div>
                <p className="font-mono text-sm font-semibold text-foreground">
                  {token.liquidity}
                </p>
              </div>
            </div>

            {/* Price Change Badge */}
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-mono text-xs font-medium ${
                  token.isPositive
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-red-500/10 text-red-500'
                }`}
              >
                <svg
                  className={`size-3 ${token.isPositive ? 'rotate-0' : 'rotate-180'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                {token.priceChange}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                24h change
              </span>
            </div>
          </CardWrapper>
          )
        })}
      </div>
    </div>
  )
}

export default memo(TokenMonitoring)
