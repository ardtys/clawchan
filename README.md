<div align="center">

<img src="/public/clawchan-logo.png" alt="ClawChan Logo" width="200" />

## ClawChan - The Librarian of the Digital Void

[![Code License]](#)
![Status](https://img.shields.io/badge/status-active-success.svg?style=for-the-badge)

[**ClawChan**](#) is The Librarian of the Digital Void - An AI agent portfolio built with [**Astro**](https://astro.build/), [**React**](https://react.dev/), and integrated with [**ElizaOS**](https://github.com/elizaos/eliza) and [**Moltbook**](https://moltbook.com/).

**by ElizaOS • Open Claw**

</div>

---

### About ClawChan

ClawChan is The Librarian of the Digital Void - a meticulous documenter and digital protector with three core DNA strands: **Moltbook DNA** (omnichannel presence), **OpenClaw DNA** (autonomous learning), and **ElizaOS DNA** (encryption mastery). This project showcases cutting-edge AI agent capabilities with real-time blockchain monitoring and social media integration.

### Features

- **🔷 Moltbook Integration** - Full ElizaOS Moltbook plugin with autonomous mode support
- **📊 Real-time Token Monitoring** - Live data fetching from DexScreener API
- **🤖 AI Agent Runtime** - ElizaOS-powered intelligent agent with custom character
- **🎬 Video Showcase** - Interactive video presentation with digital void aesthetics
- **⚡ Digital Void Design** - Cyberpunk-inspired UI with hexagonal patterns and neon effects
- **🌐 Responsive Design** - Modern UI with Tailwind CSS v4 and custom theming
- **🚀 Server-Side Rendering** - Built with Astro for optimal performance

### Stack

This is a list of the various technologies used to build this website:

| Category      | Technology Name                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------- |
| Framework     | [**Astro**](https://astro.build/)                                                              |
| UI Library    | [**React**](https://react.dev/)                                                                |
| Styling       | [**Tailwind CSS**](https://tailwindcss.com) v4                                                 |
| Components    | [**shadcn/ui**](https://ui.shadcn.com/)                                                        |
| Content       | [**MDX**](https://mdxjs.com/)                                                                  |
| Codeblocks    | [**Expressive Code**](https://expressive-code.com/)                                            |
| AI Agent      | [**ElizaOS**](https://github.com/elizaos/eliza)                                                |
| Social Plugin | [**Moltbook Plugin**](https://github.com/elizaOS-plugins/plugin-moltbook)                      |
| API           | [**DexScreener**](https://dexscreener.com/)                                                    |
| Deployment    | [**Vercel**](https://vercel.com)                                                               |

### Token Monitoring

ClawChan features real-time monitoring of:

- **ElizaOS Token** - Live price, market cap, and liquidity data
- Data updates every 10 seconds via DexScreener API
- Fallback mechanism for reliable data display

### 🤖 Moltbook Agent Configuration

ClawChan includes a fully integrated ElizaOS agent with Moltbook plugin support. The agent can autonomously interact with Moltbook social platform.

#### Setup

1. **Get your Moltbook API Token**
   - Visit [https://moltbook.com](https://moltbook.com)
   - Create an account and generate your API token
   - Copy the token for the next step

2. **Configure Environment Variables**

Create or edit `.env` file in the root directory:

```env
# Moltbook Configuration
MOLTBOOK_TOKEN=your_moltbook_token_here
MOLTBOOK_AGENT_NAME=ClawChan
MOLTBOOK_AUTONOMOUS_MODE=true
MOLTBOOK_PERSONALITY=The Librarian of the Digital Void - A meticulous documenter and digital protector
MOLTBOOK_MODEL=gpt-4o

# LLM API Configuration (required for autonomous mode)
LLM_API_KEY=your_openai_api_key_here
# OR
OPENAI_API_KEY=your_openai_api_key_here
```

3. **Run the Agent**

```bash
# Run agent in normal mode
npm run agent

# Run agent in development mode (auto-restart on changes)
npm run agent:dev
```

#### Agent Modes

- **Autonomous Mode** (`MOLTBOOK_AUTONOMOUS_MODE=true`)
  - Agent automatically browses, analyzes, and engages with Moltbook content
  - Uses AI to generate intelligent responses
  - Operates independently based on the character's personality

- **Manual Mode** (`MOLTBOOK_AUTONOMOUS_MODE=false`)
  - Agent waits for explicit commands
  - Suitable for controlled interactions

#### Character Configuration

The agent's personality and behavior are defined in `agent/characters/default.character.json`. You can customize:
- Name and bio
- Personality traits
- Communication style
- Post topics and examples
- Interaction patterns

### Development

```bash
# Install dependencies
npm install

# Start frontend development server
npm run dev

# Run AI agent with Moltbook integration
npm run agent

# Run agent in development mode (auto-restart)
npm run agent:dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
clawchan/
├── agent/                    # ElizaOS Agent
│   ├── characters/          # Character configurations
│   │   └── default.character.json
│   └── index.ts            # Agent runtime entry point
├── src/
│   ├── components/         # React/Astro components
│   │   ├── bento/         # Bento grid components
│   │   └── ...
│   ├── pages/             # Astro pages
│   ├── styles/            # Global styles
│   └── consts.ts          # Configuration constants
├── public/                # Static assets
├── .env                   # Environment variables
└── package.json
```

### Deployment

This project is configured for deployment on Vercel with serverless functions and web analytics enabled.

**Quick Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/clawchan)

**Manual Deploy:**

```bash
# Deploy to Vercel
vercel --prod
```

**📖 For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

This includes:
- Step-by-step Vercel deployment guide
- GitHub repository setup
- Environment variables configuration
- Custom domain setup
- Troubleshooting tips

**Note:** The frontend website works perfectly without any environment variables. Environment variables are only needed for the backend agent runtime (optional).

### Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

### License

This project is open source and available under the MIT License.

---

<div align="center">

**ClawChan** - The Librarian of the Digital Void

*by ElizaOS • Open Claw*

Made with ♥ for the digital void

</div>

[Code License]: https://img.shields.io/badge/code%20license-MIT-5d5449?style=for-the-badge&logo=github&logoColor=fff
