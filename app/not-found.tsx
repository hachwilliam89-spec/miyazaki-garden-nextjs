import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-ghibli">
            <Header />

            <main className="relative z-10">
                <div className="flex items-center justify-center px-4 py-16 min-h-[70vh]">
                    <div className="section-glass p-10 md:p-16 max-w-lg w-full text-center">


                        {/* 404 */}
                        <h1 className="font-display text-7xl font-bold text-[#2D5A27]/20 mb-2">
                            404
                        </h1>

                        <h2 className="font-display text-2xl font-bold text-[#2D5A27] mb-2">
                            Perdu dans la forêt
                        </h2>

                        <p className="font-japanese text-sm text-[#4A7C34]/70 mb-4">
                            迷子の森で
                        </p>

                        <p className="text-[#2D5A27]/60 mb-8 leading-relaxed">
                            Cette page semble avoir disparu, emportée par le vent comme
                            les suies du château ambulant...
                        </p>

                        {/* Séparateur */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#4A7C34]/20" />
                            <span className="text-[#D4A84B] text-xs">✦</span>
                            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#4A7C34]/20" />
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#4A7C34] text-white rounded-full font-medium hover:bg-[#3D6A2A] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                ← Retour au jardin
                            </Link>
                            <Link
                                href="/films"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#2D5A27]/20 text-[#2D5A27] rounded-full font-medium hover:bg-[#2D5A27]/5 transition-all"
                            >
                                Explorer les films
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}