"use client";

import { useMutation } from "@tanstack/react-query";
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
