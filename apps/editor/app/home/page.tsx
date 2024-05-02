"use client";
import { Badge } from "@/components/ui/badge";
import { useCurrentEditor } from "@/hooks/useGetcurrentEditor";
import React, { useEffect } from "react";

const Home = () => {
  const { error, loading, editor, currentEditor } = useCurrentEditor();

  useEffect(() => {
    currentEditor();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white mt-4 mr-1">
      <div className="grid grid-cols-12 h-full w-full">
        {/* lef side */}
        <div className="grid col-span-3 h-full w-full p-3 ">
          <div className="bg-zinc-800 w-full h-full p-3 rounded-xl  border border-3 border-zinc-600">
            <p className="font-bold text-xl">Details Section</p>
            <p className="font-medium text-zinc-400"> Editor Details</p>
            <div className="flex gap-1">
              <Badge variant="outline" className="text-white">
                Email:
              </Badge>
              <p>{editor?.email}</p>
            </div>

            <p className="font-medium text-zinc-400">Owner Details</p>
            <div className="flex gap-1 p-1">
              <Badge variant="outline" className="text-white">
                Name:{" "}
              </Badge>
              <p>{editor?.ParentUser.name}</p>
            </div>

            <div className="flex gap-1 p-1">
              <Badge variant="outline" className="text-white">
                email:{" "}
              </Badge>
              <p>{editor?.ParentUser.email}</p>
            </div>

            <div className="flex gap-1 p-1">
              <Badge variant="outline" className="text-white">
                Workspace count:{" "}
              </Badge>
              <p>{editor?.ParentUser.workspace.length}</p>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="grid col-span-9 h-full w-full">
          <div className="bg-zinc-800 w-full h-full p-2 rounded-xl font-bold border border-3 border-zinc-600">
            Upload Section.
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
