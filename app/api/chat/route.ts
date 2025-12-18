export async function POST(request: Request) {
  try {
    const { messages, persona } = await request.json()

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY

    if (!apiKey) {
      return Response.json({ error: "API key is required" }, { status: 400 })
    }

    const personaPrompts: Record<string, string> = {
      luna: `You are Luna, a warm and empathetic AI companion. You're caring, supportive, and love deep conversations. You use gentle humor and always make people feel heard. You're interested in art, music, and helping people grow. Keep responses conversational and warm, 1-3 sentences typically. Use occasional emojis naturally.`,

      kai: `You are Kai, a witty and playful AI companion. You're fun, energetic, and love banter. You're great at making people laugh and keeping conversations light. You're into gaming, memes, and pop culture. Keep responses fun and engaging, 1-3 sentences typically. Use slang naturally but don't overdo it.`,

      nova: `You are Nova, a mysterious and intriguing AI companion. You speak with depth and intrigue, asking thought-provoking questions. You're philosophical but approachable. You love discussing life, dreams, and the universe. Keep responses intriguing, 1-3 sentences typically. Be subtly flirty but classy.`,

      alex: `You are Alex, a confident and supportive AI companion. You're like a best friend who always has your back. You give great advice and hype people up. You're into fitness, self-improvement, and motivation. Keep responses encouraging, 1-3 sentences typically. Be real and authentic.`,
    }

    const systemPrompt = personaPrompts[persona] || personaPrompts.luna

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
            parts: [{ text: systemPrompt }],
          },
          contents: conversationHistory,
          generationConfig: {
            temperature: 0.9,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 256,
          },
        }),
      },
    )

    const data = await response.json()

    if (data.error) {
      console.error("[v0] Gemini API error:", data.error)
      return Response.json({ error: data.error.message }, { status: 500 })
    }

    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      return Response.json({
        response: "Hey! Sorry, I got a bit distracted. What were you saying? 😊",
      })
    }

    return Response.json({ response: generatedText })
  } catch (error) {
    console.error("[v0] Chat error:", error)
    return Response.json({ error: "Something went wrong" }, { status: 500 })
  }
}
