import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const films = await prisma.film.findMany({
    select: {
      id: true,
      title: true,
      releaseDate: true,
      director: true,
    },
    orderBy: { releaseDate: 'desc' },
  })
  
  return NextResponse.json(films)
}
