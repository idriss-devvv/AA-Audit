# Charte graphique — A&A Audit

Direction artistique : moderne, épurée, chaleureuse. Palette beige/bleu
pour installer la confiance (bleu) sans la froideur d'un SaaS classique
(beige = chaleur, lisibilité).

## Couleurs

Définies dans `tailwind.config.ts`, utilisables via les classes
`bg-beige-*`, `text-blue-*`, `text-ink-*`, etc.

### Beige — fond et neutres
| Token | Hex | Usage |
|---|---|---|
| beige-50 | `#FBF8F3` | Fond principal |
| beige-100 | `#F5EEE3` | Fond de sections, footer |
| beige-200 | `#EAE0CC` | Bordures, séparateurs |
| beige-300 | `#D8C7A1` | Accents secondaires, bordures actives |
| beige-400 | `#C3AC7C` | Accent fort (rare) |

### Bleu — marque et actions
| Token | Hex | Usage |
|---|---|---|
| blue-50 | `#EAF1F8` | Fond de sections bleues claires |
| blue-100 | `#D3E3F2` | Fond badges/état |
| blue-400 | `#5B84B1` | Accents, hover léger |
| blue-500 | `#2F5D8C` | Liens, icônes |
| blue-600 | `#1F3A5F` | Couleur de marque, CTA principal |
| blue-700 | `#152A45` | Hover des CTA |

### Texte
| Token | Hex | Usage |
|---|---|---|
| ink-900 | `#262420` | Titres, texte principal |
| ink-700 | `#3F3B34` | Texte de contenu |
| ink-500 | `#6B6459` | Texte secondaire, légendes |
| ink-300 | `#A69E8F` | Texte désactivé |

## Typographie

**Plus Jakarta Sans** (via `next/font/google`, chargée dans
`src/app/layout.tsx`), une sans-serif géométrique moderne qui reste très
lisible. Une seule famille est utilisée pour tout le site, avec des
graisses différentes :

- Titres (h1/h2) : `font-extrabold` ou `font-bold`
- Sous-titres, labels : `font-semibold`
- Corps de texte : `font-normal` / `font-medium`

## Principes de mise en page

- Beaucoup d'espace blanc (beige clair) autour des blocs de contenu —
  ne pas surcharger.
- Coins arrondis généreux (`rounded-2xl` sur les cartes, `rounded-full`
  sur les boutons) pour un rendu doux et moderne.
- Une seule ombre légère (`shadow-soft`) pour donner de la profondeur
  sans lourdeur.
- Le bleu est réservé aux éléments d'action et de confiance (CTA,
  liens, chiffres clés) ; le beige structure le fond.

## Composants de référence

- `src/components/layout/site-header.tsx` — en-tête du site vitrine
- `src/components/layout/site-footer.tsx` — pied de page
- `src/components/layout/marketing-shell.tsx` — wrapper header + footer
- `src/components/layout/legal-page.tsx` — gabarit des pages légales
- `src/app/app/layout.tsx` — en-tête minimal de l'application (dashboard)
