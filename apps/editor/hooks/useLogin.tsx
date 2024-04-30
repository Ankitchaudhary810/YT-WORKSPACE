import { useCallback, useState } from "react";

export const useLogin = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);

    setError("");
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/editor-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const jsonData = await response.json();
      if (response.ok) {
        setData(jsonData);
      } else {
        console.log("msg: ", jsonData.msg);
        setError(jsonData.msg);
        throw new Error(jsonData.msg || "Unable to login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, login };
};
