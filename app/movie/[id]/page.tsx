// app/movie/[id]/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type Genre = { id: number; name: string }

type Movie = {
  id: number
  title: string
  poster_path?: string | null
  backdrop_path?: string | null
  overview?: string | null
  release_date?: string | null
  genres?: Genre[]
  runtime?: number | null
  vote_average?: number | null
  homepage?: string | null
}

export default function MoviePageClient() {
  const params = useParams()
  const id = params?.id

  // If id exists -> undefined = loading. If no id -> null = invalid immediately (no fetch).
  const initialState: Movie | null | undefined = id ? undefined : null
  const [movie, setMovie] = useState<Movie | null | undefined>(initialState)

  // Hooks must be called unconditionally and in the same order
  useEffect(() => {
    // if there's no id, do nothing (we already set initial state to null)
    if (!id) return

    const ctrl = new AbortController()
    let mounted = true

    async function load() {
      try {
        // show loading state
        setMovie(undefined)
        const res = await fetch(`/api/movie/${id}`, { signal: ctrl.signal })
        if (!mounted) return
        if (!res.ok) {
          setMovie(null)
          return
        }
        const json = (await res.json()) as Movie
        setMovie(json)
      } catch (err) {
        // If the fetch was aborted, ignore
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }
        // eslint-disable-next-line no-console
        console.error('Client fetch error for movie:', err)
        setMovie(null)
      }
    }

    load()
    return () => {
      mounted = false
      ctrl.abort()
    }
  }, [id])

  // Now safe to early-return UI based on id or movie state
  if (!id) {
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-4">Invalid movie</h1>
        <p className="text-gray-300">No movie id was provided in the URL.</p>
        <Link href="/" className="inline-block mt-4 underline">
          ← Back
        </Link>
      </div>
    )
  }

  if (movie === undefined) {
    return (
      <div className="py-8">
        <p>Loading...</p>
      </div>
    )
  }

  if (movie === null) {
    return (
      <div className="py-8">
        <Link href="/" className="inline-block mb-4 text-sm underline">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold mb-4">Movie details unavailable</h1>
        <p className="text-gray-300">We could not load movie details right now.</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      <Link href="/" className="inline-block mb-4 text-sm underline">
        ← Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Poster */}
        <div className="md:col-span-1">
          {movie.poster_path ? (
            <div className="relative w-full h-96 rounded overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title ?? 'poster'}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          ) : (
            <div className="w-full h-96 bg-gray-800 flex items-center justify-center">No image</div>
          )}
        </div>

        {/* Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            {movie.release_date && <span>{movie.release_date}</span>}
            {movie.runtime ? <span>· {movie.runtime} min</span> : null}
            {typeof movie.vote_average === 'number' ? <span>· ⭐ {movie.vote_average}</span> : null}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <p className="text-sm mb-4">
              <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(', ')}
            </p>
          )}

          <p className="max-w-3xl mb-6">{movie.overview}</p>

          {movie.homepage && (
            <p className="mt-4">
              <a href={movie.homepage} target="_blank" rel="noreferrer" className="underline text-sm">
                Visit official site
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
