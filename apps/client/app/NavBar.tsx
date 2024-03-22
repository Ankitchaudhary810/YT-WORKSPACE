"use client";
import Link from "next/link";
import React from "react";
import { CiVideoOn } from "react-icons/ci";

const NavBar = () => {
  const links = [
    { label: "Dashborad", href: "/" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-6 px-5 h-14 items-center">
      <Link href="/">
        <CiVideoOn />
      </Link>
      <ul
        className="flex space-x-6 
      "
      >
        {links.map((link) => (
          <Link
            key={link.label}
            className="text-zinc-500 hover:text-zinc-900 transition-colors"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
