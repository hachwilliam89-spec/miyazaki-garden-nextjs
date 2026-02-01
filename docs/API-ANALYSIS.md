# Documentation API Studio Ghibli - Miyazaki Garden v2

## Date : 01/02/2026
**Projet** : Miyazaki Garden (Next.js)  
**Étudiant** : Kim  
**Formation** : Licence Pro Développement Full Stack - UHA 4.0

---

## API Principale : Films
**Endpoint** : `https://ghibliapi.vercel.app/films`

### Structure des données
```json
{
  "id": "2baf70d1-42bb-4437-b551-e5fed5a87abe",
  "title": "Castle in the Sky",
  "original_title": "天空の城ラピュタ",
  "description": "The orphan Sheeta inherited...",
  "director": "Hayao Miyazaki",
  "producer": "Isao Takahata",
  "release_date": "1986",
  "running_time": "124",
  "rt_score": "95",
  "people": ["https://ghibliapi.vercel.app/people/..."],
  "species": ["https://ghibliapi.vercel.app/species/..."],
  "locations": ["https://ghibliapi.vercel.app/locations/..."],
  "vehicles": ["https://ghibliapi.vercel.app/vehicles/..."],
  "url": "https://ghibliapi.vercel.app/films/2baf70d1-...",
  "image": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/..."
}
```

### Champs utilisés
- **id** : Identifiant unique (UUID)
- **title** : Titre anglais
- **original_title** : Titre japonais
- **description** : Synopsis complet
- **director** : Réalisateur
- **producer** : Producteur
- **release_date** : Année de sortie
- **running_time** : Durée en minutes
- **rt_score** : Note Rotten Tomatoes
- **image** : URL de l'affiche
- **people** : Tableau d'URLs vers les personnages

---

## API Secondaire : Personnages (People)
**Endpoint** : `https://ghibliapi.vercel.app/people`

### Structure des données
```json
{
  "id": "ba924631-068e-4436-b6de-f3283fa848f0",
  "name": "Ashitaka",
  "gender": "Male",
  "age": "late teens",
  "eye_color": "Brown",
  "hair_color": "Brown",
  "films": ["https://ghibliapi.vercel.app/films/..."],
  "species": "https://ghibliapi.vercel.app/species/...",
  "url": "https://ghibliapi.vercel.app/people/ba924631-..."
}
```

### Champs utilisés
- **id** : Identifiant unique
- **name** : Nom du personnage
- **gender** : Genre (Male/Female/NA)
- **age** : Âge
- **eye_color** : Couleur des yeux
- **hair_color** : Couleur des cheveux
- **films** : Tableau d'URLs des films où il apparaît

---

## Relations entre les APIs

### 1. Films → Personnages (One-to-Many)
Un film contient plusieurs personnages via `film.people[]`

### 2. Personnages → Films (Many-to-Many)
Un personnage peut apparaître dans plusieurs films via `person.films[]`

---

## Objectif du Site : Miyazaki Garden v2

### Concept
Encyclopédie interactive et moderne des films Studio Ghibli avec gestion de favoris, collections personnalisées et système d'avis.

### Fonctionnalités Principales

**Public (non authentifié) :**
1. Consultation de tous les films Ghibli avec pagination
2. Détail complet d'un film (synopsis, réalisateur, année, durée, note)
3. Liste des personnages d'un film avec leurs caractéristiques
4. Recherche et filtres (par réalisateur, année, note)
5. Design responsive et moderne inspiré de l'univers Ghibli

**Authentifié (utilisateur connecté) :**
6. Ajout de films en favoris
7. Création de collections thématiques personnalisées
8. Ajout d'avis et notes personnelles sur les films
9. Profil utilisateur avec statistiques

**Admin :**
10. Dashboard de statistiques
11. Modération des avis utilisateurs
12. Gestion des utilisateurs

### Arborescence du Site
```
/                           → Accueil : grille de films (avec pagination)
/films                      → Liste complète des films
/films/[id]                 → Détail d'un film + personnages associés
/personnages                → Liste complète des personnages
/personnages/[id]           → Détail d'un personnage + films associés
/favoris                    → Films favoris (authentifié)
/collections                → Collections personnalisées (authentifié)
/collections/[id]           → Détail d'une collection (authentifié)
/profil                     → Profil utilisateur (authentifié)
/connexion                  → Page de connexion
/inscription                → Page d'inscription
/admin                      → Dashboard admin (admin)
/admin/avis                 → Modération des avis (admin)
/admin/utilisateurs         → Gestion utilisateurs (admin)
```

### Technologies Utilisées

**Frontend :**
- Next.js 15 (App Router)
- React Server Components
- TypeScript
- Tailwind CSS
- Framer Motion (animations)

**Backend :**
- Next.js API Routes
- Prisma ORM
- PostgreSQL

**Authentification :**
- NextAuth.js (ou Clerk)

**Déploiement :**
- Vercel (frontend)
- Neon/Supabase (PostgreSQL)

---

## Points Clés pour le Portfolio

✅ Migration d'un projet PHP/MySQL vers Next.js/PostgreSQL  
✅ Architecture moderne (App Router, Server Components)  
✅ TypeScript pour la robustesse du code  
✅ API REST consommée et stockée en BDD  
✅ CRUD complet (favoris, collections, avis)  
✅ Authentification et gestion des rôles  
✅ Design inspiré de l'univers Ghibli  
✅ SEO optimisé avec metadata dynamique  
✅ Responsive design (mobile-first)