# Confirmation de l'adresse e-mail (code à 6 chiffres)

À l'inscription, Supabase envoie un e-mail contenant un **code à 6 chiffres**
(et un lien de secours). L'utilisateur saisit le code sur la page
d'inscription ; un code valide confirme l'adresse, ouvre la session et
redirige vers le tableau de bord.

Côté code (déjà en place) :
- `src/components/auth/email-code-step.tsx` — saisie du code
  (`supabase.auth.verifyOtp`, type `email`) et bouton « Renvoyer le code »
  (`supabase.auth.resend`, limité à un envoi par minute) ;
- `src/components/auth/auth-form.tsx` — affiche cette étape après
  l'inscription, et aussi quand un utilisateur tente de se connecter avec une
  adresse jamais confirmée (un nouveau code lui est alors envoyé) ;
- `src/app/auth/callback/route.ts` — gère le lien de secours.

Le modèle d'e-mail et les réglages se font dans le **dashboard Supabase**
(projet `payaudit`) : ils ne sont pas pilotés par le dépôt.

## 1. Activer la confirmation

Authentication → Sign In / Providers → **Email** :
- « Confirm email » : **activé** ;
- « Email OTP Length » : **6** ;
- « Email OTP Expiration » : **3600** secondes (1 heure, comme indiqué dans l'e-mail).

## 2. Installer le modèle d'e-mail

Authentication → **Email Templates** → **Confirm signup** :
- **Subject** : `Votre code de confirmation A&A Audit : {{ .Token }}`
- **Message body** : coller le contenu de
  [`supabase/templates/confirmation-inscription.html`](../supabase/templates/confirmation-inscription.html),
  puis enregistrer.

Variables utilisées : `{{ .Token }}` (le code), `{{ .ConfirmationURL }}`
(lien de secours), `{{ .Email }}`.

## 3. Vérifier les URL

Authentication → **URL Configuration** :
- **Site URL** : l'adresse de production (aujourd'hui
  `https://payaudit-pay18.vercel.app`, puis le nom de domaine définitif) ;
- **Redirect URLs** : ajouter `https://payaudit-pay18.vercel.app/auth/callback`
  (et `http://localhost:3000/auth/callback` pour le développement).

## 4. Configurer un vrai service d'envoi (indispensable avant le lancement)

Le service d'e-mail intégré à Supabase est **réservé aux tests** : très peu
d'envois par heure, et il n'est pas prévu pour des utilisateurs réels.
Avant d'ouvrir les inscriptions, brancher un fournisseur SMTP :

Project Settings → Authentication → **SMTP Settings** → « Enable custom SMTP »,
avec les identifiants d'un fournisseur (Resend, Brevo, Postmark, Amazon SES…).
Expéditeur conseillé : `A&A Audit <no-reply@votre-domaine.fr>`, sur un domaine
dont les enregistrements SPF/DKIM sont configurés (sinon les e-mails
risquent de finir en indésirables).

## 5. Tester

1. S'inscrire sur `/inscription` avec une adresse réelle.
2. Vérifier la réception de l'e-mail (et son affichage).
3. Saisir le code : on doit arriver sur le tableau de bord.
4. Tester « Renvoyer le code » et un code erroné (message d'erreur attendu).

---

# Mot de passe oublié (code à 6 chiffres)

Parcours : lien « Mot de passe oublié ? » sur `/connexion` → page
`/mot-de-passe-oublie` → l'utilisateur saisit son e-mail et reçoit un code →
il saisit le code et son nouveau mot de passe → il arrive connecté sur le
tableau de bord. Le lien de secours de l'e-mail ouvre
`/reinitialiser-mot-de-passe` (via `/auth/callback`).

Côté code :
- `src/components/auth/forgot-password-flow.tsx` — envoi du code
  (`resetPasswordForEmail`), vérification (`verifyOtp`, type `recovery`) puis
  mise à jour du mot de passe (`updateUser`) ;
- `src/components/auth/reset-password-form.tsx` — nouveau mot de passe après
  ouverture du lien de secours.

## Installer le modèle d'e-mail

Authentication → **Email Templates** → **Reset Password** :
- **Subject** : `Votre code de réinitialisation A&A Audit : {{ .Token }}`
- **Message body** : coller le contenu de
  [`supabase/templates/reinitialisation-mot-de-passe.html`](../supabase/templates/reinitialisation-mot-de-passe.html).

## URL de redirection

Le lien de secours passe un paramètre (`/auth/callback?next=/reinitialiser-mot-de-passe`).
Dans Authentication → **URL Configuration** → **Redirect URLs**, autoriser le
domaine entier plutôt qu'une seule adresse :
`https://payaudit-pay18.vercel.app/**` (et `http://localhost:3000/**` en
développement).

## Tester

1. Sur `/connexion`, cliquer « Mot de passe oublié ? » et saisir son e-mail.
2. Saisir le code reçu et un nouveau mot de passe : arrivée sur le tableau de bord.
3. Se déconnecter puis se reconnecter avec le nouveau mot de passe.
