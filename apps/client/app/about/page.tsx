import React from "react";
import about from "../../public/about.jpg";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="flex  gap-2 justify-evenly mt-20">
      <div>
        <Image
          src={about}
          alt="about-page"
          width={500}
          className="rounded-sm"
        />
      </div>
      <div>Paragraph.</div>
    </div>
  );
};

export default AboutPage;
