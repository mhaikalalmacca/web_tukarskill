import { SKILL_CATALOG } from "../data/mockUsers";

export default function Profil({ me, onChange, onSave }) {
  const field =
    "w-full rounded-lg border border-pasar-ink/15 bg-white px-4 py-2.5 font-body text-sm text-pasar-ink placeholder:text-pasar-ink/40 focus:outline-none focus:border-pasar-ochre/60";
  const label = "font-mono text-xs uppercase tracking-widest text-pasar-ink/50";

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-pasar-ink">
        Profil saya
      </h1>
      <p className="mt-2 font-body text-sm text-pasar-ink/60">
        Data ini dipakai buat mencocokkanmu dengan orang lain di tab Cocok
        Untukmu. Belum tersimpan ke server — ini masih prototipe tampilan.
      </p>

      <div className="mt-8 space-y-5 rounded-2xl border border-pasar-ink/10 bg-white p-6">
        <div>
          <label className={label}>Nama</label>
          <input
            className={`${field} mt-1.5`}
            placeholder="Nama kamu"
            value={me.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <div>
          <label className={label}>Kota</label>
          <input
            className={`${field} mt-1.5`}
            placeholder="Kota domisili"
            value={me.kota}
            onChange={(e) => onChange("kota", e.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Skill yang kamu kuasai</label>
            <select
              className={`${field} mt-1.5`}
              value={me.offer}
              onChange={(e) => onChange("offer", e.target.value)}
            >
              <option value="">Pilih skill</option>
              {SKILL_CATALOG.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Skill yang ingin dipelajari</label>
            <select
              className={`${field} mt-1.5`}
              value={me.want}
              onChange={(e) => onChange("want", e.target.value)}
            >
              <option value="">Pilih skill</option>
              {SKILL_CATALOG.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={label}>Bio singkat</label>
          <textarea
            className={`${field} mt-1.5 min-h-[90px] resize-none`}
            placeholder="Ceritakan sedikit tentang usaha atau aktivitasmu"
            value={me.bio}
            onChange={(e) => onChange("bio", e.target.value)}
          />
        </div>

        <button
          onClick={onSave}
          className="w-full rounded-full bg-pasar-ochre px-6 py-3 font-body text-sm font-semibold text-pasar-deep transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          Simpan profil
        </button>
      </div>
    </div>
  );
}
