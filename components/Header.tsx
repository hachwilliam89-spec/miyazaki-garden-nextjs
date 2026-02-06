'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#2D5A27]/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo avec sous-titre */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2D5A27]/10 flex items-center justify-center group-hover:bg-[#2D5A27]/20 transition-colors">
                <span className="text-xl">🌿</span>
              </div>
              <div>
                <span className="font-script text-xl text-[#2D5A27] tracking-wide">Miyazaki-Garden</span>
                <span className="hidden sm:block text-[10px] text-[#2D5A27]/50 tracking-[0.2em] uppercase">Studio Ghibli Collection</span>
              </div>
            </Link>

            {/* Desktop Navigation - Pills style */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center bg-[#2D5A27]/5 rounded-full px-2 py-1">
                <Link href="/" className="px-4 py-2 text-sm text-[#2D5A27]/70 hover:text-[#2D5A27] hover:bg-[#2D5A27]/10 rounded-full transition-all">
                  Accueil
                </Link>
                <Link href="/films" className="px-4 py-2 text-sm text-[#2D5A27]/70 hover:text-[#2D5A27] hover:bg-[#2D5A27]/10 rounded-full transition-all">
                  Filmographie
                </Link>
                <Link href="/a-propos" className="px-4 py-2 text-sm text-[#2D5A27]/70 hover:text-[#2D5A27] hover:bg-[#2D5A27]/10 rounded-full transition-all">
                  À propos
                </Link>
              </div>
            </nav>

            {/* Auth Buttons - CORRIGÉS ✅ */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/auth/signin" className="px-5 py-2 text-sm text-[#2D5A27]/80 hover:text-[#2D5A27] border border-[#2D5A27]/20 hover:border-[#2D5A27]/40 rounded-full transition-all">
                Connexion
              </Link>
              <Link href="/auth/signup" className="px-5 py-2 text-sm bg-[#5B9A4A] hover:bg-[#4A8A3A] text-white font-semibold rounded-full transition-all shadow-lg shadow-[#5B9A4A]/20">
                S&apos;inscrire
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden w-10 h-10 rounded-full bg-[#2D5A27]/10 flex items-center justify-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-5 h-5 text-[#2D5A27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation - CORRIGÉ ✅ */}
          {isMenuOpen && (
              <nav className="lg:hidden mt-4 pt-4 border-t border-[#2D5A27]/10">
                <div className="space-y-1">
                  <Link href="/" className="block py-3 px-4 text-[#2D5A27]/70 hover:text-[#2D5A27] hover:bg-[#2D5A27]/5 rounded-xl transition-all" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                  <Link href="/films" className="block py-3 px-4 text-[#2D5A27]/70 hover:text-[#2D5A27] hover:bg-[#2D5A27]/5 rounded-xl transition-all" onClick={() => setIsMenuOpen(false)}>Filmographie</Link>
                  <Link href="/a-propos" className="block py-3 px-4 text-[#2D5A27]/70 hover:text-[#2D5A27] hover:bg-[#2D5A27]/5 rounded-xl transition-all" onClick={() => setIsMenuOpen(false)}>À propos</Link>
                </div>
                <div className="flex gap-3 mt-4 pt-4 border-t border-[#2D5A27]/10">
                  <Link href="/auth/signin" className="flex-1 py-3 text-center text-sm text-[#2D5A27] border border-[#2D5A27]/20 rounded-full" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
                  <Link href="/auth/signup" className="flex-1 py-3 text-center text-sm bg-[#5B9A4A] text-white font-semibold rounded-full" onClick={() => setIsMenuOpen(false)}>S&apos;inscrire</Link>
                </div>
              </nav>
          )}
        </div>
      </header>
  )
}
