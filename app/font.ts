import { Noto_Serif_JP, Playfair_Display, Satisfy, Source_Sans_3 } from 'next/font/google'

export const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-display',
    weight: ['400', '600', '700']  // ← Ajouté
})

export const satisfy = Satisfy({
    subsets: ['latin'],
    variable: '--font-script',
    weight: '400'  // ← OBLIGATOIRE pour Satisfy
})

export const sourceSans = Source_Sans_3({
    subsets: ['latin'],
    variable: '--font-body'
})

export const notoSerifJP = Noto_Serif_JP({
    subsets: ['latin'],
    weight: ['400','600','700'],
    variable: '--font-japanese'
})
