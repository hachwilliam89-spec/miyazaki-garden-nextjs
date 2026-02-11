import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { updateProfileSchema } from '@/lib/validations'

// PATCH — Modifier nom/email
export async function PATCH(request: Request) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        const body = await request.json()

        // Validation Zod
        const result = updateProfileSchema.safeParse(body)
        if (!result.success) {
            const firstError = result.error.errors[0]?.message || 'Données invalides'
            return NextResponse.json({ error: firstError }, { status: 400 })
        }

        const { name, email } = result.data

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
            data: { name, email },
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

        await prisma.user.delete({
            where: { id: session.user.id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Account delete error:', error)
        return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
    }
}