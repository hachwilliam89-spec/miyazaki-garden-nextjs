import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import TopFilmsCarousel from '@/components/TopFilmsCarousel'

async function getFilms() {
  const films = await prisma.film.findMany({
    take: 100,
    orderBy: { releaseDate: 'desc' },
    select: {
      id: true,
      ghibliId: true,
      title: true,
      originalTitle: true,
      description: true,
      director: true,
      producer: true,
      releaseDate: true,
      runningTime: true,
      rtScore: true,
      image: true,
    },
  })
  return films
}

export default async function Home() {
  const films = await getFilms()
  
  // Top 5 films (meilleures notes)
  const topFilms = [...films]
    .sort((a, b) => parseInt(b.rtScore) - parseInt(a.rtScore))
    .slice(0, 5)
  
  // Tous les films pour le bandeau
  const allFilms = films

  return (
    <div className="min-h-screen bg-ghibli">
      <Header />
      
      <main className="relative z-10">
        <div className="px-4 py-12 max-w-6xl mx-auto space-y-12">
          
          {/* ══════════════════════════════════════════
              HERO + CARROUSEL TOP FILMS
          ══════════════════════════════════════════ */}
          <section className="section-glass p-8 md:p-10">
            {/* Titre du site */}
            <div className="text-center mb-8">
              <h1 className="font-script text-4xl md:text-5xl text-[#2D5A27] mb-1">
                Miyazaki Garden
              </h1>
              <p className="font-japanese text-lg text-[#4A7C34]/80">
                宮崎の庭
              </p>
              <p className="text-[#2D5A27]/60 mt-2 text-sm">
                Un voyage au cœur de l&apos;univers du Studio Ghibli
              </p>
            </div>

            {/* Séparateur Top Films */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#4A7C34]/30" />
              <span className="text-[#D4A84B] text-sm font-medium">✦ Top Films ✦</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#4A7C34]/30" />
            </div>

            {/* Carrousel */}
            <TopFilmsCarousel films={topFilms} />
          </section>

          {/* ══════════════════════════════════════════
    BANDEAU DÉFILANT + REFLET FLOUTÉ
══════════════════════════════════════════ */}
          <section className="section-glass overflow-hidden">
            <div className="p-8 pb-0">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#4A7C34]/30" />
                  <span className="text-[#4A7C34] text-xl">🌿</span>
                  <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#4A7C34]/30" />
                </div>
                <h2 className="section-title">La Collection</h2>
                <p className="section-title-jp">コレクション</p>
              </div>
            </div>

            {/* Container bandeau - PLEINE LARGEUR */}
            <div className="relative py-6 group/bandeau">
              {/* Bandeau principal */}
              <div className="flex animate-scroll">
                {[...allFilms, ...allFilms].map((film, index) => (
                    <div
                        key={`${film.id}-${index}`}
                        className="flex-shrink-0 w-32 h-44 mx-2 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      {film.image && (
                          <Image
                              src={film.image}
                              alt={film.title}
                              width={128}
                              height={176}
                              className="w-full h-full object-cover"
                          />
                      )}
                    </div>
                ))}
              </div>

              {/* Reflet flouté */}
              <div className="flex animate-scroll mt-1 opacity-30 blur-sm scale-y-[-1] h-12 overflow-hidden">
                {[...allFilms, ...allFilms].map((film, index) => (
                    <div
                        key={`reflection-${film.id}-${index}`}
                        className="flex-shrink-0 w-32 h-44 mx-2"
                    >
                      {film.image && (
                          <Image
                              src={film.image}
                              alt=""
                              width={128}
                              height={176}
                              className="w-full h-full object-cover object-top"
                          />
                      )}
                    </div>
                ))}
              </div>

              {/* Gradient fade sur les côtés - PLEINE HAUTEUR */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FAF8F3] to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FAF8F3] to-transparent pointer-events-none z-10" />
            </div>

            {/* Texte + Bouton */}
            <div className="text-center p-8 pt-4">
              <p className="text-[#2D5A27]/70 mb-4">
                <span className="font-semibold text-[#2D5A27]">{allFilms.length} chefs-d&apos;œuvre</span> à découvrir
                <span className="mx-2 text-[#4A7C34]/40">•</span>
                <span className="text-sm">1984 — 2023</span>
              </p>
              <Link
                  href="/films"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#4A7C34] text-white rounded-full font-semibold hover:bg-[#3D6A2A] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Explorer la collection →
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
