import { Send, MapPin, Sparkles } from "lucide-react";
import SkillChip from "./SkillChip";

export default function Cocok({ me, matches, requestedIds, onRequest, goTo }) {
  if (!me.offer || !me.want) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <Sparkles className="mx-auto text-pasar-ochre" size={32} />
        <h1 className="mt-4 font-display text-2xl font-semibold text-pasar-ink">
          Lengkapi profil dulu, yuk
        </h1>
        <p className="mt-2 font-body text-sm text-pasar-ink/60">
          Isi skill yang kamu kuasai dan skill yang ingin kamu pelajari supaya
          sistem bisa mencarikan pasangan tukar yang cocok.
        </p>
        <button
          onClick={() => goTo("profil")}
          className="mt-6 rounded-full bg-pasar-ochre px-6 py-3 font-body text-sm font-semibold text-pasar-deep"
        >
          Isi profil saya
        </button>
      </div>
    );
  }

  const sorted = [...matches].sort((a, b) =>
    a.matchType === b.matchType ? 0 : a.matchType === "perfect" ? -1 : 1
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-pasar-ink">
        Cocok untukmu
      </h1>
      <p className="mt-2 font-body text-sm text-pasar-ink/60">
        Berdasarkan skill yang kamu punya (
        <span className="text-pasar-ochre">{me.offer}</span>) dan yang kamu
        cari (<span className="text-pasar-ochre">{me.want}</span>).
      </p>

      {sorted.length === 0 ? (
        <p className="mt-10 font-body text-sm text-pasar-ink/50">
          Belum ada yang cocok saat ini. Coba jelajahi semua skill di tab
          Jelajahi, atau cek lagi nanti.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {sorted.map((u) => {
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
                  <div className="mt-3">
                    <SkillChip
                      label={
                        u.matchType === "perfect"
                          ? "Cocok sempurna"
                          : "Cocok sebagian"
                      }
                      tone={u.matchType === "perfect" ? "leaf" : "berry"}
                    />
                  </div>
                  <p className="mt-3 font-body text-sm text-pasar-ink/65">
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
        </div>
      )}
    </div>
  );
}
