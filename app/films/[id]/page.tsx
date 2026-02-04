import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface Person {
  id: string
  name: string
  gender: string | null
  age: string | null
  eyeColor: string | null
  hairColor: string | null
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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 relative">
        {/* ══════════════════════════════════════════
            FOND : Poster flouté
        ══════════════════════════════════════════ */}
        <div className="fixed inset-0 -z-10">
          {film.image && (
            <Image
              src={film.image}
              alt=""
              fill
              className="object-cover blur-2xl scale-125 opacity-60"
              priority
            />
          )}
          {/* Overlay gradient pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/30" />
        </div>

        {/* ══════════════════════════════════════════
            CONTENU
        ══════════════════════════════════════════ */}
        <div className="relative z-10 px-4 py-8 max-w-5xl mx-auto">
          
          {/* Retour */}
          <Link
              href="/films"
              className="inline-flex items-center gap-2 text-[#2D5A27]/70 hover:text-[#2D5A27] transition-colors mb-8 text-sm group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Retour à la collection</span>
          </Link>

          {/* ══════════════════════════════════════════
              SECTION MUSÉALE : Poster + Cartel
          ══════════════════════════════════════════ */}
          <section className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 mb-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              
              {/* POSTER (Tableau encadré) */}
              <div className="w-full md:w-2/5 flex-shrink-0">
                <div className="relative group">
                  {/* Ombre portée "accroché au mur" */}
                  <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/20 blur-xl rounded-full" />
                  
                  {/* Cadre doré */}
                  <div className="relative bg-gradient-to-br from-[#D4A84B] via-[#C9975A] to-[#D4A84B] p-2 rounded-lg shadow-2xl">
                    <div className="relative aspect-[2/3] rounded overflow-hidden">
                      {film.image ? (
                        <Image
                          src={film.image}
                          alt={film.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
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
              </div>

              {/* CARTEL (Panneau d'information) */}
              <div className="flex-1">
                {/* Cartel principal */}
                <div className="bg-[#FDFBF5] border-l-4 border-[#D4A84B] p-6 rounded-r-lg shadow-md mb-6">
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-[#2D5A27] mb-2">
                    {film.title}
                  </h1>
                  <p className="font-japanese text-xl text-[#4A7C34] mb-4">
                    {film.originalTitle}
                  </p>
                  
                  {/* Ligne d'infos style musée */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[#2D5A27]/70">
                    <span className="flex items-center gap-1.5 bg-[#2D5A27]/10 px-3 py-1 rounded-full">
                      <span className="text-[#D4A84B]">✦</span>
                      <span className="font-semibold">{film.rtScore}/100</span>
                    </span>
                    <span className="bg-[#2D5A27]/10 px-3 py-1 rounded-full">{film.releaseDate}</span>
                    <span className="bg-[#2D5A27]/10 px-3 py-1 rounded-full">{film.runningTime} min</span>
                  </div>
                </div>

                {/* Infos techniques */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/60 backdrop-blur p-4 rounded-lg border border-[#2D5A27]/10">
                    <p className="text-xs uppercase tracking-wider text-[#4A7C34]/60 mb-1">Réalisateur</p>
                    <p className="font-semibold text-[#2D5A27]">{film.director}</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur p-4 rounded-lg border border-[#2D5A27]/10">
                    <p className="text-xs uppercase tracking-wider text-[#4A7C34]/60 mb-1">Producteur</p>
                    <p className="font-semibold text-[#2D5A27]">{film.producer}</p>
                  </div>
                </div>

                {/* Note muséale */}
                <p className="text-xs text-[#2D5A27]/50 italic">
                  Collection Studio Ghibli • Œuvre d&apos;animation japonaise
                </p>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════
              À PROPOS DE L'ŒUVRE (Synopsis)
          ══════════════════════════════════════════ */}
          <section className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-[#D4A84B] rounded-full" />
              <h2 className="font-display text-2xl font-semibold text-[#2D5A27]">
                À propos de l&apos;œuvre
              </h2>
            </div>
            <p className="text-[#2D5A27]/80 leading-relaxed text-lg max-w-3xl">
              {film.description}
            </p>
          </section>

          {/* ══════════════════════════════════════════
              GALERIE DE PORTRAITS (Personnages)
          ══════════════════════════════════════════ */}
          {film.people.length > 0 && (
            <section className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-[#D4A84B] rounded-full" />
                <h2 className="font-display text-2xl font-semibold text-[#2D5A27]">
                  Galerie de portraits
                </h2>
                <span className="bg-[#2D5A27]/10 text-[#2D5A27] text-sm px-3 py-1 rounded-full">
                  {film.people.length} personnages
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {film.people.map((person) => (
                  <div 
                    key={person.id}
                    className="group text-center"
                  >
                    {/* Médaillon portrait */}
                    <div className="relative mx-auto w-20 h-20 mb-3">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4A84B] via-[#C9975A] to-[#D4A84B] rounded-full p-0.5">
                        <div className="w-full h-full bg-gradient-to-br from-[#A8D5BA] to-[#7CB69A] rounded-full flex items-center justify-center">
                          <span className="text-2xl">
                            {person.gender === 'Female' ? '👩' : person.gender === 'Male' ? '👨' : '🧑'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Nom */}
                    <h3 className="font-semibold text-[#2D5A27] text-sm mb-1 group-hover:text-[#4A7C34] transition-colors">
                      {person.name}
                    </h3>
                    
                    {/* Détails */}
                    <div className="text-xs text-[#2D5A27]/50 space-y-0.5">
                      {person.age && <p>{person.age}</p>}
                      {person.eyeColor && <p>Yeux {person.eyeColor}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
