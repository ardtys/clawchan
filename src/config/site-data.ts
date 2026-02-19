/**
 * CLAWCHAN SITE CONFIGURATION
 * ===========================
 * This file contains all dynamic data that can be easily updated.
 * Modify this file to update website content without touching component code.
 */

// ============================================
// TOKEN INFORMATION
// ============================================
export const TOKEN_INFO = {
  name: '$CLAWCHAN',
  symbol: 'CLAW',
  network: 'Solana',
  contractAddress: 'Fma6PFQtVVSyZfcWFBqLdNNJT4MwamCeVBZvzdSJpump',
  totalSupply: '1,000,000,000',
  taxBuy: '0%',
  taxSell: '0%',
  // Add links for token
  links: {
    dexscreener: 'https://dexscreener.com/solana/Fma6PFQtVVSyZfcWFBqLdNNJT4MwamCeVBZvzdSJpump',
    pumpfun: 'https://pump.fun/coin/Fma6PFQtVVSyZfcWFBqLdNNJT4MwamCeVBZvzdSJpump',
    uniswap: '',
  },
}

// ============================================
// PROFILE STATS (Configurable)
// ============================================
export const PROFILE_STATS = {
  uptime: '99.9%',
  transactionsPerDay: '1.2M',
  activeStatus: '24/7',
}

// ============================================
// ANNOUNCEMENT BANNER
// ============================================
export const ANNOUNCEMENT = {
  enabled: true,
  type: 'info' as 'info' | 'success' | 'warning' | 'error',
  message: 'ClawChan v1.6.2 is now live! Check out our new features.',
  link: '/docs',
  linkText: 'Learn More',
  dismissible: true,
}

// ============================================
// CRYPTO TOKENS TO TRACK
// ============================================
export const TRACKED_TOKENS = [
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    icon: '◎',
    color: 'cyan-glow',
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'Ξ',
    color: 'warm-gold',
  },
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    color: 'amber',
  },
]

// ============================================
// ROADMAP DATA
// ============================================
export const ROADMAP = [
  {
    quarter: 'Q1 2026',
    status: 'in-progress' as const,
    title: 'Foundation & Launch',
    milestones: [
      { text: 'Website Launch with ClawChan Identity', done: true },
      { text: 'AI Chat Integration (Groq LLM)', done: true },
      { text: 'ElizaOS Framework Integration', done: true },
      { text: 'Twitter/X Community Launch', done: true },
      { text: 'Token Contract Deployment', done: true },
      { text: 'Initial Marketing Campaign', done: false },
    ],
  },
  {
    quarter: 'Q2 2026',
    status: 'upcoming' as const,
    title: 'Expansion & Utility',
    milestones: [
      { text: 'Discord Bot Integration', done: false },
      { text: 'Telegram Bot Integration', done: false },
      { text: 'Token Holder Dashboard', done: false },
      { text: 'Staking Mechanism Launch', done: false },
      { text: 'Partnership Announcements', done: false },
      { text: 'CEX Listing Applications', done: false },
    ],
  },
  {
    quarter: 'Q3 2026',
    status: 'upcoming' as const,
    title: 'Advanced Features',
    milestones: [
      { text: 'Multi-Agent Network Expansion', done: false },
      { text: 'Custom Plugin Marketplace', done: false },
      { text: 'NFT Integration for Premium Access', done: false },
      { text: 'DAO Governance Launch', done: false },
      { text: 'Mobile App Development', done: false },
    ],
  },
  {
    quarter: 'Q4 2026',
    status: 'upcoming' as const,
    title: 'Ecosystem Dominance',
    milestones: [
      { text: 'Cross-Chain Bridge Integration', done: false },
      { text: 'Enterprise API Access', done: false },
      { text: 'AI Agent Marketplace', done: false },
      { text: 'Major CEX Listings', done: false },
      { text: 'Global Marketing Expansion', done: false },
    ],
  },
]

// ============================================
// KEY STATISTICS
// ============================================
export const KEY_STATS = [
  { icon: '⚡', value: 'Sub-Second', label: 'Response Time', color: 'cyan-glow' as const },
  { icon: '🧠', value: '70B Params', label: 'Llama 3.3 Model', color: 'warm-gold' as const },
  { icon: '🔒', value: 'AES-256', label: 'Encryption', color: 'amber' as const },
  { icon: '📚', value: 'Infinite', label: 'Archive Capacity', color: 'cyan-glow' as const },
]

// ============================================
// DNA STRANDS
// ============================================
export const DNA_STRANDS = [
  {
    name: 'ElizaOS DNA',
    subtitle: 'Intelligence Strand',
    icon: 'lucide:cpu',
    color: 'cyan-glow' as const,
    description:
      "Adaptive intelligence powered by Groq's ultra-fast LLM inference. Learns autonomously and evolves with every interaction.",
    features: ['Sub-second AI responses', 'Plugin-based extensibility', 'Continuous learning system'],
    effect: 'scanlines',
  },
  {
    name: 'Open Claw DNA',
    subtitle: 'Security Strand',
    icon: 'lucide:shield',
    color: 'warm-gold' as const,
    description:
      'Pragmatic protection protocols with encryption mastery. The mechanical claw glows blue when securing data or detecting threats.',
    features: ['Zero-trust architecture', 'AES-256 vault encryption', 'Threat detection & prevention'],
    effect: 'digital-grid',
  },
]

// ============================================
// TECH STACK
// ============================================
export const TECH_STACK = [
  { name: 'Astro v5', desc: 'Static Site Generation', icon: 'lucide:rocket', color: 'cyan-glow' as const },
  { name: 'React 19', desc: 'Interactive UI', icon: 'lucide:boxes', color: 'warm-gold' as const },
  { name: 'TypeScript', desc: 'Type Safety', icon: 'lucide:file-code', color: 'amber' as const },
  { name: 'Tailwind CSS', desc: 'Utility-First Styling', icon: 'lucide:palette', color: 'cyan-glow' as const },
]

// ============================================
// USE CASES
// ============================================
export const USE_CASES = [
  {
    title: 'Personal AI Assistant',
    icon: 'lucide:bot',
    color: 'cyan-glow' as const,
    desc: 'Your always-available digital companion for daily tasks, research, coding help, and knowledge management.',
  },
  {
    title: 'Enterprise Knowledge Base',
    icon: 'lucide:building-2',
    color: 'warm-gold' as const,
    desc: 'Deploy as company-wide AI assistant with secure data handling. Perfect for internal documentation.',
  },
  {
    title: 'Development Companion',
    icon: 'lucide:code',
    color: 'amber' as const,
    desc: 'Code review, debugging, architecture discussions, and API documentation integration.',
  },
  {
    title: 'Community Moderator',
    icon: 'lucide:users',
    color: 'cyan-glow' as const,
    desc: 'Deploy on Discord, Telegram, or Twitter/X for automated community management.',
  },
  {
    title: 'Research Assistant',
    icon: 'lucide:search',
    color: 'warm-gold' as const,
    desc: 'Perfect for academic research, market analysis, and competitive intelligence.',
  },
  {
    title: 'Data Archivist',
    icon: 'lucide:database',
    color: 'amber' as const,
    desc: 'Automatically archive conversations and documents with intelligent categorization.',
  },
]

// ============================================
// CAPABILITIES
// ============================================
export const CAPABILITIES = [
  {
    title: 'Ultra-Fast Inference',
    icon: 'lucide:zap',
    color: 'cyan-glow' as const,
    desc: "Powered by Groq's LPU technology delivering sub-second response times with Llama 3.3 70B.",
    stat: '500+ tokens/second',
    statIcon: 'lucide:trending-up',
    effect: 'scanlines',
  },
  {
    title: 'Enterprise Security',
    icon: 'lucide:shield-check',
    color: 'warm-gold' as const,
    desc: 'Zero-trust architecture with AES-256 encryption. Self-hosted deployment means you control everything.',
    stat: 'SOC 2 compliant',
    statIcon: 'lucide:lock',
    effect: 'digital-grid',
  },
  {
    title: 'Omnichannel Presence',
    icon: 'lucide:globe',
    color: 'amber' as const,
    desc: 'Deploy across Twitter/X, Discord, Telegram, and web terminals with unified personality.',
    stat: '5+ platform integrations',
    statIcon: 'lucide:share-2',
    effect: 'data-streams',
  },
  {
    title: 'Extensible Plugins',
    icon: 'lucide:plug',
    color: 'cyan-glow' as const,
    desc: 'Built on ElizaOS plugin architecture. Add custom actions without touching core code.',
    stat: 'TypeScript-based',
    statIcon: 'lucide:puzzle',
    effect: 'hex-corners',
  },
]

// ============================================
// GETTING STARTED STEPS
// ============================================
export const GETTING_STARTED_STEPS = [
  { num: '1', title: 'Clone & Install', desc: 'Get the code and install dependencies with npm or pnpm', color: 'cyan-glow' as const },
  { num: '2', title: 'Configure Keys', desc: 'Add your Groq API key and optional credentials', color: 'warm-gold' as const },
  { num: '3', title: 'Launch & Chat', desc: 'Start the development server and begin interacting', color: 'amber' as const },
]

// ============================================
// SOCIAL LINKS FOR BENTO GRID
// ============================================
export const BENTO_SOCIAL_LINKS = [
  { label: 'Twitter', icon: 'mdi:twitter', color: 'cyan-glow' as const },
]

// ============================================
// STATUS MESSAGES FOR PROFILE
// ============================================
export const STATUS_MESSAGES = [
  { text: 'System: ONLINE', icon: '✦', isOnline: true },
  { text: 'Divine Energy: Active', icon: '◈', isOnline: true },
  { text: 'Processing Data...', icon: '⚡', isOnline: true },
  { text: 'Securing Vaults...', icon: '🔒', isOnline: true },
  { text: 'Monitoring Network...', icon: '📡', isOnline: true },
]

// ============================================
// VERSION INFO
// ============================================
export const VERSION_INFO = {
  version: '1.6.2',
  lastUpdated: '2026-02-13',
  changelog: '/docs/changelog',
}
