"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { PublicConvention } from "@/lib/public-conventions";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/**
 * Liste déroulante des conventions, aux couleurs du site (le menu natif d'un
 * <select> ne se stylise pas). Recherche par nom ou IDCC, navigation au clavier.
 */
export function ConventionSelect({
  conventions,
  value,
  onChange,
}: {
  conventions: PublicConvention[];
  value: string;
  onChange: (idcc: string) => void;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = conventions.find((c) => c.idcc_code === value) ?? null;
  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return conventions;
    return conventions.filter((c) => normalize(`${c.idcc_code} ${c.name} ${c.sector}`).includes(q));
  }, [conventions, query]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    searchRef.current?.focus();
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function openList() {
    setQuery("");
    const index = conventions.findIndex((c) => c.idcc_code === value);
    setActive(index >= 0 ? index : 0);
    setOpen(true);
  }

  function choose(idcc: string) {
    onChange(idcc);
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = filtered[active];
      if (item) choose(item.idcc_code);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative mt-5 text-left">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            openList();
          }
        }}
        className={`flex w-full items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 text-left text-sm shadow-soft transition duration-200 hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-beige-50 ${
          open ? "border-blue-400 ring-4 ring-blue-100" : "border-ink-200/80"
        }`}
      >
        {selected ? (
          <>
            <span className="shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-[11px] font-semibold tabular-nums text-blue-700 ring-1 ring-inset ring-blue-200">
              IDCC {selected.idcc_code}
            </span>
            <span className="min-w-0 flex-1 truncate font-medium text-ink-900">{selected.name}</span>
          </>
        ) : (
          <span className="flex-1 text-ink-400">Sélectionner une convention collective…</span>
        )}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
          className={`h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200 ${open ? "rotate-180 text-blue-600" : ""}`}
        >
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="relative z-10 mt-2 animate-pop-in overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-lift">
          <div className="border-b border-ink-100 bg-beige-50 p-2.5">
            <div className="flex items-center gap-2 rounded-xl border border-ink-200/70 bg-white px-3 py-2 focus-within:border-blue-300">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-4 w-4 shrink-0 text-ink-400">
                <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth={1.6} />
                <path d="m13.5 13.5 3 3" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Rechercher par nom ou numéro IDCC"
                aria-label="Rechercher une convention"
                aria-controls={`${id}-list`}
                aria-activedescendant={filtered[active] ? `${id}-opt-${filtered[active].idcc_code}` : undefined}
                className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
              />
            </div>
          </div>
          <ul ref={listRef} id={`${id}-list`} role="listbox" aria-label="Conventions collectives" className="max-h-72 overflow-y-auto p-1.5">
            {filtered.length === 0 && <li className="px-3 py-4 text-center text-sm text-ink-400">Aucune convention trouvée</li>}
            {filtered.map((c, i) => {
              const isSelected = c.idcc_code === value;
              const isActive = i === active;
              return (
                <li
                  key={c.idcc_code}
                  id={`${id}-opt-${c.idcc_code}`}
                  role="option"
                  aria-selected={isSelected}
                  data-index={i}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(c.idcc_code)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                    isActive ? "bg-beige-100" : ""
                  } ${isSelected ? "text-blue-800" : "text-ink-700"}`}
                >
                  <span
                    className={`w-[4.5rem] shrink-0 rounded-md px-1.5 py-0.5 text-center text-[11px] font-semibold tabular-nums ring-1 ring-inset ${
                      isSelected ? "bg-blue-600 text-beige-50 ring-blue-600" : "bg-white text-ink-500 ring-ink-200/80"
                    }`}
                  >
                    {c.idcc_code}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate ${isSelected ? "font-semibold" : "font-medium"}`}>{c.name}</span>
                    <span className="block truncate text-xs text-ink-400">{c.sector}</span>
                  </span>
                  {isSelected && (
                    <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-4 w-4 shrink-0 text-blue-600">
                      <path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
