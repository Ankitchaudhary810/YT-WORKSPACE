"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(0);

  const signUp = async ({ name, email, password }: SignUpProps) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      setStatus(response.status);
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.msg || "Something went wrong");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading, error, status };
};

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
        }
      );
      if (!response.ok) {
        throw new Error("Failed to find the current user");
      }
      return await response.json();
    },
  });
  return { ...query, user: query.data };
};

export const useSignIn = () => {};
