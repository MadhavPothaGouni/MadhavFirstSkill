// types/movie.ts
export interface Movie {
  id: number
  title: string
  name?: string
  poster_path?: string | null
  backdrop_path?: string | null
  overview?: string | null
  release_date?: string | null
}
