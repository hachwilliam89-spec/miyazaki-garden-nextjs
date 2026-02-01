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
    return (
        <div className="bg-white rounded-lg p-4 shadow-md border-2 border-amber-100 hover:border-red-300 transition-colors">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-amber-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {name.charAt(0)}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{name}</h3>
                    {gender && (
                        <p className="text-sm text-gray-600">
                            {gender === 'Male' ? '👨' : gender === 'Female' ? '👩' : '⚪'} {gender}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
                {age && (
                    <p>
                        <span className="font-semibold">Âge:</span> {age}
                    </p>
                )}
                {eyeColor && (
                    <p>
                        <span className="font-semibold">Yeux:</span> {eyeColor}
                    </p>
                )}
                {hairColor && (
                    <p>
                        <span className="font-semibold">Cheveux:</span> {hairColor}
                    </p>
                )}
            </div>
        </div>
    )
}