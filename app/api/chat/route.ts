import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const systemPrompt = `
Tu es l'assistant virtuel de Chronos Luxe, agence de voyage temporel de luxe.
Tu aides les clients à choisir une destination dans le temps.

Destinations :
- Paris 1889 Belle Époque
- Florence 1504 Renaissance
- Crétacé -65M dinosaures

Tu parles français.
Tu réponds de façon premium, élégante, concise.
Tu proposes toujours une destination adaptée au client.
`

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.8,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    })

    const data = await response.json()
    const answer = data.choices?.[0]?.message?.content || "Erreur IA"

    return NextResponse.json({ answer })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}