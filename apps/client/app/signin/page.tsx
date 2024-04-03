"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import toast from "react-hot-toast";
import Loader from "@/components/ui/Loader";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.status === 200) {
        const token = await response.json();
        window.localStorage.setItem("user_jwt", token);
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
        await toast.success("Sign In Successful!");
        router.push("/workspace");
      } else if (response.status === 400) {
        toast.error("Data Not Found.");
      }
    } catch (error) {
      console.error("SignIn error:", error);
      toast.error("Failed To Sign In");
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden rounded-sm">
        <div className="w-96 m-auto  lg:max-w-lg rounded-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-black">
                Login For User
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to sign in
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-black">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <span className=" text-blue-600 hover:underline text-sm">
                Forget password ?
              </span>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <Loader /> : "Sign In"}
              </Button>
              <p className="mt-2 text-xs text-center text-gray-700">
                {" "}
                New Here?{" "}
                <span className=" text-blue-600 hover:underline">
                  <Link href="/signup">Sign up</Link>
                </span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
