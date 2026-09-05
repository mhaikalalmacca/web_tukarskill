import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInAnonymously,
  signOut,
  GoogleAuthProvider,
  linkWithPopup,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const googleProvider = new GoogleAuthProvider();

export function useAuthUid() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setLoading(false);
      } else {
        signInAnonymously(auth).catch((err) => {
          console.error("Gagal login anonim:", err);
          setLoading(false);
        });
      }
    });
    return unsub;
  }, []);

  const loginWithGoogle = async () => {
    try {
      if (auth.currentUser?.isAnonymous) {
        await linkWithPopup(auth.currentUser, googleProvider);
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (err) {
      // Kalau akun Google itu sudah pernah dipakai sebelumnya, login biasa aja
      if (err.code === "auth/credential-already-in-use") {
        await signInWithPopup(auth, googleProvider);
      } else {
        console.error("Gagal login Google:", err);
        throw err;
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
    // onAuthStateChanged di atas otomatis signInAnonymously lagi
  };

  return {
    uid: user?.uid ?? null,
    user,
    isAnonymous: user?.isAnonymous ?? true,
    loading,
    loginWithGoogle,
    logout,
  };
}