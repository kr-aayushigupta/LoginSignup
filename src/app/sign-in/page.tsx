"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";

import Link from "next/link";
// React icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
// import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPending(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })


    if (res?.ok) {
      router.push("/welcome");
      toast.success("login successful");
    } else if (res?.status === 401) {
      setError("Invalid Credentials");
      setPending(false);
    } else {
      setError("Something went wrong");
    }
  }

  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground ">
            Use email service to Login
          </CardDescription>
        </CardHeader>

        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex itmes-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert></TriangleAlert>
            <p>{error}</p>
          </div>
        )}

        <CardContent className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} action="" className="space-y-3 ">
            <Input
              type="email"
              disabled={pending}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Input>

            <Input
              type="password"
              disabled={pending}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Input>

            <Button className="w-full" size="lg" disabled={pending}>
              Login
            </Button>
          </form>

          <Separator>
            <div className="flex my-2 justify-evenly mx-auto items-center">
              <Button
                disabled={false}
                onClick={() => {}}
                variant="outline"
                size="lg"
                className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
              >
                <FcGoogle className="size-8 left-2.5 top-2.5"></FcGoogle>
              </Button>

              <Button
                disabled={false}
                onClick={() => {}}
                variant="outline"
                size="lg"
                className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
              >
                <FaGithub className="size-8 left-2.5 top-2.5"></FaGithub>
              </Button>
            </div>

            <p className="text-center text-sm mt-2 text-muted-foreground">
              Create New Account
              <Link
                href="sign-up"
                className="text-sky-700 ml-4 hover:underline cursor:pointer
                  "
              >
                Sign-up
              </Link>
            </p>
          </Separator>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
