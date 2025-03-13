"use client";
// components from shadcn
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
// import { Toaster } from "@/components/ui/sonner";

// components from reactjs
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// components from nextjs
import Link from "next/link";
// React icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { TriangleAlert } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setPending(false);

      toast.success(data.message);
      router.push("/sign-in");
    } else if (res.status === 400) {
      setError(data.message);
      setPending(false);
    } else if (res.status === 500) {
      setError(data.message);
      setPending(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Signup</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground ">
            Use email service to sign up
          </CardDescription>
        </CardHeader>

        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex itmes-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert></TriangleAlert>
            <p>{error}</p>
          </div>
        )}

        <CardContent className="px-2 sm:px-6">
          <form action="" className="space-y-3" onSubmit={handleSubmit}>
            <Input
              type="text"
              disabled={pending}
              placeholder="Enter your  name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            ></Input>

            <Input
              type="email"
              disabled={pending}
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            ></Input>

            <Input
              type="password"
              disabled={pending}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            ></Input>

            <Input
              type="password"
              disabled={pending}
              placeholder="Confirm your Password"
              value={form.confirmpassword}
              onChange={(e) =>
                setForm({ ...form, confirmpassword: e.target.value })
              }
              required
            ></Input>

            <Button className="w-full" size="lg" disabled={pending}>
              Register
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
              Already have an account?
              <Link
                href="sign-in"
                className="text-sky-700 ml-4 hover:underline cursor:pointer
                  "
              >
                Login
              </Link>
            </p>
          </Separator>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
