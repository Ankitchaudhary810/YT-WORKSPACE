"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
export const useSignUp = ({ name, email, password }: SignUpProps) => {
  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async () => {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/signin",
        {
          name,
          email,
          password,
        }
      );

      console.log("response.data.msg", response.data.msg);
      if (response.data.msg) {
        toast.error(response.data.msg);
      }
    },
  });

  console.log("mutation: ", mutation);

  return mutation;
};
