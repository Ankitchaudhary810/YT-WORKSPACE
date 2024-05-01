"use client";
import { useCurrentEditor } from "@/hooks/useGetcurrentEditor";
import React, { useEffect } from "react";

const Home = () => {
  const { error, loading, editor, currentEditor } = useCurrentEditor();

  useEffect(() => {
    currentEditor();
  }, []);

  console.log(editor);

  return (
    <main className="min-h-screen bg-black text-white mt-4">
      <div className="grid grid-cols-12 h-full w-full">
        {/* lef side */}
        <div className="grid col-span-3  h-full w-full p-3 ">
          <div className="bg-zinc-800 w-full h-full p-2 rounded-xl">
            alsdkflas
          </div>
        </div>

        {/* right side */}
        <div className="grid col-span-9 bg-teal-600 h-full w-full">
          Video Section.
        </div>
      </div>
    </main>
  );
};

export default Home;
