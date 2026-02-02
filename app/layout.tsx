import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3, Noto_Serif_JP } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin'],
  display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({
  variable: '--font-noto-serif-jp',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Miyazaki Garden | Studio Ghibli Films',
  description: 'Explorez l\'univers magique et poétique du Studio Ghibli à travers sa filmographie complète. Une encyclopédie interactive des films de Hayao Miyazaki.',
  keywords: ['Studio Ghibli', 'Miyazaki', 'anime', 'films japonais', 'Totoro', 'Chihiro'],
  authors: [{ name: 'Kim', url: 'https://portfolio-kim-liart.vercel.app' }],
  openGraph: {
    title: 'Miyazaki Garden | Studio Ghibli Films',
    description: 'Explorez l\'univers magique du Studio Ghibli',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${sourceSans.variable} ${notoSerifJP.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
