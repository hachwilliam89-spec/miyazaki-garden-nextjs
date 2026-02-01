import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/people - Liste tous les personnages
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const skip = (page - 1) * limit

        const [people, total] = await Promise.all([
            prisma.person.findMany({
                skip,
                take: limit,
                orderBy: {
                    name: 'asc',
                },
                include: {
                    films: {
                        select: {
                            id: true,
                            title: true,
                            image: true,
                        },
                    },
                },
            }),
            prisma.person.count(),
        ])

        return NextResponse.json({
            people,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Error fetching people:', error)
        return NextResponse.json(
            { error: 'Failed to fetch people' },
            { status: 500 }
        )
    }
}