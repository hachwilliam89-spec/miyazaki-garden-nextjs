'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <header className="header-ghibli sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="font-script text-2xl text-white">Miyazaki-Garden</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <Link href="/" className="nav-link">Accueil</Link>
              <span className="text-white/30">✦</span>
              <Link href="/films" className="nav-link">Filmographie</Link>
              <span className="text-white/30">✦</span>
              <Link href="/personnages" className="nav-link">Personnages</Link>
              <span className="text-white/30">✦</span>
              <Link href="/a-propos" className="nav-link">À propos</Link>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/connexion" className="btn-outline text-sm">
                Se connecter
              </Link>
              <Link href="/inscription" className="btn-primary text-sm">
                S&apos;inscrire
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 text-white/80 hover:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <nav className="md:hidden pt-4 pb-2 border-t border-white/10 mt-3 space-y-2">
                <Link href="/" className="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                <Link href="/films" className="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" onClick={() => setIsMenuOpen(false)}>Filmographie</Link>
                <Link href="/personnages" className="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" onClick={() => setIsMenuOpen(false)}>Personnages</Link>
                <div className="flex gap-2 pt-2">
                  <Link href="/connexion" className="btn-outline text-sm flex-1 text-center">Se connecter</Link>
                  <Link href="/inscription" className="btn-primary text-sm flex-1 text-center">S&apos;inscrire</Link>
                </div>
              </nav>
          )}
        </div>
      </header>
  )
}