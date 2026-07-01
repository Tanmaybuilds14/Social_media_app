"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/Firebase";

import { User } from "firebase/auth";

const AuthContext = createContext<{ user: User | null; loading: boolean }>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, SetUser] = useState<User | null>(null);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (CurrentUser) => {
      SetUser(CurrentUser);
      SetLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)