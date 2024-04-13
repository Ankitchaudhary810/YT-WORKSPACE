"use client";
import { useVideoById } from "@/hooks/video";
import { useQueries, useQuery } from "@tanstack/react-query";

interface Props {
  params: { id: string };
}

const page = ({ params: { id } }: Props) => {
  console.log("id: ", id);
  const { video, isLoading } = useVideoById(id);
  console.log("video: ", video);

  if (isLoading) return <p>Loading.....</p>;
  return <div>page</div>;
};

export default page;
