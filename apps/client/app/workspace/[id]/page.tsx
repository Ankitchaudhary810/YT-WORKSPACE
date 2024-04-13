import { Video } from "@/types/type";
import React from "react";

interface Props {
  params: { id: string };
  videoData: Video;
}

const page = async ({ params: { id }, videoData }: Props) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/get-video-by-id/" + id,
    {
      headers: {},
    }
  );

  console.log("response: ", response);

  const data = await response.json();
  console.log(data);
  return <div>page</div>;
};

export default page;
