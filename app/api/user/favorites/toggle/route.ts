import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { favoriteSchema } from '@/lib/validations'

// POST — Toggle favori
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        const body = await request.json()

        // Validation Zod
        const result = favoriteSchema.safeParse(body)
        if (!result.success) {
            const firstError = result.error.issues[0]?.message || 'Données invalides'
            return NextResponse.json({ error: firstError }, { status: 400 })
        }

        const { filmId } = result.data

        // Vérifier si le film existe
        const film = await prisma.film.findUnique({ where: { id: filmId } })
        if (!film) {
            return NextResponse.json({ error: 'Film introuvable' }, { status: 404 })
        }

        // Vérifier si déjà en favori
        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                userId_filmId: {
                    userId: session.user.id,
                    filmId,
                },
            },
        })

        if (existingFavorite) {
            await prisma.favorite.delete({
                where: { id: existingFavorite.id },
            })
            return NextResponse.json({ isFavorite: false })
        } else {
            await prisma.favorite.create({
                data: {
                    userId: session.user.id,
                    filmId,
                },
            })
            return NextResponse.json({ isFavorite: true })
        }
    } catch (error) {
        console.error('Toggle favorite error:', error)
        return NextResponse.json({ error: 'Erreur' }, { status: 500 })
    }
}

// GET — Vérifier si un film est en favori
export async function GET(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ isFavorite: false })
        }

        const { searchParams } = new URL(request.url)
        const filmId = searchParams.get('filmId')

        if (!filmId) {
            return NextResponse.json({ error: 'filmId requis' }, { status: 400 })
        }

        const favorite = await prisma.favorite.findUnique({
            where: {
                userId_filmId: {
                    userId: session.user.id,
                    filmId,
                },
            },
        })

        return NextResponse.json({ isFavorite: !!favorite })
    } catch (error) {
        console.error('Check favorite error:', error)
        return NextResponse.json({ isFavorite: false })
    }
}