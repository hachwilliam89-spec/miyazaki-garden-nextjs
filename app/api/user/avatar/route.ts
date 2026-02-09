import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { put, del } from '@vercel/blob'

export async function POST(request: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
        }

        // Validation
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Le fichier doit être une image' }, { status: 400 })
        }

        if (file.size > 4 * 1024 * 1024) {
            return NextResponse.json({ error: 'L\'image ne doit pas dépasser 4 Mo' }, { status: 400 })
        }

        // Supprimer l'ancien avatar si existant (Vercel Blob)
        const currentUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { image: true },
        })

        if (currentUser?.image?.includes('vercel-storage.com')) {
            try {
                await del(currentUser.image)
            } catch {
                // Ignorer si l'ancien fichier n'existe plus
            }
        }

        // Upload vers Vercel Blob
        const blob = await put(`avatars/${session.user.id}-${Date.now()}`, file, {
            access: 'public',
            addRandomSuffix: false,
        })

        // Mettre à jour l'utilisateur
        await prisma.user.update({
            where: { id: session.user.id },
            data: { image: blob.url },
        })

        return NextResponse.json({ url: blob.url })
    } catch (error) {
        console.error('Avatar upload error:', error)
        return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 })
    }
}