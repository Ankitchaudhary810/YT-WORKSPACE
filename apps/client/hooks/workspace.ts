"use client";
import { useQuery } from "@tanstack/react-query";

export const useGetAllWorkspaces = () => {
  const query = useQuery({
    queryKey: ["video-by-id"],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/get-user-workspaces",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_jwt")}`,
          },
          cache: "no-cache",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to find the workspaces");
      }
      return await response.json();
    },
  });
  return { ...query, workspaces: query.data, isLoading: query.isLoading };
};
