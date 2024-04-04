"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import HomeImage from "../public/home.svg";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const handleSubmit = () => {
    if (!localStorage.getItem("user_jwt")) {
      toast.error("Not Authenticated.", {
        style: {
          borderRadius: "7px",
          background: "#000000",
          color: "#fff",
          border: "1px solid white",
        },
      });
      router.push("/signup");
    } else {
      router.push("/workspace");
    }
  };
  return (
    <>
      {/* dash board */}
      <div className="px-60 flex justify-between ">
        {/* for image */}
        <div className="w-[50%] h-full">
          {" "}
          <Image
            src={HomeImage}
            alt="home-image"
            width={600}
            height={600}
          ></Image>
        </div>

        {/* for the hero section */}
        <div className=" mt-28 w-[50%]">
          <h1 className="text-3xl font-bold">Be Productive to Your Youtube.</h1>
          <p className="mt-5 text-slate-300">
            Our platform seamlessly connects YouTube channel owners with trusted
            editors, empowering them to co-create captivating content that
            resonates with audiences worldwide.
          </p>
          <Button
            className="mt-16 text-black hover:bg-[#0A0A0A] hover:text-white transition-all"
            variant="outline"
            onClick={handleSubmit}
          >
            Continue.
          </Button>
        </div>
      </div>
    </>
  );
}
