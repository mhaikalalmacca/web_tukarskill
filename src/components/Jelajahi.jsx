import { useMemo, useState } from "react";
import { Search, Send, MapPin } from "lucide-react";
import SkillChip from "./SkillChip";

export default function Jelajahi({ others, requestedIds, onRequest }) {
  const [query, setQuery] = useState("");
  const [kota, setKota] = useState("Semua Kota");

  const kotaList = useMemo(
    () => ["Semua Kota", ...new Set(others.map((u) => u.kota))],
    [others]
  );

  const filtered = others.filter((u) => {
    const matchKota = kota === "Semua Kota" || u.kota === kota;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.offer.toLowerCase().includes(q) ||
      u.want.toLowerCase().includes(q);
    return matchKota && matchQuery;
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-pasar-ink">
        Jelajahi skill
      </h1>
      <p className="mt-2 font-body text-sm text-pasar-ink/60">
        Cari orang yang punya skill kamu butuhkan, atau butuh skill yang kamu
        punya.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="flex flex-1 min-w-[220px] items-center gap-2 rounded-full border border-pasar-ink/15 bg-white px-4 py-2.5">
          <Search size={16} className="text-pasar-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau skill..."
            className="w-full bg-transparent font-body text-sm text-pasar-ink placeholder:text-pasar-ink/40 focus:outline-none"
          />
        </div>
        <select
          value={kota}
          onChange={(e) => setKota(e.target.value)}
          className="rounded-full border border-pasar-ink/15 bg-white px-4 py-2.5 font-body text-sm text-pasar-ink focus:outline-none"
        >
          {kotaList.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {filtered.map((u) => {
          const already = requestedIds.includes(u.id);
          return (
            <div
              key={u.id}
              className="flex flex-col justify-between rounded-2xl border border-pasar-ink/10 bg-white p-5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg font-semibold text-pasar-ink">
                    {u.name}
                  </p>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-pasar-ink/45">
                    <MapPin size={12} /> {u.kota}
                  </span>
                </div>
                <p className="mt-2 font-body text-sm text-pasar-ink/65">
                  {u.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <SkillChip label={`Punya: ${u.offer}`} tone="ochre" />
                  <SkillChip label={`Butuh: ${u.want}`} tone="outline" />
                </div>
              </div>
              <button
                onClick={() => onRequest(u)}
                disabled={already}
                className={`mt-5 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 font-body text-sm font-semibold transition-colors ${
                  already
                    ? "cursor-default bg-pasar-ink/8 text-pasar-ink/40"
                    : "bg-pasar-ochre text-pasar-deep hover:brightness-95"
                }`}
              >
                <Send size={14} />
                {already ? "Permintaan terkirim" : "Ajak tukar"}
              </button>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center font-body text-sm text-pasar-ink/50">
            Belum ada yang cocok dengan pencarianmu.
          </p>
        )}
      </div>
    </div>
  );
}
