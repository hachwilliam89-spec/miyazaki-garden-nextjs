'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Director {
    name: string
    japanese: string
    filmsCount: number
    image: string
    bio: string
    notableFilms: string[]
}
export default function AboutPage() {
    const [activeDirector, setActiveDirector] = useState(0)
    const [directors, setDirectors] = useState<Director[]>([])

    useEffect(() => {
        fetchGhibliData()
    }, [])

    async function fetchGhibliData() {
        try {
            const response = await fetch('https://ghibliapi.vercel.app/films')
            const films = await response.json()

            const directorsData = films.reduce((acc: any, film: any) => {
                const directorName = film.director || 'Unknown'
                if (!acc[directorName]) {
                    acc[directorName] = {
                        name: directorName,
                        japanese: getJapaneseName(directorName),
                        filmsCount: 0,
                        image: `/images/directors/${directorName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')}.jpg`,
                        bio: getDirectorBio(directorName),
                        notableFilms: []
                    }
                }
                acc[directorName].filmsCount++
                return acc
            }, {})

            setDirectors(Object.values(directorsData))
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
        return map[name] || name
    }


    function getDirectorBio(name: string): string {
        const bios: Record<string, string> = {
            'Hayao Miyazaki': "Le maître incontesté de l'animation japonaise. Poète de la nature et de l'enfance.",
            'Isao Takahata': "Pionnier du réalisme animé. Récits poignants sur la mémoire et la guerre.",
            'Gorō Miyazaki': "La nouvelle génération Miyazaki. Architecture et aventures oniriques.",
            'Hiromasa Yonebayashi': "Le prodige de 27 ans. Miniatures poétiques et révoltes intimes.",
            'Hiroyuki Morita': "Auteur des Chats errants. L'indépendance féline à l'écran.",
            'Yoshifumi Kondō': "L'héritier tragique de Miyazaki. Disparu trop tôt, génie méconnu.",
            'Michaël Dudok de Wit': "La tortue rouge. Silence occidental dans l'univers Ghibli."
        }
        return bios[name] || `Réalisateur de ${name}`
    }


    return (
        <div className="min-h-screen bg-ghibli relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A7C34]/10 via-transparent to-[#2D5A27]/10 animate-pulse" />
            </div>

            <HeaderWithBack />

            <main className="relative z-10 pt-32 pb-24">
                {/* HERO STUDIO GHIBLI */}
                <section className="section-glass py-20 px-4 max-w-6xl mx-auto mb-32">
                    <div className="text-center mb-20">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-3 mb-8 p-4 bg-[#FDFBF7] rounded-2xl shadow-xl">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#D4A84B] to-[#C9975A] rounded-2xl flex items-center justify-center shadow-2xl">
                                <span className="text-2xl">🎬</span>
                            </div>
                            <div>
                                <h1 className="font-script text-4xl md:text-5xl text-[#2D5A27] leading-tight">Studio Ghibli</h1>
                                <p className="font-japanese text-xl text-[#4A7C34]/80">スタジオジブリ</p>
                            </div>
                        </motion.div>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl md:text-2xl text-[#2D5A27]/80 max-w-3xl mx-auto leading-relaxed">
                            Fondé en 1985 par Miyazaki et Takahata, un laboratoire d'émotions où chaque frame respire la poésie japonaise.
                        </motion.p>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center justify-center gap-8 mb-16 flex-wrap">
                        <motion.div className="flex-1 min-w-[280px]" initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
                            <div className="h-1 bg-gradient-to-r from-[#4A7C34]/30 to-[#D4A84B] rounded-full mb-8" />
                            <p className="text-[#2D5A27]/60 text-sm text-center mb-4">1985</p>
                            <div className="bg-[#FDFBF5] border-2 border-[#D4A84B]/30 p-6 rounded-2xl text-center">
                                <h3 className="font-display text-xl font-bold text-[#2D5A27] mb-2">Naissance</h3>
                                <p className="text-[#4A7C34]/70">Après <strong>Naissance de Nippon</strong></p>
                            </div>
                        </motion.div>
                        <motion.div className="flex-1 min-w-[280px]" initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                            <div className="h-1 bg-gradient-to-r from-[#D4A84B] to-[#4A7C34]/30 rounded-full mb-8" />
                            <p className="text-[#2D5A27]/60 text-sm text-center mb-4">2023</p>
                            <div className="bg-[#FDFBF5] border-2 border-[#D4A84B]/50 p-6 rounded-2xl text-center shadow-xl">
                                <h3 className="font-display text-xl font-bold text-[#2D5A27] mb-2">Héritage</h3>
                                <p className="text-[#4A7C34]/90"><strong>35+ films</strong> dans l'histoire</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* CARDS DIRECTORS - DYNAMIQUES */}
                <section className="px-4 max-w-7xl mx-auto mb-32">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-4 mb-8">
                            <span className="w-2 h-12 bg-gradient-to-b from-[#D4A84B] to-[#C9975A]" />
                            <h2 className="section-title">Les Trois Génies</h2>
                            <span className="font-japanese text-lg">巨匠三人</span>
                        </div>
                        <p className="text-[#2D5A27]/70 max-w-2xl mx-auto">Les âmes derrière la magie Ghibli</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {directors.map((director, index) => (
                            <DirectorCard
                                key={director.name}
                                director={director}
                                index={index}
                                isActive={activeDirector === index}
                                onClick={() => setActiveDirector(index)}
                            />
                        ))}
                    </div>
                </section>
                {/* PHILOSOPHIE GHIBLI */}
                <section className="section-glass py-20 px-4 max-w-4xl mx-auto mb-24">
                    <div className="space-y-12">
                        {[
                            { title: "Nature Vivante", jp: "生きている自然", desc: "Chaque feuille, chaque goutte d'eau, chaque brin d'herbe possède une âme." },
                            { title: "Enfance Éternelle", jp: "永遠の子供時代", desc: "L'émerveillement de l'enfance face au monde, même adulte." },
                            { title: "Équilibre Fragile", jp: "儚いバランス", desc: "L'harmonie précaire entre technologie et nature, progrès et traditions." }
                        ].map((pillar, index) => (
                            <motion.div key={pillar.title} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} className="flex items-start gap-6 p-8 rounded-3xl bg-white/50 hover:bg-white/70 transition-all group">
                                <div className="w-2 h-12 bg-gradient-to-b from-[#D4A84B] to-[#C9975A] flex-shrink-0 mt-2" />
                                <div>
                                    <h3 className="font-display text-2xl font-bold text-[#2D5A27] mb-3 group-hover:text-[#4A7C34]">{pillar.title}</h3>
                                    <p className="font-japanese text-lg text-[#4A7C34] mb-4">{pillar.jp}</p>
                                    <p className="text-[#2D5A27]/80 leading-relaxed">{pillar.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            <FooterWithBack />
        </div>
    )
}
function DirectorCard({ director, index, isActive, onClick }: { director: Director, index: number, isActive: boolean, onClick: () => void }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useSpring(x, { stiffness: 10, damping: 15 })
    const rotateY = useSpring(y, { stiffness: 10, damping: 15 })

    return (
        <motion.div
            style={{ rotateX, rotateY, rotate: isActive ? '2deg' : '0deg' }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                x.set((e.clientX - rect.left - rect.width / 2) / 15)
                y.set(-(e.clientY - rect.top - rect.height / 2) / 15)
            }}
            onMouseLeave={() => { x.set(0); y.set(0) }}
            onClick={onClick}
            className="group relative cursor-pointer aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-2 border-white/40 hover:border-[#D4A84B]/50 hover:scale-[1.02]"
        >
            <div className="relative h-3/4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src={director.image} alt={director.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <motion.div className="absolute inset-0 flex flex-col justify-end p-8 text-white" initial={{ opacity: 0, y: 50 }} whileHover={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <div className="bg-black/40 backdrop-blur-sm p-4 rounded-t-2xl">
                        <h3 className="font-display text-2xl font-bold mb-1">{director.name}</h3>
                        <p className="font-japanese text-xl opacity-90">{director.japanese}</p>
                        <p className="text-sm mt-2 opacity-75">{director.filmsCount} films</p>
                    </div>
                </motion.div>
            </div>
            <div className="p-6 h-1/4 flex items-center">
                <p className="text-[#2D5A27]/80 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none">{director.bio}</p>
            </div>
            {isActive && (
                <motion.div layoutId="active-badge" className="absolute -top-4 -right-4 w-20 h-20 bg-[#D4A84B] rounded-3xl flex items-center justify-center shadow-2xl">
                    <span className="text-2xl font-bold text-white drop-shadow-lg">✦</span>
                </motion.div>
            )}
        </motion.div>
    )
}

function HeaderWithBack() {
    return (
        <header className="section-glass sticky top-0 z-50 px-6 py-6 backdrop-blur-xl">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link href="/" className="font-script text-2xl text-[#2D5A27] hover:text-[#4A7C34]">← Retour au Jardin</Link>
                <Link href="/films" className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A7C34] text-white rounded-full font-semibold hover:bg-[#3D6A2A] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Explorer les films ✨
                </Link>
            </div>
        </header>
    )
}

function FooterWithBack() {
    return (
        <footer className="mt-24 relative z-10">
            <div className="h-16">
                <svg viewBox="0 0 1440 50" fill="none" className="w-full h-full">
                    <path d="M0,50 C360,15 720,15 1080,35 C1260,45 1380,50 1440,50 L1440,50 L0,50 Z" fill="rgba(74, 124, 52, 0.4)"/>
                </svg>
            </div>
            <div className="bg-[#4A7C34]/40 backdrop-blur-sm py-12">
                <div className="max-w-6xl mx-auto px-6 text-center text-white/80">
                    <p className="text-lg mb-4">Merci d'avoir visité <span className="font-script text-2xl">Miyazaki Garden</span></p>
                    <p className="text-sm">Un hommage poétique au Studio Ghibli • Made with ❤️ à Mulhouse</p>
                </div>
            </div>
        </footer>
    )
}
