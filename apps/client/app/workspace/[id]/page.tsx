import React from "react";

interface Props {
  params: { id: string };
}

const videoDetails = ({ params: { id } }: Props) => {
  return <div>videoDetails {id}</div>;
};

export default videoDetails;
