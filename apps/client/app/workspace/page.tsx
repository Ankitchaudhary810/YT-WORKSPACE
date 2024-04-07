"use client";
import { useCurrentUser } from "@/hooks/user";
import React, { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/Protection";
import VideoCard from "@/components/VideoCard";

const page = () => {
  const { user } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user]);
  return (
    <ProtectedRoute>
      <main className="p-2 m-2">
        <div className="text-center">Workspace.</div>
        {user &&
          user.workspace &&
          user.workspace.map((workspace: any) => (
            <VideoCard
              title={workspace.title}
              description={workspace.description}
              status={workspace.status}
              aws_s3_url={workspace.aws_s3_url}
              dateTime={new Date(workspace.createdAt)}
            />
          ))}
      </main>
    </ProtectedRoute>
  );
};

export default page;
