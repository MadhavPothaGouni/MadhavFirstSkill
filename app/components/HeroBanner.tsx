import Image from 'next/image'
import Link from 'next/link'
import type { Movie } from '@/types/movie'

type HeroBannerProps = {
  movie: Movie | null
  trailerKey?: string | null
}

export default function HeroBanner({ movie, trailerKey }: HeroBannerProps) {
  if (!movie) {
    return (
      <section className="relative h-72 md:h-[420px] bg-black flex items-center justify-center">
        <div className="text-white">No featured movie</div>
      </section>
    )
  }

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : undefined

  return (
    <section className="relative h-[380px] md:h-[520px] overflow-hidden">
      {/* Base background: always show backdrop image (or a dark color) */}
      {backdrop ? (
        <Image
          src={backdrop}
          alt={movie.title ?? 'hero'}
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-900" />
      )}

            {/* Trailer overlay if available: sits on top of the backdrop */}
      {trailerKey && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <iframe
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
            title={movie.title ?? 'Trailer'}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
          />
          {/* subtle dark overlay on top of the video */}
          <div className="absolute inset-0 bg-black/35" />
        </div>
      )}


      {/* Gradient overlay from bottom to top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10 h-full flex flex-col justify-end pb-10">
        <div className="max-w-xl text-white space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
            {movie.title}
          </h2>

          <p className="hidden md:block text-sm text-gray-200 leading-relaxed line-clamp-3">
            {movie.overview}
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-300">
            {movie.release_date && <span>{movie.release_date}</span>}
            {typeof movie.vote_average === 'number' && (
              <span className="px-2 py-1 bg-black/70 rounded">
                Rating: {movie.vote_average.toFixed(1)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Link
              href={`/movie/${movie.id}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-white text-black font-semibold text-sm md:text-base hover:scale-[1.03] transition"
            >
              ▶ Play
            </Link>
            <Link
              href={`/movie/${movie.id}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-white/10 text-white border border-white/40 font-medium text-sm md:text-base hover:bg-white/20 transition"
            >
              More info
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
