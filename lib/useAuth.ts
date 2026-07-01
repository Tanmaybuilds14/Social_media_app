"use client"
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase"

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setIsLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  return {
    isLoaded,
    userId,
    isSigned: !!userId
  }
}