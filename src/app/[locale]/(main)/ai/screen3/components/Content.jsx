'use client';
import { useState } from "react";

import ScrollAreaSec from './ScrollAreaSec'

import Image from "next/image";
import i13 from "@/assets/images/i13.jpg";
import i16 from "@/assets/images/i15.jpg";
import i14 from "@/assets/images/i2.png";

import { Button } from "@/components/ui/button";

export default function Content() {
    // State to track the selected item for "Top" and "Bottom" sections
    const [selectedTop, setSelectedTop] = useState(null);
    const [selectedBottom, setSelectedBottom] = useState(null);


    const topItems = Array(10).fill(0);
    const bottomItems = Array(10).fill(0);

    return (
        <div className="mt-10 flex flex-col md:flex-row p-4 space-y-10 md:space-y-0 md:space-x-6 lg:space-x-10 lg:p-6">
            {/* Product Section */}
            <div className="flex flex-col space-y-3 items-start w-full md:w-1/2 lg:w-1/3 lg:items-center">
                <Image
                    src={i13.src}
                    alt="product image"
                    width={2000}
                    height={2000}
                    className="w-full object-cover lg:object-cover md:h-[525px] lg:h-[650px] rounded-md"
                />

                <div className="flex flex-1 flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-5">
                    <Button className="w-40 bg-primary text-white border border-primary hover:bg-white hover:text-primary lg:w-52">
                        Buy Product
                    </Button>
                    <Button className="w-40 bg-white text-primary border border-primary hover:bg-primary hover:text-white lg:w-52">
                        Add all
                    </Button>
                </div>
            </div>

            {/* Scrollable Sections */}
            <div className="flex flex-col space-y-6 w-full md:w-1/2 lg:w-2/3 lg:p-5">
                {/* Scrollable Top Section */}
                <ScrollAreaSec
                    title="Find your Top"
                    items={topItems}
                    selectedIndex={selectedTop}
                    onSelect={setSelectedTop}
                    imageSrc={i16.src}
                />

                {/* Scrollable Bottom Section */}
                <ScrollAreaSec
                    title="Find your Bottom"
                    items={bottomItems}
                    selectedIndex={selectedBottom}
                    onSelect={setSelectedBottom}
                    imageSrc={i14.src}
                />
            </div>
        </div>
    );
}