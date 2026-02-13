'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface FavoriteButtonProps {
    filmId: string
    size?: 'sm' | 'md' | 'lg'
}

export default function FavoriteButton({ filmId, size = 'md' }: FavoriteButtonProps) {
    const { data: session } = useSession()
    const router = useRouter()
    const [isFavorite, setIsFavorite] = useState(false)
    const [loading, setLoading] = useState(false)
    const [animating, setAnimating] = useState(false)

    useEffect(() => {
        if (session?.user) {
            checkFavorite()
        }
    }, [session, filmId])

    async function checkFavorite() {
        try {
            const res = await fetch(`/api/user/favorites/toggle?filmId=${filmId}`)
            const data = await res.json()
            setIsFavorite(data.isFavorite)
        } catch {
            // Silencieux
        }
    }

    async function toggleFavorite() {
        if (!session?.user) {
            router.push('/auth/signin')
            return
        }

        setLoading(true)
        setAnimating(true)

        try {
            const res = await fetch('/api/user/favorites/toggle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filmId }),
            })

            const data = await res.json()
            setIsFavorite(data.isFavorite)
        } catch {
            // Silencieux
        } finally {
            setLoading(false)
            setTimeout(() => setAnimating(false), 300)
        }
    }

    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-lg',
        lg: 'w-12 h-12 text-xl',
    }

    return (
        <button
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleFavorite()
            }}
            disabled={loading}
            className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-300 ${
                isFavorite
                    ? 'bg-red-50 border-2 border-red-200 hover:bg-red-100'
                    : 'bg-white/90 backdrop-blur-sm border-2 border-[#2D5A27]/10 hover:border-red-200 hover:bg-red-50'
            } ${animating ? 'scale-125' : 'scale-100'} shadow-md hover:shadow-lg disabled:opacity-50`}
            aria-pressed={isFavorite}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
            <span className={`transition-transform duration-300 ${animating ? 'scale-110' : ''}`}>
                {isFavorite ? '❤️' : '🤍'}
            </span>
        </button>
    )
}