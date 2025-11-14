import type { Movie } from '@/types/movie'

const BASE = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

if (!API_KEY) {
  // eslint-disable-next-line no-console
  console.warn('TMDB_API_KEY not found in .env.local')
}

export async function fetchPopular(): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('TMDB popular fetch error:', res.status, res.statusText)
      return []
    }
    const json = await res.json()
    return (json.results || []) as Movie[]
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('fetchPopular() error:', err)
    return []
  }
}

export async function fetchMovieById(id: string): Promise<Movie | null> {
  try {
    const res = await fetch(
      `${BASE}/movie/${id}?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('TMDB detail fetch error:', res.status, res.statusText)
      return null
    }
    return (await res.json()) as Movie
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`fetchMovieById(${id}) error:`, err)
    return null
  }
}
