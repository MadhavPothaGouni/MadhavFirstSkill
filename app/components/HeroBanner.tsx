import Image from 'next/image'
import type { Movie } from '@/types/movie'

export default function HeroBanner({ movie }: { movie: Movie }) {
  const backdrop = movie?.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null
  return (
    <section className="relative h-72 md:h-96 rounded overflow-hidden">
      {backdrop && (
        <Image src={backdrop} alt={movie.title} fill priority style={{ objectFit: 'cover' }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6">
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <p className="max-w-lg text-sm mt-2 hidden md:block">{movie.overview}</p>
      </div>
    </section>
  )
}
