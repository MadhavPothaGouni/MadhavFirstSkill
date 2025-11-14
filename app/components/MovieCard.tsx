'use client'
import Image from 'next/image'
import Link from 'next/link'
import type { Movie } from '../../types/movie'


export default function MovieCard({ movie }: { movie: Movie }) {
return (
<Link href={`/movie/${movie.id}`} className="block">
<div className="w-40 h-60 relative">
{movie.poster_path ? (
<Image src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title} fill style={{ objectFit: 'cover' }} />
) : (
<div className="bg-gray-800 w-full h-full" />
)}
</div>
</Link>
)
}