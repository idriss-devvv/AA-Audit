// Convertit la sortie de gen.js (inserts explicites) en SQL compact :
// notes dédupliquées (CTE), identifiants md5 courts, source_text_id par clé.
const fs = require("fs");
const TYPES = {
  cc_texts: null,
  cc_classifications: { code: "text", label: "text", category: "text", level: "text", step: "text", coefficient: "int", aliases: "text[]", sort_order: "int" },
  cc_salary_minimums: { classification_code: "text", amount: "numeric", unit: "text", annual_divisor: "int", reference_monthly_hours: "numeric", work_arrangement: "text", variant: "text", seniority_min_months: "int", comparison_base: "text" },
  cc_seniority_bonuses: { categories: "text[]", classification_codes: "text[]", seniority_min_months: "int", rate_percent: "numeric", fixed_amount: "numeric", calculation_base: "text", prorata_working_time: "boolean", seniority_definition: "text" },
  cc_bonuses: { kind: "text", label: "text", categories: "text[]", classification_codes: "text[]", rate_percent: "numeric", fixed_amount: "numeric", calculation_base: "text", payment_months: "int[]", seniority_min_months: "int", presence_condition: "text", prorata_rule: "text", included_in_minimum: "boolean", minimum_garanti_percent: "numeric" },
  cc_working_time: { categories: "text[]", classification_codes: "text[]", work_arrangement: "text", weekly_hours: "numeric", monthly_hours: "numeric", equivalence_weekly_hours: "numeric", annual_overtime_quota: "int", forfait_days_max: "int", forfait_hours_annual: "int", part_time_min_weekly_hours: "numeric", part_time_complementary_cap_percent: "numeric", min_salary_percent_of_minimum: "numeric" },
  cc_pay_increases: { kind: "text", label: "text", categories: "text[]", classification_codes: "text[]", hours_from: "numeric", hours_to: "numeric", period: "text", time_start: "time", time_end: "time", rate_percent: "numeric", fixed_amount: "numeric", fixed_amount_unit: "text", compensation: "text", rest_percent: "numeric" },
  cc_allowances: { kind: "text", label: "text", categories: "text[]", classification_codes: "text[]", zone: "text", amount: "numeric", unit: "text", minimum_garanti_percent: "numeric", conditions: "text", social_exemption_limit: "numeric" },
  cc_leave_rules: { kind: "text", event: "text", label: "text", categories: "text[]", classification_codes: "text[]", seniority_min_months: "int", days: "numeric", day_type: "text", paid: "boolean" },
  cc_sick_pay: { absence_type: "text", categories: "text[]", classification_codes: "text[]", seniority_min_months: "int", waiting_days: "int", sequence: "int", duration_days: "int", rate_percent: "numeric", rate_base: "text", ijss_deducted: "boolean", reference_period_months: "int" },
  cc_other_rules: { kind: "text", label: "text", categories: "text[]", classification_codes: "text[]", value: "numeric", unit: "text", description: "text" },
};
const ABBR = { cc_classifications: "c", cc_salary_minimums: "m", cc_seniority_bonuses: "s", cc_bonuses: "b", cc_working_time: "w", cc_pay_increases: "p", cc_allowances: "a", cc_leave_rules: "l", cc_sick_pay: "k", cc_other_rules: "o" };

// Découpe un tuple SQL « (a, 'b, c', array['x','y']::text[], null) » en champs.
function fields(t) {
  const out = []; let cur = "", q = false, depth = 0;
  for (let i = 1; i < t.length - 1; i++) {
    const ch = t[i];
    if (q) { cur += ch; if (ch === "'" && t[i + 1] === "'") { cur += "'"; i++; } else if (ch === "'") q = false; continue; }
    if (ch === "'") { q = true; cur += ch; continue; }
    if (ch === "[" || ch === "(") depth++;
    if (ch === "]" || ch === ")") depth--;
    if (ch === "," && depth === 0) { out.push(cur.trim()); cur = ""; continue; }
    cur += ch;
  }
  out.push(cur.trim());
  return out;
}
const strip = (v) => v.replace(/::(date|text\[\]|int\[\]|time)$/, "");

module.exports = function compact(sql, I) {
  const blocks = sql.split(/\n(?=insert into public\.)/).filter((b) => b.startsWith("insert into"));
  const textKey = {};
  const out = [];
  for (const b of blocks) {
    const table = b.match(/^insert into public\.(\w+)/)[1];
    const cols = b.match(/^insert into public\.\w+ \(([^)]+)\)/)[1].split(", ");
    const tuples = b.slice(b.indexOf(" values\n") + 8).replace(/;\s*$/, "").split(/\),\n\(/).map((t, i, a) => (i === 0 ? "" : "(") + t + (i === a.length - 1 ? "" : ")"));
    const rows = tuples.map((t) => { const f = fields(t); return Object.fromEntries(cols.map((c, i) => [c, f[i]])); });
    if (table === "cc_texts") {
      rows.forEach((r, i) => { textKey[r.id] = `t${i}`; r.id = `md5('${I}-t${i}')::uuid`; });
      out.push(`insert into public.cc_texts (${cols.join(", ")}) values\n` + rows.map((r) => "(" + cols.map((c) => r[c]).join(", ") + ")").join(",\n") + ";\n");
      continue;
    }
    const types = TYPES[table], data = Object.keys(types);
    const notes = [...new Set(rows.map((r) => r.notes))];
    const lines = rows.map((r, i) => "(" + [i, ...data.map((c) => strip(r[c])), r.source_text_id === "null" ? "null" : `'${textKey[r.source_text_id]}'`, strip(r.valid_from), strip(r.valid_to), notes.indexOf(r.notes)].join(",") + ")");
    out.push(`with n(k, t) as (values\n${notes.map((t, i) => `(${i}, ${t})`).join(",\n")}\n)\ninsert into public.${table} (id, idcc_code, ${data.join(", ")}, source_text_id, valid_from, valid_to, notes, verified_at)\nselect md5('${I}-${ABBR[table]}'||v.i)::uuid, '${I}', ${data.map((c) => `v.${c}::${types[c]}`).join(", ")}, case when v.s is null then null else md5('${I}-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'\nfrom (values\n${lines.join(",\n")}\n) as v(i, ${data.join(", ")}, s, vf, vt, nk)\nleft join n on n.k = v.nk;\n`);
  }
  return out.join("\n");
};
if (require.main === module) {
  const [, , inp, outp, I] = process.argv;
  const header = fs.readFileSync(inp, "utf8").split("\n").filter((l) => l.startsWith("--")).join("\n");
  fs.writeFileSync(outp, header + "\n\n" + module.exports(fs.readFileSync(inp, "utf8"), I));
}
