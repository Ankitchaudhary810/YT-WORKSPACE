"use client";
import { useCurrentUser } from "@/hooks/user";
import React, { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import VideoCard from "@/components/VideoCard";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useGetAllWorkspaces } from "@/hooks/workspace";
import Loader from "@/components/ui/Loader";
import { Video } from "@/types/type";

const page = () => {
  const { user } = useCurrentUser();
  const { workspaces, isLoading } = useGetAllWorkspaces();
  console.log("workspace: ", workspaces);
  // const router = useRouter();

  // useLayoutEffect(() => {
  //   if (!user) {
  //     router.push("/signin");
  //   }
  // }, [user]);
  if (isLoading) {
    return (
      <h1 className="flex items-center justify-center">
        <Loader />
      </h1>
    );
  }

  return (
    <main className="p-2 m-2">
      <div className="grid md:grid-cols-3 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {/* <div className="text-center">Workspace.</div> */}

        {workspaces &&
          workspaces.map((workspace: Video) => (
            <VideoCard
              id={workspace.id}
              title={workspace.title}
              description={workspace.description}
              status={workspace.status}
              aws_s3_url={workspace.aws_s3_url}
              dateTime={new Date(workspace.createdAt)}
            />
          ))}
      </div>
    </main>
  );
};

export default page;
