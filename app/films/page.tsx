import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FilmsCollection from '@/components/FilmsCollection'

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
      
      <main className="relative z-10">
        <div className="px-4 py-12 max-w-6xl mx-auto">
          <FilmsCollection films={films} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
