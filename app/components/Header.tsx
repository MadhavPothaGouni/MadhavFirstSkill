'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-black/90'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Brand + nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-purple-400 tracking-tight">
            Streaming
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-200">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <button className="hover:text-white">Movies</button>
            <button className="hover:text-white">My List</button>
          </nav>
        </div>

        {/* Right: kids + profile */}
        <div className="flex items-center gap-4 text-sm text-gray-200">
          <button className="hidden sm:inline-flex px-3 py-1 border border-gray-500 rounded">
            Kids
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
            P
          </div>
        </div>
      </div>
    </header>
  )
}
