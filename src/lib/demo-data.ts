/**
 * Données d'exemple de la version de démonstration : l'analyse automatique
 * des fiches de paie est en cours de développement, l'interface affiche donc
 * ces fiches, sociétés et salariés fictifs à la place des données importées.
 */
import type { PayslipData } from "@/types/payslip";

export const DEMO_UPLOAD_MESSAGE =
  "L'analyse automatique des fiches de paie est en cours de développement et arrive très bientôt. En attendant, découvrez les fiches d'exemple déjà analysées.";

export type DemoCompany = { id: string; name: string; idcc: string; agreement: string };

export type DemoEmployee = { id: string; companyId: string; firstName: string; lastName: string; position: string };

export type DemoAnomaly = { id: string; rule_id: string; severity: "critical" | "warning" | "info"; message: string };

export type DemoPayslip = {
  id: string;
  companyId: string;
  employeeId: string;
  period: string;
  fileName: string;
  grossPay: number;
  netPay: number;
  uploadedAt: string;
  extracted: PayslipData;
  anomalies: DemoAnomaly[];
};

export const DEMO_COMPANIES: DemoCompany[] = [
  { id: "demo-societe-1", name: "Boulangerie Martin SARL", idcc: "843", agreement: "Boulangerie-pâtisserie (entreprises artisanales)" },
  { id: "demo-societe-2", name: "Lefèvre Conseil SAS", idcc: "1486", agreement: "Bureaux d'études techniques (Syntec)" },
];

export const DEMO_EMPLOYEES: DemoEmployee[] = [
  { id: "demo-salarie-1", companyId: "demo-societe-1", firstName: "Camille", lastName: "Durand", position: "Vendeuse qualifiée" },
  { id: "demo-salarie-2", companyId: "demo-societe-2", firstName: "Thomas", lastName: "Bernard", position: "Consultant junior" },
];

function contributions(gross: number) {
  const r = (v: number) => Math.round(v * 100) / 100;
  return [
    { label: "Sécurité sociale plafonnée", amount: r(gross * 0.069) },
    { label: "Sécurité sociale déplafonnée", amount: r(gross * 0.004) },
    { label: "Retraite complémentaire T1", amount: r(gross * 0.0401) },
    { label: "CSG déductible", amount: r(gross * 0.9825 * 0.068) },
    { label: "CSG/CRDS non déductible", amount: r(gross * 0.9825 * 0.029) },
  ];
}

function extracted(
  employee: DemoEmployee,
  company: DemoCompany,
  period: string,
  grossPay: number,
  netPay: number,
  extra: Partial<PayslipData> = {}
): PayslipData {
  return {
    employeeName: `${employee.firstName} ${employee.lastName}`,
    period,
    grossPay,
    netPay,
    contributions: contributions(grossPay),
    collectiveAgreement: company.agreement,
    collectiveAgreementName: company.agreement,
    collectiveAgreementIdcc: company.idcc,
    collectiveAgreementAvailable: true,
    position: employee.position,
    seniorityDate: employee.id === "demo-salarie-1" ? "01/03/2022" : "15/09/2024",
    paidLeave: { acquired: 20, taken: 5, balance: 15 },
    netTaxable: Math.round(netPay * 1.03 * 100) / 100,
    mentionsArretOuIjss: false,
    ...extra,
  };
}

const [camille, thomas] = DEMO_EMPLOYEES;
const [boulangerie, conseil] = DEMO_COMPANIES;

export const DEMO_PAYSLIPS: DemoPayslip[] = [
  {
    id: "demo-fiche-1",
    companyId: boulangerie.id,
    employeeId: camille.id,
    period: "2026-09",
    fileName: "Bulletin_Durand_Camille_2026-09.pdf",
    grossPay: 1912.5,
    netPay: 1513.94,
    uploadedAt: "2026-10-05T09:12:00.000Z",
    extracted: extracted(camille, boulangerie, "2026-09", 1912.5, 1513.94, { paidLeave: { acquired: 22.5, taken: 5, balance: 17.5 } }),
    anomalies: [
      {
        id: "demo-anomalie-1",
        rule_id: "conventions.minimum-conventionnel",
        severity: "critical",
        message:
          "Salaire de base (1 860,00 €) inférieur au minimum conventionnel de la boulangerie-pâtisserie pour le coefficient 170 (1 895,00 € pour 151,67 h).",
      },
      {
        id: "demo-anomalie-2",
        rule_id: "conges.solde",
        severity: "warning",
        message: "Solde de congés payés incohérent avec le mois précédent : 16 j en août + 2,5 j acquis − 5 j pris = 13,5 j attendus, 17,5 j indiqués.",
      },
      {
        id: "demo-anomalie-3",
        rule_id: "mentions-obligatoires.date-paiement",
        severity: "info",
        message: "La date de paiement du salaire n'apparaît pas sur le bulletin (article R3243-1 du Code du travail).",
      },
    ],
  },
  {
    id: "demo-fiche-2",
    companyId: boulangerie.id,
    employeeId: camille.id,
    period: "2026-08",
    fileName: "Bulletin_Durand_Camille_2026-08.pdf",
    grossPay: 1895,
    netPay: 1500.09,
    uploadedAt: "2026-09-04T08:40:00.000Z",
    extracted: extracted(camille, boulangerie, "2026-08", 1895, 1500.09, { paidLeave: { acquired: 20, taken: 4, balance: 16 } }),
    anomalies: [],
  },
  {
    id: "demo-fiche-3",
    companyId: conseil.id,
    employeeId: thomas.id,
    period: "2026-09",
    fileName: "Bulletin_Bernard_Thomas_2026-09.pdf",
    grossPay: 2850,
    netPay: 2256.06,
    uploadedAt: "2026-10-03T14:25:00.000Z",
    extracted: extracted(thomas, conseil, "2026-09", 2850, 2256.06, {
      overtime: [{ label: "Heures supplémentaires 25 %", hours: 6, majorationPercent: 10, amount: 124.12 }],
    }),
    anomalies: [
      {
        id: "demo-anomalie-4",
        rule_id: "heures-sup.majoration",
        severity: "critical",
        message: "Heures supplémentaires majorées à 10 % alors que le taux légal minimum est de 25 % pour les 8 premières heures (écart estimé : 42,30 €).",
      },
      {
        id: "demo-anomalie-5",
        rule_id: "cotisations.taux",
        severity: "warning",
        message: "Taux de retraite complémentaire T1 salarial (4,01 %) différent du taux paramétré pour la société (3,15 %).",
      },
    ],
  },
];

export function isDemoId(id: string | null | undefined): boolean {
  return Boolean(id?.startsWith("demo-"));
}

export function demoCompany(id: string) {
  return DEMO_COMPANIES.find((c) => c.id === id) ?? null;
}

export function demoEmployee(id: string) {
  return DEMO_EMPLOYEES.find((e) => e.id === id) ?? null;
}

export function demoEmployeeName(employee: DemoEmployee) {
  return `${employee.firstName} ${employee.lastName}`;
}

export function demoPayslip(id: string) {
  return DEMO_PAYSLIPS.find((p) => p.id === id) ?? null;
}

/** Fiches d'exemple, les plus récemment importées d'abord. */
export function demoPayslipsByUploadDate() {
  return [...DEMO_PAYSLIPS].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

/** Fichier PDF d'exemple servi depuis /public/demo. */
export function demoFileUrl(id: string) {
  return `/demo/${id}.pdf`;
}
