import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Shopi"
      },
      body: JSON.stringify({
        model: "arcee-ai/trinity-large-preview:free",
        messages: [
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    // OpenRouter error
    if (!response.ok) {
      return Response.json(
        {
          error: data.error?.message || "AI request failed",
          details: data
        },
        { status: response.status }
      );
    }

    return Response.json({
      reply: data.choices?.[0]?.message?.content
    });

  } catch (error: any) {
    console.error("API ERROR:", error);

    return Response.json(
      {
        error: "Internal server error",
        message: error.message
      },
      { status: 500 }
    );
  }
}