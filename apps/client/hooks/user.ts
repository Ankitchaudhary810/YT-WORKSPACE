"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async ({ name, email, password }: SignUpProps) => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      return await response.json();
    },
  });
  return mutation;
};

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["curent-user"],
    queryFn: async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_jwt")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to sign in");
      }
      return await response.json();
    },
  });
  console.log("query: ", query);
  return { ...query, user: query.data };
};
