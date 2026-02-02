import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import FilmCard from '@/components/films/FilmCard'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

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

  // Film à la une (meilleure note)
  const featuredFilm = films.reduce((best, film) =>
      parseInt(film.rtScore) > parseInt(best.rtScore) ? film : best
  )

  // 8 autres films
  const otherFilms = films.filter(f => f.id !== featuredFilm.id).slice(0, 8)

  return (
      <div className="min-h-screen bg-ghibli-landscape">
        <Header />

        <main className="relative z-10">
          {/* Hero Title */}
          <section className="text-center py-16 px-4">
            <h1 className="font-script text-5xl md:text-6xl text-white drop-shadow-lg mb-2">
              Miyazaki Garden
            </h1>
            <p className="font-japanese text-xl text-white/90 drop-shadow">
              宮崎の庭
            </p>
            <p className="text-white/80 mt-4 max-w-md mx-auto">
              Un voyage au cœur de l&apos;univers du Studio Ghibli
            </p>
          </section>

          {/* Contenu principal */}
          <div className="px-4 pb-16 max-w-6xl mx-auto space-y-12">

            {/* À la une */}
            <section className="section-glass p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#4A9B8C]" />
                  <span className="text-[#D4A84B] text-xl">✦</span>
                  <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#4A9B8C]" />
                </div>
                <h2 className="section-title">À la une</h2>
                <p className="section-title-jp">おすすめ</p>
              </div>

              <Link href={`/films/${featuredFilm.id}`} className="group block">
                <div className="featured-card">
                  <div className="grid md:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-64 md:h-[350px] overflow-hidden">
                      {featuredFilm.image ? (
                          <Image
                              src={featuredFilm.image}
                              alt={featuredFilm.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              priority
                          />
                      ) : (
                          <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#A8D5BA] to-[#B8E6D0]">
                            <span className="text-8xl">🎬</span>
                          </div>
                      )}
                      <div className="absolute top-4 left-4 rating-badge">
                        <span className="text-[#D4A84B]">✦</span>
                        <span>{featuredFilm.rtScore}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-[#1D3A2F] mb-2 group-hover:text-[#4A9B8C] transition-colors">
                        {featuredFilm.title}
                      </h3>
                      <p className="font-japanese text-lg text-[#4A9B8C] mb-4">
                        {featuredFilm.originalTitle}
                      </p>
                      <p className="text-[#2C4A5E] mb-6 line-clamp-3">
                        {featuredFilm.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="meta-tag">{featuredFilm.releaseDate}</span>
                        <span className="meta-tag">{featuredFilm.director}</span>
                        <span className="meta-tag">{featuredFilm.runningTime} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </section>

            {/* Découvrir */}
            <section className="section-glass p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#4A9B8C]" />
                  <span className="text-[#7CB69A] text-xl">🌿</span>
                  <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#4A9B8C]" />
                </div>
                <h2 className="section-title">Découvrir</h2>
                <p className="section-title-jp">もっと見る</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animation">
                {otherFilms.map((film) => (
                    <FilmCard
                        key={film.id}
                        id={film.id}
                        title={film.title}
                        originalTitle={film.originalTitle}
                        image={film.image}
                        director={film.director}
                        releaseDate={film.releaseDate}
                        rtScore={film.rtScore}
                    />
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                    href="/films"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#4A9B8C] text-white rounded-full font-semibold hover:bg-[#3D7A5F] transition-all duration-300 shadow-ghibli hover:shadow-ghibli-lg hover:-translate-y-1"
                >
                  Voir tous les films →
                </Link>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>
  )
}