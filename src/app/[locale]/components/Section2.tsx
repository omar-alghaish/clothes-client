"use client";
import Image from "next/image";
import icon1 from "../../../assets/brandIcons/download 2.png";
import icon2 from "../../../assets/brandIcons/download 3.png";
import icon3 from "../../../assets/brandIcons/download 5.png";
import icon4 from "../../../assets/brandIcons/download 7.png";
import icon5 from "../../../assets/brandIcons/download 8.png";
import icon6 from "../../../assets/brandIcons/download.png";
import icon7 from "../../../assets/brandIcons/images 1.png";

const Section2 = () => {
  const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7];

  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {icons.map((item, index) => (
          <div key={index} className="w-16 md:w-24 lg:w-28">
            <Image
              className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              src={item.src}
              width={100}
              height={100}
              alt={`Brand Icon ${index}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section2;
