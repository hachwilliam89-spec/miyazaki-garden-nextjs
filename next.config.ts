import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.themoviedb.org',
            },
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
            },
            {
                protocol: 'https',
                hostname: '*.public.blob.vercel-storage.com',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    // Empêche le clickjacking (iframe)
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    // Empêche le sniffing MIME
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    // Protection XSS navigateur
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    // Contrôle le referrer
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    // Permissions (désactive caméra, micro, géoloc)
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ]
    },
}

export default nextConfig