# A&A Audit — SaaS de contrôle des fiches de paie

SaaS qui vérifie et contrôle les fiches de paie pour détecter les anomalies et les erreurs (cotisations, taux, plafonds, cumuls, conventions collectives, etc.).

## Stack

- **Framework** : Next.js 14+ (App Router) + TypeScript
- **Style** : Tailwind CSS
- **Authentification + base de données** : Supabase (Postgres + Auth, email/mot de passe et Google)
- **Paiement** : Stripe Checkout (abonnements)
- **Déploiement** : Vercel
- **Suivi** : GitHub (repo à créer) + Notion (espace « PayAudit — Espace de pilotage MVP », nom historique)

## Configuration requise avant mise en ligne complète

1. **Google OAuth** : dans le Dashboard Supabase → Authentication → Providers → Google,
   activer le provider et renseigner un Client ID / Secret créés sur Google Cloud Console
   (URL de redirection à autoriser : `https://<votre-projet>.supabase.co/auth/v1/callback`).
2. **Stripe** : créer les produits/prix (Starter 30€, Pro 100€) dans le Dashboard Stripe,
   puis remplacer les `priceId` de démonstration dans `src/app/page.tsx` par les vrais
   Price IDs. Renseigner `STRIPE_SECRET_KEY` dans les variables d'environnement Vercel.
3. **Variables d'environnement Vercel** : `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `STRIPE_SECRET_KEY` (voir `.env.example`).

## Démarrage

```bash
npm install
cp .env.example .env
npx prisma generate
npm run dev
```

Le site tourne ensuite sur http://localhost:3000

## Structure du projet

```
src/
  app/                  Routes (App Router)
    page.tsx            Page d'accueil
    dashboard/          Tableau de bord client
    api/
      payslips/upload/  Endpoint d'upload d'une fiche de paie
      analyze/          Endpoint de lancement de l'analyse d'anomalies
  components/ui/        Composants d'interface réutilisables
  lib/
    db.ts               Client Prisma
    parsers/            Extraction des données depuis un PDF/fichier de paie
    rules/              Moteur de règles de détection d'anomalies
  types/                Types partagés (Payslip, Anomaly, ...)
prisma/
  schema.prisma         Modèle de données
docs/
  ARCHITECTURE.md        Choix techniques et flux de données
  ROADMAP.md             Étapes du MVP
```

## Prochaines étapes

1. `npm install` en local puis vérifier que `npm run dev` fonctionne.
2. Créer le dépôt GitHub et pousser ce dossier (`git init`, `git remote add origin ...`, `git push`).
3. Connecter le dépôt à Vercel pour le déploiement continu.
4. Provisionner une base PostgreSQL (Vercel Postgres, Supabase ou Neon) et renseigner `DATABASE_URL` dans `.env`.
5. Implémenter le parsing des fiches de paie (`src/lib/parsers`) et les premières règles de contrôle (`src/lib/rules`).

Le détail des tâches réalisées est suivi dans la page Notion **« Journal des réalisations »** de l'espace **PayAudit — Espace de pilotage MVP** (nom historique).
