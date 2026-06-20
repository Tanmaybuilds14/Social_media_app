import { Button } from "../components/ui/button"
import Link from 'next/link'
import { ModeToggle } from "@/components/ui/modetoggle";

export default function Home() {
  return (
    <div className="m-4">
      <Button variant={"secondary"}><Link href={"/signin"}>sign in</Link></Button>
      <ModeToggle></ModeToggle>
      <Button variant={"secondary"}><Link href={"/signup"}>signup</Link></Button>
    </div>
  );
}