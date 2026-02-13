'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Review {
    id: string
    rating: number
    comment: string | null
    createdAt: string
    updatedAt: string
    user: {
        id: string
        name: string | null
        image: string | null
    }
}

interface ReviewSectionProps {
    filmId: string
}

export default function ReviewSection({ filmId }: ReviewSectionProps) {
    const { data: session } = useSession()
    const router = useRouter()

    const [reviews, setReviews] = useState<Review[]>([])
    const [average, setAverage] = useState<number | null>(null)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)

    // Formulaire
    const [showForm, setShowForm] = useState(false)
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [comment, setComment] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [editingReview, setEditingReview] = useState<Review | null>(null)

    // Modale suppression
    const [deleteModal, setDeleteModal] = useState<string | null>(null)
    const [deleteLoading, setDeleteLoading] = useState(false)

    useEffect(() => {
        fetchReviews()
    }, [filmId])

    async function fetchReviews() {
        try {
            const res = await fetch(`/api/reviews?filmId=${filmId}`)
            if (res.ok) {
                const data = await res.json()
                setReviews(data.reviews)
                setAverage(data.average)
                setCount(data.count)
            }
        } catch {
            console.log('Reviews non disponibles')
        } finally {
            setLoading(false)
        }
    }

    const userReview = reviews.find(r => r.user.id === session?.user?.id)

    function handleEdit(review: Review) {
        setEditingReview(review)
        setRating(review.rating)
        setComment(review.comment || '')
        setShowForm(true)
    }

    function handleNewReview() {
        if (!session?.user) {
            router.push('/auth/signin')
            return
        }
        setEditingReview(null)
        setRating(0)
        setComment('')
        setShowForm(true)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (rating === 0) return

        setSubmitting(true)
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filmId, rating, comment }),
            })

            if (res.ok) {
                setShowForm(false)
                setRating(0)
                setComment('')
                setEditingReview(null)
                await fetchReviews()
            }
        } catch {
            // Silencieux
        } finally {
            setSubmitting(false)
        }
    }

    async function handleDelete() {
        if (!deleteModal) return

        setDeleteLoading(true)
        try {
            const res = await fetch(`/api/reviews?reviewId=${deleteModal}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                setDeleteModal(null)
                await fetchReviews()
            }
        } catch {
            // Silencieux
        } finally {
            setDeleteLoading(false)
        }
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    }

    return (
        <section className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-[#D4A84B] rounded-full" />
                    <h2 className="font-display text-2xl font-semibold text-[#2D5A27]">
                        Avis des spectateurs
                    </h2>
                    {count > 0 && (
                        <span className="bg-[#2D5A27]/10 text-[#2D5A27] text-sm px-3 py-1 rounded-full">
                            {count} avis
                        </span>
                    )}
                </div>

                {average !== null && (
                    <div className="flex items-center gap-2 bg-[#FDFBF5] px-4 py-2 rounded-xl border border-[#D4A84B]/30">
                        <div className="flex gap-0.5">
                            {[...Array(10)].map((_, i) => (
                                <span
                                    key={i}
                                    className={`text-sm ${i < Math.round(average) ? 'text-[#D4A84B]' : 'text-[#2D5A27]/15'}`}
                                    aria-hidden="true"
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="font-bold text-[#2D5A27]">{average}</span>
                        <span className="text-[#2D5A27]/50 text-sm">/10</span>
                    </div>
                )}
            </div>

            {/* Bouton ajouter un avis */}
            {!showForm && !userReview && (
                <button
                    onClick={handleNewReview}
                    className="w-full py-4 border-2 border-dashed border-[#4A7C34]/30 rounded-2xl text-[#4A7C34] hover:border-[#4A7C34] hover:bg-[#4A7C34]/5 transition-all mb-8"
                >
                    {session?.user ? '✦ Donner mon avis' : '✦ Se connecter pour donner un avis'}
                </button>
            )}

            {/* Formulaire */}
            {showForm && (
                <div className="bg-[#FDFBF5] rounded-2xl p-6 mb-8 border border-[#D4A84B]/20">
                    <h3 className="font-display text-lg font-semibold text-[#2D5A27] mb-4">
                        {editingReview ? 'Modifier votre avis' : 'Votre avis'}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Notation étoiles */}
                        <div>
                            <label className="block text-sm font-medium text-[#2D5A27] mb-3">
                                Note <span className="text-[#2D5A27]/50">({rating || '?'}/10)</span>
                            </label>
                            <div className="flex gap-1">
                                {[...Array(10)].map((_, i) => {
                                    const starValue = i + 1
                                    return (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setRating(starValue)}
                                            onMouseEnter={() => setHoverRating(starValue)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            aria-label={`Note ${starValue} sur 10`}
                                            className={`text-2xl transition-all hover:scale-125 ${
                                                starValue <= (hoverRating || rating)
                                                    ? 'text-[#D4A84B] drop-shadow-sm'
                                                    : 'text-[#2D5A27]/15'
                                            }`}
                                        >
                                            ★
                                        </button>
                                    )
                                })}
                            </div>
                            {rating === 0 && (
                                <p className="text-xs text-[#2D5A27]/40 mt-1">Cliquez pour noter</p>
                            )}
                        </div>

                        {/* Commentaire */}
                        <div>
                            <label className="block text-sm font-medium text-[#2D5A27] mb-2">
                                Commentaire <span className="text-[#2D5A27]/40">(optionnel)</span>
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                maxLength={500}
                                className="w-full px-4 py-3 rounded-xl border border-[#2D5A27]/15 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C34]/30 transition-all text-[#2D5A27] placeholder:text-[#2D5A27]/30 resize-none"
                                placeholder="Partagez votre ressenti sur ce film..."
                            />
                            <p className="text-xs text-[#2D5A27]/40 text-right mt-1">
                                {comment.length}/500
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={rating === 0 || submitting}
                                className="px-6 py-2.5 bg-[#4A7C34] text-white rounded-full font-medium hover:bg-[#3D6A2A] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Envoi...' : editingReview ? 'Mettre à jour' : 'Publier'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false)
                                    setRating(0)
                                    setComment('')
                                    setEditingReview(null)
                                }}
                                className="px-6 py-2.5 text-[#2D5A27]/60 hover:bg-[#2D5A27]/5 rounded-full transition-all"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Liste des avis */}
            {loading ? (
                <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-3 border-[#A8D5BA] border-t-[#4A7C34] rounded-full animate-spin" />
                </div>
            ) : reviews.length > 0 ? (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className={`p-5 rounded-2xl transition-all ${
                                review.user.id === session?.user?.id
                                    ? 'bg-[#4A7C34]/5 border border-[#4A7C34]/20'
                                    : 'bg-white/50 border border-[#2D5A27]/5'
                            }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                        {review.user.image ? (
                                            <img
                                                src={review.user.image}
                                                alt={review.user.name || ''}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#4A7C34] to-[#2D5A27] flex items-center justify-center text-white text-sm font-bold">
                                                {review.user.name?.charAt(0).toUpperCase() || '?'}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-[#2D5A27]">
                                                {review.user.name || 'Anonyme'}
                                            </span>
                                            {review.user.id === session?.user?.id && (
                                                <span className="text-xs bg-[#4A7C34]/10 text-[#4A7C34] px-2 py-0.5 rounded-full">
                                                    Vous
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-[#2D5A27]/40">
                                            {formatDate(review.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                    <div className="flex gap-0.5">
                                        {[...Array(10)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`text-xs ${i < review.rating ? 'text-[#D4A84B]' : 'text-[#2D5A27]/10'}`}
                                                aria-hidden="true"
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-[#2D5A27]">{review.rating}</span>
                                </div>
                            </div>

                            {review.comment && (
                                <p className="mt-3 text-[#2D5A27]/70 leading-relaxed pl-13">
                                    {review.comment}
                                </p>
                            )}

                            {review.user.id === session?.user?.id && (
                                <div className="flex gap-3 mt-3 pl-13">
                                    <button
                                        onClick={() => handleEdit(review)}
                                        className="text-xs text-[#4A7C34] hover:underline"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => setDeleteModal(review.id)}
                                        className="text-xs text-red-400 hover:text-red-500 hover:underline"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-[#2D5A27]/40 text-sm">
                        Aucun avis pour le moment. Soyez le premier à partager votre ressenti !
                    </p>
                </div>
            )}

            {/* Modale suppression avis */}
            {deleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setDeleteModal(null)}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="relative bg-[#FDFBF7] rounded-3xl shadow-2xl max-w-sm w-full p-8 animate-modal-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center mb-6">
                            <div className="flex flex-col items-center mx-auto mb-4">
                                <div className="w-16 h-16 bg-[#2D5A27]/5 rounded-full flex items-center justify-center mb-2">
                                    <span className="text-3xl" aria-hidden="true">🌳</span>
                                </div>
                                <div className="flex gap-1">
                                    <span className="text-lg opacity-60" aria-hidden="true">🍃</span>
                                    <span className="text-sm opacity-40" aria-hidden="true">🍃</span>
                                </div>
                            </div>
                            <h3 className="font-display text-lg font-bold text-[#2D5A27] mb-2">
                                Supprimer votre avis ?
                            </h3>
                            <p className="text-[#2D5A27]/60 text-sm">
                                Cette action est irréversible.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteModal(null)}
                                className="flex-1 py-3 text-[#2D5A27]/60 hover:bg-[#2D5A27]/5 rounded-full transition-all font-medium"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteLoading}
                                className="flex-1 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-all disabled:opacity-50"
                            >
                                {deleteLoading ? 'Suppression...' : 'Supprimer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}