import Image from 'next/image'
import Link from 'next/link'
import { fetchMovieById, fetchMovieTrailerKey } from '@/lib/tmdb'
import type { Movie } from '@/types/movie'

type PageProps = {
  params: Promise<{ id?: string }>
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params
  if (!id) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Invalid movie</h1>
        <p className="text-gray-300 mb-4">No movie id was provided in the URL.</p>
        <Link href="/" className="underline text-sm">
          ← Back to home
        </Link>
      </div>
    )
  }

  let movie: Movie | null = null
  let trailerKey: string | null = null

  try {
    movie = (await fetchMovieById(id)) as Movie
  } catch (err) {
    console.error('MoviePage fetchMovieById error for id=', id, err)
  }

  if (movie?.id) {
    try {
      trailerKey = await fetchMovieTrailerKey(movie.id)
    } catch (err) {
      console.error('MoviePage fetchMovieTrailerKey error for id=', id, err)
    }
  }

  // If fetch failed or TMDB returned nothing
  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Movie details unavailable</h1>
        <p className="text-gray-300 mb-4">
          We could not load movie details right now. Please try again later.
        </p>
        <Link href="/" className="underline text-sm">
          ← Back to home
        </Link>
      </div>
    )
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : null

  const runtimeHours = movie.runtime ? Math.floor(movie.runtime / 60) : null
  const runtimeMinutes = movie.runtime ? movie.runtime % 60 : null
  const primaryLanguage = movie.spoken_languages?.[0]?.english_name ?? 'Unknown'

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            alt={movie.title ?? 'Movie backdrop'}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

        {/* Top nav (mini) */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-10 py-4 text-sm text-gray-200">
          <Link href="/" className="font-semibold tracking-[0.2em] uppercase text-xs md:text-sm">
            Streaming
          </Link>
          <span className="text-xs md:text-sm text-gray-300">Movie details</span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 h-full flex items-end pb-16">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10 w-full">
            {/* Optional poster on large screens */}
            {movie.poster_path && (
              <div className="hidden md:block w-40 lg:w-52 flex-shrink-0 rounded-lg overflow-hidden shadow-xl shadow-black/60 border border-white/10">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title ?? 'Poster'}
                  width={340}
                  height={510}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            {/* Text details */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-sm md:text-base text-gray-200 italic">{movie.tagline}</p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-200">
                {movie.release_date && (
                  <span>{movie.release_date.replace(/-/g, ' · ')}</span>
                )}

                {movie.runtime && (
                  <span>
                    {runtimeHours}h {runtimeMinutes}m
                  </span>
                )}

                {typeof movie.vote_average === 'number' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 text-xs md:text-sm">
                    ⭐ {movie.vote_average.toFixed(1)}
                    {movie.vote_count ? (
                      <span className="text-[10px] md:text-xs text-gray-300">
                        ({Math.round(movie.vote_count / 100) / 10}k votes)
                      </span>
                    ) : null}
                  </span>
                )}

                <span className="px-2 py-0.5 rounded-full border border-white/30 text-[10px] md:text-xs">
                  Lang: {primaryLanguage}
                </span>

                {movie.status && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600/70 text-[10px] md:text-xs font-semibold">
                    {movie.status}
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/movie/${movie.id}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-white text-black font-semibold text-sm md:text-base hover:bg-gray-200 hover:scale-[1.03] transition-transform"
                >
                  ▶ Play
                </Link>

                {trailerKey && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailerKey}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-white/10 text-white border border-white/40 font-medium text-sm md:text-base hover:bg-white/20 transition"
                  >
                    Watch trailer on YouTube
                  </a>
                )}

                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs md:text-sm underline text-gray-200 hover:text-white"
                  >
                    Official site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <main className="max-w-5xl mx-auto px-6 md:px-10 py-10 space-y-10">
        {/* Overview */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold">Overview</h2>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">{movie.overview}</p>
        </section>

        {/* Extra details grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-200">
          <div className="space-y-1">
            <h3 className="text-xs uppercase tracking-wide text-gray-400">Genres</h3>
            <p>{movie.genres?.map((g) => g.name).join(' · ') || '—'}</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs uppercase tracking-wide text-gray-400">Spoken languages</h3>
            <p>
              {movie.spoken_languages?.map((l) => l.english_name || l.name).join(' · ') || '—'}
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs uppercase tracking-wide text-gray-400">Production countries</h3>
            <p>
              {movie.production_countries?.map((c) => c.name).join(' · ') || '—'}
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs uppercase tracking-wide text-gray-400">Production companies</h3>
            <p>
              {movie.production_companies?.map((c) => c.name).join(' · ') || '—'}
            </p>
          </div>
        </section>

        {/* Back link */}
        <section className="pt-4">
          <Link href="/" className="underline text-sm text-gray-300 hover:text-white">
            ← Back to home
          </Link>
        </section>
      </main>
    </div>
  )
}
