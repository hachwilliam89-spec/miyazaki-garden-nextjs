'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ProfilePage() {
    const { data: session, status, update } = useSession()
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [editData, setEditData] = useState({ name: '', email: '' })
    const [editLoading, setEditLoading] = useState(false)
    const [editError, setEditError] = useState('')
    const [editSuccess, setEditSuccess] = useState('')

    const [avatarLoading, setAvatarLoading] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState('')
    const [deleteLoading, setDeleteLoading] = useState(false)

    const [favorites, setFavorites] = useState<any[]>([])
    const [favoritesLoading, setFavoritesLoading] = useState(true)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin')
        }
    }, [status, router])

    useEffect(() => {
        if (session?.user) {
            setEditData({
                name: session.user.name || '',
                email: session.user.email || '',
            })
            fetchFavorites()
        }
    }, [session])

    async function fetchFavorites() {
        try {
            const res = await fetch('/api/user/favorites')
            if (res.ok) {
                const data = await res.json()
                setFavorites(data.favorites || [])
            }
        } catch (error) {
            console.log('Favoris non disponibles')
        } finally {
            setFavoritesLoading(false)
        }
    }

    async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        // Validation
        if (!file.type.startsWith('image/')) {
            alert('Veuillez sélectionner une image')
            return
        }
        if (file.size > 4 * 1024 * 1024) {
            alert('L\'image ne doit pas dépasser 4 Mo')
            return
        }

        setAvatarLoading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/user/avatar', {
                method: 'POST',
                body: formData,
            })

            if (res.ok) {
                const data = await res.json()
                await update({ image: data.url })
                router.refresh()
            } else {
                alert('Erreur lors de l\'upload')
            }
        } catch (error) {
            alert('Erreur lors de l\'upload')
        } finally {
            setAvatarLoading(false)
        }
    }

    async function handleEditSubmit(e: React.FormEvent) {
        e.preventDefault()
        setEditError('')
        setEditSuccess('')
        setEditLoading(true)

        try {
            const res = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            })

            const data = await res.json()

            if (!res.ok) {
                setEditError(data.error || 'Erreur lors de la mise à jour')
                return
            }

            setEditSuccess('Profil mis à jour avec succès')
            setIsEditing(false)
            await update({ name: editData.name, email: editData.email })
            router.refresh()
        } catch (error) {
            setEditError('Une erreur est survenue')
        } finally {
            setEditLoading(false)
        }
    }

    async function handleDeleteAccount() {
        if (deleteConfirm !== 'SUPPRIMER') return

        setDeleteLoading(true)
        try {
            const res = await fetch('/api/user/profile', { method: 'DELETE' })

            if (res.ok) {
                await signOut({ callbackUrl: '/' })
            } else {
                alert('Erreur lors de la suppression')
            }
        } catch (error) {
            alert('Erreur lors de la suppression')
        } finally {
            setDeleteLoading(false)
        }
    }

    // Calcul "membre depuis"
    function getMemberSince() {
        if (!session?.user?.createdAt) return null
        const created = new Date(session.user.createdAt)
        const now = new Date()
        const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))

        if (diffDays === 0) return "Aujourd'hui"
        if (diffDays === 1) return 'Hier'
        if (diffDays < 30) return `${diffDays} jours`
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} mois`
        return `${Math.floor(diffDays / 365)} an${Math.floor(diffDays / 365) > 1 ? 's' : ''}`
    }

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-ghibli">
                <Header />
                <main id="main-content" className="relative z-10">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="w-12 h-12 border-4 border-[#A8D5BA] border-t-[#4A7C34] rounded-full animate-spin" />
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    if (!session?.user) return null

    return (
        <div className="min-h-screen bg-ghibli">
            <Header />

            <main id="main-content" className="relative z-10">
                <div className="px-4 py-12 max-w-4xl mx-auto space-y-8">

                    {/* ══════════════════════════════════════
                        SECTION HÉRO — Avatar + Infos
                    ══════════════════════════════════════ */}
                    <section className="section-glass p-8 md:p-10">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Avatar avec upload */}
                            <div className="relative group">
                                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                    {session.user.image ? (
                                        <img
                                            src={session.user.image}
                                            alt={session.user.name || 'Avatar'}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#4A7C34] to-[#2D5A27] flex items-center justify-center text-white text-4xl font-bold">
                                            {session.user.name?.charAt(0).toUpperCase() || '?'}
                                        </div>
                                    )}
                                </div>

                                {/* Overlay upload */}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={avatarLoading}
                                    className="absolute inset-0 w-28 h-28 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                                >
                                    {avatarLoading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <span className="text-white text-sm font-medium">Modifier</span>
                                    )}
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                />
                            </div>

                            {/* Infos */}
                            <div className="text-center md:text-left flex-1">
                                <h1 className="font-display text-3xl font-bold text-[#2D5A27] mb-1">
                                    {session.user.name}
                                </h1>
                                <p className="text-[#4A7C34]/70 mb-3">{session.user.email}</p>

                                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                                    {getMemberSince() && (
                                        <span className="inline-flex items-center gap-1.5 bg-[#2D5A27]/10 px-3 py-1 rounded-full text-sm text-[#2D5A27]">
                                            <span className="text-[#D4A84B]">✦</span>
                                            Membre depuis {getMemberSince()}
                                        </span>
                                    )}
                                    <span className="inline-flex items-center gap-1.5 bg-[#2D5A27]/10 px-3 py-1 rounded-full text-sm text-[#2D5A27]">
                                        ❤️ {favorites.length} favoris
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Message poétique */}
                        <div className="mt-6 pt-6 border-t border-[#2D5A27]/10 text-center">
                            <p className="text-[#2D5A27]/50 text-sm italic font-japanese">
                                「心を静かにすれば、すべてが見える」
                            </p>
                            <p className="text-[#2D5A27]/40 text-xs mt-1">
                                « Quand on calme son cœur, on voit tout » — Hayao Miyazaki
                            </p>
                        </div>
                    </section>

                    {/* ══════════════════════════════════════
                        SECTION ÉDITION — Modifier le profil
                    ══════════════════════════════════════ */}
                    <section className="section-glass p-8 md:p-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-[#D4A84B] rounded-full" />
                                <h2 className="font-display text-xl font-semibold text-[#2D5A27]">
                                    Informations personnelles
                                </h2>
                            </div>
                            {!isEditing && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 text-sm text-[#4A7C34] hover:bg-[#4A7C34]/10 rounded-full transition-all"
                                >
                                    Modifier ✎
                                </button>
                            )}
                        </div>

                        {editSuccess && (
                            <div className="bg-green-50/80 border border-green-200/50 text-green-700 px-4 py-3 rounded-xl text-sm mb-4">
                                {editSuccess}
                            </div>
                        )}

                        {isEditing ? (
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                {editError && (
                                    <div className="bg-red-50/80 border border-red-200/50 text-red-600 px-4 py-3 rounded-xl text-sm">
                                        {editError}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-[#2D5A27] mb-2">Nom</label>
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-[#2D5A27]/15 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C34]/30 transition-all text-[#2D5A27]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#2D5A27] mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={editData.email}
                                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-[#2D5A27]/15 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C34]/30 transition-all text-[#2D5A27]"
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={editLoading}
                                        className="px-6 py-2.5 bg-[#4A7C34] text-white rounded-full font-medium hover:bg-[#3D6A2A] transition-all shadow-lg disabled:opacity-50"
                                    >
                                        {editLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false)
                                            setEditError('')
                                            setEditData({
                                                name: session.user?.name || '',
                                                email: session.user?.email || '',
                                            })
                                        }}
                                        className="px-6 py-2.5 text-[#2D5A27]/60 hover:bg-[#2D5A27]/5 rounded-full transition-all"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-[#2D5A27]/10">
                                    <p className="text-xs uppercase tracking-wider text-[#4A7C34]/60 mb-1">Nom</p>
                                    <p className="font-medium text-[#2D5A27]">{session.user.name || '—'}</p>
                                </div>
                                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-[#2D5A27]/10">
                                    <p className="text-xs uppercase tracking-wider text-[#4A7C34]/60 mb-1">Email</p>
                                    <p className="font-medium text-[#2D5A27]">{session.user.email}</p>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* ══════════════════════════════════════
                        SECTION FAVORIS
                    ══════════════════════════════════════ */}
                    <section className="section-glass p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-[#D4A84B] rounded-full" />
                            <h2 className="font-display text-xl font-semibold text-[#2D5A27]">
                                Mes films favoris
                            </h2>
                            <span className="bg-[#2D5A27]/10 text-[#2D5A27] text-sm px-3 py-1 rounded-full">
                                {favorites.length}
                            </span>
                        </div>

                        {favoritesLoading ? (
                            <div className="flex justify-center py-8">
                                <div className="w-8 h-8 border-3 border-[#A8D5BA] border-t-[#4A7C34] rounded-full animate-spin" />
                            </div>
                        ) : favorites.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {favorites.map((fav: any) => (
                                    <Link
                                        key={fav.film.id}
                                        href={`/films/${fav.film.id}`}
                                        className="group relative aspect-[2/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                                    >
                                        {fav.film.image && (
                                            <img
                                                src={fav.film.image}
                                                alt={fav.film.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                                            <p className="text-white text-sm font-bold">{fav.film.title}</p>
                                            <p className="text-white/60 text-xs">{fav.film.releaseDate}</p>
                                        </div>
                                        <div className="absolute top-2 right-2 text-red-400 text-lg">❤️</div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-5xl mb-4">🌱</div>
                                <p className="text-[#2D5A27]/60 mb-2">Votre jardin de favoris est encore vide</p>
                                <p className="text-[#2D5A27]/40 text-sm mb-6">
                                    Explorez la collection et ajoutez vos films préférés
                                </p>
                                <Link
                                    href="/films"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4A7C34] text-white rounded-full font-medium hover:bg-[#3D6A2A] transition-all shadow-lg"
                                >
                                    Explorer les films →
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* ══════════════════════════════════════
                       Supprimer le compte
                    ══════════════════════════════════════ */}
                    <section className="section-glass p-8 md:p-10 border border-red-200/30">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1 h-8 bg-red-400 rounded-full" />
                            <h2 className="font-display text-xl font-semibold text-red-600/80">
                                Voulez-vous nous quitter?
                            </h2>
                        </div>

                        <p className="text-[#2D5A27]/60 text-sm mb-4">
                            La suppression de votre compte est irréversible. Toutes vos données (favoris, avis, collections) seront définitivement supprimées.
                        </p>

                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="px-5 py-2.5 text-sm text-red-500 border border-red-200 hover:bg-red-50 hover:border-red-300 rounded-full transition-all"
                        >
                            Supprimer mon compte
                        </button>
                    </section>
                </div>
            </main>

            <Footer />

            {/* ══════════════════════════════════════
                MODAL SUPPRESSION
            ══════════════════════════════════════ */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteModal(false)}>
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <div
                        role="dialog" aria-modal="true" className="relative bg-[#FDFBF7] rounded-3xl shadow-2xl max-w-md w-full p-8 animate-modal-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center mb-6">
                            <h3 className="font-display text-xl font-bold text-[#2D5A27] mb-2">
                                Supprimer votre compte ?
                            </h3>
                            <p className="text-[#2D5A27]/60 text-sm">
                                Cette action est irréversible. Tapez <strong className="text-red-500">SUPPRIMER</strong> pour confirmer.
                            </p>
                        </div>

                        <input
                            type="text"
                            value={deleteConfirm}
                            onChange={(e) => setDeleteConfirm(e.target.value)}
                            placeholder="Tapez SUPPRIMER"
                            className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all text-center text-[#2D5A27] mb-4"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowDeleteModal(false); setDeleteConfirm('') }}
                                className="flex-1 py-3 text-[#2D5A27]/60 hover:bg-[#2D5A27]/5 rounded-full transition-all"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={deleteConfirm !== 'SUPPRIMER' || deleteLoading}
                                className="flex-1 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {deleteLoading ? 'Suppression...' : 'Confirmer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}