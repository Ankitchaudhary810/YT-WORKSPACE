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
import toast from "react-hot-toast";
import Loader from "@/components/ui/Loader";
import { useSignUp } from "@/hooks/user";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      setLoading(false);
      if (response.status === 200) {
        toast.success("Sign Up Successful!");
        router.push("/signin");
      } else if (response.status === 400) {
        toast.error("Email Already Exists");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed To Sign Up");
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden rounded-sm mt-2">
      <div className="w-96 m-auto bg-black lg:max-w-lg rounded-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 mt-1">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
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
            <span className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </span>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <Loader /> : "Sign Up"}
            </Button>
            <p className="mt-2 text-xs text-center text-gray-700">
              Already have an account?{" "}
              <span className="text-blue-600 hover:underline">
                <Link href="/signin">Sign In</Link>
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
