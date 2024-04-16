import React from "react";
import VideoDetails from "./VideoDetails";
import { Metadata } from "next";

const page = () => {
  return (
    <>
      <VideoDetails params={{ id: "clulbaahp0000125zrfr6cc33" }} />
    </>
  );
};

export const metadata: Metadata = {
  title: "dynamic title",
  description: "dynamic descrition",
};

export default page;
