"use client";
import { useCurrentUser } from "@/hooks/user";
import React, { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import VideoCard from "@/components/VideoCard";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const page = () => {
  const { user } = useCurrentUser();
  const router = useRouter();

  useLayoutEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user]);

  return (
    <main className="p-2 m-2">
      <div className="text-center">Workspace.</div>
      {user &&
        user.workspace &&
        user.workspace.map((workspace: any) => (
          <VideoCard
            id={workspace.id}
            title={workspace.title}
            description={workspace.description}
            status={workspace.status}
            aws_s3_url={workspace.aws_s3_url}
            dateTime={new Date(workspace.createdAt)}
          />
        ))}
    </main>
  );
};

export default page;
