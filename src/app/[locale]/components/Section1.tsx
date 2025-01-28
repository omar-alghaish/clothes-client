import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl"; // Import the hook

import background from "../../../assets/backgrounds/b1.webp";
import { Button } from "@/components/ui/button";

const Section1 = () => {
  const t = useTranslations("HomePage.section1");
  return (
    <section className="relative">
      <Image
        width={1800}
        height={1200}
        alt={"img"}
        className="w-full h-[100vh] object-cover"
        src={background.src}
      />
      <div className="absolute  top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-6  w-[1200px] max-w-[100%] p-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center">
        {t("heading")}        </h1>
        <Button className="w-80 h-[50px] text-lg font-semibold text-primary-foreground bg-primary hover:bg-primary-600 transition-colors duration-300">
          Shop Now
        </Button>
      </div>
    </section>
  );
};

export default Section1;
