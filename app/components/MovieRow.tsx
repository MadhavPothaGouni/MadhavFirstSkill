'use client'
import React, { useRef } from 'react'
import MovieCard from './MovieCard'
import type { Movie } from '@/types/movie'

export default function MovieRow({ movies, categoryTitle }: { movies: Movie[]; categoryTitle: string }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  function scroll(delta: number) {
    if (!scrollerRef.current) return
    scrollerRef.current.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">{categoryTitle}</h3>
        <div className="flex gap-2">
          <button onClick={() => scroll(-400)} className="hidden md:inline-flex items-center justify-center w-8 h-8 rounded bg-black/50 text-white">‹</button>
          <button onClick={() => scroll(400)} className="hidden md:inline-flex items-center justify-center w-8 h-8 rounded bg-black/50 text-white">›</button>
        </div>
      </div>

<div
  ref={scrollerRef}
  className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory hide-scrollbar"
>
  {movies.map((m) => (
    <div key={m.id} className="snap-start">
      <MovieCard m={m} />
    </div>
  ))}
</div>

    </section>
  )
}
