import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/user";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { user } = useCurrentUser();

  console.log("user from the protection: ", user);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
