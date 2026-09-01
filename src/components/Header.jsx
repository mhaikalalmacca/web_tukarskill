import { ArrowLeftRight, Compass, Sparkles, UserRound } from "lucide-react";

const TABS = [
  { key: "beranda", label: "Beranda", icon: ArrowLeftRight },
  { key: "jelajahi", label: "Jelajahi", icon: Compass },
  { key: "cocok", label: "Cocok Untukmu", icon: Sparkles },
  { key: "profil", label: "Profil Saya", icon: UserRound },
];

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 border-b border-pasar-paper/10 bg-pasar-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pasar-ochre text-pasar-deep">
            <ArrowLeftRight size={18} strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display text-lg font-semibold leading-none text-pasar-paper">
              TukarSkill
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-pasar-paper/50">
              ekonomi kolaboratif lokal
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1 rounded-full border border-pasar-paper/10 bg-pasar-deep2 p-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                activeTab === key
                  ? "bg-pasar-ochre text-pasar-deep"
                  : "text-pasar-paper/70 hover:text-pasar-paper"
              }`}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
