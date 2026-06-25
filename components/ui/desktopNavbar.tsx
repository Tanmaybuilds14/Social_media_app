"use client"
import { onAuthStateChanged } from "firebase/auth"
import { useAuth } from '@/context/Authcontext';

export default function DesktopNavbar() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>DesktopNavbar</div>
  );
}

