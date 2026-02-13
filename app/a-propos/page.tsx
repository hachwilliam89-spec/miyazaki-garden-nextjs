'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface Film {
    id: string
    title: string
    releaseDate: string
    director: string
}

interface Director {
    name: string
    japanese: string
    filmsCount: number
    image: string
    bio: string
    films: Film[]
}

export default function AboutPage() {
    const [directors, setDirectors] = useState<Director[]>([])
    const [selectedDirector, setSelectedDirector] = useState<Director | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            setLoading(true)
            const response = await fetch('/api/directors')
            const directorsData: Director[] = await response.json()
            setDirectors(directorsData)
        } catch (error) {
            console.log('API directors indisponible')
            setDirectors([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-ghibli">
            <Header />

            <main id="main-content" className="relative z-10">
                <div className="px-4 py-12 max-w-6xl mx-auto space-y-12">

                    {/* Section Studio Ghibli + Histoire */}
                    <section className="section-glass p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                            <div className="text-center md:text-left">
                                <h1 className="font-script text-4xl md:text-5xl text-[#2D5A27] leading-tight">Studio Ghibli</h1>
                                <p className="font-japanese text-xl text-[#4A7C34]/80">スタジオジブリ</p>
                                <p className="text-[#2D5A27]/70 mt-2 max-w-xl">
                                    Fondé en 1985, un laboratoire d'émotions où chaque frame respire la poésie japonaise.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A7C34]/20 via-[#D4A84B] to-[#4A7C34]/20 rounded-full" />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative pt-10">
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#D4A84B] rounded-full border-4 border-[#FDFBF7] shadow" />
                                    <div className="bg-[#FDFBF5] p-5 rounded-xl shadow-md text-center">
                                        <p className="text-[#D4A84B] text-sm font-bold mb-1">1985</p>
                                        <h3 className="font-display text-lg font-bold text-[#2D5A27] mb-1">Fondation</h3>
                                        <p className="text-[#4A7C34]/70 text-sm">Après le succès de Nausicaä</p>
                                    </div>
                                </div>
                                <div className="relative pt-10">
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#D4A84B] rounded-full border-4 border-[#FDFBF7] shadow" />
                                    <div className="bg-[#FDFBF5] p-5 rounded-xl shadow-md text-center">
                                        <p className="text-[#D4A84B] text-sm font-bold mb-1">2003</p>
                                        <h3 className="font-display text-lg font-bold text-[#2D5A27] mb-1">Consécration</h3>
                                        <p className="text-[#4A7C34]/70 text-sm">Oscar pour Le Voyage de Chihiro</p>
                                    </div>
                                </div>
                                <div className="relative pt-10">
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#4A7C34] rounded-full border-4 border-[#FDFBF7] shadow" />
                                    <div className="bg-[#FDFBF5] p-5 rounded-xl shadow-md text-center">
                                        <p className="text-[#4A7C34] text-sm font-bold mb-1">2023</p>
                                        <h3 className="font-display text-lg font-bold text-[#2D5A27] mb-1">Héritage</h3>
                                        <p className="text-[#4A7C34]/70 text-sm">Le Garçon et le Héron</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section Réalisateurs */}
                    <section className="section-glass p-8 md:p-12">
                        <div className="text-center mb-10">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#4A7C34]/30" />
                                <span className="text-[#D4A84B] text-xl">✦</span>
                                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#4A7C34]/30" />
                            </div>
                            <h2 className="section-title">Les Réalisateurs</h2>
                            <p className="font-japanese text-[#4A7C34]/70">監督たち</p>
                            <p className="text-[#2D5A27]/60 mt-2 text-sm">
                                {loading ? 'Chargement...' : 'Cliquez pour découvrir leur filmographie'}
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-12">
                                <div className="w-12 h-12 border-4 border-[#A8D5BA] border-t-[#4A7C34] rounded-full animate-spin"></div>
                            </div>
                        ) : directors.length === 0 ? (
                            <p className="text-center text-[#2D5A27]/50 py-12">Aucun réalisateur trouvé</p>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {directors.map((director) => (
                                    <DirectorCard
                                        key={director.name}
                                        director={director}
                                        onClick={() => setSelectedDirector(director)}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <Footer />

            {/* Modal */}
            {selectedDirector && (
                <DirectorModal
                    director={selectedDirector}
                    onClose={() => setSelectedDirector(null)}
                />
            )}
        </div>
    )
}
function DirectorCard({ director, onClick }: { director: Director, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-white/60 backdrop-blur-sm border border-white/50 hover:scale-105 hover:shadow-2xl hover:rotate-1 transition-all duration-300"
        >
            <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#A8D5BA] to-[#B8E6D0] group-hover:brightness-110">
                {/* UNIQUEMENT l'image */}
                <img
                    src={director.image}
                    alt={director.name}
                    loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-xl font-bold text-white mb-0.5">{director.name}</h3>
                    <p className="font-japanese text-sm text-white/80">{director.japanese}</p>
                </div>

                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-[#2D5A27] shadow-md">
                    {director.filmsCount} {director.filmsCount > 1 ? 'films' : 'film'}
                </div>
            </div>

            <div className="p-4">
                <p className="text-[#2D5A27]/70 text-sm leading-relaxed line-clamp-2">{director.bio}</p>
                <p className="text-[#4A7C34] text-xs mt-2 font-medium group-hover:underline">Voir la filmographie →</p>
            </div>
        </div>
    )
}



// Modal réalisatrice
function DirectorModal({ director, onClose }: { director: Director, onClose: () => void }) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

            <div
                role="dialog" aria-modal="true" className="relative bg-[#FDFBF7] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative h-48 bg-gradient-to-br from-[#A8D5BA] to-[#B8E6D0]">
                    {/* UNIQUEMENT l'image */}
                    <img
                        src={director.image}
                        alt={director.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                    >
                        ✕
                    </button>
                </div>



                <div className="px-6 pb-6 -mt-12 relative">
                    <div className="mb-4">
                        <h2 className="font-display text-3xl font-bold text-[#2D5A27]">{director.name}</h2>
                        <p className="font-japanese text-lg text-[#4A7C34]">{director.japanese}</p>
                    </div>

                    <p className="text-[#2D5A27]/80 leading-relaxed mb-6">{director.bio}</p>

                    <div>
                        <h3 className="font-display text-lg font-semibold text-[#2D5A27] mb-3 flex items-center gap-2">
                            <span className="text-[#D4A84B]">✦</span>
                            Filmographie ({director.films.length})
                        </h3>
                        <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
                            {director.films
                                .sort((a, b) => parseInt(b.releaseDate) - parseInt(a.releaseDate))
                                .map((film) => (
                                    <Link
                                        key={film.id}
                                        href={`/films/${film.id}`}
                                        className="flex items-center justify-between p-3 bg-white/60 hover:bg-white rounded-xl transition-all group hover:shadow-md"
                                        onClick={onClose}
                                    >
                                        <span className="text-[#2D5A27] font-medium group-hover:text-[#4A7C34]">{film.title}</span>
                                        <span className="text-[#4A7C34]/60 text-sm">{film.releaseDate}</span>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
