"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiVideoOn } from "react-icons/ci";

const NavBar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Workspace", href: "/workspace" },
    { label: "About", href: "/about" },
  ];

  const currentPath = usePathname();

  return (
    <nav className="flex space-x-6 border-b border-gray-50 mb-6 px-5 h-14 items-center justify-between">
      <Link href="/">
        <CiVideoOn size={30} />
      </Link>
      <ul className="flex space-x-6 px-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              className={`${link.href === currentPath ? "text-slate-100 bg-slate-900 outline outline-1" : "text-zinc-400"} hover:text-zinc-300 transition-colors px-2 py-1 rounded-sm`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
