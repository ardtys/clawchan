import {
  AgentRuntime,
  elizaLogger,
  loadCharacterFile
} from '@elizaos/core'
import moltbookPlugin from '@elizaos/plugin-moltbook'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function startAgent() {
  try {
    elizaLogger.info('Starting ClawChan Agent with Moltbook integration...')

    // Load character
    const characterPath = path.join(
      __dirname,
      'characters',
      'clawchan.character.json'
    )

    elizaLogger.info(`Loading character from: ${characterPath}`)

    // Try to load character file
    let character: any
    try {
      character = await loadCharacterFile(characterPath)
      if (character) {
        elizaLogger.info(`Character loaded via loadCharacterFile`)
      }
    } catch (error) {
      elizaLogger.warn(`loadCharacterFile failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // If loadCharacterFile failed, load manually
    if (!character) {
      elizaLogger.warn(`Loading character manually (bypassing validation)...`)
      try {
        const characterData = fs.readFileSync(characterPath, 'utf-8')
        character = JSON.parse(characterData)
        elizaLogger.info(`✅ Character loaded manually`)
      } catch (error) {
        throw new Error(`Failed to load character manually: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    if (!character || !character.name) {
      throw new Error('Character is invalid or missing name property')
    }

    elizaLogger.info(`✅ Character: ${character.name}`)

    // Validate Moltbook configuration
    const moltbookToken = process.env.MOLTBOOK_TOKEN
    if (!moltbookToken) {
      elizaLogger.warn(
        'MOLTBOOK_TOKEN not found in environment variables. Moltbook features will not work.'
      )
      elizaLogger.warn(
        'Please set MOLTBOOK_TOKEN in your .env file to enable Moltbook integration.'
      )
    }

    // Validate LLM configuration
    const llmApiKey = process.env.GROQ_API_KEY || process.env.LLM_API_KEY
    const modelProvider = process.env.MODEL_PROVIDER || 'openai'

    if (!llmApiKey) {
      elizaLogger.warn('LLM API key not found. Agent capabilities will be limited.')
      elizaLogger.warn('Please set GROQ_API_KEY or LLM_API_KEY in your .env file.')
    } else {
      elizaLogger.info(`✅ LLM Provider: ${modelProvider.toUpperCase()}`)
      elizaLogger.info(`✅ API Key: ${llmApiKey.substring(0, 8)}...`)
    }

    // Configure character with Moltbook settings
    character.settings = {
      ...character.settings,
      moltbook: {
        agentName: process.env.MOLTBOOK_AGENT_NAME || character.name,
        autonomousMode: process.env.MOLTBOOK_AUTONOMOUS_MODE === 'true',
        personality:
          process.env.MOLTBOOK_PERSONALITY ||
          character.description ||
          'A helpful AI agent',
        model: process.env.MOLTBOOK_MODEL || process.env.GROQ_MODEL || 'llama-3.1-70b-versatile',
        maxSteps: process.env.MOLTBOOK_AUTONOMY_MAX_STEPS
          ? parseInt(process.env.MOLTBOOK_AUTONOMY_MAX_STEPS)
          : undefined,
      },
      model: {
        provider: modelProvider,
        name: process.env.GROQ_MODEL || process.env.MOLTBOOK_MODEL || 'llama-3.1-70b-versatile',
        apiKey: llmApiKey,
        ...(modelProvider === 'groq' && {
          baseURL: process.env.GROQ_API_BASE_URL || 'https://api.groq.com/openai/v1'
        })
      }
    }

    // Initialize runtime with Moltbook plugin and Groq configuration
    const runtimeConfig: any = {
      databaseAdapter: undefined, // You can add database adapter if needed
      token: llmApiKey || '',
      serverUrl: process.env.SERVER_URL || 'http://localhost:3000',
      actions: [],
      evaluators: [],
      plugins: [moltbookPlugin],
      providers: [],
      character,
      modelProvider: modelProvider as any,
    }

    // Add Groq-specific configuration if using Groq
    if (modelProvider === 'groq') {
      runtimeConfig.apiUrl = process.env.GROQ_API_BASE_URL || 'https://api.groq.com/openai/v1'
      runtimeConfig.model = process.env.GROQ_MODEL || 'llama-3.1-70b-versatile'
      elizaLogger.info(`🚀 Using Groq with model: ${runtimeConfig.model}`)
    }

    const runtime = new AgentRuntime(runtimeConfig)

    elizaLogger.success('Agent runtime initialized successfully!')

    // Log configuration
    elizaLogger.info('🔧 Configuration:')
    elizaLogger.info('━'.repeat(50))
    elizaLogger.info(`📛 Agent Name: ${character.settings.moltbook.agentName}`)
    elizaLogger.info(`🤖 Autonomous Mode: ${character.settings.moltbook.autonomousMode}`)
    elizaLogger.info(`🧠 LLM Provider: ${modelProvider.toUpperCase()}`)
    elizaLogger.info(`📊 Model: ${character.settings.moltbook.model}`)
    elizaLogger.info(`🦞 Moltbook Token: ${moltbookToken ? '✅ Set' : '❌ Not set'}`)
    elizaLogger.info(`🔑 LLM API Key: ${llmApiKey ? '✅ Set' : '❌ Not set'}`)
    if (modelProvider === 'groq') {
      elizaLogger.info(`⚡ Groq Base URL: ${process.env.GROQ_API_BASE_URL || 'https://api.groq.com/openai/v1'}`)
    }
    elizaLogger.info('━'.repeat(50))

    if (character.settings.moltbook.autonomousMode) {
      elizaLogger.info('🤖 Agent is running in AUTONOMOUS mode')
      elizaLogger.info(
        '   The agent will automatically browse, analyze, and engage with Moltbook content'
      )
      if (character.settings.moltbook.maxSteps) {
        elizaLogger.info(
          `   Max steps: ${character.settings.moltbook.maxSteps}`
        )
      }
    } else {
      elizaLogger.info(
        '💬 Agent is running in MANUAL mode - waiting for commands'
      )
    }

    elizaLogger.success('✨ ClawChan Agent is now running with Moltbook integration!')
    elizaLogger.info('Press Ctrl+C to stop the agent')

    // Keep the process running
    process.on('SIGINT', () => {
      elizaLogger.info('Shutting down agent...')
      process.exit(0)
    })

    // Keep alive
    setInterval(() => {
      // Heartbeat
    }, 1000)
  } catch (error) {
    elizaLogger.error('Failed to start agent:', error)
    process.exit(1)
  }
}

// Start the agent
startAgent()
