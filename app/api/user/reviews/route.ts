import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { reviewSchema } from '@/lib/validations'
import { sanitize } from '@/lib/sanitize'

// GET — Récupérer les avis d'un film
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const filmId = searchParams.get('filmId')

        if (!filmId) {
            return NextResponse.json({ error: 'filmId requis' }, { status: 400 })
        }

        const reviews = await prisma.review.findMany({
            where: { filmId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        const aggregate = await prisma.review.aggregate({
            where: { filmId },
            _avg: { rating: true },
            _count: true,
        })

        return NextResponse.json({
            reviews,
            average: aggregate._avg.rating ? Math.round(aggregate._avg.rating * 10) / 10 : null,
            count: aggregate._count,
        })
    } catch (error) {
        console.error('Reviews fetch error:', error)
        return NextResponse.json({ error: 'Erreur' }, { status: 500 })
    }
}

// POST — Créer ou mettre à jour un avis
export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        const body = await request.json()

        // Validation Zod
        const result = reviewSchema.safeParse(body)
        if (!result.success) {
            const firstError = result.error.issues[0]?.message || 'Données invalides'
            return NextResponse.json({ error: firstError }, { status: 400 })
        }

        const { filmId, rating, comment } = result.data

        // Vérifier si le film existe
        const film = await prisma.film.findUnique({ where: { id: filmId } })
        if (!film) {
            return NextResponse.json({ error: 'Film introuvable' }, { status: 404 })
        }

        // Sanitiser le commentaire
        const sanitizedComment = comment ? sanitize(comment) : null

        // Upsert
        const review = await prisma.review.upsert({
            where: {
                userId_filmId: {
                    userId: session.user.id,
                    filmId,
                },
            },
            create: {
                userId: session.user.id,
                filmId,
                rating,
                comment: sanitizedComment,
            },
            update: {
                rating,
                comment: sanitizedComment,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        })

        return NextResponse.json({ review })
    } catch (error) {
        console.error('Review create error:', error)
        return NextResponse.json({ error: 'Erreur' }, { status: 500 })
    }
}

// DELETE — Supprimer un avis
export async function DELETE(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const reviewId = searchParams.get('reviewId')

        if (!reviewId) {
            return NextResponse.json({ error: 'reviewId requis' }, { status: 400 })
        }

        const review = await prisma.review.findUnique({
            where: { id: reviewId },
        })

        if (!review || review.userId !== session.user.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
        }

        await prisma.review.delete({
            where: { id: reviewId },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Review delete error:', error)
        return NextResponse.json({ error: 'Erreur' }, { status: 500 })
    }
}