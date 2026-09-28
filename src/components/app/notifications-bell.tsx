"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { AppNotification } from "@/lib/notifications";

const DOT: Record<AppNotification["severity"], string> = {
  critical: "bg-rose-500",
  warning: "bg-amber-400",
  info: "bg-blue-400",
};

function timeAgo(iso: string) {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  return new Date(iso).toLocaleDateString("fr-FR");
}

/** Cloche de notifications de l'en-tête : alertes d'import, rafraîchies chaque minute. */
export function NotificationsBell({ initial }: { initial: { items: AppNotification[]; unread: number } }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initial);
  const ref = useRef<HTMLDivElement>(null);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/notifications", { cache: "no-store" }).catch(() => null);
    if (res?.ok) setState(await res.json());
  }, []);

  useEffect(() => {
    const timer = setInterval(refresh, 60_000);
    return () => clearInterval(timer);
  }, [refresh]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function markRead(ids?: string[]) {
    setState((s) => ({
      items: s.items.map((n) => (!ids || ids.includes(n.id) ? { ...n, read_at: n.read_at ?? new Date().toISOString() } : n)),
      unread: ids ? Math.max(0, s.unread - s.items.filter((n) => ids.includes(n.id) && !n.read_at).length) : 0,
    }));
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids ? { ids } : {}),
    }).catch(() => null);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) refresh();
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={state.unread > 0 ? `Notifications (${state.unread} non lues)` : "Notifications"}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition hover:border-ink-300"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        {state.unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
            {state.unread > 99 ? "99+" : state.unread}
          </span>
        )}
      </button>

      {open && (
        <div role="dialog" aria-label="Notifications" className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-ink-200/70 bg-white shadow-lift">
          <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
            <p className="text-sm font-semibold text-ink-900">Notifications</p>
            {state.unread > 0 && (
              <button type="button" onClick={() => markRead()} className="text-xs font-semibold text-blue-700 hover:text-blue-900">
                Tout marquer comme lu
              </button>
            )}
          </div>
          <ul className="max-h-96 divide-y divide-ink-100 overflow-y-auto">
            {state.items.length === 0 && <li className="px-4 py-8 text-center text-sm text-ink-500">Aucune notification.</li>}
            {state.items.map((n) => {
              const content = (
                <div className="flex gap-3">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read_at ? "bg-ink-200" : DOT[n.severity]}`} />
                  <div className="min-w-0">
                    <p className={`text-sm ${n.read_at ? "text-ink-600" : "font-semibold text-ink-900"}`}>{n.title}</p>
                    {n.body && <p className="mt-0.5 line-clamp-2 text-xs text-ink-500">{n.body}</p>}
                    <p className="mt-1 text-[11px] text-ink-400">{timeAgo(n.created_at)}</p>
                  </div>
                </div>
              );
              return (
                <li key={n.id} className="px-4 py-3 transition hover:bg-beige-50">
                  {n.link ? (
                    <Link
                      href={n.link}
                      onClick={() => {
                        setOpen(false);
                        if (!n.read_at) markRead([n.id]);
                      }}
                    >
                      {content}
                    </Link>
                  ) : (
                    <button type="button" className="w-full text-left" onClick={() => !n.read_at && markRead([n.id])}>
                      {content}
                    </button>
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
