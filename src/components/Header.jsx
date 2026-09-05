import { useState } from "react";
import {
  ArrowLeftRight,
  Compass,
  Sparkles,
  UserRound,
  ChevronDown,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.png";

const MAIN_TABS = [
  { key: "beranda", label: "Beranda", icon: ArrowLeftRight },
  { key: "jelajahi", label: "Jelajahi", icon: Compass },
  { key: "cocok", label: "Cocok Untukmu", icon: Sparkles },
];

export default function Header({ activeTab, setActiveTab, user, isAnonymous, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const displayName = user?.displayName || "";
  const initial = displayName.trim().charAt(0).toUpperCase();

  const tabClass = (key) =>
    `flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
      activeTab === key
        ? "bg-pasar-ochre text-white"
        : "text-pasar-paper/70 hover:text-pasar-paper"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-pasar-paper/10 bg-pasar-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center">
            <img src={logo} alt="Switch Skill" className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold leading-none text-pasar-paper">
              Switch Skill
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-pasar-paper/50">
              ekonomi kolaboratif lokal
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1 rounded-full border border-pasar-paper/10 bg-pasar-deep2 p-1">
          {MAIN_TABS.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setActiveTab(key)} className={tabClass(key)}>
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}

          {isAnonymous ? (
            <button onClick={() => setActiveTab("profil")} className={tabClass("profil")}>
              <UserRound size={15} />
              <span className="hidden sm:inline">Profil Saya</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-pasar-paper/80 hover:text-pasar-paper"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={displayName}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pasar-ochre text-[11px] font-semibold text-white">
                    {initial}
                  </span>
                )}
                <span className="hidden sm:inline">{displayName}</span>
                <ChevronDown size={13} className="text-pasar-paper/40" />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-pasar-paper/10 bg-pasar-deep2 py-1 shadow-xl">
                    <button
                      onClick={() => {
                        setActiveTab("profil");
                        setMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-pasar-paper/80 hover:bg-pasar-paper/5 hover:text-pasar-paper"
                    >
                      <UserRound size={15} />
                      Profil Saya
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-300 hover:bg-red-500/10"
                    >
                      <LogOut size={15} />
                      Keluar
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}