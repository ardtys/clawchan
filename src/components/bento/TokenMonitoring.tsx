import { memo } from 'react'

const TokenMonitoring = () => {
  return (
    <div className="bento-card h-full p-6 flex flex-col items-center justify-center min-h-[300px]">
      <div className="text-center">
        <div className="mb-4 text-5xl float text-cyan-glow">📊</div>
        <h2 className="font-mono text-xl font-bold text-foreground mb-2">
          Token Monitoring
        </h2>
        <p className="font-mono text-sm text-muted-foreground mb-4">
          Coming Soon
        </p>
        <div className="inline-flex items-center gap-2 rounded-full bg-cyan-glow/10 px-4 py-2">
          <span className="size-2 rounded-full bg-amber animate-pulse" />
          <span className="font-mono text-xs text-cyan-glow uppercase tracking-wider">
            Under Development
          </span>
        </div>
      </div>
    </div>
  )
}

export default memo(TokenMonitoring)
