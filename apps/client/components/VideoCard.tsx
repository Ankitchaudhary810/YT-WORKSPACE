import React from "react";

const VideoCard: React.FC<VideoCardProps> = ({
  videoUrl,
  title,
  description,
  uploadStatus,
}) => {
  return (
    <div className="w-200 h-100 border border-gray-300 rounded-md flex">
      <div className="w-1/2">
        <video width="320" height="240" controls preload="none">
          <source src={videoUrl} type="video/mp4" />
          <track kind="subtitles" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <p className="text-sm text-gray-500">{uploadStatus}</p>
      </div>
    </div>
  );
};

export default VideoCard;
