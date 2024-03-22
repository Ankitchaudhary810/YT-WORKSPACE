"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import HomeImage from "../public/home.svg";

export default function Home() {
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
            loading="lazy"
            className="transition-opacity opacity-0 duration-[1.3s]"
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}
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
        </div>
      </div>
    </>
  );
}
