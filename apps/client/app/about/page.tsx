import React from "react";
import about from "../../public/about.jpg";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-20   gap-4 p-4 px-4">
      <div className="flex flex-1 justify-center items-center  p-4">
        <Image
          src={about}
          alt="about-page"
          width={500}
          height={300}
          className="rounded-sm object-cover"
        />
      </div>
      <div className="flex flex-1 p-4 text-center max-w-lg mx-auto">
        We are a team of designers, engineers and creators all coming together
        to form a creative community with a common vision of growth and
        innovation 🤑.
      </div>
    </div>
  );
};

export default AboutPage;
