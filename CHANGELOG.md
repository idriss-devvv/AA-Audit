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

## 2026-09-28

### Cas maladie et contrôle des IJSS
- Lecture de l'arrêt sur le bulletin : absence (jours / heures, retenue),
  IJSS (montant, nombre de jours), subrogation, complément employeur,
  origine professionnelle.
- IJSS : 50 % du salaire journalier de base (3 derniers salaires bruts du
  salarié, plafonnés à 1,4 SMIC depuis le 01/04/2025, / 91,25).
- Maintien de salaire : complément attendu selon l'ancienneté et la durée,
  minimum légal (90 % puis 66,66 %, carence 7 j) ou règles de la convention
  collective quand elle est intégrée (table cc_sick_pay) ; niveau du
  complément comparé au pourcentage garanti.
- Paramètres IJSS et maintien légal ajoutés à la veille réglementaire datée.

### Paramètres : onglet « Conventions collectives »
- Liste des conventions intégrées (IDCC, nom, secteur, effectifs couverts),
  dernier texte de salaires avec sa date d'effet et date de la dernière mise
  à jour des critères.

### Réduction générale dégressive unique (RGDU 2026)
- Contrôle de la réduction générale des cotisations patronales selon la
  formule de l'article D241-7 CSS en vigueur (décret n° 2026-509 du
  12 juin 2026) : Tmin 0,02, Tdelta 0,3781 / 0,3821 selon le taux FNAL,
  exposant 1,75, seuil 3 SMIC (SMIC au 1er janvier 2026).
  Réduction manquante sous 3 SMIC, réduction indue au-delà, montant éloigné
  du coefficient mensuel (le calcul reste annuel, régularisé chaque mois).
- 2026 : les taux réduits maladie (7 %) et allocations familiales (3,45 %)
  sont intégrés à la RGDU ; paramètres clos au 31/12/2025 et taux réduit
  appliqué en 2026 signalé.
- Paramètres ajoutés à la veille réglementaire datée (modifiables).
- Les bulletins de test (mars 2026, construits sur les règles 2025) sont
  désormais signalés sur ces points : à régénérer avec les règles 2026.

### Cotisations patronales, mutuelle et veille réglementaire
- Référentiel réglementaire daté (`regulatory_parameters`), géré dans
  l'Administration (« Veille réglementaire ») : chaque évolution s'ajoute
  avec sa date d'effet et sa source, les fiches antérieures gardent
  l'ancienne valeur. Valeurs initiales sourcées (CSS L911-7, D242-3,
  L241-6-1, ANI prévoyance cadres 2017).
- Nouveaux contrôles : taux réduit maladie (seuil 2,25 SMIC depuis 2025) et
  allocations familiales (3,5 SMIC), taux AT/MP notifié (saisi dans
  Paramètres), complémentaire santé (présence, part patronale ≥ 50 %),
  prévoyance des cadres (≥ 1,50 % de la tranche 1).
- Lecteur PDF : part patronale de chaque ligne de cotisation.

### Net imposable, montant net social et tranches de cotisations
- Net imposable recalculé : net avant impôt + CSG non déductible et CRDS,
  + part patronale de complémentaire santé, − heures supplémentaires
  exonérées (CGI art. 79, 81 quater, 83).
- Montant net social lu sur le bulletin et contrôlé (jamais supérieur au
  brut, cohérent avec le net avant impôt — décret du 20 novembre 2023).
- Tranches : bases T1 / vieillesse plafonnée limitées au PMSS, base T2 =
  brut − 1 PMSS (jusqu'à 8 PMSS), tranche 2 manquante au-dessus du plafond.
- Lecteur PDF : montant net social, parts salariale et patronale santé.
- Vérifié sur les 3 bulletins de test : aucun faux positif.

### Paiement Stripe : prix réels et webhook d'activation
- Checkout rattaché à l'entreprise (client_reference_id, métadonnées) ;
  visiteur non connecté renvoyé vers l'inscription avec la formule choisie.
- Prix lus dans les variables `STRIPE_PRICE_STARTER / PRO / ENTREPRISE`.
- Webhook `/api/stripe/webhook` (signature vérifiée) : activation de la
  formule après paiement, changement, résiliation, impayé (alerte).
- Notice de configuration : `docs/STRIPE.md`.

### Notifications intégrées et alertes essentielles
- Cloche de notifications dans l'en-tête (non lues, tout marquer comme lu,
  rafraîchie chaque minute) et encart « Alertes » sur le tableau de bord.
- Alertes créées à l'import : anomalie critique, fiche non analysée, 80 %
  puis 100 % de la limite de fiches. Destinataires : les utilisateurs de
  l'entreprise et du cabinet qui la gère (fonction `notify_company`).
- Table `notifications` (RLS : chacun ne voit que les siennes).

### Écart N / N-1
- Nouvelle catégorie de contrôles « Écart N / N-1 » : chaque fiche est
  comparée à la fiche précédente du même salarié — variation du brut et du
  net au-delà du seuil réglable (20 % par défaut), baisse du salaire de base
  à horaire égal, taux de cotisation modifié en cours d'année.
- Les éléments qui expliquent une variation (heures, heures supplémentaires,
  arrêt, changement de classification) sont cités et abaissent la gravité.

### Seuils de tolérance configurables
- Les écarts tolérés par la détection d'anomalies sont réglables par
  entreprise (Paramètres › Calcul et barèmes) : montant recalculé, marge sous
  le SMIC / minimum conventionnel, taux de cotisation, congés payés, écart
  relatif sur cotisation paramétrée, ratio net / brut, variation N / N-1.
- Valeurs par défaut inchangées (module `src/lib/rules/tolerances.ts`) ;
  colonne `company_pay_settings.tolerances` (jsonb).

### Bouton d'aide / assistance vers le cabinet
- Bouton « Aide » dans l'en-tête de l'espace /app : coordonnées du cabinet
  (nom, e-mail, téléphone, lien, horaires), jamais celles de l'éditeur.
- Coordonnées réglables dans l'Administration (table `platform_settings`,
  modification réservée au back-office). Sans réglage : lien vers Contact.

### Conventions collectives : les 20 du cahier des charges
- Registre aligné sur la liste V1 du cahier des charges (20 conventions,
  21 codes IDCC) : ajout de Prévention et sécurité (1351), Bâtiment cadres
  (2420), Travaux publics ouvriers (1702) et ETAM (2614), Commerce de détail
  non alimentaire (1517), Assurances (1672), Industrie pharmaceutique (176),
  Pharmacie d'officine (1996) ; retrait de Restauration rapide (1501),
  Boulangerie (843), Experts-comptables (787), Enseignement privé (3211).
- Critères sourcés (article Légifrance par règle) importés pour les 12
  conventions qui n'en avaient pas : textes, classifications, minima,
  ancienneté, primes, durée du travail, majorations, congés, maintien de
  salaire (~1 200 lignes, migrations `20260928130000…130012`).
- BTP ouvriers / ETAM : minima régionaux non intégrés (champ manuel des
  Paramètres) ; Transports routiers : barèmes voyageurs 2026 et
  marchandises (dernier barème étendu, 12/2023).
- Moteur de contrôle : 7 nouvelles grilles nationales (1351, 1517, 1996,
  176, 1672, 2420, 16), grilles 1501 et 843 retirées.
- Outils d'import KALI versionnés dans `scripts/cc-rules/`.

### Rôles simplifiés, limite de fiches personnalisée, invitations
- Trois rôles : **Super admin** (développeurs, tous les droits, nomment les
  admins), **Admin** (propriétaires du SaaS : back-office) et **Client**
  (accès selon la formule Free / Starter / Pro / Entreprise). Les anciens
  rôles admin → super admin, gestionnaire → admin.
- Limite de fiches personnalisable par compte depuis l'Administration
  (colonne `subscriptions.custom_quota`, vide = limite de la formule),
  appliquée par la base (trigger `enforce_payslip_quota`).
- Ajout d'un utilisateur depuis l'Administration : e-mail d'invitation,
  formule, limite et rôle (nécessite `SUPABASE_SERVICE_ROLE_KEY`).
- Migration `20260928120000_super_admin_custom_quota.sql`.

## 2026-09-27

### Expérience utilisateur : fiches de paie centralisées
- Nouvelle page « Fiches de paie » qui réunit l'historique et les anomalies :
  recherche, filtres par salarié, période, gravité et statut, panneau de
  détail avec le bulletin d'origine, les anomalies et les actions.
- Bouton « œil » pour voir la fiche de paie d'origine (lien signé temporaire)
  sur le tableau de bord, la liste des fiches et la page salarié ; rapport de
  contrôle affiché à côté du bulletin.
- Suppression d'une fiche (fichier et données effacés, fiche toujours comptée
  dans le quota).
- Fiches en erreur : cause lisible (PDF scanné, protégé, illisible).
- Doublons : un fichier déjà importé est signalé, avec « Voir la fiche
  existante » ou « Importer quand même ».
- Photos et scans (JPG, PNG) : statut « Analyse bientôt disponible », non
  décomptés du quota.
- Tableau de bord : import en haut, anomalies critiques mises en avant avec
  accès direct, dernières fiches avec salarié, période et anomalies.
- Navigation : « Tableau de bord », « Fiches de paie » ; barre de navigation
  en bas de l'écran sur mobile ; menu compte unique (paramètres, abonnement,
  déconnexion). Utilisateur (compte connecté) et salarié (personne de la
  fiche) clairement distingués.
- Base : colonnes file_hash, error_message, deleted_at ; lecture des fichiers
  ouverte à toute l'entreprise (collègues, cabinet).

### Critères de contrôle des 11 conventions collectives
- Base alimentée pour les 11 conventions du registre : Syntec (1486),
  Métallurgie (3248), Commerces de gros (573), HCR (1979), Restauration
  rapide (1501), Commerce alimentaire (2216), Services de l'automobile (1090),
  Immobilier (1527), Propreté (3043), Banque (2120), Boulangerie-pâtisserie
  artisanale (843).
- Critères couverts : classifications, minima, ancienneté, primes, durée du
  travail, majorations, indemnités, cotisations, congés, maintien de salaire.
- Règles relevées dans la base officielle **KALI** (DILA / Légifrance) ;
  chaque règle cite son article source.
- Migrations `20260927140001` à `20260927140011_cc_rules_idcc_*`.

### Import : convention sans critères
- Message « Convention non disponible pour le moment. » affiché à l'import
  quand la convention détectée n'a pas de critères stockés.

### Corrections des grilles de minima conventionnels
- Commerce alimentaire (2216) : comparaison au **salaire mensuel minimum
  garanti** de l'avenant n° 99 (pauses payées incluses) au lieu du taux de
  base, trop bas (1A 1 914,19 € … 8 3 996,47 €).
- Banque (2120) : minimum annuel divisé par **13** (salaire de base versé en
  13 mensualités) au lieu de 12.
- Commerces de gros (573) : ajout des niveaux cadres **VII à X** (minima
  annuels au 01/03/2026, de VII-1 30 338,30 € à X-2 78 210,61 €).

### Référentiel des critères de vérification des conventions collectives
- Migration Supabase `collective_agreement_rules` : 11 tables rattachées au
  registre `collective_agreements`, **créées vides** (aucune donnée saisie) :
  `cc_texts` (textes sources), `cc_classifications`, `cc_salary_minimums`,
  `cc_seniority_bonuses`, `cc_bonuses` (13e mois, primes), `cc_working_time`
  (durée, équivalences, forfaits, temps partiel), `cc_pay_increases`
  (heures sup/complémentaires, nuit, dimanche, fériés, astreintes),
  `cc_allowances` (repas, déplacements, outillage…), `cc_contributions`
  (prévoyance, mutuelle, formation, CFA…), `cc_leave_rules`, `cc_sick_pay`
  (maintien de salaire).
- Chaque règle est datée (`valid_from` / `valid_to`) pour contrôler une fiche
  avec les règles en vigueur à sa période, sourcée (`source_text_id`,
  `verified_at`) et ciblable par catégorie de salariés ou niveau.
- Lecture pour les utilisateurs connectés, écriture réservée au back-office
  (admin + gestionnaire). Le moteur de contrôle ne lit pas encore ces tables.

## 2026-09-26

### Rôles, formules et back-office
- Rôles : **admin** (accès complet, nomme les gestionnaires), **gestionnaire**
  (back-office : comptes, formules, blocage des clients), **client**.
- Formules : Free (1 fiche d'essai, anomalies masquées sauf la première),
  Starter 30 € (30 fiches/mois), Pro 100 € (150 fiches/mois + onglet Salariés),
  Entreprise 500 € (illimité + onglet Sociétés + Salariés dans chaque société).
- Quotas appliqués par la base (trigger `enforce_payslip_quota`) et vérifiés à
  l'import avec un message clair ; blocage d'un utilisateur = plus aucun accès
  aux données (fonction `accessible_company_ids`).
- Sécurité : un utilisateur ne peut plus modifier sa ligne de profil (rôle,
  blocage) ; fonctions du back-office en security definer vérifiant le rôle.
- Back-office `/app/admin` : chiffres clés, liste des comptes, changement de
  formule, blocage, changement de rôle (admin).
- Onglet Salariés (`/app/salaries`) : salariés reconnus par le nom lu sur le
  bulletin, détail par salarié, ajout manuel ; lecture du nom du salarié
  corrigée (ne capture plus « Employeur »).
- Onglet Sociétés réservé à la formule Entreprise ; inscription sans choix de
  type de compte (la formule se choisit au paiement) ; onglet Abonnement avec
  jauge de consommation et les 4 formules ; grille tarifaire à 4 formules.
- Migration : `supabase/migrations/20260926120000_roles_plans_quotas.sql`.

### Refonte des pages par public (UI / UX, animations)
- Hero en deux colonnes avec une illustration animée propre à chaque public
  (bulletin contrôlé, tableau de bord, liste de clients) et une note flottante.
- Bandeau de chiffres clés animés (contrôles, conventions, PMSS, SMIC) — la
  vraie valeur reste rendue côté serveur pour les moteurs et les IA.
- Cartes avec icônes et apparition en cascade, frise « Comment ça marche »
  reliée, appel à l'action en dégradé ; section « Ce que nous vérifions »
  modernisée (icônes, grille 4 colonnes), partagée avec l'accueil.
- Animations désactivées si l'utilisateur préfère un mouvement réduit.

### Landing page : conversion, confiance, SEO et GEO
- Boutons « Essayer A&A Audit » vers `/inscription` (au lieu du tableau de
  bord, qui renvoyait les visiteurs sans compte vers la connexion).
- Promesses alignées sur le produit : formule Pro (multi-clients, barèmes
  propres), réassurance « Données stockées en France », FAQ mise à jour,
  aperçu du hero sur un contrôle entièrement automatique.
- Section « Ce que nous vérifions » : contrôles et sources officielles, chiffres
  lus dans le référentiel légal du moteur (PMSS, SMIC, conventions).
- Pages par public : `/verifier-ma-fiche-de-paie`, `/entreprises`,
  `/cabinets-comptables` (réponse directe en tête, FAQ et fil d'Ariane en
  données structurées).
- SEO technique : sitemap sans ancres ni pages de compte, directive `host`
  retirée, connexion / inscription en `noindex`, vérification Google Search
  Console par variable d'environnement, Vercel Analytics (sans cookies).

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
