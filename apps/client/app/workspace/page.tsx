"use client";
import { useCurrentUser } from "@/hooks/user";
import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/Protection";
import { Video } from "@/components/VideoCard";

const page = () => {
  const { user } = useCurrentUser();
  return (
    <>
      <ProtectedRoute>
        <div>Workspace.</div>;<h1>{user?.name}</h1>
        <Video />
      </ProtectedRoute>
    </>
  );
};

export default page;
