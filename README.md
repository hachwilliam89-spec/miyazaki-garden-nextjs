# 🎋 Miyazaki Garden

> Encyclopédie interactive des films du Studio Ghibli - Version moderne en Next.js

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791)

## 📖 À propos

**Miyazaki Garden** est une refonte moderne de mon projet fil rouge réalisé en PHP/MySQL durant ma formation à UHA 4.0. Ce projet démontre ma capacité à migrer une application legacy vers une stack technique moderne et performante.

### 🎯 Objectifs du projet

- **Migration technique** : PHP/MySQL → Next.js/PostgreSQL
- **Architecture moderne** : Server Components, API Routes, ORM Prisma
- **Full-stack TypeScript** : Type safety du front au back
- **Design inspiré** : Interface épurée inspirée de l'univers Studio Ghibli

## ✨ Fonctionnalités

### Actuelles
- 🎬 Consultation de tous les films Studio Ghibli (22 films)
- 📄 Page détail complète pour chaque film (synopsis, réalisateur, année, durée)
- 👥 Affichage des personnages par film avec leurs caractéristiques
- 📱 Design responsive (mobile, tablette, desktop)
- ⚡ Performance optimisée avec Next.js 16 et Server Components

### À venir
- 🔐 Authentification utilisateur (NextAuth.js)
- ⭐ Système de favoris
- 📚 Collections personnalisées
- 💬 Avis et notes utilisateurs
- 🔍 Recherche et filtres avancés

## 🛠️ Stack Technique

### Frontend
- **Next.js 16** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **React Server Components** - Rendu côté serveur optimisé

### Backend
- **Next.js API Routes** - API REST intégrée
- **Prisma ORM** - Object-Relational Mapping
- **PostgreSQL** - Base de données relationnelle (hébergée sur Neon)

### DevOps
- **Git/GitHub** - Versioning et collaboration
- **Vercel** - Déploiement et hosting (à venir)
- **Neon** - PostgreSQL serverless

## 📊 Architecture de la Base de Données

```
┌─────────────┐         ┌──────────────┐
│   Films     │────────<│   People     │
└─────────────┘         └──────────────┘
      │                        
      │                        
      ├─────────> Favorites
      │
      ├─────────> Reviews
      │
      └─────────> Collections
```

**7 tables principales :**
- `films` - Informations des films Ghibli
- `people` - Personnages des films
- `users` - Comptes utilisateurs
- `favorites` - Films favoris par utilisateur
- `reviews` - Avis et notes
- `collections` - Collections personnalisées
- `collection_films` - Table de liaison

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+
- npm ou yarn
- Compte Neon (PostgreSQL gratuit)

### 1. Cloner le projet

```bash
git clone https://github.com/hachwilliam89-spec/miyazaki-garden-nextjs.git
cd miyazaki-garden-nextjs
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

Créer un fichier `.env` à la racine :

```env
# PostgreSQL (Neon)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3003"
```

### 4. Initialiser la base de données

```bash
# Créer les tables
npx prisma db push

# Peupler avec les données Ghibli
npm run db:seed
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3003](http://localhost:3003)

## 📁 Structure du Projet

```
miyazaki-garden-nextjs/
├── app/
│   ├── api/              # API Routes
│   │   ├── films/        # Endpoints films
│   │   └── people/       # Endpoints personnages
│   ├── films/[id]/       # Page détail film
│   └── page.tsx          # Homepage (grille films)
├── components/
│   └── films/            # Composants réutilisables
├── lib/
│   └── prisma.ts         # Client Prisma
├── prisma/
│   ├── schema.prisma     # Schéma de BDD
│   └── seed/             # Scripts de peuplement
├── docs/
│   └── API-ANALYSIS.md   # Documentation API Ghibli
└── README.md
```

## 🌐 API Endpoints

### Films
- `GET /api/films` - Liste tous les films (avec pagination)
- `GET /api/films?page=1&limit=10` - Films paginés
- `GET /api/films/[id]` - Détails d'un film + personnages

### Personnages
- `GET /api/people` - Liste tous les personnages (avec pagination)
- `GET /api/people?page=1&limit=20` - Personnages paginés

## 📈 Évolution du Projet

### Version 1 (PHP/MySQL) - Projet Fil Rouge UHA 4.0
- Backend PHP natif
- MySQL avec PHPMyAdmin
- Frontend vanilla JS
- APIs internes de l'école

### Version 2 (Next.js/PostgreSQL) - Projet Portfolio
- ✅ Migration vers Next.js 16 + TypeScript
- ✅ PostgreSQL avec Prisma ORM
- ✅ API publique Studio Ghibli
- ✅ Server Components React
- ⏳ Authentification & CRUD
- ⏳ Design system personnalisé
- ⏳ Déploiement production

## 👨‍💻 Auteur

**Kim** - Étudiant en Licence Pro Développement Full Stack  
UHA 4.0 Mulhouse - Promotion 2026

- GitHub : [@hachwilliam89-spec](https://github.com/hachwilliam89-spec)
- Email : william.hach@uha.fr

## 📝 Licence

Projet académique - UHA 4.0

---

*Données fournies par l'[API Studio Ghibli](https://ghibliapi.vercel.app)*
