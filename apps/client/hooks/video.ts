"use client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useVideoById = (id: string) => {
  const query = useQuery({
    queryKey: ["video-by-id", id],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/get-video-by-id/" + id,
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
  });
  return { ...query, video: query.data, isLoading: query.isLoading };
};

export const useUpdateVideoById = (id: string) => {};
