# Roadmap MVP

## Étape 1 — Fondations (fait)
- [x] Initialisation du projet Next.js + TypeScript + Tailwind
- [x] Structure des dossiers (app, lib, components, types, prisma)
- [x] Charte graphique (beige/bleu, typographie Plus Jakarta Sans)
- [x] Pages vitrine : accueil, contact, pages légales, tarifs
- [x] Premier déploiement Vercel

## Étape 2 — Comptes et paiement (fait, à finaliser côté fournisseurs)
- [x] Base de données Supabase créée (companies, profiles, employees, payslips, anomalies, subscriptions) + RLS
- [x] Pages Connexion / Inscription avec email+mot de passe et bouton Google
- [x] Grille tarifaire (Starter 30€, Pro 100€, Entreprise sur devis) + page contact entreprise
- [x] Route de paiement Stripe Checkout (`/api/checkout`)
- [ ] Activer le provider Google dans Supabase Auth (Google Cloud Console + Dashboard Supabase)
- [ ] Créer les vrais produits/prix dans Stripe et remplacer les `priceId` de démonstration
- [ ] Webhook Stripe pour mettre à jour `subscriptions` à la confirmation du paiement

## Étape 3 — Ingestion des fiches de paie
- [x] Bouton d'upload sur la page d'accueil (`/api/payslips/upload`)
- [ ] Stockage réel du fichier (Vercel Blob / S3)
- [ ] Extraction des données (parsing PDF ou OCR)
- [ ] Écriture en base Supabase (table `payslips`)

## Étape 4 — Moteur de règles
- [ ] Lister les règles de contrôle avec le client (cotisations, plafonds, heures, conventions collectives)
- [ ] Implémenter chaque règle dans `src/lib/rules`
- [ ] Tests unitaires sur le moteur de règles

## Étape 5 — Application (sous-domaine app.domaine.fr)
- [x] Sous-dossier `/app` avec layout dédié et page dashboard
- [x] Middleware de réécriture du sous-domaine + rafraîchissement de session Supabase
- [ ] Protéger les routes `/app/**` (redirection vers `/connexion` si non connecté)
- [ ] Dashboard connecté aux vraies données (fiches, anomalies par employé/période)

## Étape 6 — Mise en production
- [ ] Créer le dépôt GitHub et connecter Vercel pour les déploiements automatiques
- [ ] Configurer le sous-domaine `app.domaine.fr` une fois un nom de domaine choisi
- [ ] Faire valider les pages légales par un professionnel du droit
