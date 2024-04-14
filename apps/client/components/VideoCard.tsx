import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { VideoCardProps } from "@/types/type";

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  aws_s3_url,
  title,
  description,
  status,
  dateTime,
}) => {
  const timeAgo = calculateTimeAgo(dateTime);
  const router = useRouter();

  const handleUpload = async (id: string) => {
    router.push(`/workspace/${id}`);
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Card className="max-w-96 bg-black text-white ">
      <CardHeader>
        <CardTitle>
          <h3 className="text-sm">{title}</h3>
        </CardTitle>

        <CardContent>
          <video width="400" height="400" preload="none" controls>
            <source src={aws_s3_url} type="video/mp4" />
            <track kind="subtitles" srcLang="en" label="English" />
            Your browser does not support the video tag.
          </video>
        </CardContent>
        <h1 className="text-[13px]">{timeAgo}</h1>
        <CardDescription>
          {truncateDescription(description, 150)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="ml-[-10px]">
          <Badge variant={"destructive"}>
            <span className="text-[10px]">{status}</span>
          </Badge>
        </div>
        <div>
          <Button
            className="text-sm p-2"
            variant={"default"}
            onClick={() => handleUpload(id)}
          >
            Continue
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;

export const calculateTimeAgo = (dateTime: Date) => {
  const currentTime: number = Date.now();
  const pastTime: number = new Date(dateTime).getTime();

  const timeDifference = currentTime - pastTime;
  let timeAgoString = "";

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    timeAgoString = `${years} year${years !== 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    timeAgoString = `${months} month${months !== 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    timeAgoString = `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    timeAgoString = `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    timeAgoString = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    timeAgoString = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    timeAgoString = `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }

  return timeAgoString;
};
