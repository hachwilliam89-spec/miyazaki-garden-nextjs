import Image from 'next/image'
import Link from 'next/link'

interface FilmCardProps {
    id: string
    title: string
    originalTitle: string
    image: string | null
    director: string
    releaseDate: string
    rtScore: string
}

export default function FilmCard({
                                     id,
                                     title,
                                     originalTitle,
                                     image,
                                     director,
                                     releaseDate,
                                     rtScore,
                                 }: FilmCardProps) {
    return (
        <Link href={`/films/${id}`}>
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-2 border-amber-200">
                {/* Image */}
                <div className="relative h-96 bg-gradient-to-br from-amber-50 to-red-50">
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-amber-600">
                            <span className="text-6xl">🎬</span>
                        </div>
                    )}

                    {/* Score badge */}
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ⭐ {rtScore}
                    </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-red-700 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{originalTitle}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="line-clamp-1">{director}</span>
                        <span className="text-amber-700 font-semibold">{releaseDate}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}