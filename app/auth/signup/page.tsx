'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SignUpPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas')
            return
        }

        if (formData.password.length < 6) {
            setError('Le mot de passe doit contenir au moins 6 caractères')
            return
        }

        setLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || "Erreur lors de l'inscription")
                return
            }

            // Connexion automatique après inscription
            await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            router.push('/profile')
            router.refresh()
        } catch (error) {
            setError('Une erreur est survenue')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-ghibli">
            <Header />

            <main className="relative z-10">
                <div className="flex items-center justify-center px-4 py-16 min-h-[70vh]">
                    <div className="w-full max-w-md">
                        {/* Card glassmorphism harmonisée */}
                        <div className="section-glass p-8 md:p-10">
                            <div className="text-center mb-8">
                                <h1 className="font-display text-3xl font-bold text-[#2D5A27] mb-2">
                                    Rejoignez-nous
                                </h1>
                                <p className="font-japanese text-sm text-[#4A7C34]/70">参加する</p>
                                <p className="text-[#2D5A27]/60 mt-2 text-sm">
                                    Créez votre jardin Ghibli personnel
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div role="alert" className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-600 px-4 py-3 rounded-xl text-sm">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-[#2D5A27] mb-2">
                                        Nom
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-[#2D5A27]/15 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C34]/30 focus:border-[#4A7C34]/40 transition-all text-[#2D5A27] placeholder:text-[#2D5A27]/30"
                                        placeholder="Votre nom"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-[#2D5A27] mb-2">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-[#2D5A27]/15 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C34]/30 focus:border-[#4A7C34]/40 transition-all text-[#2D5A27] placeholder:text-[#2D5A27]/30"
                                        placeholder="votre@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-[#2D5A27] mb-2">
                                        Mot de passe
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                        minLength={6}
                                        className="w-full px-4 py-3 rounded-xl border border-[#2D5A27]/15 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C34]/30 focus:border-[#4A7C34]/40 transition-all text-[#2D5A27] placeholder:text-[#2D5A27]/30"
                                        placeholder="••••••••"
                                    />
                                    <p className="text-xs text-[#2D5A27]/40 mt-1">Minimum 6 caractères</p>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2D5A27] mb-2">
                                        Confirmer le mot de passe
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required
                                        minLength={6}
                                        className="w-full px-4 py-3 rounded-xl border border-[#2D5A27]/15 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#4A7C34]/30 focus:border-[#4A7C34]/40 transition-all text-[#2D5A27] placeholder:text-[#2D5A27]/30"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#4A7C34] text-white font-semibold py-3 rounded-full hover:bg-[#3D6A2A] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Inscription...
                                        </span>
                                    ) : (
                                        "S'inscrire"
                                    )}
                                </button>
                            </form>

                            {/* Séparateur */}
                            <div className="flex items-center justify-center gap-4 my-6">
                                <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#4A7C34]/20" />
                                <span className="text-[#D4A84B] text-xs">✦</span>
                                <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#4A7C34]/20" />
                            </div>

                            <p className="text-center text-sm text-[#2D5A27]/60">
                                Déjà un compte ?{' '}
                                <Link href="/auth/signin" className="font-semibold text-[#4A7C34] hover:text-[#2D5A27] hover:underline transition-colors">
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}