"use client";
import Image from "next/image";
import "./globals.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useLogin";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data, login, error, loading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    console.log({ email, password });
    login(email, password);
    console.log("data: ", data.token);
    if (data.token) {
      router.push("/home");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-zinc-900">
            Continue
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-slate-100">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Login To workspace In order to upload the video.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                id="email"
                placeholder="kit@gmail.com"
                className={`col-span-3 ${error ? "outline outline-red-900 outline-3" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                Password
              </Label>
              <Input
                id="name"
                type="password"
                placeholder="***** *****"
                className={`col-span-3 ${error ? "outline outline-red-900 outline-3" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <Button
              type="button"
              variant={"secondary"}
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "Logging in..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
