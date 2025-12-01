// API route to check if server-side API key is configured
export async function GET() {
  const hasApiKey = !!process.env.GOOGLE_GEMINI_API_KEY
  return Response.json({ hasApiKey })
}
