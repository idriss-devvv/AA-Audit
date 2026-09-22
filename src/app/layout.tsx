import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const title = "PayAudit — Contrôle et détection d'anomalies sur vos fiches de paie";
const description =
  "PayAudit analyse automatiquement vos fiches de paie et détecte les anomalies : erreurs de cotisations, écarts brut/net, convention collective, congés payés et primes. Gagnez du temps et sécurisez votre paie.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${SITE_NAME}`,
  },
  description,
  keywords: [
    "contrôle fiche de paie",
    "vérification bulletin de salaire",
    "détection anomalies paie",
    "logiciel audit paie",
    "erreurs cotisations sociales",
    "convention collective",
    "congés payés",
    "SaaS paie",
    "audit de paie automatisé",
    "cabinet comptable paie",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  category: "Logiciel de gestion de paie",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1F3A5F",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description,
      url: SITE_URL,
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "30",
          priceCurrency: "EUR",
          priceValidUntil: "2027-12-31",
          url: `${SITE_URL}/#tarifs`,
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "100",
          priceCurrency: "EUR",
          priceValidUntil: "2027-12-31",
          url: `${SITE_URL}/#tarifs`,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
