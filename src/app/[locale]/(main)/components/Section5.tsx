import React from "react";
import background from "../../../../assets/backgrounds/ca4c3e4d38ea404e40463be0db3e066d.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const Section5 = () => {
  return (
    <section>
      <div className="relative py-10 ">
        <Image
          width={1800}
          height={1200}
          alt={"img"}
          className="w-full h-[287px] object-cover"
          src={background.src}
        />
        <div className="absolute  top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex flex-col items-center gap-6 w-[1000px] max-w-[100%] px-4">
          <h1 className="text-2xl md:text-3xl lg:4xl xl:5xl text-center">
            &quot;Try on outfits using AI to see how they look on you!&quot;
          </h1>
          <Button className="border-2 border-foreground text-lg w-48" variant="outline">See More</Button>
        </div>
      </div>
    </section>
  );
};

export default Section5;
