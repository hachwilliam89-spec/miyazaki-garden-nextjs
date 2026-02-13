import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Titres français officiels
const FRENCH_TITLES: Record<string, string> = {
    "Castle in the Sky": "Le Château dans le ciel",
    "Grave of the Fireflies": "Le Tombeau des lucioles",
    "My Neighbor Totoro": "Mon voisin Totoro",
    "Kiki's Delivery Service": "Kiki la petite sorcière",
    "Only Yesterday": "Souvenirs goutte à goutte",
    "Porco Rosso": "Porco Rosso",
    "Pom Poko": "Pompoko",
    "Whisper of the Heart": "Si tu tends l'oreille",
    "Princess Mononoke": "Princesse Mononoké",
    "My Neighbors the Yamadas": "Mes voisins les Yamada",
    "Spirited Away": "Le Voyage de Chihiro",
    "The Cat Returns": "Le Royaume des chats",
    "Howl's Moving Castle": "Le Château ambulant",
    "Tales from Earthsea": "Les Contes de Terremer",
    "Ponyo": "Ponyo sur la falaise",
    "Arrietty": "Arrietty le petit monde des chapardeurs",
    "From Up on Poppy Hill": "La Colline aux coquelicots",
    "The Wind Rises": "Le vent se lève",
    "The Tale of the Princess Kaguya": "Le Conte de la princesse Kaguya",
    "When Marnie Was There": "Souvenirs de Marnie",
    "The Red Turtle": "La Tortue rouge",
    "Earwig and the Witch": "Aya et la sorcière",
    "The Boy and the Heron": "Le Garçon et le Héron",
    "Nausicaä of the Valley of the Wind": "Nausicaä de la Vallée du Vent",
}

// Descriptions en français
const FRENCH_DESCRIPTIONS: Record<string, string> = {
    "Castle in the Sky": "Sheeta, une jeune fille mystérieuse, tombe littéralement du ciel dans les bras de Pazu, un garçon travaillant dans les mines. Ensemble, ils partent à la recherche de Laputa, le légendaire château flottant, tout en échappant aux pirates du ciel et aux agents du gouvernement qui convoitent le cristal magique de Sheeta.",
    "Grave of the Fireflies": "Dans le Japon de 1945, le jeune Seita et sa petite sœur Setsuko luttent pour survivre après le bombardement de Kobe. Orphelins et livrés à eux-mêmes, ils trouvent refuge dans un abri abandonné où ils tentent de préserver leur innocence face aux horreurs de la guerre.",
    "My Neighbor Totoro": "Satsuki et Mei emménagent avec leur père dans une vieille maison de campagne pour se rapprocher de l'hôpital où leur mère est soignée. Elles y découvrent l'existence de créatures merveilleuses, les Totoros, esprits de la forêt, avec lesquels elles vont vivre des aventures extraordinaires.",
    "Kiki's Delivery Service": "À treize ans, Kiki la petite sorcière quitte sa famille pour s'installer dans une grande ville au bord de la mer, accompagnée de Jiji, son chat noir. Elle y crée un service de livraison par balai volant, mais doit faire face à la solitude, au doute et à la perte temporaire de ses pouvoirs magiques.",
    "Only Yesterday": "Taeko, une jeune femme de 27 ans vivant à Tokyo, part en vacances à la campagne. Durant le voyage, les souvenirs de son enfance refont surface et l'amènent à reconsidérer sa vie, ses choix et ses rêves d'avenir, entre nostalgie et quête d'authenticité.",
    "Porco Rosso": "Dans l'Italie des années 1930, Marco, un pilote d'hydravion légendaire transformé en cochon par une mystérieuse malédiction, traque les pirates de l'air au-dessus de l'Adriatique. Entre duels aériens, romance et mélancolie, il cherche à retrouver sa place dans un monde en pleine mutation.",
    "Pom Poko": "Les tanukis de la forêt de Tama voient leur habitat menacé par l'expansion urbaine de Tokyo. Utilisant leurs pouvoirs de métamorphose ancestraux, ils organisent la résistance contre les humains dans une bataille à la fois drôle et émouvante pour la survie de leur monde.",
    "Whisper of the Heart": "Shizuku, une adolescente passionnée de lecture, remarque que les livres qu'elle emprunte à la bibliothèque ont tous été lus avant elle par un certain Seiji Amasawa. Sa quête pour découvrir ce lecteur mystérieux la mène vers un atelier de luthier et l'inspire à écrire sa propre histoire.",
    "Princess Mononoke": "Au Japon médiéval, le prince Ashitaka est frappé par une malédiction en protégeant son village. Son voyage vers l'ouest le plonge au cœur d'un conflit entre les dieux de la forêt, menés par la princesse Mononoké, et les humains de la cité du fer dirigés par Dame Eboshi.",
    "My Neighbors the Yamadas": "Le quotidien de la famille Yamada, une famille japonaise ordinaire composée de grands-parents excentriques, de parents débordés et d'enfants espiègles. À travers une série de saynètes humoristiques et tendres, le film célèbre les joies simples et les petits tracas de la vie familiale.",
    "Spirited Away": "Chihiro, dix ans, découvre un monde peuplé de divinités et d'esprits après que ses parents ont été transformés en cochons. Pour les sauver, elle doit travailler dans l'établissement de bains de la sorcière Yubaba et retrouver son nom dans cet univers où tout peut basculer.",
    "The Cat Returns": "Haru, une lycéenne timide, sauve un chat de la route sans savoir qu'il s'agit du prince du Royaume des Chats. En récompense, le roi des chats veut la marier à son fils. Haru doit alors trouver le Bureau des Chats pour échapper à ce destin félin inattendu.",
    "Howl's Moving Castle": "Sophie, une jeune chapelière, est transformée en vieille femme par la Sorcière des Landes. Elle trouve refuge dans le château ambulant du mystérieux magicien Hauru et découvre un monde de magie, de guerre et d'amour, tout en cherchant à briser la malédiction.",
    "Tales from Earthsea": "Dans un monde où l'équilibre est menacé, le prince Arren fuit son royaume après un acte terrible. Accompagné du mage Épervier, il parcourt les terres de Terremer pour comprendre l'origine du chaos et affronter ses propres ténèbres intérieures.",
    "Ponyo": "Ponyo, un poisson rouge doué de magie, s'échappe de l'océan et se lie d'amitié avec Sosuke, un petit garçon de cinq ans vivant au bord d'une falaise. Son désir de devenir humaine déclenche un déséquilibre dans la nature que seul l'amour véritable pourra résoudre.",
    "Arrietty": "Arrietty est une Chapardeur de quatorze ans, un minuscule être vivant sous le plancher d'une maison de campagne avec ses parents. Leur existence secrète est bouleversée lorsque Sho, un jeune garçon malade venu se reposer, découvre leur monde caché.",
    "From Up on Poppy Hill": "Dans le Yokohama de 1963, Umi, une lycéenne, hisse chaque matin des drapeaux de signalisation en mémoire de son père disparu en mer. Sa rencontre avec Shun, un camarade de classe idéaliste, les entraîne dans un combat pour sauver leur vieux clubhouse et lever le voile sur un secret familial.",
    "The Wind Rises": "Inspiré de la vie de Jiro Horikoshi, le film retrace le parcours d'un jeune ingénieur passionné qui rêve de concevoir de magnifiques avions. Entre créativité et destruction, amour et perte, il poursuit son idéal dans un Japon marqué par les tremblements de terre, la pauvreté et la marche vers la guerre.",
    "The Tale of the Princess Kaguya": "Trouvée dans une tige de bambou par un vieux coupeur de bambou, une minuscule princesse grandit à une vitesse surnaturelle. Élevée comme une noble à la capitale, Kaguya est tiraillée entre les conventions sociales et sa soif de liberté, portant en elle un secret lié à la Lune.",
    "When Marnie Was There": "Anna, une adolescente solitaire et renfermée, est envoyée chez des parents éloignés dans un village côtier pour sa santé. Elle y découvre un manoir mystérieux et se lie d'amitié avec Marnie, une fillette énigmatique dont l'existence semble liée à un passé oublié.",
    "The Red Turtle": "Un homme échoue sur une île déserte tropicale. Ses tentatives répétées de quitter l'île sont contrariées par une tortue rouge géante. Cette rencontre mystérieuse transforme sa solitude en une méditation poétique sur les cycles de la vie, l'amour et la communion avec la nature.",
    "Earwig and the Witch": "Aya, une orpheline vive et débrouillarde, est adoptée par Bella Yaga, une sorcière revêche, et Mandrake, un mystérieux démon. Dans cette maison étrange, Aya refuse de se soumettre et utilise sa ruse pour retourner la situation à son avantage et percer les secrets de sa propre histoire.",
    "The Boy and the Heron": "Après la perte de sa mère dans un incendie, le jeune Mahito déménage à la campagne avec son père. Attiré par un héron cendré mystérieux, il découvre un passage vers un monde fantastique gouverné par un grand-oncle vieillissant, et doit choisir entre la fuite et l'acceptation de la réalité.",
    "Nausicaä of the Valley of the Wind": "Mille ans après l'apocalypse, la princesse Nausicaä vit dans la Vallée du Vent, l'un des derniers refuges humains face à la Mer de la Décomposition, une jungle toxique peuplée d'insectes géants. Elle cherche à comprendre ce monde empoisonné et à empêcher une guerre destructrice entre les royaumes survivants.",
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    if (searchParams.get("key") !== process.env.NEXTAUTH_SECRET) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }
    try {
        const response = await fetch('https://ghibliapi.vercel.app/films')
        const films = await response.json()

        let imported = 0

        for (const film of films) {
            // Traduire le titre et la description
            const frenchTitle = FRENCH_TITLES[film.title] || film.title
            const frenchDescription = FRENCH_DESCRIPTIONS[film.title] || film.description

            await prisma.film.upsert({
                where: { ghibliId: film.id },
                create: {
                    ghibliId: film.id,
                    title: frenchTitle,
                    originalTitle: film.original_title,
                    description: frenchDescription,
                    director: film.director,
                    producer: film.producer,
                    releaseDate: film.release_date,
                    runningTime: film.running_time.toString(),
                    rtScore: film.rt_score.toString(),
                    image: film.image,
                },
                update: {
                    title: frenchTitle,
                    description: frenchDescription,
                    image: film.image,
                },
            })
            imported++
        }

        return NextResponse.json({
            success: true,
            imported,
            message: `${imported} films importés et traduits en français`,
        })
    } catch (error) {
        console.error('Import error:', error)
        return NextResponse.json({
            error: "Erreur lors de l'import",
            details: String(error),
        }, { status: 500 })
    }
}