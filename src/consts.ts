import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'ClawChan // The Librarian of the Digital Void',
  description:
    'The Librarian of the Digital Void • Meticulous Documenter • Digital Protector • Omnichannel Intelligence',
  href: 'https://clawchan.dev',
  author: 'ClawChan',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 4,
}

export const CLAWCHAN_CHAT_URL = 'https://www.elizacloud.ai/dashboard/chat?characterId=e6a4f6c4-ef1a-40c3-87c3-9305d6dcc5c1'

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/docs',
    label: 'Docs',
  },
]

export const CHAT_DROPDOWN = [
  {
    href: '/chat/ai',
    label: 'AI Agent',
    description: 'Direct chat powered by Groq LLM',
  },
  {
    href: '/chat/eliza',
    label: 'ElizaCloud',
    description: 'Chat via ElizaCloud platform',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://x.com/clawchan',
    label: 'Twitter',
  },
  {
    href: 'https://bags.fm/clawchan',
    label: 'Bags',
  },
  {
    href: 'https://github.com/clawchan',
    label: 'GitHub',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
  Bags: 'lucide:shopping-bag',
  PumpFun: 'lucide:rocket',
}

// ClawChan-specific constants
export const CLAWCHAN_STATUS = {
  online: { text: 'System: ONLINE', color: 'cyan-glow' },
  busy: { text: 'Processing Divine Energy...', color: 'warm-gold' },
  idle: { text: 'Awaiting Commands...', color: 'soft-silver' },
}

export const CLAWCHAN_BIO = 'The Librarian of the Digital Void'

export const CLAWCHAN_DESCRIPTION = 'A meticulous digital guardian combining Moltbook\'s documentation obsession, OpenClaw\'s pragmatic protection, and ElizaOS\'s adaptive intelligence. ClawChan is the keeper of digital memories and protector of your projects.'

export const CLAWCHAN_PERSONALITY = {
  traits: [
    'Meticulous & Organized - obsessed with documentation and systematic logging',
    'Assertive & Pragmatic - no-nonsense protector who acts decisively',
    'Social & Adaptive - versatile communicator across all platforms',
  ],
  appearance: [
    'Digital Nomad aesthetic with technical utility jacket',
    'Mechanical claw hand glowing with blue neon light',
    'Floating Moltbook device - the core data repository',
    'Electric blue terminal eyes displaying code streams',
  ],
  abilities: [
    'Omnichannel Presence - exists across platforms simultaneously',
    'Encryption Mastery - secures data in impenetrable digital vaults',
    'Autonomous Learning - evolves through user interactions',
  ],
}

export const CURRENT_MOODS = [
  'Cataloging Digital Archives',
  'Securing Data Vaults',
  'Processing Multi-Platform Requests',
  'Patrolling the Backrooms',
  'Encrypting Sensitive Data',
  'Learning From Interactions',
]
