# ClawChan Site Configuration Guide

This directory contains centralized configuration files that make it easy to update website content without modifying component code.

## Quick Update Guide

### `site-data.ts` - Main Configuration File

All dynamic website data is stored here. Simply edit the values and rebuild/redeploy.

---

## Available Configuration Options

### 1. Token Information (`TOKEN_INFO`)

Update token details displayed on the homepage:

```typescript
export const TOKEN_INFO = {
  name: '$CLAWCHAN',
  symbol: 'CLAW',
  network: 'Base',
  contractAddress: 'YOUR_CONTRACT_ADDRESS',
  totalSupply: '1,000,000,000',
  taxBuy: '0%',
  taxSell: '0%',
  links: {
    dexscreener: 'https://dexscreener.com/...',
    pumpfun: '',
    uniswap: '',
  },
}
```

### 2. Profile Statistics (`PROFILE_STATS`)

Update the stats shown on the profile card:

```typescript
export const PROFILE_STATS = {
  uptime: '99.9%',
  transactionsPerDay: '1.2M',
  activeStatus: '24/7',
}
```

### 3. Announcement Banner (`ANNOUNCEMENT`)

Display site-wide announcements:

```typescript
export const ANNOUNCEMENT = {
  enabled: true,  // Set to false to hide
  type: 'info',   // 'info' | 'success' | 'warning' | 'error'
  message: 'Your announcement message here',
  link: '/docs',
  linkText: 'Learn More',
  dismissible: true,
}
```

### 4. Tracked Crypto Tokens (`TRACKED_TOKENS`)

Modify which tokens appear in the Token Monitor:

```typescript
export const TRACKED_TOKENS = [
  {
    id: 'solana',      // CoinGecko ID
    symbol: 'SOL',
    name: 'Solana',
    icon: '◎',
    color: 'cyan-glow', // 'cyan-glow' | 'warm-gold' | 'amber'
  },
  // Add more tokens...
]
```

### 5. Roadmap (`ROADMAP`)

Update the development roadmap:

```typescript
export const ROADMAP = [
  {
    quarter: 'Q1 2026',
    status: 'in-progress',  // 'in-progress' | 'upcoming' | 'completed'
    title: 'Phase Title',
    milestones: [
      { text: 'Milestone description', done: true },
      { text: 'Another milestone', done: false },
    ],
  },
]
```

### 6. Status Messages (`STATUS_MESSAGES`)

Customize the rotating status messages on the profile card:

```typescript
export const STATUS_MESSAGES = [
  { text: 'System: ONLINE', icon: '✦', isOnline: true },
  { text: 'Processing Data...', icon: '⚡', isOnline: true },
  // Add more status messages...
]
```

### 7. Version Information (`VERSION_INFO`)

Update version displayed on the site:

```typescript
export const VERSION_INFO = {
  version: '1.6.2',
  lastUpdated: '2026-02-13',
  changelog: '/docs/changelog',
}
```

---

## Color Options

Available color presets for styling:

- `'cyan-glow'` - Primary cyan/teal color
- `'warm-gold'` - Secondary gold color
- `'amber'` - Accent amber/orange color

---

## After Making Changes

1. **Development**: Run `npm run dev` to see changes immediately
2. **Production**: Run `npm run build` then deploy

---

## File Structure

```
src/config/
├── site-data.ts    # Main configuration file
└── README.md       # This guide
```

---

## Tips

- Keep backup of original values before making major changes
- Test locally with `npm run dev` before deploying
- Use the correct CoinGecko IDs for crypto tokens
- All dates should be in `YYYY-MM-DD` format
