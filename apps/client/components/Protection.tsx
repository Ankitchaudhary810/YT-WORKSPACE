import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/user";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useCurrentUser();

  useEffect(() => {
    if (!user) {
      toast.error("Authenticated your Self");
      router.push("/signin");
    }
  }, [user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
