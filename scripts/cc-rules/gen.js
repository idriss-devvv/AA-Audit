// Générateur SQL des critères de conventions collectives à partir de specs JS.
// Usage : node gen.js <spec.js> <out.sql>
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const D = path.join(__dirname, "package/data");
const idx = require(D + "/index.json");
const VERIFIED = "2026-09-28";

function uuid(seed) {
  const h = crypto.createHash("sha1").update("aa-audit-cc:" + seed).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-${((parseInt(h[16], 16) & 3) | 8).toString(16)}${h.slice(17, 20)}-${h.slice(20, 32)}`;
}
const strip = (h) => (h || "").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
const docs = {};
function doc(idcc) {
  if (!docs[idcc]) {
    const c = idx.find((x) => Number(x.num) === Number(idcc));
    docs[idcc] = require(D + "/" + c.id + ".json");
  }
  return docs[idcc];
}
function findNode(n, pred) {
  if (pred(n)) return n;
  for (const ch of n.children || []) { const r = findNode(ch, pred); if (r) return r; }
  return null;
}
function textInfo(idcc, textId) {
  const n = findNode(doc(idcc), (x) => x.type === "section" && x.data && x.data.id === textId);
  if (!n) throw new Error(`Texte ${textId} introuvable (${idcc})`);
  return n.data;
}
/** Article du texte `textId` dont le contenu correspond à `re` → « Art. N — URL ». */
function cite(idcc, textId, re, comment) {
  const t = findNode(doc(idcc), (x) => x.type === "section" && x.data && x.data.id === textId);
  if (!t) throw new Error(`Texte ${textId} introuvable (${idcc})`);
  const art = findNode(t, (x) => x.type === "article" && !/ABROGE|PERIME|MODIFIE|REMPLACE/.test(x.data.etat || "") && new RegExp(re, "i").test(strip(x.data.content)));
  if (!art) throw new Error(`Aucun article /${re}/ dans ${textId} (${idcc})`);
  const num = art.data.num && art.data.num !== "undefined" ? `Art. ${art.data.num}` : "Annexe";
  return `${num} — https://www.legifrance.gouv.fr/conv_coll/article/${art.data.id}` + (comment ? ` — ${comment}` : "");
}

/** Lignes « a | b | c » d'un tableau de l'article correspondant à `re` (valeurs numériques FR parsées). */
function table(idcc, textId, re) {
  const t = findNode(doc(idcc), (x) => x.type === "section" && x.data && x.data.id === textId);
  const art = findNode(t, (x) => x.type === "article" && !/ABROGE|PERIME|MODIFIE|REMPLACE/.test(x.data.etat || "") && new RegExp(re, "i").test(strip(x.data.content)));
  if (!art) throw new Error(`Aucun article /${re}/ dans ${textId}`);
  const html = art.data.content.replace(/<br\s*\/?>/gi, " ").replace(/<\/t[dh]>/gi, "|").replace(/<\/tr>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");
  const num = (c) => { const v = c.replace(/[  \s]+/g, " ").trim(); return /^-?[\d ]+(,\d+)?$/.test(v) ? parseFloat(v.replace(/ /g, "").replace(",", ".")) : v; };
  return html.split("\n").map((l) => l.split("|").slice(0, -1).map(num)).filter((r) => r.length);
}

const q = (v) => {
  if (v === null || v === undefined) return "null";
  if (Array.isArray(v)) return v.length ? `array[${v.map(q).join(",")}]` : "null";
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  return `'${String(v).replace(/'/g, "''")}'`;
};
function insert(table, cols, rows) {
  if (!rows.length) return "";
  return `insert into public.${table} (${cols.join(", ")}) values\n` + rows.map((r) => "(" + cols.map((c) => r[c] === undefined ? "null" : r[c]).join(", ") + ")").join(",\n") + ";\n\n";
}

function build(spec) {
  const I = spec.idcc;
  const out = [`-- Critères de vérification de la convention collective IDCC ${I} (${spec.name}),\n-- relevés dans la base KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0).\n-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).\n${spec.header ? spec.header.split("\n").map((l) => "-- " + l).join("\n") + "\n" : ""}`];
  const tid = {};
  const rows = [];
  for (const t of spec.texts) {
    const info = textInfo(I, t.ref);
    tid[t.key] = uuid(`${I}:text:${t.ref}`);
    rows.push({ id: q(tid[t.key]), idcc_code: q(I), kind: q(t.kind), title: q(t.title || info.title), reference: q(t.ref), signed_at: t.signed ? `'${t.signed}'::date` : "null", extension_published_at: t.ext ? `'${t.ext}'::date` : "null", effective_from: t.eff ? `'${t.eff}'::date` : "null", source_url: q(`https://www.legifrance.gouv.fr/conv_coll/id/${t.ref}`), notes: q(t.notes || (info.etat === "VIGUEUR_NON_ETEN" ? "Texte non étendu (applicable aux seuls adhérents des organisations signataires)" : null)), verified_at: q(VERIFIED) });
  }
  out.push(insert("cc_texts", ["id", "idcc_code", "kind", "title", "reference", "signed_at", "extension_published_at", "effective_from", "source_url", "notes", "verified_at"], rows));
  const src = (k) => q(tid[k]);
  const d = (v) => (v ? `'${v}'::date` : "null");
  const common = (r, key) => ({ id: q(uuid(`${I}:${key}`)), idcc_code: q(I), source_text_id: src(r.src), valid_from: d(r.from), valid_to: d(r.to), notes: q(r.note), verified_at: q(VERIFIED) });
  const tail = ["source_text_id", "valid_from", "valid_to", "notes", "verified_at"];

  const cls = (spec.classifications || []).map((r, i) => ({ ...common(r, "cls:" + r.code), code: q(r.code), label: q(r.label), category: q(r.category), level: q(r.level), step: q(r.step), coefficient: q(r.coefficient), aliases: r.aliases ? `array[${r.aliases.map(q).join(",")}]::text[]` : "null", sort_order: q(i) }));
  out.push(insert("cc_classifications", ["id", "idcc_code", "code", "label", "category", "level", "step", "coefficient", "aliases", "sort_order", ...tail], cls));

  const mins = (spec.minimums || []).map((r) => ({ ...common(r, `min:${r.code}:${r.from}:${r.variant || ""}:${r.arrangement || ""}:${r.seniority || 0}`), classification_code: q(r.code), amount: q(r.amount), unit: q(r.unit), annual_divisor: q(r.divisor), reference_monthly_hours: q(r.hours), work_arrangement: q(r.arrangement || "standard"), variant: q(r.variant), seniority_min_months: q(r.seniority || 0), comparison_base: q(r.base || "salaire_base") }));
  out.push(insert("cc_salary_minimums", ["id", "idcc_code", "classification_code", "amount", "unit", "annual_divisor", "reference_monthly_hours", "work_arrangement", "variant", "seniority_min_months", "comparison_base", ...tail], mins));

  const arr = (a) => (a ? `array[${a.map(q).join(",")}]::text[]` : "null");
  const sen = (spec.seniority || []).map((r, i) => ({ ...common(r, `sen:${i}`), categories: arr(r.categories), classification_codes: arr(r.codes), seniority_min_months: q(r.months), rate_percent: q(r.rate), fixed_amount: q(r.fixed), calculation_base: q(r.base), prorata_working_time: q(r.prorata !== false), seniority_definition: q(r.definition) }));
  out.push(insert("cc_seniority_bonuses", ["id", "idcc_code", "categories", "classification_codes", "seniority_min_months", "rate_percent", "fixed_amount", "calculation_base", "prorata_working_time", "seniority_definition", ...tail], sen));

  const bon = (spec.bonuses || []).map((r, i) => ({ ...common(r, `bon:${i}`), kind: q(r.kind), label: q(r.label), categories: arr(r.categories), classification_codes: arr(r.codes), rate_percent: q(r.rate), fixed_amount: q(r.fixed), calculation_base: q(r.base), payment_months: r.months ? `array[${r.months.join(",")}]::int[]` : "null", seniority_min_months: q(r.seniority || 0), presence_condition: q(r.presence), prorata_rule: q(r.prorata), included_in_minimum: q(r.inMinimum), minimum_garanti_percent: q(r.mg) }));
  out.push(insert("cc_bonuses", ["id", "idcc_code", "kind", "label", "categories", "classification_codes", "rate_percent", "fixed_amount", "calculation_base", "payment_months", "seniority_min_months", "presence_condition", "prorata_rule", "included_in_minimum", "minimum_garanti_percent", ...tail], bon));

  const wt = (spec.workingTime || []).map((r, i) => ({ ...common(r, `wt:${i}`), categories: arr(r.categories), classification_codes: arr(r.codes), work_arrangement: q(r.arrangement || "standard"), weekly_hours: q(r.weekly), monthly_hours: q(r.monthly), equivalence_weekly_hours: q(r.equivalence), annual_overtime_quota: q(r.quota), forfait_days_max: q(r.days), forfait_hours_annual: q(r.hoursAnnual), part_time_min_weekly_hours: q(r.partTimeMin), part_time_complementary_cap_percent: q(r.complementaryCap), min_salary_percent_of_minimum: q(r.minPercent) }));
  out.push(insert("cc_working_time", ["id", "idcc_code", "categories", "classification_codes", "work_arrangement", "weekly_hours", "monthly_hours", "equivalence_weekly_hours", "annual_overtime_quota", "forfait_days_max", "forfait_hours_annual", "part_time_min_weekly_hours", "part_time_complementary_cap_percent", "min_salary_percent_of_minimum", ...tail], wt));

  const pi = (spec.payIncreases || []).map((r, i) => ({ ...common(r, `pi:${i}`), kind: q(r.kind), label: q(r.label), categories: arr(r.categories), classification_codes: arr(r.codes), hours_from: q(r.from_h), hours_to: q(r.to_h), period: q(r.period), time_start: r.start ? `'${r.start}'::time` : "null", time_end: r.end ? `'${r.end}'::time` : "null", rate_percent: q(r.rate), fixed_amount: q(r.fixed), fixed_amount_unit: q(r.fixedUnit), compensation: q(r.compensation || "paiement"), rest_percent: q(r.rest) }));
  out.push(insert("cc_pay_increases", ["id", "idcc_code", "kind", "label", "categories", "classification_codes", "hours_from", "hours_to", "period", "time_start", "time_end", "rate_percent", "fixed_amount", "fixed_amount_unit", "compensation", "rest_percent", ...tail], pi));

  const al = (spec.allowances || []).map((r, i) => ({ ...common(r, `al:${i}:${r.from}`), kind: q(r.kind), label: q(r.label), categories: arr(r.categories), classification_codes: arr(r.codes), zone: q(r.zone), amount: q(r.amount), unit: q(r.unit), minimum_garanti_percent: q(r.mg), conditions: q(r.conditions), social_exemption_limit: q(r.exemption) }));
  out.push(insert("cc_allowances", ["id", "idcc_code", "kind", "label", "categories", "classification_codes", "zone", "amount", "unit", "minimum_garanti_percent", "conditions", "social_exemption_limit", ...tail], al));

  const lv = (spec.leave || []).map((r, i) => ({ ...common(r, `lv:${i}`), kind: q(r.kind), event: q(r.event), label: q(r.label), categories: arr(r.categories), classification_codes: arr(r.codes), seniority_min_months: q(r.seniority || 0), days: q(r.days), day_type: q(r.dayType || "ouvrables"), paid: q(r.paid !== false) }));
  out.push(insert("cc_leave_rules", ["id", "idcc_code", "kind", "event", "label", "categories", "classification_codes", "seniority_min_months", "days", "day_type", "paid", ...tail], lv));

  const sp = (spec.sickPay || []).map((r, i) => ({ ...common(r, `sp:${i}`), absence_type: q(r.type || "maladie"), categories: arr(r.categories), classification_codes: arr(r.codes), seniority_min_months: q(r.seniority || 0), waiting_days: q(r.waiting || 0), sequence: q(r.seq), duration_days: q(r.days), rate_percent: q(r.rate), rate_base: q(r.rateBase || "brut"), ijss_deducted: q(r.ijss !== false), reference_period_months: q(r.period || 12) }));
  out.push(insert("cc_sick_pay", ["id", "idcc_code", "absence_type", "categories", "classification_codes", "seniority_min_months", "waiting_days", "sequence", "duration_days", "rate_percent", "rate_base", "ijss_deducted", "reference_period_months", ...tail], sp));

  const ot = (spec.other || []).map((r, i) => ({ ...common(r, `ot:${i}`), kind: q(r.kind), label: q(r.label), categories: arr(r.categories), classification_codes: arr(r.codes), value: q(r.value), unit: q(r.unit), description: q(r.description) }));
  out.push(insert("cc_other_rules", ["id", "idcc_code", "kind", "label", "categories", "classification_codes", "value", "unit", "description", ...tail], ot));
  return out.join("\n");
}

module.exports = { cite, build, uuid, table };
if (require.main === module) {
  const spec = require(path.resolve(process.argv[2]));
  fs.writeFileSync(process.argv[3], build(spec));
  console.log("ok", process.argv[3]);
}
