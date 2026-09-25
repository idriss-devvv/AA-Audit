# Changelog — PayAudit

Ce fichier retrace l'historique des modifications apportées au projet.

**Méthode et limites (à lire avant de s'en servir pour le versionning) :**
Le projet a été développé sans dépôt Git jusqu'ici (déploiements manuels vers
Vercel). Pour reconstituer un historique fiable, les horodatages ci-dessous
proviennent de deux sources vérifiables et non de la mémoire de l'assistant :
- les déploiements Vercel du projet (`payaudit`), horodatés à la seconde ;
- les migrations Supabase, horodatées à la seconde (nom de fichier
  `YYYYMMDDHHMMSS_nom.sql`).

Tous les horodatages sont en **UTC**. Le contenu fonctionnel de chaque entrée
est reconstitué à partir du code livré à chaque déploiement/migration ; pour
les plages où plusieurs déploiements se sont succédé rapidement sans qu'un
détail plus fin soit disponible, les entrées sont regroupées et le
regroupement est signalé explicitement plutôt que d'inventer une granularité
qui n'existe pas. Tout ce qui précède la mise en place du suivi détaillé
(tâches numérotées) est reconstitué uniquement à partir de l'état du code et
du fichier `docs/ROADMAP.md`, pas d'un historique conversationnel complet.

À partir de maintenant, la mise en place d'un dépôt Git (voir tâche en cours)
permettra d'avoir un historique de commits exact et definitif — ce fichier
sert de socle de départ pour ce dépôt.

---

## 2026-09-26

### Changement de nom : PayAudit devient A&A Audit
- Nom remplacé dans tout le site : logo, textes, titres de pages et
  métadonnées SEO (`SITE_NAME`), icône d'onglet et image de partage,
  pages légales, e-mail de confirmation, exports Excel, documentation.
- Titre de la page d'accueil désormais préfixé par le nom de la marque.
- Inchangés (identifiants techniques non visibles) : dépôt GitHub
  `PayAudit`, projet Vercel `payaudit` et ses adresses, nom du paquet npm.
  Les entrées plus anciennes de ce fichier gardent l'ancien nom.

## 2026-09-24

### Grilles de salaires minimaux conventionnels + SMIC
- Référentiel `src/lib/rules/referentiels/grilles-conventionnelles.ts` : 11
  grilles relevées sur Légifrance (dernier avenant « salaires » étendu de
  chaque branche) — Syntec, Métallurgie, Commerce de gros, HCR, Restauration
  rapide, Commerce alimentaire, Services de l'automobile, Immobilier,
  Propreté, Banque, Boulangerie. Chaque grille est datée et sourcée ; le
  minimum le plus bas est retenu quand plusieurs s'appliquent à un niveau.
- Lecture de la classification sur la fiche (coefficient, niveau/échelon,
  classe d'emploi…) et du salaire de base (montant, heures).
- Nouvelle règle `baremes.minimum-conventionnel` : rémunération comparée au
  plus élevé du minimum de la grille (proratisé au temps de travail) et du
  SMIC (11,88 € → 12,02 € au 01/01/2026 → 12,31 € au 01/06/2026).
- Non intégrées (grilles régionales, par activité ou texte ambigu) :
  Bâtiment (1596, 1597, 2609), Transports routiers (16),
  Experts-comptables (787), Enseignement privé (3211) — le champ manuel
  « Salaire minimum conventionnel » reste leur solution de repli.

### Lecture des PDF ligne par ligne (correctif)
- `extractText` (unpdf, `mergePages`) remplaçait tous les retours à la ligne
  par des espaces : la lecture ligne à ligne des cotisations était inopérante
  sur les vrais PDF. Nouvelle extraction `src/lib/parsers/pdf-text.ts` qui
  reconstitue les lignes visuelles (position des fragments) et rattache les
  libellés sur deux lignes à leurs montants.
- Période de paie : « Période du jj/mm/aaaa » lue en priorité ; une date
  complète (date d'entrée) n'est plus prise pour la période.
- Validé sur 3 bulletins PDF fictifs 2026 : conforme (0 anomalie), taux de
  vieillesse plafonnée erroné (anomalie bloquante), solde de congés
  incohérent (anomalie mineure).

### Contrôles légaux issus de la base « Règles de contrôle » (Notion)
- 6 nouvelles règles (`src/lib/rules/catalog/controles-legaux.ts`) :
  cohérence du net à payer (brut − cotisations, puis − prélèvement à la
  source), majoration des heures supplémentaires (minimum légal 10 %, 25 %/50 %
  par défaut), taux de cotisations salariales URSSAF / Agirc-Arrco, plafond
  mensuel de la Sécurité sociale, mentions obligatoires (R3243-1), cohérence
  du solde de congés payés.
- Référentiel légal sourcé (`src/lib/rules/referentiels/legal.ts`) : PMSS
  2025 (3 925 €) et 2026 (4 005 €), taux salariaux 2025-2026 ; une période non
  couverte désactive le contrôle au lieu de réutiliser une autre année.
- Extraction enrichie : lignes base × taux = montant, heures supplémentaires,
  total des cotisations, net avant impôt, prélèvement à la source, mentions
  obligatoires, numéro IDCC. Correction : le montant d'une cotisation n'est
  plus confondu avec sa base, et le net à payer n'est plus confondu avec le
  net avant impôt.
- Convention collective détectée automatiquement sur chaque fiche (IDCC ou
  libellé rapproché du registre) ; suppression de la sélection manuelle dans
  Paramètres et de la règle qui comparait avec cette sélection.

### Refonte du design (UI uniquement)
- Nouvelle palette harmonisée gris graphite / beige sable / bleu encre
  (tokens `ink`, `beige`, `blue` dans `tailwind.config.ts`).
- Nouvelle typographie : Instrument Serif (titres) + Inter (interface),
  en remplacement de Plus Jakarta Sans.
- Classes utilitaires partagées dans `globals.css` (`btn-*`, `input`, `card`,
  `badge`, `eyebrow`, trames de fond) et composant `Logo`.
- Landing page, header, footer, pages d'authentification, contact et pages
  légales redessinés ; shell de l'application avec barre latérale iconée et
  navigation mobile ; tableau de bord, historique, anomalies, rapport,
  paramètres et clients restylés.
- Aucun changement fonctionnel (textes, routes, logique et données inchangés).

## 2026-09-23

### 00:39 UTC — Registre des conventions collectives prioritaires
- Migration Supabase `add_collective_agreements_registry` : nouvelle table
  `collective_agreements` (idcc_code, nom, secteur, note de couverture, date
  de vérification) pré-remplie avec 17 conventions collectives vérifiées
  manuellement (Syntec, HCR, Bâtiment, Commerce alimentaire, Banque,
  Métallurgie, Transports routiers, etc.) ; ajout des colonnes
  `collective_agreement_idcc` / `collective_agreement_custom_name` sur
  `company_pay_settings`.
- Nouvelle règle de contrôle `baremes.convention-collective-incoherente` :
  compare la convention détectée sur la fiche de paie à celle paramétrée pour
  l'entreprise (contrôle de cohérence textuelle, pas de barème chiffré).
- Sélecteur "Convention collective applicable" ajouté dans Paramètres
  (`pay-settings-form.tsx`), avec option de saisie libre si la convention
  n'est pas dans le registre.
- **Déploiement `dpl_GxbVx4fdnaV5txbd7c3us7RS2UJq`** — 2026-09-23 01:00 UTC.

*Contexte de la décision : à la demande initiale d'intégrer "toutes les
conventions collectives", une recherche a établi qu'il en existe ~1012 en
France sans API structurée pour les grilles de salaire (uniquement des
exports bruts KALI/DILA). Décision prise avec l'utilisateur de se limiter à
un registre de conventions prioritaires identifiées et vérifiées, sans coder
en dur de grille de salaire chiffrée (celles-ci varient par échelon, parfois
par région, et évoluent par avenants).*

---

## 2026-09-22

### 22:18 → 22:27 UTC — Barèmes de contrôle paramétrables (refonte)
- Migration `add_configurable_pay_control_settings` : nouvelles tables
  `company_pay_settings` (taux de CSG/CRDS non déductible, salaire minimum
  conventionnel) et `contribution_rate_settings` (taux de cotisation attendu
  par libellé), avec RLS scopées par entreprise.
- Extension du moteur de règles (`src/lib/rules`) pour accepter un
  `RuleContext` optionnel portant les valeurs paramétrées par le client.
- Nouvelles règles : `baremes.cotisation-ecart`, `baremes.cotisation-manquante`,
  `baremes.salaire-inferieur-minimum`, `baremes.net-imposable-a-verifier`,
  ainsi que `arrets-travail.mention-detectee` (détection texte d'un arrêt de
  travail / IJSS, sans calcul).
- Extraction enrichie du parseur de fiche de paie : net imposable, mention
  arrêt de travail/IJSS, détection élargie des lignes de cotisation.
- Page Paramètres enrichie d'une section "Barèmes de contrôle" (saisie
  manuelle uniquement, jamais de valeur légale préremplie).
- **Déploiement `dpl_EQfHVMPX74ig1DFhQbk46rMmMmGx`** — 22:27 UTC.

*Contexte : décision explicite de ne jamais coder en dur une valeur légale
(taux URSSAF, IJSS, réduction générale, barème conventionnel) sans source
officielle vérifiable — ces valeurs sont donc rendues configurables par le
client/l'expert-comptable plutôt que présumées.*

### 21:56 UTC — Export & rapport de contrôle
- Ajout d'exports Excel (librairie `exceljs`) pour l'historique des fiches de
  paie (`/api/export/payslips`) et pour les anomalies (`/api/export/anomalies`).
- Nouvelle page imprimable "Rapport de contrôle" par fiche de paie
  (`/app/historique/[id]`), avec mise en page dédiée à l'impression/export PDF
  navigateur et bouton d'impression.
- **Déploiement `dpl_H3otLwBneVsece2WMuCCdVVxVPfB`** — 21:56 UTC.

### 21:36 UTC — Support multi-cabinet / multi-client
- Migration `multi_tenant_cabinet_support` : permet à un compte "cabinet
  comptable" de gérer plusieurs entreprises clientes, avec sélecteur
  d'entreprise active et fonction RLS `accessible_company_ids()` déterminant
  les entreprises accessibles à un utilisateur.
- Migration `harden_security_definer_function_grants` (21:36 UTC) :
  durcissement des droits sur cette fonction `SECURITY DEFINER`.
- Ajout des pages/route associées : gestion des clients du cabinet, bascule
  entre entreprises, ajustement des policies RLS sur les tables existantes.

### 17:13 → 21:32 UTC — Mise en place de l'application (regroupé)
*Cette plage correspond à plusieurs déploiements successifs
(`dpl_6BqxpRRpp7tQs5aJXZs3skU6w6Fw`, `dpl_6hgUsuPHbmff71ci7dHEbpvC38jo`,
`dpl_7DU6VETNBcF5EWJt9q7WKuFg88Sk`, `dpl_GxddnRP5qh6QBZ4Jd1yX5cxpActz`,
`dpl_BsPEAcqzKo4aiV4PvsAVh3wWTPZ7`, `dpl_GFEU646D7EbmCFr6GxfWAZgwHeY5`,
`dpl_hxrMHbURvA3LAHqqmfWovEdxSmde`) pour lesquels le détail fonctionnel
précis de chaque déploiement individuel n'a pas été conservé — regroupés ici
plutôt que de leur attribuer un contenu inventé.* Fonctionnalités mises en
place sur cette période, d'après l'état du code :
- Dashboard applicatif (`/app/dashboard`), page historique des fiches
  (`/app/historique`), page anomalies (`/app/anomalies`).
- Moteur de règles initial : catégories `coherence`, `cotisations`, `conges`,
  `qualite-donnees`, `plausibilite`.
- Remplacement du moteur d'extraction PDF `pdf-parse` (abandonné, échoue sur
  de nombreux PDF réels) par `unpdf`.
- Composant d'upload de fiche de paie, page Paramètres (compte, abonnement).
- Un déploiement a brièvement porté le nom de projet Vercel
  `payaudit-saas` (`dpl_BsPEAcqzKo4aiV4PvsAVh3wWTPZ7`, 20:53 UTC) avant de
  revenir au nom `payaudit`.

### 13:18 UTC — Tentative de déploiement via GitHub (abandonnée)
- Un déploiement source Git (dépôt `idriss-devvv/Pay`, branche `main`) a été
  tenté (`dpl_Ape5k9MQvWnxkhhietnRYWmBUU9r`) et a échoué (`ERROR`). Le projet
  Vercel n'est actuellement **pas** connecté à un dépôt Git — les
  déploiements se font par upload direct de fichiers.

### 13:26 UTC — Ingestion des fiches de paie
- Migrations `payslips_uploader_scope_and_extraction_fields`,
  `subscriptions_plan_status_constraints`, `create_payslips_storage_bucket_and_policies`.
- Route d'upload de fiche de paie (`/api/payslips/upload`), bucket de
  stockage privé Supabase `payslips` avec policies RLS, route de paiement
  Stripe Checkout (`/api/checkout`, avec des `priceId` de démonstration —
  produits Stripe réels non créés à ce stade).

### 12:21 → 12:48 UTC — Corrections de démarrage
- Un premier déploiement a échoué (`dpl_8VPBk4rZpVfasr88j5GH4k5ew8it`,
  12:21 UTC), corrigé au déploiement suivant (`dpl_a1AEJ9q1b4DjUuNLZxZRtVuEG9em`,
  12:48 UTC).

### 12:06 → 12:12 UTC — Initialisation du projet
- Création du projet Next.js 14 + TypeScript + Tailwind CSS.
- Charte graphique (beige/bleu, typographie Plus Jakarta Sans), pages
  vitrine (accueil, contact, pages légales, tarifs).
- Migration `init_payaudit_schema` (12:12 UTC) : schéma Supabase initial —
  tables `companies`, `profiles`, `employees`, `payslips`, `anomalies`,
  `subscriptions`, avec Row Level Security.
- Premier déploiement Vercel (`dpl_6yw35XvinPgKgmazQbpDi2GLhRGC`, 12:06 UTC).

---

## Ce qui n'est pas encore fait

Voir `docs/ROADMAP.md` pour le suivi ; en résumé au 2026-09-23 : activation
du provider Google OAuth, produits Stripe réels + webhook d'activation
d'abonnement, protection des routes `/app/**` au niveau middleware, OCR pour
les fiches en image, réduction générale des cotisations patronales, dépôt
GitHub + CI/CD, domaine personnalisé, validation juridique des pages
légales.
