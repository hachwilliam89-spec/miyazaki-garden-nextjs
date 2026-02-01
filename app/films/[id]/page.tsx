import Image from 'next/image'
import Link from 'next/link'
import PersonCard from '@/components/films/PersonCard'
import { prisma } from '@/lib/prisma'

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
        <main className="min-h-screen bg-gradient-to-b from-amber-50 via-red-50 to-amber-100">
            {/* Header avec retour */}
            <header className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white shadow-xl">
                <div className="container mx-auto px-4 py-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-amber-100 hover:text-white transition-colors mb-4"
                    >
                        ← Retour aux films
                    </Link>
                    <h1 className="text-4xl font-bold">{film.title}</h1>
                    <p className="text-amber-100 text-lg mt-2">{film.originalTitle}</p>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Colonne gauche : Image */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl border-4 border-amber-200">
                                {film.image ? (
                                    <Image
                                        src={film.image}
                                        alt={film.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gradient-to-br from-amber-100 to-red-100">
                                        <span className="text-9xl">🎬</span>
                                    </div>
                                )}
                            </div>

                            {/* Score */}
                            <div className="mt-6 bg-white rounded-lg p-6 shadow-lg border-2 border-amber-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 font-semibold">Note Rotten Tomatoes</span>
                                    <span className="text-3xl font-bold text-red-600">
                    ⭐ {film.rtScore}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Colonne droite : Infos */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Informations principales */}
                        <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-amber-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Informations
                            </h2>
                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                                <div>
                                    <p className="text-sm text-gray-500">Réalisateur</p>
                                    <p className="font-semibold">{film.director}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Producteur</p>
                                    <p className="font-semibold">{film.producer}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Année de sortie</p>
                                    <p className="font-semibold">{film.releaseDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Durée</p>
                                    <p className="font-semibold">{film.runningTime} minutes</p>
                                </div>
                            </div>
                        </div>

                        {/* Synopsis */}
                        <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-amber-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Synopsis</h2>
                            <p className="text-gray-700 leading-relaxed">{film.description}</p>
                        </div>

                        {/* Personnages */}
                        {film.people.length > 0 && (
                            <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-amber-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Personnages ({film.people.length})
                                </h2>
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
    )
}