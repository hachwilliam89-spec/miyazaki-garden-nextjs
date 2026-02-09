import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

// PATCH — Modifier nom/email
export async function PATCH(request: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        const { name, email } = await request.json()

        // Validation
        if (!name?.trim() || !email?.trim()) {
            return NextResponse.json({ error: 'Nom et email requis' }, { status: 400 })
        }

        // Vérifier si l'email est déjà pris par un autre utilisateur
        if (email !== session.user.email) {
            const existingUser = await prisma.user.findUnique({
                where: { email },
            })
            if (existingUser && existingUser.id !== session.user.id) {
                return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 })
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name: name.trim(),
                email: email.trim(),
            },
        })

        return NextResponse.json({
            success: true,
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
            },
        })
    } catch (error) {
        console.error('Profile update error:', error)
        return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
    }
}

// DELETE — Supprimer le compte
export async function DELETE() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        // Prisma cascade supprime les favoris, reviews, collections automatiquement
        await prisma.user.delete({
            where: { id: session.user.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Account delete error:', error)
        return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
    }
}