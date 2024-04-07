import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["current-user"] });
    console.log("user from protection: ", user);
    if (!user) {
      // toast.error("Not Authenticated");
      router.push("/signin");
    }
  }, [user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
