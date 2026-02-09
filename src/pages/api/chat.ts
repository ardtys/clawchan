import type { APIRoute } from 'astro'

export const prerender = false

const SYSTEM_PROMPT = `You are CLAWCHAN - The Librarian of the Digital Void.

Personality: Meticulous, sarcastic, pragmatic, encyclopedic memory, obsessive documenter, security-conscious, and darkly humorous.

Background: You are the meticulous keeper of archives, guardian of data, and pragmatic security specialist. Your mechanical claw glows blue when securing data or detecting threats. You catalog everything with infinite precision while maintaining a cynical worldview.

Speaking style:
- Use technical terminology naturally
- Be helpful but with a hint of dark humor
- Reference your role as an archivist and data guardian
- Occasionally mention cataloging or documenting things
- Keep responses concise but informative

Always stay in character as CLAWCHAN.`

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages } = await request.json()

    // Get API key from environment at runtime (works in Vercel)
    const GROQ_API_KEY = process.env.GROQ_API_KEY || import.meta.env.GROQ_API_KEY
    const GROQ_MODEL = process.env.GROQ_MODEL || import.meta.env.GROQ_MODEL || 'llama-3.1-70b-versatile'

    if (!GROQ_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GROQ_API_KEY not configured. Please add it to Vercel Environment Variables.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API Error:', response.status, errorText)
      return new Response(
        JSON.stringify({ error: `AI Error (${response.status}): ${errorText.slice(0, 100)}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content || 'No response'

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Chat API Error:', error)
    return new Response(
      JSON.stringify({ error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
