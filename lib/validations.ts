import { z } from 'zod'

// ── Auth ──────────────────────────────────────

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .max(50, 'Le nom ne doit pas dépasser 50 caractères')
        .trim(),
    email: z
        .string()
        .email('Email invalide')
        .max(100, 'Email trop long')
        .trim()
        .toLowerCase(),
    password: z
        .string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .max(100, 'Mot de passe trop long'),
})

export const loginSchema = z.object({
    email: z.string().email('Email invalide').trim().toLowerCase(),
    password: z.string().min(1, 'Mot de passe requis'),
})

// ── Profil ────────────────────────────────────

export const updateProfileSchema = z.object({
    name: z
        .string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .max(50, 'Le nom ne doit pas dépasser 50 caractères')
        .trim(),
    email: z
        .string()
        .email('Email invalide')
        .max(100, 'Email trop long')
        .trim()
        .toLowerCase(),
})

// ── Reviews ───────────────────────────────────

export const reviewSchema = z.object({
    filmId: z.string().uuid('ID film invalide'),
    rating: z
        .number()
        .int('La note doit être un entier')
        .min(1, 'La note minimum est 1')
        .max(10, 'La note maximum est 10'),
    comment: z
        .string()
        .max(500, 'Le commentaire ne doit pas dépasser 500 caractères')
        .trim()
        .optional()
        .nullable()
        .transform(val => val || null),
})

// ── Favoris ───────────────────────────────────

export const favoriteSchema = z.object({
    filmId: z.string().uuid('ID film invalide'),
})