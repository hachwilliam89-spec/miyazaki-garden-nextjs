import { Noto_Serif_JP, Cormorant_Garamond, Caveat, Source_Sans_3 } from 'next/font/google'

export const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    variable: '--font-display',
    weight: ['400', '600', '700']
})

export const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-script',
    weight: ['500', '600']
})

export const sourceSans = Source_Sans_3({
    subsets: ['latin'],
    variable: '--font-body'
})

export const notoSerifJP = Noto_Serif_JP({
    subsets: ['latin'],
    weight: ['400', '600'],
    variable: '--font-japanese'
})