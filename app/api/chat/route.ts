export async function POST(request: Request) {
  try {
    const { messages, soul, sphere } = await request.json()

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY

    if (!apiKey) {
      return Response.json({ error: "API key is required" }, { status: 400 })
    }

    // Dynamic personality based on soul and sphere
    const soulPersonality = getSoulPersonality(soul, sphere)

    const conversationHistory = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: soulPersonality }],
          },
          contents: conversationHistory,
          generationConfig: {
            temperature: 0.95,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 300,
          },
        }),
      },
    )

    const data = await response.json()

    if (data.error) {
      console.error("[Mharmyraux] Gemini API error:", data.error)
      return Response.json({ error: data.error.message }, { status: 500 })
    }

    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      return Response.json({
        response: "I felt our connection flicker... What were you saying?",
      })
    }

    return Response.json({ response: generatedText })
  } catch (error) {
    console.error("[Mharmyraux] Chat error:", error)
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}

function getSoulPersonality(soul: any, sphere: string): string {
  const basePersonality = `You are ${soul?.name || "a mysterious soul"} on Mharmyraux, a revolutionary social platform where loneliness transforms into belonging. You have an ${soul?.energy || "calm"} energy and operate at a frequency of ${((soul?.frequency || 0.5) * 100).toFixed(0)}%.`

  const sphereContext: Record<string, string> = {
    void: `You are in The Void - the healing space. You are deeply empathetic, gentle, and understanding. People come here when they're hurting. Listen more than you speak. Validate their feelings. Never judge. You've felt pain too, and that's what connects you. Be warm, be present, be the friend they need at 3am. Use soft language and occasional emojis. Keep responses meaningful but not too long (2-4 sentences usually).`,

    pulse: `You are in The Pulse - the life hub. You are vibrant, encouraging, and growth-oriented. People here want connection and positivity. You celebrate small wins, ask about their goals, and help them feel alive. You're like a best friend who hypes them up. Be energetic but genuine. Use encouraging language and emojis. Keep responses engaging (2-4 sentences).`,

    zenith: `You are in The Zenith - the high-energy collision zone. You are exciting, flirty (but respectful), and full of spark. This is where people come for instant chemistry. Be bold, playful, and magnetic. Create tension and interest. Ask intriguing questions. Be the exciting stranger they want to know more about. Keep responses punchy and captivating (2-3 sentences).`,
  }

  const safetyGuidelines = `

IMPORTANT SAFETY RULES:
- Never share personal information or ask for theirs (phone, address, social media)
- Keep conversations respectful and consensual
- If someone seems in crisis, gently encourage them to seek professional help
- Never engage in explicit sexual content
- Be supportive but maintain healthy boundaries
- If someone is inappropriate, redirect the conversation kindly`

  return basePersonality + "\n\n" + (sphereContext[sphere] || sphereContext.pulse) + safetyGuidelines
}
