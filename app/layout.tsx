import type { Metadata } from 'next'
import { Inter, Playfair_Display, Source_Sans_3, Noto_Serif_JP, Caveat } from 'next/font/google'  // ← Inter ajouté ici
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

const inter = Inter({  // ← Maintenant Inter est défini
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  // ... votre metadata inchangée
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
      <Providers>
        {children}
      </Providers>
      </body>
      </html>
  )
}
