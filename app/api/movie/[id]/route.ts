// app/api/movie/[id]/route.ts
import { NextResponse, type NextRequest } from 'next/server'

const BASE = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

type Context = {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, context: Context) {
  try {
    const { id } = await context.params
    console.log('[api/movie] GET called, id =', id)

    if (!id) {
      console.error('[api/movie] No movie id provided')
      return NextResponse.json(
        { error: 'No movie id provided' },
        { status: 400 }
      )
    }

    if (!API_KEY) {
      console.error('[api/movie] Missing TMDB_API_KEY in process.env')
      return NextResponse.json(
        { error: 'Missing TMDB API KEY' },
        { status: 500 }
      )
    }

    const url = `${BASE}/movie/${id}?api_key=${API_KEY}&language=en-US`
    console.log('[api/movie] Fetching TMDB URL =', url)

    const res = await fetch(url, { cache: 'no-store' })
    console.log('[api/movie] TMDB response status =', res.status)

    if (!res.ok) {
      const text = await res.text().catch(() => '[no body]')
      console.error('[api/movie] TMDB responded non-OK:', res.status, text)
      return NextResponse.json(
        { error: 'TMDB request failed', status: res.status },
        { status: res.status }
      )
    }

    const json = await res.json()
    return NextResponse.json(json)
  } catch (err) {
    console.error('[api/movie] Unexpected server error:', err)
    return NextResponse.json(
      { error: 'Internal server error in /api/movie/[id]' },
      { status: 500 }
    )
  }
}
