"use server";
import { Video } from "@/types/type";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";

interface Props {
  params: { id: string };
  videoData: Video;
}

const videoDetails = ({ params: { id }, videoData }: Props) => {
  console.log(videoData);
  return <div>videoDetails {id}</div>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const id = context.query.id;
  if (!id) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/get-video-by-id/" + id
  );

  const data = await response.json();
  return {
    props: {
      params: {
        id: id.toString(),
      },
      videoData: data,
    },
  };
};

export default videoDetails;
