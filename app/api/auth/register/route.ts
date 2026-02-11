import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validation Zod
        const result = registerSchema.safeParse(body)
        if (!result.success) {
            const firstError = result.error.issues[0]?.message || 'Données invalides'
            return NextResponse.json({ error: firstError }, { status: 400 })
        }

        const { name, email, password } = result.data

        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'Cet email est déjà utilisé' },
                { status: 400 }
            )
        }

        // Hash du password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Créer l'utilisateur
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: "Erreur lors de l'inscription" },
            { status: 500 }
        )
    }
}