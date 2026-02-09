import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            // Récupérer createdAt depuis la BDD
            if (token.id) {
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.id as string },
                    select: { createdAt: true, image: true },
                })
                if (dbUser) {
                    token.createdAt = dbUser.createdAt.toISOString()
                    token.image = dbUser.image
                }
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.createdAt = token.createdAt as string
                session.user.image = token.image as string | null
            }
            return session
        },
    },
    ...authConfig,
});