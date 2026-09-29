# Paiement en ligne (Stripe)

Le code est prêt : il reste à brancher le compte Stripe du cabinet.

## 1. Créer les 3 produits (Dashboard Stripe › Catalogue de produits)

| Formule | Prix mensuel HT | Prix annuel HT (2 mois offerts) | Variables Vercel |
|---|---|---|---|
| Starter | 49 € | 490 € | `STRIPE_PRICE_STARTER`, `STRIPE_PRICE_STARTER_ANNUAL` |
| Pro | 149 € | 1 490 € | `STRIPE_PRICE_PRO`, `STRIPE_PRICE_PRO_ANNUAL` |
| Cabinet | 249 € | 2 490 € | `STRIPE_PRICE_ENTREPRISE`, `STRIPE_PRICE_ENTREPRISE_ANNUAL` |

Pour chaque produit : un prix récurrent mensuel et un prix récurrent annuel, puis copier
les identifiants `price_…`. La formule Cabinet garde l'identifiant technique `entreprise`.
L'offre Entreprise (au-delà de 300 fiches) est sur devis : pas de prix Stripe.

## 2. Déclarer le webhook (Développeurs › Webhooks)

- URL : `https://<domaine>/api/stripe/webhook`
- Événements : `checkout.session.completed`, `customer.subscription.created`,
  `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
- Copier le secret de signature `whsec_…`.

## 3. Variables d'environnement Vercel

`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, les six `STRIPE_PRICE_*` ci-dessus, et `SUPABASE_SERVICE_ROLE_KEY` (le webhook met à jour la table
`subscriptions` sans session utilisateur). Redéployer ensuite.

La protection Vercel (Vercel Authentication) doit laisser passer `/api/stripe/webhook`,
sinon Stripe reçoit une erreur 401 : la désactiver en production ou ajouter une exception.

## 4. Portail client (Paramètres › Facturation › Portail client)

À activer pour que le bouton « Gérer mon abonnement » ouvre le portail Stripe
(changement de formule, moyen de paiement, factures, résiliation).

## Fonctionnement

1. Le client clique sur « S'abonner » : session Checkout rattachée à son entreprise.
2. Après paiement, le webhook active la formule (table `subscriptions`) : quotas et onglets
   se débloquent aussitôt.
3. Changement de formule, résiliation ou impayé : le webhook met la formule et le statut à jour ;
   un impayé déclenche une alerte dans l'application.
