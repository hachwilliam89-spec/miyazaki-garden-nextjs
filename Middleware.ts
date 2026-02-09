import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
    const { pathname } = req.nextUrl
    const isAuthenticated = !!req.auth

    // Routes protégées
    const protectedRoutes = ['/profile']

    // Routes auth (ne pas y accéder si déjà connecté)
    const authRoutes = ['/auth/signin', '/auth/signup']

    // Si l'utilisateur essaie d'accéder à une route protégée sans être connecté
    if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
        const signInUrl = new URL('/auth/signin', req.nextUrl.origin)
        signInUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(signInUrl)
    }

    // Si l'utilisateur est déjà connecté et essaie d'accéder aux pages auth
    if (authRoutes.some(route => pathname.startsWith(route)) && isAuthenticated) {
        return NextResponse.redirect(new URL('/profile', req.nextUrl.origin))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/profile/:path*', '/auth/:path*'],
}