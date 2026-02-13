'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Film {
  id: string
  title: string
  originalTitle: string
  description: string
  director: string
  releaseDate: string
  runningTime: string
  rtScore: string
  image: string | null
}

interface FilmsCollectionProps {
  films: Film[]
}

// Grouper les réalisateurs
const DIRECTORS = {
  'Hayao Miyazaki': 'Hayao Miyazaki',
  'Isao Takahata': 'Isao Takahata',
  'Gorō Miyazaki': 'Gorō Miyazaki',
}

type TabType = 'all' | 'Hayao Miyazaki' | 'Isao Takahata' | 'Gorō Miyazaki' | 'others'
type SortType = 'year-desc' | 'year-asc' | 'rating' | 'alpha'

export default function FilmsCollection({ films }: FilmsCollectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [sortBy, setSortBy] = useState<SortType>('year-desc')
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filtrer les films par réalisateur
  const filteredFilms = useMemo(() => {
    let result = films

    if (activeTab === 'all') {
      // Pas de filtre
    } else if (activeTab === 'others') {
      result = films.filter(f => 
        !Object.keys(DIRECTORS).includes(f.director)
      )
    } else {
      result = films.filter(f => f.director === activeTab)
    }

    // Trier
    switch (sortBy) {
      case 'year-desc':
        result = [...result].sort((a, b) => parseInt(b.releaseDate) - parseInt(a.releaseDate))
        break
      case 'year-asc':
        result = [...result].sort((a, b) => parseInt(a.releaseDate) - parseInt(b.releaseDate))
        break
      case 'rating':
        result = [...result].sort((a, b) => parseInt(b.rtScore) - parseInt(a.rtScore))
        break
      case 'alpha':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return result
  }, [films, activeTab, sortBy])

  // Compter les films par réalisateur
  const counts = useMemo(() => ({
    all: films.length,
    'Hayao Miyazaki': films.filter(f => f.director === 'Hayao Miyazaki').length,
    'Isao Takahata': films.filter(f => f.director === 'Isao Takahata').length,
    'Gorō Miyazaki': films.filter(f => f.director === 'Gorō Miyazaki').length,
    others: films.filter(f => !Object.keys(DIRECTORS).includes(f.director)).length,
  }), [films])

  // Reset index quand on change de tab
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setCurrentIndex(0)
  }

  // Navigation timeline
  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? filteredFilms.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev === filteredFilms.length - 1 ? 0 : prev + 1))
  }

  const currentFilm = filteredFilms[currentIndex]

  return (
    <section className="section-glass p-8 md:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-script text-4xl md:text-5xl text-[#2D5A27] mb-1">
          La Collection
        </h1>
        <p className="font-japanese text-lg text-[#4A7C34]/80">
          コレクション
        </p>
      </div>

      {/* Onglets */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => handleTabChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'all'
              ? 'bg-[#2D5A27] text-white shadow-lg'
              : 'bg-[#2D5A27]/10 text-[#2D5A27] hover:bg-[#2D5A27]/20'
          }`}
        >
          Tous ({counts.all})
        </button>
        <button
          onClick={() => handleTabChange('Hayao Miyazaki')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'Hayao Miyazaki'
              ? 'bg-[#2D5A27] text-white shadow-lg'
              : 'bg-[#2D5A27]/10 text-[#2D5A27] hover:bg-[#2D5A27]/20'
          }`}
        >
          H. Miyazaki ({counts['Hayao Miyazaki']})
        </button>
        <button
          onClick={() => handleTabChange('Isao Takahata')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'Isao Takahata'
              ? 'bg-[#2D5A27] text-white shadow-lg'
              : 'bg-[#2D5A27]/10 text-[#2D5A27] hover:bg-[#2D5A27]/20'
          }`}
        >
          I. Takahata ({counts['Isao Takahata']})
        </button>
        <button
          onClick={() => handleTabChange('Gorō Miyazaki')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'Gorō Miyazaki'
              ? 'bg-[#2D5A27] text-white shadow-lg'
              : 'bg-[#2D5A27]/10 text-[#2D5A27] hover:bg-[#2D5A27]/20'
          }`}
        >
          G. Miyazaki ({counts['Gorō Miyazaki']})
        </button>
        {counts.others > 0 && (
          <button
            onClick={() => handleTabChange('others')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'others'
                ? 'bg-[#2D5A27] text-white shadow-lg'
                : 'bg-[#2D5A27]/10 text-[#2D5A27] hover:bg-[#2D5A27]/20'
            }`}
          >
            Autres ({counts.others})
          </button>
        )}
      </div>

      {/* ══════════════════════════════════════════
          MODE "TOUS" — Grille galerie
      ══════════════════════════════════════════ */}
      {activeTab === 'all' ? (
        <>
          {/* Tri */}
          <div className="flex justify-center gap-2 mb-8">
            <span className="text-[#2D5A27]/60 text-sm self-center mr-2">Trier par :</span>
            <button
              onClick={() => setSortBy('year-desc')}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                sortBy === 'year-desc'
                  ? 'bg-[#D4A84B] text-white'
                  : 'bg-[#2D5A27]/5 text-[#2D5A27]/70 hover:bg-[#2D5A27]/10'
              }`}
            >
              Récents
            </button>
            <button
              onClick={() => setSortBy('year-asc')}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                sortBy === 'year-asc'
                  ? 'bg-[#D4A84B] text-white'
                  : 'bg-[#2D5A27]/5 text-[#2D5A27]/70 hover:bg-[#2D5A27]/10'
              }`}
            >
              Anciens
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                sortBy === 'rating'
                  ? 'bg-[#D4A84B] text-white'
                  : 'bg-[#2D5A27]/5 text-[#2D5A27]/70 hover:bg-[#2D5A27]/10'
              }`}
            >
              ✦ Notes
            </button>
            <button
              onClick={() => setSortBy('alpha')}
              className={`px-3 py-1 rounded-full text-xs transition-all ${
                sortBy === 'alpha'
                  ? 'bg-[#D4A84B] text-white'
                  : 'bg-[#2D5A27]/5 text-[#2D5A27]/70 hover:bg-[#2D5A27]/10'
              }`}
            >
              A-Z
            </button>
          </div>

          {/* Grille */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredFilms.map((film) => (
              <Link
                key={film.id}
                href={`/films/${film.id}`}
                className="group relative aspect-[2/3] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {film.image && (
                  <Image
                    src={film.image}
                    alt={film.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />
                )}
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Infos au hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[#D4A84B] text-xs">✦</span>
                    <span className="text-white text-xs font-semibold">{film.rtScore}</span>
                  </div>
                  <h3 className="text-white text-sm font-bold leading-tight">{film.title}</h3>
                  <p className="text-white/60 text-xs">{film.releaseDate}</p>
                </div>

                {/* Badge note (toujours visible) */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-semibold text-[#2D5A27]">
                  {film.releaseDate}
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        /* ══════════════════════════════════════════
           MODE RÉALISATEUR — Timeline + Film immersif
        ══════════════════════════════════════════ */
        <>
          {/* Info réalisateur */}
          <div className="text-center mb-6">
            <h2 className="font-display text-xl text-[#2D5A27] font-semibold">
              {activeTab === 'others' ? 'Autres réalisateurs' : activeTab}
            </h2>
            <p className="text-[#2D5A27]/60 text-sm">
              {filteredFilms.length} films • {filteredFilms[filteredFilms.length - 1]?.releaseDate} — {filteredFilms[0]?.releaseDate}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mb-8 px-8">
            <div className="h-0.5 bg-[#2D5A27]/20 rounded-full" />
            <div className="flex justify-between absolute inset-x-8 -top-2">
              {filteredFilms.map((film, index) => (
                <button
                  key={film.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative group flex flex-col items-center ${
                    index === currentIndex ? 'z-10' : ''
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 transition-all ${
                      index === currentIndex
                        ? 'bg-[#D4A84B] border-[#D4A84B] scale-125'
                        : 'bg-white border-[#2D5A27]/30 hover:border-[#2D5A27] hover:scale-110'
                    }`}
                  />
                  <span
                    className={`absolute top-6 text-xs whitespace-nowrap transition-all ${
                      index === currentIndex
                        ? 'text-[#D4A84B] font-semibold'
                        : 'text-[#2D5A27]/50 group-hover:text-[#2D5A27]'
                    }`}
                  >
                    {film.releaseDate}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Film immersif */}
          {currentFilm && (
            <div className="mt-16">
              <Link href={`/films/${currentFilm.id}`} className="group block">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Poster */}
                  <div className="relative">
                    {/* Ombre portée */}
                    <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/20 blur-xl rounded-full" />
                    
                    {/* Cadre doré */}
                    <div className="relative bg-gradient-to-br from-[#D4A84B] via-[#C9975A] to-[#D4A84B] p-2 rounded-xl shadow-2xl">
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                        {currentFilm.image ? (
                          <Image
                            src={currentFilm.image}
                            alt={currentFilm.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                            priority
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#A8D5BA] to-[#B8E6D0]">
                            <span className="text-8xl">🎬</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Infos */}
                  <div>
                    <div className="bg-[#FDFBF5] border-l-4 border-[#D4A84B] p-6 rounded-r-xl shadow-lg">
                      <h3 className="font-display text-3xl font-bold text-[#2D5A27] mb-2 group-hover:text-[#4A7C34] transition-colors">
                        {currentFilm.title}
                      </h3>
                      <p className="font-japanese text-lg text-[#4A7C34] mb-4">
                        {currentFilm.originalTitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="flex items-center gap-1.5 bg-[#2D5A27]/10 px-3 py-1 rounded-full">
                          <span className="text-[#D4A84B]">✦</span>
                          <span className="font-semibold text-[#2D5A27]">{currentFilm.rtScore}/100</span>
                        </span>
                        <span className="bg-[#2D5A27]/10 px-3 py-1 rounded-full text-[#2D5A27] text-sm">
                          {currentFilm.releaseDate}
                        </span>
                        <span className="bg-[#2D5A27]/10 px-3 py-1 rounded-full text-[#2D5A27] text-sm">
                          {currentFilm.runningTime} min
                        </span>
                      </div>

                      <p className="text-[#2D5A27]/70 leading-relaxed mb-6 line-clamp-4">
                        {currentFilm.description}
                      </p>

                      <span className="inline-flex items-center gap-2 text-[#4A7C34] font-semibold group-hover:gap-3 transition-all">
                        Découvrir ce film →
                      </span>
                    </div>

                    <p className="text-xs text-[#2D5A27]/40 mt-4 italic">
                      Réalisé par {currentFilm.director}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={goToPrevious}
                  className="w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-[#2D5A27] hover:text-[#4A7C34] transition-all"
                >
                  ←
                </button>
                
                <div className="flex gap-1.5">
                  {filteredFilms.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-[#D4A84B] w-6'
                          : 'bg-[#2D5A27]/20 w-1.5 hover:bg-[#2D5A27]/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  className="w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-[#2D5A27] hover:text-[#4A7C34] transition-all"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  )
}
