"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiVideoOn } from "react-icons/ci";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Workspace", href: "/workspace" },
    { label: "About", href: "/about" },
  ];

  const currentPath = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();

  function handleSignOut() {
    if (localStorage.getItem("user_jwt") === null) {
      return;
    }
    localStorage.clear();
    toast.success("Signout Success!");
    router.push("/");
  }

  return (
    <>
      <nav className="flex justify-between items-center border-b border-gray-50 mb-6 px-5 h-14">
        <Link href="/">
          <CiVideoOn size={30} />
        </Link>
        <ul className="flex space-x-6 ">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                className={`${
                  link.href === currentPath
                    ? "text-black bg-slate-100 outline outline-1"
                    : "text-white"
                }  transition-colors px-2 py-1 rounded`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Button variant="ghost" className="py-1 my-1" onClick={handleSignOut}>
          Sign Out
        </Button>
      </nav>
    </>
  );
};

export default NavBar;
