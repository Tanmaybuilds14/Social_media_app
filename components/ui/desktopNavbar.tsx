"use client"
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { ModeToggle } from "./modetoggle";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/Firebase"
import { useEffect, useState } from "react";


function DesktopNavbar() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      return () => unsubscribe();
    });
  }, [])

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />
      <Button variant="ghost" asChild>
        <Link href="/" className="flex items-center gap-2">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      {currentUser ?
        (
          <>
            <Button variant="ghost" asChild>
              <Link href="/notifications" className="flex items-center gap-2">
                <BellIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Notifications</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href={`/profile/${currentUser.displayName ?? currentUser.email}`} className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Profile</span>
              </Link>
            </Button>
          </>
        ) :
        (
          <Button variant="default" asChild>
            <Link href="/signin">Sign in</Link>
          </Button>
        )}
    </div>
  );

}

export default DesktopNavbar;


