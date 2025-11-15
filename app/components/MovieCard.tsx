'use client'
import Link from 'next/link'
import Image from 'next/image'
import type { Movie } from '@/types/movie'

export default function MovieCard({ m }: { m: Movie }) {
  return (
    <Link href={`/movie/${m.id}`} aria-label={m.title ?? `movie-${m.id}`} className="group block min-w-[140px] md:min-w-[160px]">
      <div className="relative rounded overflow-hidden transform transition duration-200 group-hover:scale-105">
        {m.poster_path ? (
          <div className="relative w-[140px] h-[210px] md:w-[160px] md:h-[240px]">
            <Image
              src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
              alt={m.title ?? 'poster'}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div className="w-[140px] h-[210px] md:w-[160px] md:h-[240px] bg-gray-800 flex items-center justify-center">No image</div>
        )}

        {/* overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition" />
        <div className="absolute left-2 bottom-2 opacity-0 group-hover:opacity-100 transition text-white text-sm">
          <div className="bg-black/60 px-2 py-1 rounded">{m.title}</div>
          <div className="mt-1 text-xs text-gray-300">★ {m.vote_average ?? '-'}</div>
        </div>
      </div>
    </Link>
  )
}
