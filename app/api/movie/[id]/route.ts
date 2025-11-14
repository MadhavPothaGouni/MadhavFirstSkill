// app/api/movie/[id]/route.ts
import { NextResponse } from 'next/server'

const BASE = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

export async function GET(req: Request, { params }: { params: { id?: string } }) {
  try {
    const id = params?.id
    console.log('[api/movie] GET called, id=', id)

    if (!id) {
      console.error('[api/movie] no id provided')
      return NextResponse.json({ error: 'No movie id' }, { status: 400 })
    }

    if (!API_KEY) {
      console.error('[api/movie] Missing TMDB_API_KEY in process.env')
      return NextResponse.json({ error: 'Missing TMDB API KEY' }, { status: 500 })
    }

    const url = `${BASE}/movie/${id}?api_key=${API_KEY}`
    console.log('[api/movie] fetching TMDB url=', url)

    const res = await fetch(url, { cache: 'no-store' })
    console.log('[api/movie] TMDB status=', res.status)

    if (!res.ok) {
      const text = await res.text().catch(() => '[no body]')
      console.error('[api/movie] TMDB responded non-OK:', res.status, text)
      return NextResponse.json({ error: 'TMDB not OK', status: res.status }, { status: 502 })
    }

    const json = await res.json()
    return NextResponse.json(json)
  } catch (err) {
    console.error('[api/movie] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
