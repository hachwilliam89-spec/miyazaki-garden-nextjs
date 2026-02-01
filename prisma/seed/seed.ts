import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({})

// Types pour l'API Ghibli
interface GhibliFilm {
    id: string
    title: string
    original_title: string
    description: string
    director: string
    producer: string
    release_date: string
    running_time: string
    rt_score: string
    people: string[]
    image: string
    url: string
}

interface GhibliPerson {
    id: string
    name: string
    gender: string
    age: string
    eye_color: string
    hair_color: string
    films: string[]
    url: string
}

async function main() {
    console.log('🎬 Début du seed des données Ghibli...')

    // 1. Récupérer les films depuis l'API
    console.log('📡 Récupération des films...')
    const filmsResponse = await fetch('https://ghibliapi.vercel.app/films')
    const filmsData: GhibliFilm[] = await filmsResponse.json()

    console.log(`✅ ${filmsData.length} films récupérés`)

    // 2. Insérer les films dans la BDD
    console.log('💾 Insertion des films dans la base...')

    for (const film of filmsData) {
        await prisma.film.upsert({
            where: { ghibliId: film.id },
            update: {
                title: film.title,
                originalTitle: film.original_title,
                description: film.description,
                director: film.director,
                producer: film.producer,
                releaseDate: film.release_date,
                runningTime: film.running_time,
                rtScore: film.rt_score,
                image: film.image,
            },
            create: {
                ghibliId: film.id,
                title: film.title,
                originalTitle: film.original_title,
                description: film.description,
                director: film.director,
                producer: film.producer,
                releaseDate: film.release_date,
                runningTime: film.running_time,
                rtScore: film.rt_score,
                image: film.image,
            },
        })
        console.log(`  ✓ ${film.title}`)
    }

    // 3. Récupérer les personnages depuis l'API
    console.log('\n📡 Récupération des personnages...')
    const peopleResponse = await fetch('https://ghibliapi.vercel.app/people')
    const peopleData: GhibliPerson[] = await peopleResponse.json()

    console.log(`✅ ${peopleData.length} personnages récupérés`)

    // 4. Insérer les personnages dans la BDD
    console.log('💾 Insertion des personnages dans la base...')

    for (const person of peopleData) {
        // Récupérer les IDs des films associés
        const filmIds = await Promise.all(
            person.films.map(async (filmUrl) => {
                const ghibliId = filmUrl.split('/').pop()!
                const film = await prisma.film.findUnique({
                    where: { ghibliId },
                })
                return film?.id
            })
        )

        const validFilmIds = filmIds.filter((id): id is string => id !== undefined)

        await prisma.person.upsert({
            where: { ghibliId: person.id },
            update: {
                name: person.name,
                gender: person.gender || null,
                age: person.age || null,
                eyeColor: person.eye_color || null,
                hairColor: person.hair_color || null,
                films: {
                    set: validFilmIds.map(id => ({ id }))
                }
            },
            create: {
                ghibliId: person.id,
                name: person.name,
                gender: person.gender || null,
                age: person.age || null,
                eyeColor: person.eye_color || null,
                hairColor: person.hair_color || null,
                films: {
                    connect: validFilmIds.map(id => ({ id }))
                }
            },
        })
        console.log(`  ✓ ${person.name}`)
    }

    console.log('\n✨ Seed terminé avec succès !')
}

main()
    .catch((e) => {
        console.error('❌ Erreur lors du seed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })