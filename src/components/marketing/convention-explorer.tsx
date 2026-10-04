"use client";

import { useState } from "react";
import type { PublicConvention } from "@/lib/public-conventions";
import { ConventionSelect } from "@/components/marketing/convention-select";

const frenchDate = (value: string | null) => {
  if (!value) return "Non renseignée";
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  const formatted = date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  return date.getDate() === 1 ? formatted.replace(/^1 /, "1er ") : formatted;
};

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ink-200/70 bg-white px-4 py-3">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-ink-900">{value}</dd>
    </div>
  );
}

const count = (n: number, singular: string, plural: string) => (n > 0 ? `${n} ${n > 1 ? plural : singular}` : "Pas de règle intégrée");

/** Menu déroulant des conventions collectives intégrées, avec le détail de celle choisie. */
export function ConventionExplorer({ conventions }: { conventions: PublicConvention[] }) {
  const [selected, setSelected] = useState("");
  const convention = conventions.find((c) => c.idcc_code === selected) ?? null;

  return (
    <div className="rounded-3xl border border-ink-200/70 bg-gradient-to-br from-beige-50 to-white p-6 sm:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold text-ink-900">{conventions.length} conventions collectives intégrées</p>
        <p className="mt-1 text-xs text-ink-500">
          Choisissez une convention pour voir ce que nous contrôlons et la date de dernière mise à jour.
        </p>
        <ConventionSelect conventions={conventions} value={selected} onChange={setSelected} />
      </div>

      {convention && (
        <div key={convention.idcc_code} className="mx-auto mt-6 max-w-3xl animate-fade-in text-left">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">IDCC {convention.idcc_code}</p>
              <p className="mt-1 font-display text-2xl leading-tight text-ink-900">{convention.name}</p>
              <p className="mt-1 text-sm text-ink-500">
                {convention.sector}
                {convention.coverage_note ? ` · ${convention.coverage_note}` : ""}
              </p>
            </div>
            <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200">
              Mise à jour le {frenchDate(convention.last_update)}
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-ink-200/70 bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">Texte de salaires en vigueur</p>
            {convention.salary_text_title ? (
              <>
                <p className="mt-1 text-sm font-medium text-ink-900">{convention.salary_text_title}</p>
                <p className="mt-1 text-xs text-ink-500">
                  En vigueur depuis le {frenchDate(convention.salary_text_effective_from)}
                  {convention.salary_text_url && (
                    <>
                      {" · "}
                      <a
                        href={convention.salary_text_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-700 hover:text-blue-900"
                      >
                        Voir sur Légifrance
                      </a>
                    </>
                  )}
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm text-ink-600">
                Salaires minima fixés par accords régionaux : le minimum se renseigne dans les Paramètres.
              </p>
            )}
          </div>

          <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Item label="Salaires minima" value={count(convention.classifications_count, "niveau contrôlé", "niveaux contrôlés")} />
            <Item label="Prime d'ancienneté" value={count(convention.seniority_rules, "règle", "règles")} />
            <Item label="Majorations" value={count(convention.pay_increase_rules, "règle", "règles")} />
            <Item label="Primes conventionnelles" value={count(convention.bonus_rules, "règle", "règles")} />
            <Item label="Maintien de salaire" value={count(convention.sick_pay_rules, "règle", "règles")} />
            <Item label="Textes sources" value={count(convention.texts_count, "texte relevé", "textes relevés")} />
          </dl>
          <p className="mt-4 text-center text-xs text-ink-400">
            Critères relevés sur Légifrance (base KALI). La convention de chaque fiche est reconnue par son numéro IDCC.
          </p>
        </div>
      )}
    </div>
  );
}
