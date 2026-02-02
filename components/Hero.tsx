interface HeroProps {
  filmCount: number
}

export default function Hero({ filmCount }: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-4 py-16 overflow-hidden bg-ghibli-gradient">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 Q35 15 30 25 Q25 15 30 5' fill='none' stroke='%234A9B8C' stroke-width='0.5' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Animated Icon */}
        <div className="text-6xl mb-6 animate-float">
          🌳
        </div>
        
        {/* Main Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[#1D3A2F] mb-2 tracking-tight">
          Miyazaki Garden
        </h1>
        
        {/* Japanese Subtitle */}
        <p className="font-japanese text-xl md:text-2xl text-[#4A9B8C] mb-6 tracking-wider">
          宮崎の庭
        </p>
        
        {/* Description */}
        <p className="font-body text-lg md:text-xl text-[#2C4A5E] max-w-xl mx-auto mb-8 leading-relaxed">
          Explorez l&apos;univers magique et poétique du Studio Ghibli
        </p>
        
        {/* Stats Badge */}
        <div 
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full animate-breathe"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(74, 155, 140, 0.2)',
          }}
        >
          <span className="text-[#D4A84B] text-xl">✨</span>
          <span className="font-body text-[#2D5A47]">
            <span className="text-2xl font-bold text-[#4A9B8C]">{filmCount}</span>
            {' '}films à découvrir
          </span>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8F6F0] to-transparent" />
    </section>
  )
}
