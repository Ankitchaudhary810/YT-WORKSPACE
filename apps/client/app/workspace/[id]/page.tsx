"use client";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useVideoById } from "@/hooks/video";
import { use, useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa6";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useUpdateVideoById } from "@/hooks/video";
import React from "react";
import { getAuthUrl } from "@/hooks/user";
import { useMemo } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface Props {
  params: { id: string };
}

const page = ({ params: { id } }: Props) => {
  const { video, isLoading } = useVideoById(id);
  const { mutateAsync, isPending } = useUpdateVideoById(id);
  const [verified, setVerified] = useState(false);
  const [isVideoLoading, setVideoLoading] = useState(false);
  const router = useRouter();
  const { authUrl } = getAuthUrl();

  const [videoData, setVideoData] = useState({
    title: video?.title,
    description: video?.description,
  });

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVideoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    if (!isLoading && video) {
      setVideoData({
        title: video.title,
        description: video.description,
      });
    }
  }, [isLoading, video]);

  const handleChanges = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await mutateAsync({
        title: videoData.title,
        description: videoData.description,
      });
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  if (isLoading) {
    return (
      <h1 className="flex items-center justify-center">
        <Loader />
      </h1>
    );
  }

  // FIXME: THIS NEED TO BE FIX
  const handleVerifyUser = () => {
    window.open(authUrl as string, "_blank");
    setVerified(true);
  };

  // FIXME: need proper upload.
  const handleVideoUpload = async () => {
    setVideoLoading(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/upload-video-to-youtube",
      {
        method: "POST",
      }
    );

    setVideoLoading(false);
  };

  return (
    <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-black">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-white">{video?.title}</h1>
        <video className="w-full" controls muted>
          <source src={video.aws_s3_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div>
        <Card className="p-3 bg-black sm:mt-10">
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              value={videoData.title}
              onChange={handleChangeInput}
              name="title"
              className="border rounded px-4 py-2"
            />
            <Textarea
              value={videoData.description}
              onChange={handleChangeInput}
              name="description"
              className="border border-gray-300 rounded px-4 py-2 h-40"
            />
            <Button variant={"outline"} type="button" onClick={handleChanges}>
              {isPending ? <Loader /> : "Save Changes"}
              {!isPending && (
                <MdOutlinePublishedWithChanges className="ml-1" size={28} />
              )}
            </Button>
            <div className="flex gap-3 ">
              <Button
                type="button"
                variant={"secondary"}
                disabled={isPending || !verified}
                onClick={handleVideoUpload}
              >
                {isVideoLoading ? <Loader /> : "Upload"}
                {!isVideoLoading && (
                  <FaYoutube color="red" className="ml-1" size={25} />
                )}
              </Button>
              {/* <Link href={authUrl} target="_blank"> */}
              <Button type="button" onClick={handleVerifyUser}>
                Verify
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default page;
