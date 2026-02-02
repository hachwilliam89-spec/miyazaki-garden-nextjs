# 🎋 Miyazaki Garden - Synthèse Complète du Projet

**Date** : 01 Février 2026  
**Étudiant** : Kim - Licence Pro Développement Full Stack UHA 4.0  
**Projet** : Refonte moderne d'un projet fil rouge PHP/MySQL vers Next.js/PostgreSQL

---

## 🎯 URLs du Projet

- **GitHub** : https://github.com/hachwilliam89-spec/miyazaki-garden-nextjs
- **Production (Vercel)** : https://miyazaki-garden-nextjs.vercel.app
- **Base de données** : Neon PostgreSQL (ep-round-unit-ag34u2nb-pooler)

---

## ✅ Étapes Accomplies

### 1. Setup Initial (Étape 1-2)
✅ Création projet Next.js 16 avec TypeScript + Tailwind CSS  
✅ Port personnalisé 3003 configuré  
✅ Documentation API Studio Ghibli dans `docs/API-ANALYSIS.md`

**Commandes clés :**
```bash
npx create-next-app@latest miyazaki-garden-nextjs
npm run dev  # Lance sur port 3003
```

### 2. Configuration Git & GitHub (Étape 3-4)
✅ Initialisation Git  
✅ Branches `main` et `develop` créées  
✅ Repo GitHub connecté via SSH  
✅ Workflow de feature branches adopté

**Commandes clés :**
```bash
git init
git checkout -b develop
git remote add origin git@github.com:hachwilliam89-spec/miyazaki-garden-nextjs.git
git push -u origin main
git push -u origin develop
```

### 3. Base de Données Prisma + PostgreSQL (Étape 5-6)
✅ Prisma 6 installé (downgrade depuis v7 pour compatibilité)  
✅ PostgreSQL hébergé sur Neon (serverless)  
✅ Schéma BDD avec 7 tables et relations complètes

**Tables créées :**
- `films` - 22 films Studio Ghibli
- `people` - 57 personnages
- `users` - Comptes utilisateurs (prêt pour auth)
- `favorites` - Films favoris
- `reviews` - Avis utilisateurs
- `collections` - Collections personnalisées
- `collection_films` - Table de liaison

**Commandes clés :**
```bash
npm install -D prisma@6.19.2 --save-exact
npm install @prisma/client@6.19.2 --save-exact
npx prisma init --datasource-provider postgresql
npx prisma db push
npx prisma generate
```

**Fichiers importants :**
- `prisma/schema.prisma` - Schéma de la BDD
- `lib/prisma.ts` - Client Prisma singleton
- `.env` - DATABASE_URL (ne pas commit !)

### 4. Script de Seed (Étape 7-8)
✅ Script TypeScript pour peupler la BDD  
✅ Récupération des données depuis API Ghibli  
✅ 22 films et 57 personnages insérés avec relations

**Commande :**
```bash
npm run db:seed
```

**Fichier :**
- `prisma/seed/seed.ts`

### 5. API Routes Next.js (Étape 9)
✅ Routes API REST avec pagination  
✅ Endpoints pour films et personnages

**Endpoints créés :**
- `GET /api/films` - Liste paginée
- `GET /api/films?page=1&limit=10` - Avec pagination
- `GET /api/films/[id]` - Détail + personnages
- `GET /api/people` - Liste personnages

**Fichiers :**
- `app/api/films/route.ts`
- `app/api/films/[id]/route.ts`
- `app/api/people/route.ts`

### 6. Pages Frontend (Étape 10-11)
✅ Homepage avec grille de films responsive  
✅ Page détail film avec personnages  
✅ Design inspiré Ghibli (rouge/or)  
✅ Composants réutilisables

**Pages :**
- `app/page.tsx` - Homepage (grille films)
- `app/films/[id]/page.tsx` - Détail film

**Composants :**
- `components/films/FilmCard.tsx`
- `components/films/PersonCard.tsx`

### 7. Configuration Images (Étape 12)
✅ Images TMDB autorisées dans Next.js

**Fichier :**
- `next.config.ts` - Configuration remotePatterns

### 8. Documentation (Étape 13)
✅ README.md professionnel complet  
✅ Instructions d'installation  
✅ Architecture documentée

### 9. Déploiement Vercel (Étape 14) ✨
✅ Projet déployé en production  
✅ Variables d'environnement configurées  
✅ Build optimisé et fonctionnel

**Variables d'env Vercel :**
- `DATABASE_URL` - Connection string Neon (3 environnements cochés)

---

## 🔧 Problèmes Résolus

### Problème 1 : Prisma 7 incompatible
**Erreur :** `PrismaClient needs to be constructed with PrismaClientOptions`  
**Solution :** Downgrade vers Prisma 6.19.2

```bash
npm install prisma@6.19.2 @prisma/client@6.19.2 --save-exact
```

### Problème 2 : Fetch vers localhost en production
**Erreur :** `connect ECONNREFUSED 127.0.0.1:3003`  
**Solution :** Utiliser Prisma directement dans les Server Components au lieu de fetch()

**Avant (❌) :**
```typescript
const res = await fetch(`http://localhost:3003/api/films`)
```

**Après (✅) :**
```typescript
import { prisma } from '@/lib/prisma'
const films = await prisma.film.findMany()
```

### Problème 3 : DATABASE_URL manquante sur Vercel
**Erreur :** `Environment variable not found: DATABASE_URL`  
**Solution :** Ajouter la variable dans Settings > Environment Variables (cocher les 3 environnements)

### Problème 4 : Images TMDB bloquées
**Erreur :** `hostname not configured under images`  
**Solution :** Configurer `remotePatterns` dans `next.config.ts`

### Problème 5 : Deux repos GitHub différents
**Problème :** Vercel déployait `miyazaki-garden-v2-react` au lieu de `miyazaki-garden-nextjs`  
**Solution :** Créer nouveau projet Vercel avec le bon repo

---

## 📁 Structure du Projet

```
miyazaki-garden-nextjs/
├── app/
│   ├── api/
│   │   ├── films/
│   │   │   ├── route.ts          # GET /api/films
│   │   │   └── [id]/route.ts     # GET /api/films/[id]
│   │   └── people/
│   │       └── route.ts          # GET /api/people
│   ├── films/
│   │   └── [id]/
│   │       └── page.tsx          # Page détail film
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Homepage (grille films)
├── components/
│   └── films/
│       ├── FilmCard.tsx          # Card film pour grille
│       └── PersonCard.tsx        # Card personnage
├── docs/
│   └── API-ANALYSIS.md           # Documentation API Ghibli
├── lib/
│   └── prisma.ts                 # Client Prisma singleton
├── prisma/
│   ├── schema.prisma             # Schéma BDD (7 tables)
│   └── seed/
│       └── seed.ts               # Script de peuplement
├── .env                          # Variables locales (gitignored)
├── .env.local                    # Config Next.js locale
├── .gitignore
├── next.config.ts                # Config Next.js + images
├── package.json
├── README.md                     # Documentation complète
└── tailwind.config.ts
```

---

## 🛠️ Stack Technique Complète

### Frontend
- **Next.js 16** - Framework React avec App Router
- **React 19** - Bibliothèque UI avec Server Components
- **TypeScript 5.9** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire

### Backend
- **Next.js API Routes** - API REST intégrée
- **Prisma 6** - ORM TypeScript
- **PostgreSQL 17** - Base de données relationnelle

### Infrastructure
- **Neon** - PostgreSQL serverless (gratuit)
- **Vercel** - Hosting et déploiement
- **GitHub** - Versioning et CI/CD

### Outils Dev
- **tsx** - Exécution TypeScript
- **ESLint** - Linting
- **Git** - Versioning

---

## 📊 Statistiques du Projet

- **22 films** Studio Ghibli
- **57 personnages** avec relations
- **7 tables** en base de données
- **3 API endpoints** fonctionnels
- **2 pages** frontend (homepage + détail)
- **2 composants** réutilisables
- **~1500 lignes** de code TypeScript

---

## 🚀 Commandes Essentielles

### Développement Local
```bash
# Lancer le serveur de dev
npm run dev

# Regénérer le client Prisma (après modif schema)
npx prisma generate

# Pousser les changements de schema vers la BDD
npx prisma db push

# Peupler la BDD avec les données Ghibli
npm run db:seed

# Ouvrir Prisma Studio (interface graphique BDD)
npx prisma studio
```

### Git Workflow
```bash
# Créer une nouvelle feature
git checkout develop
git checkout -b feature/nom-feature

# Commiter les changements
git add .
git commit -m "✨ feat: Description"

# Merger dans develop
git checkout develop
git merge feature/nom-feature
git push origin develop

# Merger dans main (pour déploiement)
git checkout main
git merge develop
git push origin main
```

### Déploiement
```bash
# Le push sur main déclenche auto-deploy sur Vercel
git push origin main

# Ou redéployer manuellement via Vercel UI
# Deployments > ... > Redeploy
```

---

## 🎨 Prochaines Étapes Recommandées

### Phase 1 : Design Signature (2-3h)
**Objectif :** Différenciation visuelle avec ton identité

1. **Refonte palette de couleurs**
   - Vermillon (#DC143C) comme couleur principale
   - Or (#FFD700) pour les accents
   - Intégration de motifs asiatiques authentiques

2. **Composants à améliorer**
   - Header avec calligraphie
   - Cards films avec bordures dorées
   - Footer avec motifs traditionnels
   - Animations subtiles (hover, transitions)

3. **Typographie**
   - Police avec caractère asiatique pour les titres
   - Hiérarchie visuelle renforcée

**Fichiers à modifier :**
- `app/globals.css` - Variables CSS custom
- `components/films/FilmCard.tsx` - Styles cards
- `app/page.tsx` - Header et layout
- `tailwind.config.ts` - Palette custom

### Phase 2 : Authentification (3-4h)
**Objectif :** Prouver la maîtrise du full-stack

1. **NextAuth.js Setup**
   ```bash
   npm install next-auth@beta
   ```

2. **Pages à créer**
   - `/connexion` - Login
   - `/inscription` - Signup
   - `/profil` - User profile

3. **Tables BDD déjà prêtes**
   - `users` existe déjà
   - `favorites` prête pour les favoris
   - `reviews` prête pour les avis

4. **Fonctionnalités**
   - Inscription/Connexion
   - Session persistante
   - Middleware de protection routes

**Branche suggérée :**
```bash
git checkout -b feature/authentication
```

### Phase 3 : Fonctionnalités CRUD (4-5h)
**Objectif :** Démontrer la maîtrise des opérations BDD

1. **Favoris (CRUD simple)**
   - POST `/api/favorites` - Ajouter un favori
   - DELETE `/api/favorites/[id]` - Retirer un favori
   - GET `/api/favorites` - Liste des favoris user
   - Page `/favoris` - Affichage grille

2. **Collections (CRUD complet)**
   - POST `/api/collections` - Créer
   - GET `/api/collections` - Lister
   - PUT `/api/collections/[id]` - Modifier
   - DELETE `/api/collections/[id]` - Supprimer
   - POST `/api/collections/[id]/films` - Ajouter film
   - Page `/collections` - Gestion

3. **Avis (CRUD avec validation)**
   - POST `/api/reviews` - Créer avis
   - PUT `/api/reviews/[id]` - Modifier
   - DELETE `/api/reviews/[id]` - Supprimer
   - Affichage dans page détail film

### Phase 4 : Features Avancées (3-4h)

1. **Recherche & Filtres**
   - Barre de recherche dans header
   - Filtres par réalisateur, année, note
   - Tri (date, note, alphabétique)

2. **Page Personnages**
   - `/personnages` - Liste complète
   - `/personnages/[id]` - Détail personnage + films

3. **SEO & Performance**
   - Metadata dynamique (title, description, OG)
   - Sitemap.xml
   - robots.txt
   - Optimisation images (blur placeholder)

### Phase 5 : Polish Final (2-3h)

1. **Screenshots pour README**
   - Homepage
   - Page détail
   - Page favoris
   - Responsive mobile

2. **Tests**
   - Test chaque endpoint
   - Test responsive sur mobile/tablette
   - Test performance Lighthouse (score 90+)

3. **Documentation finale**
   - Mise à jour README avec nouvelles features
   - Diagramme architecture
   - Guide de contribution

---

## 💼 Points Forts pour Portfolio

### Compétences Démontrées

**Frontend :**
- ✅ React moderne (Server Components, Suspense)
- ✅ TypeScript avancé (interfaces, types)
- ✅ Tailwind CSS (responsive, utility-first)
- ✅ Next.js 16 (App Router, API Routes)

**Backend :**
- ✅ Prisma ORM (relations complexes)
- ✅ PostgreSQL (modélisation relationnelle)
- ✅ API REST (CRUD, pagination)
- ✅ Migration de stack (PHP → Next.js)

**DevOps :**
- ✅ Git workflow (feature branches)
- ✅ Déploiement production (Vercel)
- ✅ Variables d'environnement
- ✅ CI/CD automatisé

**Soft Skills :**
- ✅ Documentation technique
- ✅ Architecture projet
- ✅ Résolution de problèmes
- ✅ Autonomie

### Argumentaire Recruteur

> "J'ai développé **Miyazaki Garden**, une encyclopédie interactive des films Studio Ghibli, dans le cadre d'une migration technique de PHP/MySQL vers **Next.js/PostgreSQL**. Le projet démontre ma capacité à :
> 
> - Architecturer une application **full-stack moderne** avec TypeScript
> - Concevoir un **schéma de base de données relationnel** (7 tables, relations complexes)
> - Implémenter des **Server Components** et API Routes Next.js
> - Déployer en **production sur Vercel** avec CI/CD
> - Documenter professionnellement le code et l'architecture
> 
> Le projet est **accessible en ligne** et le code est **open-source sur GitHub**."

---

## 🔗 Liens Importants

**Projet :**
- Production : https://miyazaki-garden-nextjs.vercel.app
- GitHub : https://github.com/hachwilliam89-spec/miyazaki-garden-nextjs
- Neon Dashboard : https://console.neon.tech
- Vercel Dashboard : https://vercel.com

**Documentation :**
- Next.js : https://nextjs.org/docs
- Prisma : https://www.prisma.io/docs
- Tailwind : https://tailwindcss.com/docs
- API Ghibli : https://ghibliapi.vercel.app

**Outils :**
- Prisma Studio : `npx prisma studio`
- Vercel CLI : https://vercel.com/docs/cli

---

## 📝 Notes Techniques

### Variable DATABASE_URL
```env
# Format Neon PostgreSQL
DATABASE_URL="postgresql://neondb_owner:password@ep-xxx.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require"
```

### Client Prisma Singleton
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Pattern Server Component avec Prisma
```typescript
// ✅ BON - Appel direct Prisma
async function getData() {
  const films = await prisma.film.findMany()
  return films
}

export default async function Page() {
  const films = await getData()
  return <div>{/* UI */}</div>
}

// ❌ MAUVAIS - Fetch vers localhost
async function getData() {
  const res = await fetch('http://localhost:3003/api/films')
  return res.json()
}
```

### Configuration Images Next.js
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org',
        pathname: '/t/p/**',
      },
    ],
  },
}
```

---

## 🎓 Apprentissages Clés

1. **Server Components > API Routes pour SSR**
   - Moins de latence
   - Meilleure performance
   - Code plus simple

2. **Prisma 6 vs Prisma 7**
   - V7 change la config (prisma.config.ts)
   - V6 plus stable pour production

3. **Vercel Environment Variables**
   - Toujours cocher les 3 environnements
   - Redéployer après modification

4. **Git Workflow**
   - Feature branches pour chaque fonctionnalité
   - Merge dans develop, puis main

5. **Documentation = Crédibilité**
   - README professionnel indispensable
   - Screenshots augmentent l'impact

---

## ✅ Checklist Avant Entretien

- [ ] Site accessible et fonctionnel
- [ ] README à jour avec screenshots
- [ ] Code propre et commenté
- [ ] Variables d'env configurées
- [ ] Pas d'erreurs console
- [ ] Responsive vérifié
- [ ] Performance OK (Lighthouse)
- [ ] URL dans CV/LinkedIn

---

## 🤝 Prochaine Session

**Priorité 1 : Design**
- Refonte avec palette vermillon/or
- Motifs asiatiques authentiques
- Améliorer l'impact visuel

**Priorité 2 : Authentification**
- NextAuth.js
- Pages login/signup
- Protection routes

**Priorité 3 : CRUD**
- Favoris
- Collections
- Avis

---

**Document créé le 01/02/2026**  
**Projet par Kim - UHA 4.0 Mulhouse**

---

*Ce document doit être conservé et consulté avant chaque session de travail sur le projet.*
