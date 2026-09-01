import { useEffect, useState } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "../firebase";

// Setiap pengunjung otomatis dapat identitas unik (uid) tanpa perlu
// bikin akun/login. Ini dipakai supaya profil tiap orang tersimpan
// terpisah dan persist walau browser ditutup (selama localStorage/
// Firebase session Auth-nya masih ada di device yang sama).
export function useAuthUid() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        signInAnonymously(auth).catch((err) => {
          console.error("Gagal login anonim:", err);
        });
      }
    });
    return unsub;
  }, []);

  return uid;
}
