interface PersonCardProps {
  name: string
  gender: string | null
  age: string | null
  eyeColor: string | null
  hairColor: string | null
}

export default function PersonCard({
  name,
  gender,
  age,
  eyeColor,
  hairColor,
}: PersonCardProps) {
  // Emoji basé sur le genre
  const getEmoji = () => {
    if (!gender) return '👤'
    const g = gender.toLowerCase()
    if (g === 'female' || g === 'f') return '👩'
    if (g === 'male' || g === 'm') return '👨'
    return '👤'
  }

  return (
    <div className="flex items-start gap-4 p-4 bg-[#F8F6F0] rounded-lg border border-[#4A9B8C]/10 hover:border-[#4A9B8C]/30 transition-colors">
      {/* Avatar */}
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#A8D5BA] to-[#B8E6D0] flex items-center justify-center text-2xl">
        {getEmoji()}
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#1D3A2F] truncate">{name}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {age && age !== 'NA' && age !== 'Unknown' && (
            <span className="meta-tag text-xs">
              {age} ans
            </span>
          )}
          {eyeColor && eyeColor !== 'NA' && eyeColor !== 'Unknown' && (
            <span className="meta-tag text-xs">
              👁️ {eyeColor}
            </span>
          )}
          {hairColor && hairColor !== 'NA' && hairColor !== 'Unknown' && (
            <span className="meta-tag text-xs">
              💇 {hairColor}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
