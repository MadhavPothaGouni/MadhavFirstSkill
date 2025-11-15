// app/page.tsx
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import MovieRow from './components/MovieRow'
import { fetchPopular, fetchTopRated, fetchMovieTrailerKey } from '@/lib/tmdb'
import type { Movie } from '@/types/movie'

export default async function Home() {
  let popular: Movie[] = []
  let topRated: Movie[] = []

  // Fetch popular movies
  try {
    popular = await fetchPopular()
  } catch (e) {
    console.error('fetchPopular error', e)
  }

  // Fetch top rated (or another category)
  try {
    topRated = await fetchTopRated()
  } catch (e) {
    console.error('fetchTopRated error', e)
  }

 
  const featured: Movie | null =
    popular.find((m) => m.backdrop_path) ?? popular[0] ?? null

  // Get trailer key for the featured movie
  let trailerKey: string | null = null
  if (featured?.id) {
    try {
      trailerKey = await fetchMovieTrailerKey(String(featured.id))
      console.log('Trailer key for featured movie:', trailerKey)
    } catch (e) {
      console.error('fetchMovieTrailerKey error', e)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-16 bg-black min-h-screen text-white">
        <HeroBanner movie={featured} trailerKey={trailerKey} />

        <div className="max-w-[1200px] mx-auto">
          <MovieRow movies={popular} categoryTitle="Popular" />
          <MovieRow movies={topRated} categoryTitle="More to watch" />
        </div>
      </main>
    </>
  )
}
