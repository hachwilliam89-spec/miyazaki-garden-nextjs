import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = await fetch('https://ghibliapi.vercel.app/films');
        const films = await response.json();

        let imported = 0;

        for (const film of films) {
            await prisma.film.upsert({
                where: { ghibliId: film.id },
                create: {
                    ghibliId: film.id,
                    title: film.title,
                    originalTitle: film.original_title,
                    description: film.description,
                    director: film.director,
                    producer: film.producer,
                    releaseDate: film.release_date,
                    runningTime: film.running_time.toString(),
                    rtScore: film.rt_score.toString(),
                    image: film.image,
                },
                update: {}
            });
            imported++;
        }

        return NextResponse.json({
            success: true,
            imported,
            message: `${imported} films importés avec succès`
        });

    } catch (error) {
        console.error('Import error:', error);
        return NextResponse.json({
            error: 'Erreur lors de l\'import',
            details: String(error)
        }, { status: 500 });
    }
}