import React from "react";
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

const VideoCard: React.FC<VideoCardProps> = ({
  aws_s3_url,
  title,
  description,
  status,
  dateTime,
}) => {
  const timeAgo = calculateTimeAgo(dateTime);
  return (
    <Card className="max-w-96 bg-black text-white">
      <CardHeader>
        <CardTitle>
          <h3 className="text-sm ">{title}</h3>
        </CardTitle>

        <CardContent>
          <video width="400" height="400" preload="none" controls>
            <source src={aws_s3_url} type="video/mp4" />
            <track kind="subtitles" srcLang="en" label="English" />
            Your browser does not support the video tag.
          </video>
        </CardContent>
        <h1 className="text-sm">{timeAgo}</h1>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="ml-[-10px]">
          <Badge variant={"destructive"}>
            <span className="text-[10px]">{status}</span>
          </Badge>
        </div>
        <div>
          <Button className="text-[10px] p-2">Edit/Upload</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;

const calculateTimeAgo = (dateTime: Date) => {
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
