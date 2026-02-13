import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'À propos',
    description:
        "Découvrez l'histoire du Studio Ghibli et ses réalisateurs légendaires : Hayao Miyazaki, Isao Takahata, Gorō Miyazaki et bien d'autres.",
    openGraph: {
        title: 'À propos du Studio Ghibli — Miyazaki Garden',
        description: "L'histoire du Studio Ghibli et ses réalisateurs.",
    },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
    return <>{children}</>
}
