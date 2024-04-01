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

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

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
              <Button className="w-full" onClick={handleSubmit}>
                Sign Up
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
