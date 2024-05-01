import { useCallback, useState } from "react";

interface Workspace {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  videoName: string;
  aws_s3_url: string;
  createdAt: string;
  updatedAt: string;
}

interface ParentUser {
  id: string;
  email: string;
  name: string;
  workspace: Workspace[];
}

interface Editor {
  id: string;
  email: string;
  updatedAt: string;
  createdAt: string;
  ParentUser: ParentUser;
}

export const useCurrentEditor = () => {
  const [editor, setEditor] = useState<Editor | undefined>(undefined);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const currentEditor = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/current/editor`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("editor-token")}`,
          },
        }
      );

      const jsonData = await response.json();
      if (response.ok) {
        setEditor(jsonData);
      } else {
        console.log("msg: ", jsonData.msg);
        setError(jsonData.msg);
        throw new Error(jsonData.msg || "Unable to login");
      }
    } catch (err) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { error, loading, editor, currentEditor };
};
