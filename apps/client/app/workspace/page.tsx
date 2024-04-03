"use client";
import { useCurrentUser } from "@/hooks/user";
import React from "react";

const page = () => {
  const { user } = useCurrentUser();
  console.log("currentUser: ", user);
  return (
    <>
      <div>Workspace.</div>;<h1>User Details.</h1>
    </>
  );
};

export default page;
