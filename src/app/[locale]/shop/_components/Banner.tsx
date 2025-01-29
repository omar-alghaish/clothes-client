import Image from "next/image";
import React from "react";
import img1 from "../../../../assets/backgrounds/b6.png";
import img2 from "../../../../assets/backgrounds/b7.png";
import img3 from "../../../../assets/backgrounds/b8.png";

const BannerContent = ({ img, title }: { img: string; title: string }) => {
  return (
    <div className="w-full h-full relative">
      <div className="relative w-full h-full">
        <Image
          className="object-cover"
          src={img}
          fill
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="absolute w-full top-[50%] transform translate-y-[-50%] text-center text-white bg-primary/40 p-4 md:p-6 font-bold md:font-extrabold text-xl md:text-3xl">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="h-screen md:h-[100vh] flex flex-col gap-4 md:gap-6">
      {/* Top Section */}
      <div className="h-1/2 md:h-[50%]">
        <BannerContent img={img1.src} title="OUR BEST COLLECTION" />
      </div>

      {/* Bottom Section */}
      <div className="h-1/2 md:h-[50%] flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="w-full md:w-1/2 h-full">
          <BannerContent img={img2.src} title="Stay Stylish" />
        </div>
        <div className="w-full md:w-1/2 h-full">
          <BannerContent img={img3.src} title="Winter Collection" />
        </div>
      </div>
    </div>
  );
};

export default Banner;