// app/api/directors/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const JAPANESE_NAMES: Record<string, string> = {
    'Hayao Miyazaki': '宮崎駿',
    'Isao Takahata': '高畑勲',
    'Gorō Miyazaki': '宮崎吾朗',
    'Hiromasa Yonebayashi': '米林宏昌',
    'Hiroyuki Morita': '森田宏幸',
    'Yoshifumi Kondō': '近藤喜文',
    'Michael Dudok de Wit': 'マイケル・ドゥドック・デ・ウィット'
}

const BIOS: Record<string, string> = {
    'Hayao Miyazaki': "Le maître incontesté de l'animation japonaise. Cofondateur du Studio Ghibli en 1985, il a révolutionné l'animation avec des chefs-d'œuvre comme Le Voyage de Chihiro, Mon voisin Totoro et Princesse Mononoké. Poète de la nature et de l'enfance, ses films explorent les thèmes de l'écologie, du pacifisme et de la quête d'identité.",
    'Isao Takahata': "Cofondateur du Studio Ghibli et pionnier du réalisme dans l'animation. Ses récits poignants comme Le Tombeau des lucioles et Le Conte de la Princesse Kaguya explorent la mémoire, la guerre et la condition humaine avec une profondeur unique.",
    'Gorō Miyazaki': "Fils de Hayao Miyazaki, il perpétue l'héritage familial avec sa propre sensibilité. Architecte de formation, il apporte une vision unique aux Contes de Terremer et La Colline aux coquelicots.",
    'Hiromasa Yonebayashi': "Le plus jeune réalisateur de l'histoire du studio. Il signe Arrietty et Souvenirs de Marnie, des miniatures poétiques sur l'indépendance et les liens invisibles.",
    'Hiroyuki Morita': "Réalisateur du Royaume des chats, il apporte une touche de légèreté et d'humour félin à l'univers Ghibli.",
    'Yoshifumi Kondō': "L'héritier tragique de Miyazaki, disparu trop tôt. Son unique film Si tu tends l'oreille reste un joyau d'émotion.",
    'Michael Dudok de Wit': "Réalisateur néerlandais de La Tortue rouge, il apporte une sensibilité européenne unique dans l'univers Ghibli."
}

export async function GET() {
    try {
        // Récupère tous les films depuis la base de données
        const films = await prisma.film.findMany({
            select: {
                id: true,
                title: true,
                releaseDate: true,
                director: true,
            },
        })

        const directorsData: Record<string, any> = {}

        films.forEach((film) => {
            const directorName = film.director || 'Unknown'

            if (!directorsData[directorName]) {
                directorsData[directorName] = {
                    name: directorName,
                    japanese: JAPANESE_NAMES[directorName] || '',
                    filmsCount: 0,
                    image: `/images/directors/${directorName
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase()
                        .replace(/ /g, '-')
                        .replace(/[^a-z0-9-]/g, '')}.jpg`,
                    bio: BIOS[directorName] || 'Réalisateur talentueux du Studio Ghibli.',
                    films: []
                }
            }

            directorsData[directorName].filmsCount++
            directorsData[directorName].films.push({
                id: film.id, // Utilise le vrai ID de Prisma
                title: film.title,
                releaseDate: film.releaseDate,
                director: film.director
            })
        })

        const directors = Object.values(directorsData)
            .sort((a: any, b: any) => b.filmsCount - a.filmsCount)

        return NextResponse.json(directors)
    } catch (error) {
        console.error('Error fetching directors:', error)
        return NextResponse.json({ error: 'Failed to fetch directors' }, { status: 500 })
    }
}