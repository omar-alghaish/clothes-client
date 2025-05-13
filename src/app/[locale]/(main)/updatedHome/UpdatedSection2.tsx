"use client";
import Image from "next/image";
import Link from "next/link";

import icon1 from "../../../../assets/brandIcons/download 2.png";
import icon2 from "../../../../assets/brandIcons/download 3.png";
import icon3 from "../../../../assets/brandIcons/download 5.png";
import icon4 from "../../../../assets/brandIcons/download 7.png";
import icon5 from "../../../../assets/brandIcons/download 8.png";
import icon6 from "../../../../assets/brandIcons/download.png";
import icon7 from "../../../../assets/brandIcons/images 1.png";



const brandIcons = [
    { name: "defacto", icon: icon1 },
    { name: "H&m", icon: icon2 },
    { name: "she in", icon: icon3 },
    { name: "bershika", icon: icon4 },
    { name: "zara", icon: icon5 },
    { name: "lc waikiki", icon: icon6 },
    { name: "pull&bear", icon: icon7 },
];

const UpdatedSection2 = () => {
    return (
        <section className="py-10">
            <div className="container mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
                {brandIcons.map((item, index) => (
                    <Link
                        key={index}
                        href={`/shop?brand=${encodeURIComponent(item.name)}`}
                    >
                        <div className="w-16 md:w-24 lg:w-28 cursor-pointer">
                            <Image
                                className="w-full h-auto object-contain grayscale-0 hover:grayscale transition-all duration-300"
                                src={item.icon.src}
                                width={100}
                                height={100}
                                alt={`Brand Icon ${item.name}`}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default UpdatedSection2;
