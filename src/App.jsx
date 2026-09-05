import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { useAuthUid } from "./hooks/useAuthUid";
import { SEED_PROFILES } from "./data/seed";
import { getMatchType } from "./data/mockUsers";

import Header from "./components/Header";
import Beranda from "./components/Beranda";
import Jelajahi from "./components/Jelajahi";
import Cocok from "./components/Cocok";
import Profil from "./components/Profil";
import Toast from "./components/Toast";

const EMPTY_PROFILE = { name: "", kota: "", offer: "", want: "", bio: "" };

export default function App() {
  const { uid, user, isAnonymous, loginWithGoogle, logout } = useAuthUid();

  const [activeTab, setActiveTab] = useState("beranda");
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [requestedIds, setRequestedIds] = useState([]);
  const [toastMsg, setToastMsg] = useState("");

  // 1. Seed data contoh ke Firestore sekali saja (kalau koleksi masih kosong)
  useEffect(() => {
    if (!uid) return;
    (async () => {
      const seedMarkerRef = doc(db, "meta", "seeded");
      const seedMarkerSnap = await getDoc(seedMarkerRef);
      if (seedMarkerSnap.exists()) return;

      const batch = writeBatch(db);
      SEED_PROFILES.forEach((p) => {
        const { id, ...rest } = p;
        batch.set(doc(db, "profiles", id), rest);
      });
      batch.set(seedMarkerRef, { seeded: true, at: serverTimestamp() });
      await batch.commit();
    })();
  }, [uid]);

  // 2. Pastikan dokumen profil milik pengguna ini ada (kosong di awal)
  useEffect(() => {
    if (!uid) return;
    (async () => {
      const myRef = doc(db, "profiles", uid);
      const mySnap = await getDoc(myRef);
      if (!mySnap.exists()) {
        await setDoc(myRef, EMPTY_PROFILE);
      }
    })();
  }, [uid]);

  // 3. Dengarkan semua profil secara real-time
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "profiles"),
      (snap) => {
        setProfiles(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoadingProfiles(false);
      },
      (err) => {
        console.error("Gagal membaca profiles:", err);
        setLoadingProfiles(false);
      }
    );
    return unsub;
  }, []);

  const me = profiles.find((p) => p.id === uid) || { id: uid, ...EMPTY_PROFILE };
  const others = profiles.filter((p) => p.id !== uid);
  const matches = others
    .map((u) => ({ ...u, matchType: getMatchType(me, u) }))
    .filter((u) => u.matchType);

  // Edit form profil (state lokal dulu, baru disimpan ke Firestore saat klik "Simpan")
  const [draft, setDraft] = useState(null);
  const activeProfile = draft ?? me;

  const handleProfileChange = (field, value) => {
    setDraft({ ...activeProfile, [field]: value });
  };

  const handleSaveProfile = async () => {
    if (!uid) return;
    await setDoc(
      doc(db, "profiles", uid),
      { ...EMPTY_PROFILE, ...activeProfile, updatedAt: serverTimestamp() },
      { merge: true }
    );
    setDraft(null);
    showToast("Profil kamu tersimpan ke database.");
    setActiveTab("cocok");
  };

  const handleRequest = async (targetUser) => {
    if (!uid || requestedIds.includes(targetUser.id)) return;
    setRequestedIds((prev) => [...prev, targetUser.id]);
    try {
      await addDoc(collection(db, "requests"), {
        fromUid: uid,
        fromName: me.name || "Tanpa nama",
        toUid: targetUser.id,
        toName: targetUser.name,
        status: "menunggu",
        createdAt: serverTimestamp(),
      });
      showToast(`Permintaan tukar terkirim ke ${targetUser.name}.`);
    } catch (err) {
      console.error("Gagal mengirim permintaan:", err);
      showToast("Gagal mengirim permintaan, coba lagi.");
    }
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToastMsg(""), 3000);
  };

  const notReady = !uid || loadingProfiles;

  return (
    <div className="min-h-screen bg-pasar-paper font-body">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        isAnonymous={isAnonymous}
        onLogout={logout}
      />

      {notReady ? (
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="font-body text-sm text-pasar-ink/50">
            Menyambungkan ke database...
          </p>
        </div>
      ) : (
        <>
          {activeTab === "beranda" && <Beranda goTo={setActiveTab} />}

          {activeTab === "jelajahi" && (
            <Jelajahi
              others={others}
              requestedIds={requestedIds}
              onRequest={handleRequest}
            />
          )}

          {activeTab === "cocok" && (
            <Cocok
              me={me}
              matches={matches}
              requestedIds={requestedIds}
              onRequest={handleRequest}
              goTo={setActiveTab}
            />
          )}

          {activeTab === "profil" && (
            <Profil
              me={activeProfile}
              onChange={handleProfileChange}
              onSave={handleSaveProfile}
              isAnonymous={isAnonymous}
              onLogin={loginWithGoogle}
            />
          )}
        </>
      )}

      <footer className="border-t border-pasar-ink/10 py-6 text-center">
        <p className="font-mono text-[11px] text-pasar-ink/40">
          Data tersimpan di Firebase Firestore · identitas otomatis (anonim) per perangkat
        </p>
      </footer>

      <Toast message={toastMsg} />
    </div>
  );
}
