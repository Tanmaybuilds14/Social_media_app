"use server"
import { useAuth } from "@/lib/useAuth";
import { Button } from "./button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "./card";


async function Sidebar() {
  const { isSigned } = useAuth();
  if (!isSigned) return <UnAuthenticatedSidebar />;
  return <div>Sidebar</div>
}

const UnAuthenticatedSidebar = () => {
  return (<div className="sticky top-20">
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">Welcome Back</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">Login to access your profile and connect with others.
        </p>
        <Button variant="ghost">
          <Link href="Signin">Login</Link>
        </Button>
        <Button variant="ghost">
          <Link href="Signup">Sign up</Link>
        </Button>
      </CardContent>
    </Card>
  </div>)
}
export default Sidebar;