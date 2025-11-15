// types/movie.ts

export type Movie = {
  id: number
  title: string

  // Basic fields
  overview?: string | null
  poster_path?: string | null
  backdrop_path?: string | null
  release_date?: string | null
  vote_average?: number
  vote_count?: number

  // Extra detail fields we use on the movie page
  runtime?: number | null
  status?: string | null
  tagline?: string | null
  homepage?: string | null

  // Arrays from TMDB
  genres?: {
    id: number
    name: string
  }[]

  spoken_languages?: {
    iso_639_1?: string
    english_name?: string
    name?: string
  }[]

  production_countries?: {
    iso_3166_1?: string
    name?: string
  }[]

  production_companies?: {
    id: number
    name: string
    logo_path?: string | null
    origin_country?: string
  }[]
}
