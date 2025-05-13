import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import p1 from '../../../../assets/images/classicjeans.png'
import p2 from '../../../../assets/images/jeansBocket.png'
import p3 from '../../../../assets/images/jeansLabel.png'

import Link from "next/link";

const UpdatedSection4 = () => {
    return (
        <section className="p-4 max-w-screen-xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold md:text-3xl lg:text-5xl">Our Most-Loved Pieces</h2>
                <p className="text-gray-500 mt-1 lg:text-xl">
                    The ones everyone’s talking about — and you’re about to see why
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Main image */}
                <div className="col-span-1 md:col-span-1">
                    <Image
                        src={p1} // Replace with actual image path
                        alt="Classic Jeans"
                        className="w-full h-[516px] rounded"
                    />
                </div>

                <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                    <Image
                        src={p2}
                        alt="Jeans Pocket"
                        className="w-[800px] h-[250px] rounded object-cover"
                    />
                    <Image
                        src={p3}
                        alt="Back Label"
                        className="w-[800px] h-[250px] rounded object-cover"
                    />
                </div>

            </div>

            {/* Product Info */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-lg">Classic jeans</h3>
                    <div className="flex items-center justify-center sm:justify-start mt-1">
                        {[1, 2, 3, 4].map((i) => (
                            <Star key={i} size={16} className="text-yellow-500" fill="currentColor" />
                        ))}
                        <Star size={16} className="text-gray-300" />
                    </div>
                    <p className="text-blue-600 mt-1">$500.00</p>
                </div>
                <Link href="/en/shop?category=male-pants">
                    <button className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100">
                        See More
                    </button>
                </Link>

            </div>
        </section>
    );
};

export default UpdatedSection4;
