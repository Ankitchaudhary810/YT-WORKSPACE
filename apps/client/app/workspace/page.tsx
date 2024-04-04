"use client";
import { useCurrentUser } from "@/hooks/user";
import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/Protection";
import VideoCard from "@/components/VideoCard";
const page = () => {
  const { user } = useCurrentUser();
  return (
    <main>
      <ProtectedRoute>
        <div>Workspace.</div>
        <VideoCard
          imageUrl="https://yt-workspace.s3.ap-south-1.amazonaws.com/uploads/clujwuowc0000x2u84fnxkuo1/video/auth-service-1712239644993.mp4"
          title="Sample Video"
          description="This is a sample video description."
          uploadStatus="Uploaded"
        />
      </ProtectedRoute>
    </main>
  );
};

export default page;
