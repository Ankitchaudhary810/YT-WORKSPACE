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
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 flex flex-col lg:flex-row justify-between gap-8">
        {/* for image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <Image src={HomeImage} alt="home-image" width={600} height={600} />
        </div>

        <div className="w-full lg:w-1/2 sm:mt-28 mt-1">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
            Be Productive to Your Youtube.
          </h1>
          <p className="text-base lg:text-lg mb-4 lg:mb-6 text-slate-300">
            Our platform seamlessly connects YouTube channel owners with trusted
            editors, empowering them to co-create captivating content that
            resonates with audiences worldwide.
          </p>
          <Button
            className="text-black hover:bg-[#0A0A0A] hover:text-white transition-all"
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
