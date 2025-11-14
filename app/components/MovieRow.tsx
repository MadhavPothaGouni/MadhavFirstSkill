// app/components/MovieRow.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Movie } from '@/types/movie'

export default function MovieRow({ movies, categoryTitle }: { movies: Movie[]; categoryTitle: string }) {
  return (
    <section className="px-4">
      <h3 className="text-lg font-semibold mb-3">{categoryTitle}</h3>
      <div className="flex gap-3 overflow-x-auto movie-row py-2">
        {movies.map((m) => (
          <Link
            key={m.id}
            href={`/movie/${m.id}`}
            className="min-w-[140px] block"
            aria-label={m.title ?? `movie-${m.id}`}
          >
            <div className="relative w-[140px] h-[210px] rounded overflow-hidden">
              {m.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                  alt={m.title ?? 'poster'}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 140px, 200px"
                />
              ) : (
                <div className="bg-gray-800 w-full h-full flex items-center justify-center">No image</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
