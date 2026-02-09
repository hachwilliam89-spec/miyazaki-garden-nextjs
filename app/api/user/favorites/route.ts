import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// GET — Récupérer les favoris de l'utilisateur
export async function GET() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        const favorites = await prisma.favorite.findMany({
            where: { userId: session.user.id },
            include: {
                film: {
                    select: {
                        id: true,
                        title: true,
                        image: true,
                        releaseDate: true,
                        rtScore: true,
                        director: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json({ favorites })
    } catch (error) {
        console.error('Favorites fetch error:', error)
        return NextResponse.json({ error: 'Erreur' }, { status: 500 })
    }
}