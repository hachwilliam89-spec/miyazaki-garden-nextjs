import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative z-10">
      {/* Wave SVG */}
      <div className="h-12">
        <svg viewBox="0 0 1440 50" fill="none" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,50 C360,15 720,15 1080,35 C1260,45 1380,50 1440,50 L1440,50 L0,50 Z" fill="rgba(74, 124, 52, 0.6)"/>
        </svg>
      </div>
      
      {/* Footer Content */}
      <div className="bg-[#4A7C34]/60 backdrop-blur-sm px-6 py-6">
        <div className="max-w-6xl mx-auto">
          {/* 3 Columns */}
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-flex items-center gap-2 mb-1">
                <span className="text-lg">🌿</span>
                <span className="font-script text-lg text-white/90">Miyazaki Garden</span>
              </Link>
              <p className="text-white/40 text-xs leading-relaxed">
                L&apos;univers poétique du Studio Ghibli
              </p>
            </div>
            
            {/* Navigation */}
            <div className="md:text-center">
              <div className="flex flex-wrap md:justify-center gap-4">
                <Link href="/films" className="text-white/50 hover:text-white/80 text-sm transition-colors">Filmographie</Link>
                <Link href="/a-propos" className="text-white/50 hover:text-white/80 text-sm transition-colors">À propos</Link>
              </div>
            </div>
            
            {/* Credits */}
            <div className="md:text-right">
              <p className="text-white/40 text-xs">
                <a href="https://portfolio-kim-liart.vercel.app" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white/80 transition-colors">
                  Kim
                </a>
                {' '}• UHA 4.0
              </p>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-white/25 text-xs">© {new Date().getFullYear()} Miyazaki Garden</p>
            <p className="text-white/25 text-xs">Images © Studio Ghibli</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
