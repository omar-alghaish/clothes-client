"use client";
import Image from "next/image";
import b1 from "../../../assets/backgrounds/b2.png";
import b2 from "../../../assets/backgrounds/b3.png";
import b3 from "../../../assets/backgrounds/b4.jpg";

const Section6 = () => {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[110vh] overflow-hidden">
        {/* Left Large Item */}
        <div className="w-full md:w-[40%] h-[60vh] md:h-full relative">
          <Image
            src={b2.src}
            alt="Men Fashion"
            width={500}
            height={700}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-5 right-5 text-forground w-[200px]">
            <p className="text-sm opacity-75">Men&apos;s Power</p>
            <h2 className="text-2xl font-bold">Where Dreams Meet Couture</h2>
            <button className="mt-2 px-4 py-2 bg-black text-white text-sm">Shop Now</button>
          </div>
        </div>

        {/* Right Grid */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Top Right */}
          <div className="relative h-[40vh] md:h-[50%]">
            <Image
              src={b1.src}
              alt="Women Fashion"
              width={500}
              height={350}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-5 left-5 text-forground w-[200px]">
              <p className="text-sm opacity-75">Women&apos;s Softness</p>
              <h2 className="text-2xl font-bold">Enchanting Styles for Every Women</h2>
              <button className="mt-2 px-4 py-2 bg-black text-white text-sm">Shop Now</button>
            </div>
          </div>

          {/* Bottom Right Grid */}
          <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[50%]">
            {/* Bottom Left */}
            <div className="relative w-full md:w-[50%] h-[40vh] md:h-full">
              <Image
                src={b3.src}
                alt="Jeans Short"
                width={250}
                height={350}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-10 left-5 text-forground w-[200px]">
                <p className="text-sm opacity-75">City Stars</p>
                <h2 className="text-xl font-bold">Jeans Short for City Living</h2>
                <button className="mt-2 px-4 py-2 bg-black text-white text-sm">Shop Now</button>
              </div>
            </div>

            {/* Bottom Right Discount */}
            <div className="flex flex-col justify-center items-center bg-gray-100 p-6 text-center w-full md:w-[50%] h-[40vh] md:h-full">
              <h2 className="text-2xl font-bold">Trendsetting Dresses for Her</h2>
              <p className="text-4xl font-bold text-black">50%</p>
              <button className="mt-2 px-4 py-2 bg-black text-white text-sm">Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section6;
