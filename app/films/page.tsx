import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FilmsCollection from '@/components/FilmsCollection'

export const metadata: Metadata = {
  title: 'Filmographie',
  description:
      'Découvrez tous les films du Studio Ghibli : de Nausicaä à Le Garçon et le Héron. Filtrez par réalisateur, triez par note ou par date.',
  openGraph: {
    title: 'Filmographie — Miyazaki Garden',
    description: 'La collection complète des films du Studio Ghibli.',
  },
}

async function getFilms() {
  const films = await prisma.film.findMany({
    orderBy: { releaseDate: 'desc' },
    select: {
      id: true,
      title: true,
      originalTitle: true,
      description: true,
      director: true,
      releaseDate: true,
      runningTime: true,
      rtScore: true,
      image: true,
    },
  })
  return films
}

export default async function FilmsPage() {
  const films = await getFilms()

  return (
      <div className="min-h-screen bg-ghibli">
        <Header />

        <main id="main-content" className="relative z-10">
          <div className="px-4 py-12 max-w-6xl mx-auto">
            <FilmsCollection films={films} />
          </div>
        </main>

        <Footer />
      </div>
  )
}