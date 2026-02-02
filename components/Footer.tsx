import Link from 'next/link'

export default function Footer() {
  return (
      <footer className="footer-ghibli relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Logo & Description */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <span className="font-script text-3xl text-[#B8E6D0]">Miyazaki Garden</span>
            </Link>
            <p className="font-japanese text-sm text-[#6BB5A6] mt-1">宮崎の庭</p>
            <p className="text-white/60 mt-4 max-w-md mx-auto text-sm">
              Un voyage au cœur de l&apos;univers magique du Studio Ghibli et de Hayao Miyazaki
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
            <Link href="/films" className="text-white/70 hover:text-white transition-colors">
              Filmographie
            </Link>
            <Link href="/personnages" className="text-white/70 hover:text-white transition-colors">
              Personnages
            </Link>
            <Link href="/a-propos" className="text-white/70 hover:text-white transition-colors">
              À propos
            </Link>
            <Link href="/mentions-legales" className="text-white/70 hover:text-white transition-colors">
              Mentions légales
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#4A9B8C]/50" />
            <span className="text-[#7CB69A]">🌿</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#4A9B8C]/50" />
          </div>

          {/* Credits */}
          <div className="text-center text-sm text-white/50 space-y-2">
            <p>
              © {new Date().getFullYear()} Miyazaki Garden — Projet réalisé par{' '}
              <a
                  href="https://portfolio-kim-liart.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4A84B] hover:text-[#E8C97A] transition-colors"
              >
                Kim
              </a>
            </p>
            <p>Licence Pro Full Stack — UHA 4.0 Mulhouse</p>
            <p className="text-white/30 text-xs mt-4">
              Données fournies par l&apos;API Studio Ghibli • Images © Studio Ghibli
            </p>
          </div>
        </div>
      </footer>
  )
}