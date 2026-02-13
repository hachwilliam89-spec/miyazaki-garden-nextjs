import type { Metadata } from 'next'
import { Inter, Playfair_Display, Source_Sans_3, Noto_Serif_JP, Caveat } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import { Providers } from './providers'

const playfair = Playfair_Display({
    variable: '--font-display',
    subsets: ['latin'],
    display: 'swap',
})

const caveat = Caveat({
    variable: '--font-script',
    subsets: ['latin'],
    weight: ['500', '600'],
    display: 'swap',
})

const sourceSans = Source_Sans_3({
    variable: '--font-body',
    subsets: ['latin'],
    display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({
    variable: '--font-japanese',
    subsets: ['latin'],
    weight: ['400', '600'],
    display: 'swap',
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
})

export const metadata: Metadata = {
    title: {
        default: 'Miyazaki Garden — Encyclopédie Studio Ghibli',
        template: '%s | Miyazaki Garden',
    },
    description:
        "Explorez l'univers poétique du Studio Ghibli : filmographie complète, réalisateurs, personnages et avis des spectateurs.",
    keywords: [
        'Studio Ghibli',
        'Hayao Miyazaki',
        'animation japonaise',
        'films Ghibli',
        'Totoro',
        'Chihiro',
        'Mononoké',
    ],
    authors: [{ name: 'Kim', url: 'https://portfolio-kim-liart.vercel.app' }],
    creator: 'Kim — UHA 4.0',
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        siteName: 'Miyazaki Garden',
        title: 'Miyazaki Garden — Encyclopédie Studio Ghibli',
        description:
            "Explorez l'univers poétique du Studio Ghibli : filmographie complète, réalisateurs, personnages et avis.",
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="fr">
        <body
            className={`${playfair.variable} ${caveat.variable} ${sourceSans.variable} ${notoSerifJP.variable} ${inter.variable} antialiased`}
        >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#4A7C34] focus:text-white focus:rounded-lg">Aller au contenu principal</a>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}