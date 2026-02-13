'use client'

import { useState } from 'react'
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

interface TopFilmsCarouselProps {
  films: Film[]
}

export default function TopFilmsCarousel({ films }: TopFilmsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? films.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === films.length - 1 ? 0 : prev + 1))
  }

  const currentFilm = films[currentIndex]
  if (!currentFilm || films.length === 0) {
    return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Chargement des films...</p>
        </div>
    );
  }
  return (
    <div className="relative">
      {/* Slide principal */}
      <Link href={`/films/${currentFilm.id}`} className="group block">
        <div className="featured-card overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative h-72 md:h-[380px] overflow-hidden">
              {currentFilm.image ? (
                <Image
                  src={currentFilm.image}
                  alt={currentFilm.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#A8D5BA] to-[#B8E6D0]">
                  <span className="text-8xl">🎬</span>
                </div>
              )}
              
              {/* Badge position */}
              <div className="absolute top-4 left-4 bg-[#D4A84B] text-white text-xs font-bold px-3 py-1 rounded-full">
                #{currentIndex + 1}
              </div>
              
              {/* Rating */}
              <div className="absolute top-4 right-4 rating-badge">
                <span className="text-[#D4A84B]">✦</span>
                <span>{currentFilm.rtScore}</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#2D5A27] mb-2 group-hover:text-[#4A7C34] transition-colors">
                {currentFilm.title}
              </h2>
              <p className="font-japanese text-base text-[#4A7C34] mb-4">
                {currentFilm.originalTitle}
              </p>
              <p className="text-[#2D5A27]/70 mb-5 line-clamp-3 text-sm leading-relaxed">
                {currentFilm.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="meta-tag">{currentFilm.releaseDate}</span>
                <span className="meta-tag">{currentFilm.director}</span>
                <span className="meta-tag">{currentFilm.runningTime} min</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Navigation flèches */}
      <button
        onClick={(e) => { e.preventDefault(); goToPrevious() }}
        className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-[#2D5A27] hover:text-[#4A7C34] transition-all z-10"
        aria-label="Film précédent"
      >
        ←
      </button>
      <button
        onClick={(e) => { e.preventDefault(); goToNext() }}
        className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-[#2D5A27] hover:text-[#4A7C34] transition-all z-10"
        aria-label="Film suivant"
      >
        →
      </button>

      {/* Indicateurs (points) */}
      <div className="flex justify-center gap-2 mt-6">
        {films.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-[#D4A84B] w-6' 
                : 'bg-[#2D5A27]/20 hover:bg-[#2D5A27]/40'
            }`}
            aria-label={`Aller au film ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
