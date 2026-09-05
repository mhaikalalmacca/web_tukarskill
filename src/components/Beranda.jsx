import {
  ArrowLeftRight,
  Users,
  MapPin as MapPinIcon,
  LayoutGrid,
  PenLine,
  Sparkles,
} from "lucide-react";
import SkillChip from "./SkillChip";

const STATS = [
  { icon: Users, num: "128", label: "anggota aktif" },
  { icon: ArrowLeftRight, num: "342", label: "skill ditukar" },
  { icon: MapPinIcon, num: "9", label: "kota di Jawa Timur" },
  { icon: LayoutGrid, num: "10", label: "kategori skill" },
];

const STEPS = [
  {
    n: "01",
    icon: PenLine,
    title: "Isi skill kamu",
    body: "Tulis satu skill yang kamu kuasai dan satu skill yang ingin kamu pelajari.",
  },
  {
    n: "02",
    icon: Users,
    title: "Sistem cocokkan",
    body: "TukarSkill mencari orang lain yang saling melengkapi kebutuhanmu.",
  },
  {
    n: "03",
    icon: ArrowLeftRight,
    title: "Tukar dan belajar",
    body: "Ajak tukar, sepakati caranya, lalu belajar bareng tanpa keluar uang.",
  },
];

export default function Beranda({ goTo }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14">
      <section className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-pasar-ochre">
            SDG 8 — Pekerjaan Layak &amp; Pertumbuhan Ekonomi
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-pasar-ink sm:text-5xl">
            Nggak perlu modal besar buat belajar skill baru
          </h1>
          <p className="mt-5 max-w-md font-body text-base leading-relaxed text-pasar-ink/70">
            TukarSkill menghubungkan mahasiswa, anak muda, dan pelaku usaha
            kecil yang mau saling tukar keahlian — seperti pasar barter,
            tapi versi digital. Kamu punya kemampuan desain, orang lain punya
            kemampuan motret. Tukar, sama-sama untung.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => goTo("profil")}
              className="rounded-full bg-pasar-ochre px-6 py-3 font-body text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Lengkapi profil
            </button>
            <button
              onClick={() => goTo("jelajahi")}
              className="rounded-full border border-pasar-ink/30 px-6 py-3 font-body text-sm font-semibold text-pasar-ink transition-colors hover:bg-pasar-ink/5"
            >
              Jelajahi skill
            </button>
          </div>
        </div>

        <div className="relative flex h-80 items-center justify-center">
          <svg
            viewBox="0 0 300 300"
            className="pointer-events-none absolute h-64 w-64 text-pasar-ink/15"
          >
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
          </svg>

          <div className="absolute left-2 top-4 w-56 -rotate-6 rounded-2xl border border-pasar-ink/15 bg-white p-5 shadow-xl">
            <p className="font-mono text-[10px] uppercase tracking-widest text-pasar-ink/50">
              Punya
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-pasar-ink">
              Desain Grafis
            </p>
            <div className="mt-3">
              <SkillChip label="Rina · Malang" tone="ochre" />
            </div>
          </div>
          <div className="absolute right-2 bottom-4 w-56 rotate-6 rounded-2xl border border-pasar-ink/15 bg-white p-5 shadow-xl">
            <p className="font-mono text-[10px] uppercase tracking-widest text-pasar-ink/50">
              Butuh
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-pasar-ink">
              Fotografi Produk
            </p>
            <div className="mt-3">
              <SkillChip label="Bayu · Surabaya" tone="leaf" />
            </div>
          </div>
          <div className="z-10 flex h-14 w-14 items-center justify-center rounded-full bg-pasar-ochre text-pasar-deep shadow-lg">
            <ArrowLeftRight size={24} strokeWidth={2.5} />
          </div>
        </div>
      </section>

      <section className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map(({ icon: Icon, num, label }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-pasar-ink/10 bg-white px-4 py-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pasar-ochre/15 text-pasar-ochreDark">
              <Icon size={20} strokeWidth={2} />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-pasar-ochre">
                {num}
              </p>
              <p className="font-body text-xs text-pasar-ink/60">{label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-20">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-pasar-ink">
          <Sparkles size={20} className="text-pasar-ochre" />
          Cara kerjanya
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {STEPS.map(({ n, icon: Icon, title, body }) => (
            <div
              key={n}
              className="rounded-xl border border-pasar-ink/10 bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pasar-ochre/15 text-pasar-ochreDark">
                  <Icon size={19} strokeWidth={2} />
                </div>
                <p className="font-mono text-xs font-semibold text-pasar-ochre">
                  {n}
                </p>
              </div>
              <p className="mt-3 font-display text-lg font-semibold text-pasar-ink">
                {title}
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-pasar-ink/65">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
