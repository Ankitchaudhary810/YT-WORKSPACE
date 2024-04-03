"use client";
import { useCurrentUser } from "@/hooks/user";
import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/Protection";
const page = () => {
  return (
    <>
      <ProtectedRoute>
        <div>Workspace.</div>;<h1>User Details.</h1>
      </ProtectedRoute>
    </>
  );
};

export default page;
