'use client'
import { useState, useEffect, useRef } from 'react'
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

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const response = await fetch('/api/films')
            const films: Film[] = await response.json()

            const directorsData = films.reduce((acc: Record<string, Director>, film: Film) => {
                const directorName = film.director || 'Unknown'
                if (!acc[directorName]) {
                    acc[directorName] = {
                        name: directorName,
                        japanese: getJapaneseName(directorName),
                        filmsCount: 0,
                        image: `/images/directors/${directorName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')}.jpg`,
                        bio: getDirectorBio(directorName),
                        films: []
                    }
                }
                acc[directorName].filmsCount++
                acc[directorName].films.push(film)
                return acc
            }, {})

            const sorted = Object.values(directorsData).sort((a, b) => b.filmsCount - a.filmsCount)
            setDirectors(sorted)
        } catch (error) {
            console.log('API indisponible')
            setDirectors([])
        }
    }

    function getJapaneseName(name: string): string {
        const map: Record<string, string> = {
            'Hayao Miyazaki': '宮崎駿',
            'Isao Takahata': '高畑勲',
            'Gorō Miyazaki': '宮崎吾朗',
            'Hiromasa Yonebayashi': '米林宏昌',
            'Hiroyuki Morita': '森田宏幸',
            'Yoshifumi Kondō': '近藤喜文',
            'Michael Dudok de Wit': 'マイケル・ドゥドック・デ・ウィット'
        }
        return map[name] || ''
    }

    function getDirectorBio(name: string): string {
        const bios: Record<string, string> = {
            'Hayao Miyazaki': "Le maître incontesté de l'animation japonaise. Cofondateur du Studio Ghibli en 1985, il a révolutionné l'animation avec des chefs-d'œuvre comme Le Voyage de Chihiro, Mon voisin Totoro et Princesse Mononoké. Poète de la nature et de l'enfance, ses films explorent les thèmes de l'écologie, du pacifisme et de la quête d'identité.",
            'Isao Takahata': "Cofondateur du Studio Ghibli et pionnier du réalisme dans l'animation. Ses récits poignants comme Le Tombeau des lucioles et Le Conte de la Princesse Kaguya explorent la mémoire, la guerre et la condition humaine avec une profondeur unique.",
            'Gorō Miyazaki': "Fils de Hayao Miyazaki, il perpétue l'héritage familial avec sa propre sensibilité. Architecte de formation, il apporte une vision unique aux Contes de Terremer et La Colline aux coquelicots.",
            'Hiromasa Yonebayashi': "Le plus jeune réalisateur de l'histoire du studio. Il signe Arrietty et Souvenirs de Marnie, des miniatures poétiques sur l'indépendance et les liens invisibles.",
            'Hiroyuki Morita': "Réalisateur du Royaume des Chats, il apporte une touche de légèreté et d'humour félin à l'univers Ghibli.",
            'Yoshifumi Kondō': "L'héritier tragique de Miyazaki, disparu trop tôt. Son unique film Si tu tends l'oreille reste un joyau d'émotion.",
            'Michael Dudok de Wit': "Réalisateur néerlandais de La Tortue rouge, il apporte une sensibilité européenne unique dans l'univers Ghibli."
        }
        return bios[name] || `Réalisateur talentueux du Studio Ghibli.`
    }

    return (
        <div className="min-h-screen bg-ghibli">
            <Header />

            <main className="relative z-10">
                <div className="px-4 py-12 max-w-6xl mx-auto space-y-12">

                    {/* ══════════════════════════════════════════
                        STUDIO GHIBLI + HISTOIRE (FUSIONNÉS)
                    ══════════════════════════════════════════ */}
                    <section className="section-glass p-8 md:p-12">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#D4A84B] to-[#C9975A] rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                                <span className="text-3xl">🎬</span>
                            </div>
                            <div className="text-center md:text-left">
                                <h1 className="font-script text-4xl md:text-5xl text-[#2D5A27] leading-tight">Studio Ghibli</h1>
                                <p className="font-japanese text-xl text-[#4A7C34]/80">スタジオジブリ</p>
                                <p className="text-[#2D5A27]/70 mt-2 max-w-xl">
                                    Fondé en 1985, un laboratoire d&apos;émotions où chaque frame respire la poésie japonaise.
                                </p>
                            </div>
                        </div>

                        {/* Timeline horizontale */}
                        <div className="relative">
                            {/* Ligne */}
                            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A7C34]/20 via-[#D4A84B] to-[#4A7C34]/20 rounded-full" />
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* 1985 */}
                                <div className="relative pt-10">
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#D4A84B] rounded-full border-4 border-[#FDFBF7] shadow" />
                                    <div className="bg-[#FDFBF5] p-5 rounded-xl shadow-md text-center">
                                        <p className="text-[#D4A84B] text-sm font-bold mb-1">1985</p>
                                        <h3 className="font-display text-lg font-bold text-[#2D5A27] mb-1">Fondation</h3>
                                        <p className="text-[#4A7C34]/70 text-sm">Après le succès de Nausicaä</p>
                                    </div>
                                </div>

                                {/* 2003 */}
                                <div className="relative pt-10">
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#D4A84B] rounded-full border-4 border-[#FDFBF7] shadow" />
                                    <div className="bg-[#FDFBF5] p-5 rounded-xl shadow-md text-center">
                                        <p className="text-[#D4A84B] text-sm font-bold mb-1">2003</p>
                                        <h3 className="font-display text-lg font-bold text-[#2D5A27] mb-1">Consécration</h3>
                                        <p className="text-[#4A7C34]/70 text-sm">Oscar pour Le Voyage de Chihiro</p>
                                    </div>
                                </div>

                                {/* 2023 */}
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

                    {/* ══════════════════════════════════════════
                        RÉALISATEURS
                    ══════════════════════════════════════════ */}
                    <section className="section-glass p-8 md:p-12">
                        <div className="text-center mb-10">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#4A7C34]/30" />
                                <span className="text-[#D4A84B] text-xl">✦</span>
                                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#4A7C34]/30" />
                            </div>
                            <h2 className="section-title">Les Réalisateurs</h2>
                            <p className="font-japanese text-[#4A7C34]/70">監督たち</p>
                            <p className="text-[#2D5A27]/60 mt-2 text-sm">Cliquez pour découvrir leur filmographie</p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {directors.map((director) => (
                                <TiltCard
                                    key={director.name}
                                    director={director}
                                    onClick={() => setSelectedDirector(director)}
                                />
                            ))}
                        </div>
                    </section>

                </div>
            </main>

            <Footer />

            {/* MODAL */}
            {selectedDirector && (
                <DirectorModal 
                    director={selectedDirector} 
                    onClose={() => setSelectedDirector(null)} 
                />
            )}
        </div>
    )
}

/* ══════════════════════════════════════════
   COMPOSANT: Card avec effet Tilt 3D
══════════════════════════════════════════ */
function TiltCard({ director, onClick }: { director: Director, onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null)

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 12
        const rotateY = (centerX - x) / 12

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    }

    function handleMouseLeave() {
        if (!cardRef.current) return
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    }

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-white/60 backdrop-blur-sm border border-white/50 transition-all duration-200 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#A8D5BA] to-[#B8E6D0]">
                <img 
                    src={director.image} 
                    alt={director.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-6xl opacity-20">🎬</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4" style={{ transform: 'translateZ(30px)' }}>
                    <h3 className="font-display text-xl font-bold text-white mb-0.5">{director.name}</h3>
                    <p className="font-japanese text-sm text-white/80">{director.japanese}</p>
                </div>

                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-[#2D5A27] shadow-md" style={{ transform: 'translateZ(40px)' }}>
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

/* ══════════════════════════════════════════
   COMPOSANT: Modal Réalisateur
══════════════════════════════════════════ */
function DirectorModal({ director, onClose }: { director: Director, onClose: () => void }) {
    useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleEscape)
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            <div 
                className="relative bg-[#FDFBF7] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden animate-modal-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative h-48 bg-gradient-to-br from-[#A8D5BA] to-[#B8E6D0]">
                    <img 
                        src={director.image} 
                        alt={director.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none'
                        }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-7xl opacity-20">🎬</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent" />
                    
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
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
                                        className="flex items-center justify-between p-3 bg-white/60 hover:bg-white rounded-xl transition-all group"
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
