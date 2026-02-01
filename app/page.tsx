import FilmCard from '@/components/films/FilmCard'

interface Film {
  id: string
  ghibliId: string
  title: string
  originalTitle: string
  description: string
  director: string
  producer: string
  releaseDate: string
  runningTime: string
  rtScore: string
  image: string | null
}

async function getFilms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3003'}/api/films?limit=100`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch films')
  }

  return res.json()
}

export default async function Home() {
  const data = await getFilms()
  const films: Film[] = data.films

  return (
      <main className="min-h-screen bg-gradient-to-b from-amber-50 via-red-50 to-amber-100">
        {/* Header */}
        <header className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white shadow-xl">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold text-center mb-2">
              🎋 Miyazaki Garden
            </h1>
            <p className="text-center text-amber-100 text-lg">
              Découvrez la magie des films du Studio Ghibli
            </p>
          </div>
        </header>

        {/* Films Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Tous les films
            </h2>
            <p className="text-gray-600">
              {films.length} chef-d'œuvres d'animation japonaise
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {films.map((film) => (
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
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>© 2026 Miyazaki Garden - Projet réalisé par Kim</p>
            <p className="text-sm mt-2">
              Données fournies par l'API Studio Ghibli
            </p>
          </div>
        </footer>
      </main>
  )
}