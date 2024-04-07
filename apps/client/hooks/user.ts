"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],

    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_jwt")}`,
          },
          cache: "no-cache",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to find the current user");
      }
      return await response.json();
    },
    staleTime: 0,
  });
  return { ...query, user: query.data };
};
