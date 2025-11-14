'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-black/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">Streaming</Link>
        <nav className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="#">Movies</Link>
          <Link href="#">My List</Link>
        </nav>
      </div>
    </header>
  )
}
