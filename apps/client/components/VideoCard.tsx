import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

const VideoCard: React.FC<VideoCardProps> = ({
  aws_s3_url,
  title,
  description,
  status,
}) => {
  return (
    <Card className="max-w-96 bg-black text-white">
      <CardHeader>
        <CardTitle>
          <h3 className="text-sm">{title}</h3>
        </CardTitle>

        <CardContent>
          <video width="320" height="240" controls preload="none">
            <source src={aws_s3_url} type="video/mp4" />
            <track kind="subtitles" srcLang="en" label="English" />
            Your browser does not support the video tag.
          </video>
        </CardContent>
        <CardDescription>{description}</CardDescription>
        <div>
          <Badge>{status}</Badge>
        </div>
      </CardHeader>
    </Card>
  );
};

export default VideoCard;
