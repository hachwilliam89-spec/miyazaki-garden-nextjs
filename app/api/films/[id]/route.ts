import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/films/[id] - Détails d'un film avec ses personnages
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const film = await prisma.film.findUnique({
            where: { id },
            include: {
                people: {
                    select: {
                        id: true,
                        name: true,
                        gender: true,
                        age: true,
                        eyeColor: true,
                        hairColor: true,
                    },
                },
            },
        })

        if (!film) {
            return NextResponse.json(
                { error: 'Film not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ film })
    } catch (error) {
        console.error('Error fetching film:', error)
        return NextResponse.json(
            { error: 'Failed to fetch film' },
            { status: 500 }
        )
    }
}