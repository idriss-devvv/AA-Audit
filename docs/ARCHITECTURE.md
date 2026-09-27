# Architecture

## Vue d'ensemble

1. **Upload** : le client dépose une fiche de paie (PDF ou export logiciel) via `/api/payslips/upload`.
2. **Extraction** : `src/lib/parsers` transforme le fichier brut en données structurées (`PayslipData`).
3. **Analyse** : `src/lib/rules` applique la base de règles de contrôle et produit une liste d'`Anomaly`.
4. **Stockage** : les fiches, employés et anomalies sont persistés dans Supabase (PostgreSQL, schéma dans `supabase/migrations`).
5. **Restitution** : le tableau de bord (`/dashboard`) affiche les anomalies détectées par fiche/employé.

## Décisions techniques

- **Next.js App Router** : un seul déploiement Vercel pour le frontend et les API routes.
- **Supabase (PostgreSQL + RLS)** : modèle relationnel simple (Company → Employee → Payslip → Anomaly), facile à faire évoluer.
- **Moteur de règles découplé** (`src/lib/rules`) : chaque règle est une fonction pure et testable indépendamment, pour ajouter facilement de nouvelles règles de conformité (URSSAF, conventions collectives, etc.).

## À décider

- Solution d'authentification (NextAuth, Clerk, ...).
- Stockage des fichiers uploadés (Vercel Blob, S3...).
- Méthode d'extraction des PDF (parsing texte vs OCR pour les fiches scannées).
