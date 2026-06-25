"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "@/lib/Firebase";
import { Button } from "@/components/ui/button";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set the display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to sign in with Google.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
        <div className="flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-black dark:border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs mt-4 font-medium">Checking authentication...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-950 border-2 border-black dark:border-white rounded-none p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <h2 className="text-3xl font-black text-black dark:text-white mb-6 text-center uppercase tracking-wider">Create Account</h2>

        {error && (
          <div className="w-full bg-black dark:bg-white text-white dark:text-black text-sm px-4 py-3 border-2 border-black dark:border-white rounded-none mb-4 flex items-center gap-2 font-mono">
            <span className="font-bold">[ERROR]</span>
            <span className="truncate max-w-xs">{error}</span>
          </div>
        )}

        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black dark:text-white uppercase tracking-widest mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white rounded-none focus:outline-none focus:bg-zinc-50 dark:focus:bg-zinc-900 transition-all font-mono"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black dark:text-white uppercase tracking-widest mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white rounded-none focus:outline-none focus:bg-zinc-50 dark:focus:bg-zinc-900 transition-all font-mono"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-black dark:text-white uppercase tracking-widest mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white rounded-none focus:outline-none focus:bg-zinc-50 dark:focus:bg-zinc-900 transition-all font-mono"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" size="lg" className="w-full justify-center bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-100 font-bold py-3 border-2 border-black dark:border-white rounded-none uppercase tracking-widest transition-colors cursor-pointer">
            Sign Up
          </Button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t-2 border-black dark:border-white"></div>
          <span className="px-3 text-xs font-bold text-black dark:text-white uppercase tracking-wider">or</span>
          <div className="flex-1 border-t-2 border-black dark:border-white"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 active:translate-y-0.5 transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
        >
          <svg className="w-5 h-5 dark:invert" viewBox="0 0 24 24">
            <path
              fill="#000000"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#000000"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#000000"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#000000"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="mt-6 text-center text-xs font-bold uppercase tracking-wider text-black dark:text-white">
          Already have an account?{" "}
          <Link href="/signin" className="underline hover:no-underline font-black text-black dark:text-white">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
