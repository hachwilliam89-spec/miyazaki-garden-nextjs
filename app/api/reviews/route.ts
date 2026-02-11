import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

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

        // Récupérer la moyenne
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

        const { filmId, rating, comment } = await request.json()

        if (!filmId || !rating) {
            return NextResponse.json({ error: 'filmId et rating requis' }, { status: 400 })
        }

        if (rating < 1 || rating > 10) {
            return NextResponse.json({ error: 'La note doit être entre 1 et 10' }, { status: 400 })
        }

        // Vérifier si le film existe
        const film = await prisma.film.findUnique({ where: { id: filmId } })
        if (!film) {
            return NextResponse.json({ error: 'Film introuvable' }, { status: 404 })
        }

        // Upsert : créer ou mettre à jour
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
                comment: comment?.trim() || null,
            },
            update: {
                rating,
                comment: comment?.trim() || null,
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

        // Vérifier que l'avis appartient à l'utilisateur
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