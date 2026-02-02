import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PersonCard from '@/components/films/PersonCard'

interface Person {
  id: string
  name: string
  gender: string | null
  age: string | null
  eyeColor: string | null
  hairColor: string | null
}

interface Film {
  id: string
  title: string
  originalTitle: string
  description: string
  director: string
  producer: string
  releaseDate: string
  runningTime: string
  rtScore: string
  image: string | null
  people: Person[]
}

async function getFilm(id: string) {
  const film = await prisma.film.findUnique({
    where: { id },
    include: {
      people: {
        select: {
          id: true,
          name: true,
          gender: true,
          age: true,
          eyeColor: true,
          hairColor: true,
        },
      },
    },
  })

  if (!film) {
    throw new Error('Film not found')
  }

  return film
}

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const film = await getFilm(id)

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 bg-header-gradient overflow-hidden">
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 15 30 5' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
            }}
          />
          
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8 relative z-10">
            {/* Back Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#7DD4C3] hover:text-white transition-colors mb-4 text-sm"
            >
              <span>←</span>
              <span>Retour aux films</span>
            </Link>
            
            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {film.title}
            </h1>
            <p className="font-japanese text-lg md:text-xl text-[#7DD4C3]">
              {film.originalTitle}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Film Poster */}
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-ghibli-lg border-b-4 border-[#4A9B8C]">
                  {film.image ? (
                    <Image
                      src={film.image}
                      alt={film.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#A8D5BA] to-[#B8E6D0]">
                      <span className="text-9xl">🎬</span>
                    </div>
                  )}
                </div>

                {/* Score Card */}
                <div className="mt-6 bg-white rounded-xl p-6 shadow-ghibli border border-[#4A9B8C]/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[#2C4A5E] font-semibold">Note Rotten Tomatoes</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#D4A84B] text-xl">✦</span>
                      <span className="text-3xl font-bold text-[#2D5A47]">
                        {film.rtScore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Info Card */}
              <div className="bg-white rounded-xl p-6 shadow-ghibli border border-[#4A9B8C]/10">
                <h2 className="section-title mb-6">Informations</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-[#4A9B8C] mb-1">Réalisateur</p>
                    <p className="font-semibold text-[#1D3A2F]">{film.director}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#4A9B8C] mb-1">Producteur</p>
                    <p className="font-semibold text-[#1D3A2F]">{film.producer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#4A9B8C] mb-1">Année de sortie</p>
                    <p className="font-semibold text-[#1D3A2F]">{film.releaseDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#4A9B8C] mb-1">Durée</p>
                    <p className="font-semibold text-[#1D3A2F]">{film.runningTime} minutes</p>
                  </div>
                </div>
              </div>

              {/* Synopsis Card */}
              <div className="bg-white rounded-xl p-6 shadow-ghibli border border-[#4A9B8C]/10">
                <h2 className="section-title mb-4">Synopsis</h2>
                <p className="text-[#2C4A5E] leading-relaxed">{film.description}</p>
              </div>

              {/* Characters Card */}
              {film.people.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-ghibli border border-[#4A9B8C]/10">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="section-title">Personnages</h2>
                    <span className="meta-tag">{film.people.length}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {film.people.map((person) => (
                      <PersonCard
                        key={person.id}
                        name={person.name}
                        gender={person.gender}
                        age={person.age}
                        eyeColor={person.eyeColor}
                        hairColor={person.hairColor}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
