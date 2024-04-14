"use client";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useVideoById } from "@/hooks/video";
import { useState } from "react";
import { FaYoutube } from "react-icons/fa6";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

interface Props {
  params: { id: string };
}

const page = ({ params: { id } }: Props) => {
  const { video, isLoading } = useVideoById(id);

  const [videoData, setVideoData] = useState({
    title: video?.title,
    description: video?.description,
  });

  if (isLoading) {
    return (
      <h1 className="flex items-center justify-center">
        <Loader />
      </h1>
    );
  }

  return (
    <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-black">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-white">
          {"This is the title"}
        </h1>
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
              value={"this is the title"}
              // onChange={handleTitleChange}
              className="border rounded px-4 py-2"
            />
            <Textarea
              value={"This is the description"}
              // onChange={handleDescriptionChange}
              className="border border-gray-300 rounded px-4 py-2 h-40"
            />
            {/* Implement your multi-select component for tags */}
            <Button
              variant={"outline"}
              // onClick={handleSubmit}
            >
              Save Changes
              <MdOutlinePublishedWithChanges className="ml-1" size={28} />
            </Button>
            <Button type="button" variant={"secondary"}>
              Upload
              <FaYoutube color="red" className="ml-1" size={25} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default page;
