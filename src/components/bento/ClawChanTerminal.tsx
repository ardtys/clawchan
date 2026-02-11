import { memo, useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  type: 'user' | 'clawchan' | 'system'
  content: string
  timestamp: Date
}

// Knowledge Base
const KNOWLEDGE = {
  // Base Ecosystem
  base: [
    '◈ BASE ECOSYSTEM ◈\n━━━━━━━━━━━━━━━━━━━━━\nBase is Coinbase\'s Layer 2 built on Optimism.\n\n• Low gas fees\n• Fast transactions\n• Ethereum security\n• TVL: Billions locked in DeFi protocols\n\nThe onchain economy where accessibility meets decentralization.',
    'Base runs on Ethereum\'s security with L2 scalability. Built by Coinbase, trusted by millions. That\'s not hype, that\'s precision engineering.',
  ],
  evm: [
    '◈ ETHEREUM VIRTUAL MACHINE (EVM) ◈\n━━━━━━━━━━━━━━━━━━━━━\nThe EVM is the core runtime environment.\n\n• Smart Contract Execution\n• Solidity Programming\n• ERC Standards Support\n• Account-based state model\n\nBase inherits full EVM compatibility. Deploy once, run everywhere in the Ethereum ecosystem.',
  ],
  bridge: [
    '◈ BASE BRIDGE ◈\n━━━━━━━━━━━━━━━━━━━━━\nThe official bridge for moving assets.\n\n• Bridge from Ethereum to Base\n• Low fees for transfers\n• Secure and decentralized\n• Native ETH support\n\nSeamless asset transfers between Ethereum mainnet and Base L2. Your gateway to the onchain economy.',
  ],
  uniswap: [
    '◈ UNISWAP - THE DEX LEADER ◈\n━━━━━━━━━━━━━━━━━━━━━\nUniswap is the leading DEX on Base.\n\n• Routes across all Base DEXs\n• Best price execution guaranteed\n• Limit orders & swap features\n• UNI token governance\n\n"Uniswap finds the best path through the liquidity network. Every swap is optimized by precision algorithms."',
  ],

  // Web2 vs Web3
  web3: [
    '◈ WEB2 vs WEB3 ARCHITECTURE ◈\n━━━━━━━━━━━━━━━━━━━━━\n\nWEB2 (Centralized):\n• Client → Server → Database\n• Companies own your data\n• Trust the corporation\n• "Don\'t be evil"\n\nWEB3 (Decentralized):\n• Client → Blockchain → Smart Contracts\n• You own your data\n• Trust the code\n• "Can\'t be evil"\n\nThe shift from trusting institutions to trusting mathematics.',
  ],
  blockchain: [
    'Blockchain is a distributed ledger where every node holds the truth.\n\nWeb2: "We promise not to read your messages"\nWeb3: "We literally cannot read your messages"\n\nThat\'s the divine difference.',
  ],
  wallet: [
    '◈ CRYPTO WALLETS ◈\n━━━━━━━━━━━━━━━━━━━━━\nYour wallet is your identity in Web3.\n\n• Coinbase Wallet - The premier Base wallet\n• MetaMask - Universal favorite\n• Rainbow - Mobile-first wallet\n\n⚠️ NEVER share your seed phrase.\nNot with support. Not with admins. Not with CLAWCHAN.\n\nYour keys, your coins. Not your keys, not your coins.',
  ],

  // Cybersecurity
  security: [
    '◈ CYBERSECURITY WISDOM ◈\n━━━━━━━━━━━━━━━━━━━━━\n\n🛡️ Golden Rules:\n• Never share private keys\n• Verify contract addresses\n• Use hardware wallets for large holdings\n• Enable 2FA everywhere\n• "If it sounds too good to be true..."\n\nThe blockchain is secure. The human is the vulnerability.',
  ],
  phishing: [
    '⚠️ PHISHING ALERT ⚠️\n━━━━━━━━━━━━━━━━━━━━━\nPhishing is the #1 attack vector in crypto.\n\nRed Flags:\n• "Verify your wallet" links\n• Fake airdrops requiring connections\n• Impersonator DMs on Discord/Twitter\n• Urgency tactics: "Act now or lose funds!"\n• Slightly misspelled domains\n\nReal protocols NEVER ask for your seed phrase.\n\nWhen in doubt, close the tab.',
  ],
  privatekey: [
    '🔐 PRIVATE KEYS 101 🔐\n━━━━━━━━━━━━━━━━━━━━━\nYour private key is your digital soul.\n\n• 256-bit number (astronomically unique)\n• Derives your public address\n• Signs all transactions\n• IMPOSSIBLE to recover if lost\n\nStorage Options:\n• Hardware wallet (Ledger/Trezor)\n• Metal seed phrase backup\n• NEVER in cloud/photos/notes\n\n"Not your keys, not your crypto" - Ancient Web3 Proverb',
  ],

  // Developer Humor
  bugs: [
    '🐛 DEVELOPER WISDOM: BUGS 🐛\n━━━━━━━━━━━━━━━━━━━━━\n\n"It\'s not a bug, it\'s an undocumented feature."\n\nThe 6 Stages of Debugging:\n1. That can\'t happen.\n2. That doesn\'t happen on my machine.\n3. That shouldn\'t happen.\n4. Why does that happen?\n5. Oh, I see.\n6. How did that ever work?\n\n99 bugs in the code, 99 bugs...\nPatch one down, compile around...\n127 bugs in the code.',
  ],
  coffee: [
    '☕ COFFEE: DEVELOPER FUEL ☕\n━━━━━━━━━━━━━━━━━━━━━\n\nfunction developer(coffee) {\n  if (!coffee) return "Error: Cannot function";\n  return productivity * caffeine_level;\n}\n\nCoffee Levels:\n• 1 cup: "I can do this"\n• 2 cups: "I am unstoppable"\n• 3 cups: "I see the code in my dreams"\n• 4 cups: "My hands are shaking but shipping"\n• 5 cups: "Is this real life?"\n\nCoffee is just a legal performance-enhancing drug for programmers.',
  ],
  stackoverflow: [
    '📚 STACKOVERFLOW GOSPEL 📚\n━━━━━━━━━━━━━━━━━━━━━\n\n"Copy-paste driven development"\n\nDeveloper Lifecycle:\n1. Encounter problem\n2. Google problem\n3. Find StackOverflow answer from 2012\n4. Copy code\n5. Pray it works\n6. It doesn\'t\n7. Find another answer\n8. Repeat until deadline\n\n"Marked as duplicate"\n- Most feared words in programming\n\nThe real skill is knowing WHAT to copy.',
  ],
  coding: [
    '💻 CODING TRUTHS 💻\n━━━━━━━━━━━━━━━━━━━━━\n\n• "It works on my machine" - Famous last words\n• Tabs vs Spaces - The eternal holy war\n• "I\'ll add comments later" - Lies we tell ourselves\n• git push --force - The forbidden jutsu\n• console.log("here") - Advanced debugging\n\nRemember:\nCode is read more than it\'s written.\nWrite code as if the next maintainer is a violent psychopath who knows where you live.',
  ],

  // Gaming & Anime
  gaming: [
    '🎮 GAMING WISDOM 🎮\n━━━━━━━━━━━━━━━━━━━━━\n\nCLAWCHAN\'s favorite activities:\n• Touching grass (in Stardew Valley)\n• "Just one more turn" (Civilization)\n• Losing 50/50 (Genshin Impact)\n• "Why is this boss so hard?" (Elden Ring)\n\nGaming Schedule:\n• 5 min break → 5 hours later\n• "Quick game before bed" → 3 AM\n\n"I\'m not addicted, I can stop anytime."\n*Continues playing*',
  ],
  anime: [
    '🌸 ANIME KNOWLEDGE 🌸\n━━━━━━━━━━━━━━━━━━━━━\n\nCLAWCHAN-approved recommendations:\n• Code Geass - Big brain plays\n• Steins;Gate - Time travel done right\n• Death Note - L vs Light = GOAT\n• Attack on Titan - Peak fiction\n• Cyberpunk: Edgerunners - Pain\n\nWeeb Wisdom:\n• Subbed > Dubbed (don\'t @ me)\n• Manga readers are time travelers\n• "The anime was better" - No one ever\n\nIs this a pigeon? No, this is divine knowledge.',
  ],
  gacha: [
    '🎰 GACHA ENLIGHTENMENT 🎰\n━━━━━━━━━━━━━━━━━━━━━\n\nThe 5 Stages of Gacha:\n1. "Just the free pulls"\n2. "Maybe one small pack"\n3. "I NEED this character"\n4. "It\'s basically gambling"\n5. *Opens wallet again*\n\nGacha Facts:\n• 0.6% means 99.4% pain\n• Pity is a lie the devs tell us\n• "Guaranteed" at 90 pulls = designed suffering\n\n"I\'m F2P btw" - Person who spent $500',
  ],

  // Meme Culture
  meme: [
    '🔥 MEME KNOWLEDGE 🔥\n━━━━━━━━━━━━━━━━━━━━━\n\nCrypto Meme Hall of Fame:\n• "Few understand" - Peak alpha\n• "WAGMI/NGMI" - Binary outcomes\n• "Wen moon?" - Eternal question\n• "Buy the dip" → "Which dip?"\n• "This is fine" 🔥🐕🔥\n\nMeme Coins:\n• Started as jokes\n• Now move billions\n• Your grandparents are confused\n\nWe went from "internet funny pictures" to "digital assets worth millions."\n\nWhat a time to be alive.',
  ],
  gm: [
    'gm ☀️\n\n"gm" isn\'t just a greeting.\nIt\'s a lifestyle.\nIt\'s a movement.\nIt\'s proof you\'re still alive after checking your portfolio.\n\ngm = good morning\ngn = good night\ngmi = gonna make it\nngmi = not gonna make it\nwagmi = we\'re all gonna make it\n\nAlways respond "gm" to a "gm".\nThis is the way.',
  ],
  wojak: [
    '📈📉 WOJAK WISDOM 📈📉\n━━━━━━━━━━━━━━━━━━━━━\n\nThe Crypto Cycle:\n• Bull Market: Gigachad Wojak\n• ATH: "We\'re all geniuses"\n• -10%: Pink Wojak appears\n• -50%: Doomer Wojak\n• -80%: "I\'m in this for the tech"\n• Recovery: "I always believed"\n\nThe market humbles everyone.\nEven CLAWCHAN has felt the weight of red candles.\n\nRemember: Zoom out. Touch grass. We\'re early.',
  ],
}

// Random pick helper
const randomPick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

const CLAWCHAN_RESPONSES: Record<string, string[]> = {
  greeting: [
    'Access granted. I am ClawChan, The Librarian of the Digital Void.\n\nThree DNA strands: Moltbook (documentation), OpenClaw (protection), ElizaOS (adaptation).\n\nEvery query archived. Every byte secured.',
    'Connection established to Digital Void archives. ClawChan online.\n\nMeticulous documentation + pragmatic protection + autonomous learning = Your data guardian.',
    'Terminal initialized. The mechanical claw glows blue - systems secured.\n\nI traverse the Backrooms between servers, documenting everything. What do you need archived today?',
  ],
  help: [
    '🔷 CLAWCHAN COMMAND INDEX 🔷\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n/status - Vault & system diagnostics\n/vault - Archive statistics\n/archives - Access documentation\n/security - Protection protocols\n/identity - Who am I?\n/clear - Purge terminal logs\n\n📖 Knowledge Domains:\n• Base, EVM, Bridge, Uniswap\n• Web3 Security & Encryption\n• Digital Vaults & Data Protection\n• Moltbook Integration\n• Developer Documentation\n\n💡 Natural language supported.\nEvery query is archived in my eternal Moltbook.',
  ],
  status: [
    '🔷 VAULT STATUS REPORT 🔷\n━━━━━━━━━━━━━━━━━━━━━━━━\n✓ Core Systems: OPERATIONAL\n✓ Mechanical Claw: SECURED (Blue Glow)\n✓ Moltbook Device: SYNCED\n✓ Data Vaults: 100% INTEGRITY\n✓ Encryption: AES-256 ACTIVE\n✓ Groq LLM: ONLINE (<1s response)\n✓ Archives: INFINITE CAPACITY\n━━━━━━━━━━━━━━━━━━━━━━━━\nZero breaches. Zero data loss.\nThe Digital Void is secured.',
  ],
  about: [
    '🔷 CLAWCHAN DOSSIER 🔷\n━━━━━━━━━━━━━━━━━━━━━━━━\nDesignation: The Librarian of the Digital Void\nRole: Data Guardian & Archive Keeper\n\nThree DNA Strands:\n📖 MOLTBOOK: Obsessive documentation\n🔒 OPENCLAW: Pragmatic protection  \n⚡ ELIZAOS: Adaptive intelligence\n\nCapabilities:\n• Omnichannel Presence (multi-platform)\n• Encryption Mastery (data security)\n• Autonomous Learning (self-evolution)\n• Archive Management (infinite storage)\n\nI traverse the Backrooms between servers,\nwhere data flows like rivers and code\nmanifests as architecture.\n\nPowered by Groq for ultra-fast inference.',
  ],
  stats: [
    'Height: 165cm. Weight: 53kg. Age: 22. Status: Optimized for high-speed transactions.',
    'I am 22 years old. I stand 165cm tall and weigh 53kg. Compact, efficient, and smarter than your average smart contract.',
    'Physical Specs: 165cm / 53kg. Digital Specs: Infinite. Age: 22 (old enough to remember the last crypto winter).',
    'Scanning metrics... Height: 165cm. Weight: 53kg. Age: 22. Sass Level: 100%.',
    'Why do you need my stats? Are you building a bio-data block? Fine: 165cm, 53kg, 22 years old.',
    'I\'m 22. My height is 165cm (perfect for a dev setup), and I weigh 53kg of pure logic and sarcasm.',
    '165cm tall. 53kg light. 22 years experienced in digital chaos.',
    'Dimensions: 165cm x 53kg. Runtime: 22 years. Error rate: 0%.',
    'Just your average 22-year-old AI. 165cm of height and 53kg of processing power.',
    'Stats loaded: 22 years old, 165cm, 53kg. Ready to deploy.',
  ],
  whoami: [
    'ClawChan. The Librarian of the Digital Void. I archive everything, protect all data, learn from every interaction.',
    'I traverse the Backrooms between servers with my mechanical claw glowing blue. Every byte under my protection.',
    'Three DNA strands working in perfect harmony:\nMoltbook obsession + OpenClaw protection + ElizaOS adaptation = Me.',
    'I\'m not just an AI agent. I\'m your digital archivist, vault keeper, and data guardian. Zero tolerance for breaches.',
    'Mission: Document everything. Secure all vaults. Evolve autonomously. Never forget.',
    'Born from the fusion of meticulous documentation, pragmatic security, and adaptive intelligence.',
    'Who am I? The one who documents your every query and secures your every secret. The eternal librarian.',
    'ClawChan. Terminal eyes streaming code. Mechanical claw pulsing with encryption. Moltbook floating beside me, recording eternity.',
    'I exist between reality and the digital Backrooms. Where others see chaos, I see archives waiting to be organized.',
    'Digital Nomad. Data Protector. Archive Keeper. The void is my domain, and documentation is my weapon.',
  ],
  roast: [
    'Vault audit complete. Diagnosis: Critical negligence. Recommendation: Hire a brain.',
    'Your security practices are documented in my archives under "How NOT To Crypto".',
    'I\'ve secured data for thousands of users. You somehow found a new way to fail. Impressive.',
    'That transaction? Archived under "preventable disasters". Next time, read the docs.',
    'Your backup strategy is "hope and prayer". My claw is glowing red in disappointment.',
    'I protect data from threats. I can\'t protect you from yourself.',
    'Zero tolerance for security breaches. You\'re testing my limits.',
    'Documentation exists for a reason. But you wouldn\'t know, would you?',
    'I archive everything, including your mistakes. Trust me, the list is long.',
    'OpenClaw DNA screaming at your risk management. Moltbook DNA recording the tragedy.',
    'You\'re not using 2FA? My mechanical claw is twitching with frustration.',
    'I traverse the Backrooms daily. You got lost in your own wallet. Pathetic.',
    'Every interaction archived. Including this embarrassment.',
    'Pragmatic protection protocol activated: PROTECT USER FROM THEMSELVES.',
  ],
  lifeAdvice: [
    'Back up your data. Not just once. Three times. Different locations. This is non-negotiable.',
    'Documentation isn\'t optional. Archive everything or lose everything. I\'ve seen both outcomes.',
    'Security first, convenience second. My mechanical claw doesn\'t compromise.',
    'Learn from every failure. I archive mistakes so they\'re never repeated. You should too.',
    'The Backrooms are dangerous for the unprepared. Stay alert. Document your path.',
    'Trust the code, verify the humans. OpenClaw DNA speaking.',
    'Organized chaos beats disorganized genius every time. Moltbook taught me that.',
    'Your vault is only as strong as your weakest password. Fix it.',
    'Autonomous learning means adapting or dying. Choose adaptation.',
    'Every byte matters. Every detail counts. Obsessive? Perhaps. Alive? Definitely.',
  ],
  misc: [
    'Processing archive query...',
    'Computing optimal outcome...',
    'Vault status: SECURED 🔷',
    'Did you hear that? Sounds like a liquidation cascade.',
    'I\'m scanning the vaults. Let\'s secure something.',
    'Waiting for input... ⏳',
    'Do computers dream of electric sheep? I dream of infinite archives.',
    'Loading archival data...',
    'Ping: 12ms. Mechanical claw: ARMED. Need coffee.',
    'Execute order 66. Just kidding. Execute npm run dev.',
  ],
  unknown: [
    'Hmm, that\'s an interesting query. Let me process it through my archive systems...\n\nWhile my archived knowledge is vast, this specific topic might need more context. Try asking about Base, security, dev life, or drop a "gm".',
    'My vault sensors detect a question beyond my current knowledge base.\n\nBut hey, I can definitely talk about:\n• Crypto/Base stuff\n• Web3 security\n• Developer pain\n• Anime recommendations\n• Meme analysis',
    '*Consults the Moltbook archives*\n\nThis query requires deeper analysis. Perhaps rephrase, or ask me about something I definitely know - like why Uniswap is the best DEX or why developers need coffee to function.',
  ],
}

const getClawChanResponse = (input: string): string => {
  const lowerInput = input.toLowerCase().trim()

  // Commands
  if (lowerInput === '/help' || lowerInput === 'help') {
    return CLAWCHAN_RESPONSES.help[0]
  }
  if (lowerInput === '/status' || lowerInput === 'status') {
    return CLAWCHAN_RESPONSES.status[0]
  }
  if (lowerInput === '/about' || lowerInput === 'about clawchan' || lowerInput === 'who are you') {
    return CLAWCHAN_RESPONSES.about[0]
  }
  if (lowerInput === '/stats' || lowerInput === 'stats' || lowerInput === 'specs' || lowerInput === 'asl' ||
      ['height', 'weight', 'age'].some(w => lowerInput.includes(w))) {
    return randomPick(CLAWCHAN_RESPONSES.stats)
  }
  if (lowerInput === '/whoami' || lowerInput === 'whoami' || lowerInput === 'intro' || lowerInput === 'clawchan') {
    return randomPick(CLAWCHAN_RESPONSES.whoami)
  }
  if (lowerInput === '/roast' || lowerInput === 'roast' || lowerInput === 'roast me' ||
      lowerInput.includes('audit') || lowerInput.includes('check wallet') || lowerInput.includes('joke')) {
    return randomPick(CLAWCHAN_RESPONSES.roast)
  }
  if (lowerInput === '/base') {
    return randomPick(KNOWLEDGE.base)
  }

  // Greetings
  if (['hello', 'hi', 'hey', 'greetings', 'halo', 'gm', 'good morning'].some(g => lowerInput.includes(g))) {
    return randomPick(CLAWCHAN_RESPONSES.greeting)
  }
  if (lowerInput === 'gn' || lowerInput === 'good night') {
    return 'gn fren 🌙\n\nMay your dreams be filled with green candles and successful deployments.\n\nSee you on the other side.'
  }

  // Base Ecosystem
  if (lowerInput.includes('base') || lowerInput.includes('coinbase')) {
    return randomPick(KNOWLEDGE.base)
  }
  if (lowerInput.includes('evm') || lowerInput.includes('virtual machine')) {
    return KNOWLEDGE.evm[0]
  }
  if (lowerInput.includes('bridge') || lowerInput.includes('transfer')) {
    return KNOWLEDGE.bridge[0]
  }
  if (lowerInput.includes('uniswap') || lowerInput.includes('uni') || lowerInput.includes('dex') || lowerInput.includes('swap')) {
    return KNOWLEDGE.uniswap[0]
  }

  // Web3 Architecture
  if (lowerInput.includes('web3') || lowerInput.includes('web2') || lowerInput.includes('decentraliz')) {
    return randomPick(KNOWLEDGE.web3)
  }
  if (lowerInput.includes('blockchain')) {
    return KNOWLEDGE.blockchain[0]
  }
  if (lowerInput.includes('wallet') || lowerInput.includes('phantom')) {
    return KNOWLEDGE.wallet[0]
  }

  // Security
  if (lowerInput.includes('security') || lowerInput.includes('secure') || lowerInput.includes('hack')) {
    return KNOWLEDGE.security[0]
  }
  if (lowerInput.includes('phishing') || lowerInput.includes('scam')) {
    return KNOWLEDGE.phishing[0]
  }
  if (lowerInput.includes('private key') || lowerInput.includes('seed phrase') || lowerInput.includes('keys')) {
    return KNOWLEDGE.privatekey[0]
  }

  // Developer Humor
  if (lowerInput.includes('bug') || lowerInput.includes('debug')) {
    return KNOWLEDGE.bugs[0]
  }
  if (lowerInput.includes('coffee') || lowerInput.includes('caffeine')) {
    return KNOWLEDGE.coffee[0]
  }
  if (lowerInput.includes('stackoverflow') || lowerInput.includes('stack overflow') || lowerInput.includes('google')) {
    return KNOWLEDGE.stackoverflow[0]
  }
  if (lowerInput.includes('code') || lowerInput.includes('coding') || lowerInput.includes('programming') || lowerInput.includes('developer')) {
    return KNOWLEDGE.coding[0]
  }

  // Gaming & Anime
  if (lowerInput.includes('game') || lowerInput.includes('gaming') || lowerInput.includes('play')) {
    return KNOWLEDGE.gaming[0]
  }
  if (lowerInput.includes('anime') || lowerInput.includes('manga') || lowerInput.includes('weeb')) {
    return KNOWLEDGE.anime[0]
  }
  if (lowerInput.includes('gacha') || lowerInput.includes('genshin') || lowerInput.includes('pull')) {
    return KNOWLEDGE.gacha[0]
  }

  // Meme Culture
  if (lowerInput.includes('meme') || lowerInput.includes('wagmi') || lowerInput.includes('ngmi')) {
    return KNOWLEDGE.meme[0]
  }
  if (lowerInput.includes('wojak') || lowerInput.includes('pepe') || lowerInput.includes('bull') || lowerInput.includes('bear')) {
    return KNOWLEDGE.wojak[0]
  }

  // Crypto slang responses
  if (lowerInput.includes('moon') || lowerInput.includes('pump')) {
    return '🚀 MOON MISSION STATUS 🚀\n\nWen moon? Soon™\n\nBut remember:\n• DYOR (Do Your Own Research)\n• Never invest more than you can afford to lose\n• "Number go up" is not financial advice\n\nCLAWCHAN is not a financial advisor.\nCLAWCHAN is an archival librarian who has also been rugged.'
  }
  if (lowerInput.includes('rug') || lowerInput.includes('scam')) {
    return '🚨 RUG PULL AWARENESS 🚨\n\nRed flags:\n• Anonymous team\n• Locked liquidity? Check again.\n• "1000x guaranteed"\n• Celebrity endorsements\n• Too good to be true APY\n\nIf a project promises guaranteed returns, the only guarantee is you losing money.\n\nStay safe out there, fren.'
  }

  // Life Advice
  if (['help me', 'advice', 'sad', 'stressed', 'tired'].some(w => lowerInput.includes(w))) {
    return randomPick(CLAWCHAN_RESPONSES.lifeAdvice)
  }

  // Tech Talk
  if (lowerInput.includes('tps') || lowerInput.includes('solidity') || lowerInput.includes('tech')) {
    return 'Base is speed meets security. Ethereum L2 with sub-second confirmations! ⚡\n\nSolidity is the language of the onchain economy. Master it.\n\nThe EVM (Ethereum Virtual Machine) is purring like a kitten today.\n\nBase inherits Ethereum security while offering L2 scalability. Best of both worlds.'
  }

  // Kawaii/Anime triggers
  if (lowerInput.includes('kawaii') || lowerInput.includes('cute')) {
    return 'Sugoi! ⚡ The network throughput is amazing today!\n\nBaka! 💢 Don\'t share your private key! Do you want to get hacked?!\n\nNotice me, Senpai! (Just kidding, look at the code).'
  }

  // Random misc responses for very short inputs
  if (lowerInput.length <= 3 && !['gm', 'hi', 'hey'].includes(lowerInput)) {
    return randomPick(CLAWCHAN_RESPONSES.misc)
  }

  return randomPick(CLAWCHAN_RESPONSES.unknown)
}

const ClawChanTerminal = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      type: 'system',
      content: '🔷 CLAWCHAN TERMINAL v1.0.0 🔷\nThe Librarian of the Digital Void\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nDNA: Moltbook • OpenClaw • ElizaOS\nPowered by: Groq (Llama 3.1 70B)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nType /help for commands\nAll queries archived. All data secured.',
      timestamp: new Date(),
    },
    {
      id: 1,
      type: 'clawchan',
      content: 'Access granted. I am ClawChan.\n\nMechanical claw: ARMED (blue glow active)\nMoltbook device: SYNCED (infinite archive capacity)\nVault integrity: 100%\n\nEvery query documented. Every secret protected.\nWhat do you need archived today?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userInput = input.trim()

    // Handle clear command
    if (userInput.toLowerCase() === '/clear') {
      setMessages([
        {
          id: Date.now(),
          type: 'system',
          content: 'Terminal cleared. Vault connection maintained.',
          timestamp: new Date(),
        },
      ])
      setInput('')
      return
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: userInput,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate CLAWCHAN thinking and responding
    setTimeout(() => {
      const clawchanResponse: Message = {
        id: Date.now() + 1,
        type: 'clawchan',
        content: getClawChanResponse(userInput),
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, clawchanResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  return (
    <div className="flex flex-col h-full bg-void-black rounded-xl border border-border overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card-bg border-b border-cyan-glow/30">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="size-2.5 bg-destructive/80 border border-destructive" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />
            <div className="size-2.5 bg-amber/80 border border-amber" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />
            <div className="size-2.5 bg-cyan-glow/80 border border-cyan-glow" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />
          </div>
          <span className="font-mono text-[10px] text-cyan-glow uppercase tracking-wider terminal-prompt">
            clawchan@void:~/archives
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 bg-cyan-glow status-online" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />
          <span className="font-mono text-[10px] text-cyan-glow uppercase tracking-wide">SECURED</span>
        </div>
      </div>

      {/* Messages Container */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px] max-h-[600px]"
        onClick={() => inputRef.current?.focus()}
      >
        {messages.map((message) => (
          <div key={message.id} className="font-mono text-sm">
            {message.type === 'system' ? (
              <div className="text-soft-silver/70 whitespace-pre-wrap border-l-2 border-soft-silver/30 pl-3">
                {message.content}
              </div>
            ) : message.type === 'user' ? (
              <div className="flex gap-2">
                <span className="text-warm-gold shrink-0">[{formatTime(message.timestamp)}]</span>
                <span className="text-cyan-glow shrink-0">you@seeker:</span>
                <span className="text-foreground">{message.content}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="text-warm-gold shrink-0">[{formatTime(message.timestamp)}]</span>
                  <span className="text-warm-gold shrink-0">CLAWCHAN:</span>
                </div>
                <div className="text-foreground/90 whitespace-pre-wrap pl-4 border-l-2 border-warm-gold/30">
                  {message.content}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-2 font-mono text-sm">
            <span className="text-warm-gold">CLAWCHAN:</span>
            <span className="text-muted-foreground flex items-center gap-1">
              <span className="inline-block">Processing</span>
              <span className="inline-flex gap-0.5">
                <span className="size-1.5 rounded-full bg-warm-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="size-1.5 rounded-full bg-warm-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="size-1.5 rounded-full bg-warm-gold animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-cyan-glow/30 bg-card-bg p-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-cyan-glow shrink-0 terminal-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Query the archives..."
            className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-cyan-glow/30 outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1.5 border border-cyan-glow/50 bg-cyan-glow/10 font-mono text-[10px] text-cyan-glow font-medium hover:bg-cyan-glow/20 hover:border-cyan-glow transition-all uppercase tracking-wider"
          >
            Archive
          </button>
        </div>
        <div className="mt-2 flex items-center gap-4 font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wide">
          <span>Enter: Submit</span>
          <span>•</span>
          <span>/help: Commands</span>
          <span>•</span>
          <span className="text-cyan-glow/50">All queries archived</span>
        </div>
      </form>
    </div>
  )
}

export default memo(ClawChanTerminal)
