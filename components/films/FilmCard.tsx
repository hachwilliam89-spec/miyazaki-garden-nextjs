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
      <Link href={`/films/${id}`} className="group block h-full">
        <article className="film-card h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-[2/3] overflow-hidden">
            {image ? (
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover film-card-image"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
            ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#A8D5BA] to-[#B8E6D0]">
                  <span className="text-5xl">🎬</span>
                </div>
            )}

            {/* Rating Badge */}
            <div className="absolute bottom-3 left-3 rating-badge">
              <span className="text-[#D4A84B]">✦</span>
              <span>{rtScore}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col">
            <h3 className="font-display text-base font-semibold text-[#1D3A2F] leading-snug mb-1 group-hover:text-[#4A9B8C] transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="font-japanese text-xs text-[#4A9B8C] mb-3 opacity-80">
              {originalTitle}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5">
              <span className="meta-tag text-xs">{releaseDate}</span>
              <span className="meta-tag text-xs">{director}</span>
            </div>
          </div>
        </article>
      </Link>
  )
}