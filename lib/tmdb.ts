const BASE = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

if (!API_KEY) {
  console.warn('[tmdb] TMDB_API_KEY is missing – API calls will fail.')
}


async function tmdbFetch(
  path: string,
  revalidateSeconds: number = 60
): Promise<Response> {
  if (!API_KEY) {
    throw new Error('[tmdb] TMDB_API_KEY is not set in environment.')
  }

  const url = `${BASE}${path}?api_key=${API_KEY}&language=en-US`
  const maxAttempts = 3
  let lastError: unknown = null

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url, {
        // cache on server for performance
        next: { revalidate: revalidateSeconds },
      })

      if (!res.ok) {
        throw new Error(`[tmdb] Non-OK status ${res.status} for ${url}`)
      }

      return res
    } catch (err) {
      lastError = err
      // eslint-disable-next-line no-console
      console.error(`[tmdbFetch] attempt ${attempt} failed for ${url}`, err)

      // last attempt → rethrow
      if (attempt === maxAttempts) {
        throw err
      }
      // brief delay before retry (100ms)
      await new Promise((r) => setTimeout(r, 100))
    }
  }

  throw lastError ?? new Error('[tmdb] Unknown fetch error')
}

export async function fetchPopular() {
  const res = await tmdbFetch('/movie/popular', 60)
  const json = await res.json()
  return Array.isArray(json.results) ? json.results : []
}

export async function fetchTopRated() {
  const res = await tmdbFetch('/movie/top_rated', 60)
  const json = await res.json()
  return Array.isArray(json.results) ? json.results : []
}

export async function fetchMovieById(id: string) {
  const res = await tmdbFetch(`/movie/${id}`, 300)
  return res.json()
}


export async function fetchMovieTrailerKey(
  id: string | number
): Promise<string | null> {
  const movieId = typeof id === 'number' ? id.toString() : id
  const res = await tmdbFetch(`/movie/${movieId}/videos`, 300)
  const json = await res.json()

  const results: Array<{
    site?: string
    type?: string
    key?: string
    official?: boolean
  }> = Array.isArray(json.results) ? json.results : []

  const trailer =
    results.find(
      (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
    ) ??
    results.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ??
    results.find((v) => v.site === 'YouTube')

  return trailer?.key ?? null
}
