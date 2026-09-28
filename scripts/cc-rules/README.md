# Import des critères de conventions collectives (tables `cc_*`)

Outils ayant servi à générer les migrations `supabase/migrations/20260928130001…` à partir de la base KALI (DILA / Légifrance).

1. Télécharger la base KALI dans ce dossier :
   `npm pack @socialgouv/kali-data@3.504.0 && tar -xzf socialgouv-kali-data-3.504.0.tgz` (crée `package/data`, ~190 Mo, non versionné).
2. Explorer une convention : `node k.js <idcc> list [filtre]`, `node k.js <idcc> text <KALITEXT…>`, `node k.js <idcc> grep <regex>`.
3. Décrire les règles dans `specs/<idcc>.js` : chaque règle cite automatiquement son article source (`cite`), les grilles sont lues dans les tableaux des avenants (`table`).
4. Générer le SQL : `node gen.js specs/<idcc>.js out/<idcc>.sql`, puis la forme compacte : `node compact.js out/<idcc>.sql compact/<idcc>.sql <idcc>`.

À refaire à chaque nouvel avenant de salaires (nouvelle ligne datée, l'ancienne reçoit une date de fin) — et mettre à jour `src/lib/rules/referentiels/grilles-conventionnelles.ts`, utilisé par le moteur de contrôle.
