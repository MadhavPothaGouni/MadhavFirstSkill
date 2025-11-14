import HeroBanner from './components/HeroBanner'
import MovieRow from './components/MovieRow'
import { fetchPopular } from '@/lib/tmdb'
import type { Movie } from '@/types/movie'

export default async function Page() {
  const popular = await fetchPopular()
  const movies: Movie[] = popular || []

  return (
    <div className="space-y-8 py-8">
      {movies.length > 0 ? (
        <>
          <HeroBanner movie={movies[0]} />
          <MovieRow movies={movies} categoryTitle="Popular" />
          <MovieRow movies={movies.slice(10, 20)} categoryTitle="More to watch" />
          <MovieRow movies={movies.slice(20, 30)} categoryTitle="Trending" />
        </>
      ) : (
        <div className="py-12 px-4">
          <h2 className="text-xl font-semibold">No movies found</h2>
          <p className="text-gray-300">Check the server terminal for TMDB fetch errors (API key, network).</p>
        </div>
      )}
    </div>
  )
}
