"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

// export const useUpdateVideoById = (id: string) => {
//   const mutation = useMutation({
//     mutationKey: ["update-workspace-by-id"],
//     mutationFn: async ({
//       title,
//       description,
//     }: {
//       title: string;
//       description: string;
//     }) => {
//       const response = await fetch(
//         process.env.NEXT_PUBLIC_BACKEND_URL + "/update-workspace-by-id/" + id,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("user_jwt")}`,
//           },
//           body: JSON.stringify({ title, description }),
//           cache: "no-cache",
//         }
//       );
//       console.log(response);
//       if (!response.ok) {
//         throw new Error("Failed to find the current user");
//       }
//       return await response.json();
//     },
//     onMutate: async () => {
//       toast.loading("Updating...", { id: "1" });
//     },
//     onSuccess: async () => {
//       toast.success("Updated", { id: "1" });
//     },
//     onError: async () => {
//       toast.error("Fail to update", { id: "1" });
//     },
//   });

//   return { ...mutation, data: mutation.data };
// };

// extra

export const useupdatevideo = async (
  title: string,
  description: string,
  id: string
) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/update-workspace-by-id/" + id,
    {
      method: "POST",
      headers: {
        "ContenType-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user_jwt")}`,
      },
      body: JSON.stringify({ title, description }),
      cache: "no-cache",
    }
  );

  return response.json();
};
