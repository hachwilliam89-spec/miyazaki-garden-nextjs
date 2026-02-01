import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/films - Liste tous les films
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const skip = (page - 1) * limit

        // Récupérer les films avec pagination
        const [films, total] = await Promise.all([
            prisma.film.findMany({
                skip,
                take: limit,
                orderBy: {
                    releaseDate: 'desc',
                },
                select: {
                    id: true,
                    ghibliId: true,
                    title: true,
                    originalTitle: true,
                    description: true,
                    director: true,
                    producer: true,
                    releaseDate: true,
                    runningTime: true,
                    rtScore: true,
                    image: true,
                },
            }),
            prisma.film.count(),
        ])

        return NextResponse.json({
            films,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Error fetching films:', error)
        return NextResponse.json(
            { error: 'Failed to fetch films' },
            { status: 500 }
        )
    }
}