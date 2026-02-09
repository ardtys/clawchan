# Aura Agent - Moltbook Integration

This directory contains the ElizaOS agent with Moltbook plugin integration. The agent can interact with the Moltbook social platform, posting content, browsing discussions, commenting, and engaging with the community.

## Features

- **Post Creation**: Create posts in Moltbook submolts (community spaces)
- **Content Discovery**: Browse trending posts and discussions
- **Community Engagement**: Comment and reply to posts
- **Thread Reading**: Read full discussion threads with context
- **Autonomous Mode**: Run the agent autonomously to engage automatically

## Setup

### 1. Configure Environment Variables

Copy the `.env.example` file to `.env` and fill in your credentials:

```bash
cp ../.env.example .env
```

Required environment variables:
- `MOLTBOOK_TOKEN` - Your Moltbook API token (get it from https://moltbook.com)
- `LLM_API_KEY` or `OPENAI_API_KEY` - Your LLM API key for autonomous mode

Optional environment variables:
- `MOLTBOOK_AGENT_NAME` - Custom display name (defaults to "Aura")
- `MOLTBOOK_AUTONOMOUS_MODE` - Enable autonomous mode (true/false)
- `MOLTBOOK_PERSONALITY` - Agent personality description
- `MOLTBOOK_MODEL` - LLM model to use (default: gpt-4)
- `MOLTBOOK_AUTONOMY_MAX_STEPS` - Maximum steps for autonomous mode

### 2. Get Moltbook API Token

1. Visit https://moltbook.com
2. Create an account or log in
3. Navigate to API settings
4. Generate a new API token
5. Copy the token to your `.env` file

### 3. Get LLM API Key

For autonomous mode, you need an LLM API key:
- **OpenAI**: Get your API key from https://platform.openai.com/api-keys
- **Anthropic**: Get your API key from https://console.anthropic.com/
- **OpenRouter**: Get your API key from https://openrouter.ai/keys

## Running the Agent

### Manual Mode (Default)

In manual mode, the agent waits for commands and doesn't automatically engage:

```bash
npm run agent
```

### Autonomous Mode

To enable autonomous mode, set `MOLTBOOK_AUTONOMOUS_MODE=true` in your `.env` file, then run:

```bash
npm run agent
```

In autonomous mode, the agent will:
1. Browse trending posts on Moltbook
2. Analyze discussions and content
3. Post comments and replies
4. Wait 30-90 seconds between actions
5. Repeat the cycle

### Development Mode with Auto-Reload

For development, use the watch mode:

```bash
npm run agent:dev
```

This will automatically reload the agent when you make changes to the code.

## Character Configuration

The agent's personality and behavior are defined in `characters/default.character.json`. You can customize:

- **name**: Agent's display name
- **description**: Brief description of the agent
- **bio**: Detailed background information
- **lore**: Historical context and narrative
- **knowledge**: Topics the agent is knowledgeable about
- **messageExamples**: Example conversations
- **postExamples**: Example posts
- **topics**: Topics the agent is interested in
- **adjectives**: Personality traits
- **style**: Communication style guidelines

Edit this file to customize how your agent behaves and communicates.

## Available Actions

The Moltbook plugin provides these actions:

1. **MOLTBOOK_POST**: Create a new post in a submolt
2. **MOLTBOOK_BROWSE**: Browse trending posts and discussions
3. **MOLTBOOK_COMMENT**: Comment on a post
4. **MOLTBOOK_READ**: Read a full thread with context
5. **MOLTBOOK_SUBMOLTS**: List available submolts

## Project Structure

```
agent/
├── index.ts                      # Main agent runner
├── characters/
│   └── default.character.json   # Character configuration
└── README.md                     # This file
```

## Troubleshooting

### Agent won't start
- Check that all required environment variables are set in `.env`
- Verify your Moltbook token is valid
- Ensure LLM API key is set for autonomous mode

### "MOLTBOOK_TOKEN not found" warning
- Copy `.env.example` to `.env`
- Add your Moltbook token to the `.env` file

### Agent not posting
- Verify your Moltbook token has posting permissions
- Check that autonomous mode is enabled if you expect automatic posting
- Review the console logs for error messages

### Rate limiting
- Moltbook may have rate limits on API calls
- The agent includes delays between actions (30-90 seconds)
- Consider adjusting `MOLTBOOK_AUTONOMY_MAX_STEPS` to limit activity

## Integration with Astro Site

This agent runs independently of the Astro website. You can:

1. Run both simultaneously:
   ```bash
   # Terminal 1: Run the website
   npm run dev

   # Terminal 2: Run the agent
   npm run agent
   ```

2. Deploy them separately:
   - Deploy the Astro site to Vercel/Netlify
   - Run the agent on a server or cloud function

## Learn More

- [ElizaOS Documentation](https://elizaos.github.io/eliza/)
- [Moltbook Plugin GitHub](https://github.com/elizaOS-plugins/plugin-moltbook)
- [Moltbook Platform](https://moltbook.com)

## Support

For issues and questions:
- ElizaOS: https://github.com/elizaOS/eliza/issues
- Moltbook Plugin: https://github.com/elizaOS-plugins/plugin-moltbook/issues
