"use client"
import {
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  BellIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { auth } from "@/lib/Firebase";
import { signOut } from "@/lib/Firebase";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/useAuth";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSigned } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        {theme === "dark" ? <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90" ></SunIcon> : <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-0 dark:scale-100"></MoonIcon>}
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger render={<Button variant="ghost" size="icon" />}>
          <MenuIcon className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="right" className="w-75">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
              <Link href="/">
                <HomeIcon className="w-4 h-4"></HomeIcon>
                Home
              </Link>
            </Button>
            {isSigned ? (
              <>
                <Button variant="ghost" className="flex items-center gap-3 justify-start" asChild>
                  <Link href="/notifications">
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                <Button variant="ghost" className="flex items-center gap-3 justify-start " asChild>
                  <Link href="/profile">
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <Button variant="ghost" className="flex items-center gap-3 justify-start w-full" onClick={() => { signOut(auth) }}>
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="default" className="w-full">
                <Link href="/signin">Sign In</Link>
              </Button>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
export default MobileNavbar;