'use client';
import { useState } from 'react';
import Image from 'next/image';

import fashion1 from '../../../../assets/images/fashon1.png';
import fashion2 from '../../../../assets/images/fashon2.png';
import fashion3 from '../../../../assets/images/fashon3.png';
import fashion4 from '../../../../assets/images/fashon4.png';

import { StaticImageData } from 'next/image';
import Link from 'next/link';

type Model = {
    id: number;
    src: StaticImageData;
    alt: string;
    styles: string[];
    href?: string;
};

type ModelItemProps = {
    model: Model;
    hoveredItem: number | null;
    setHoveredItem: React.Dispatch<React.SetStateAction<number | null>>;
};

const UpdatedSection3 = () => {
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    const models: Model[] = [
        {
            id: 1,
            src: fashion1,
            alt: "Model with beige trench coat",
            styles: ["Trench Coat"],
            href: '/shop?category=male-jacket'
        },
        {
            id: 2,
            src: fashion2,
            alt: "Model with gray blazer and white pants",
            styles: ["White pants"],
            href: '/shop?category=female-pants&color=white'

        },
        {
            id: 3,
            src: fashion3,
            alt: "Model with denim outfit",
            styles: ["Denim Outfit"],
            href: '/shop?color=blue'
        },
        {
            id: 4,
            src: fashion4,
            alt: "Model with leopard print dress and white coat",
            styles: ["Leopard Dress"],
            href: '/shop?category=female-dress'
        }
    ];

    return (
        <div

            className="relative w-full h-screen max-h-[600px] bg-white overflow-hidden flex flex-col justify-center sm:justify-start"
        >
            {/* SMALL SCREEN LAYOUT */}
            <div className="sm:hidden flex flex-col justify-center items-center h-full px-4 py-8 space-y-4">
                {/* Top 2 models */}
                <div className="flex justify-center gap-4">
                    {models.slice(0, 2).map(model => (
                        <ModelItem key={model.id} model={model} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
                    ))}
                </div>

                {/* FASHION Text */}
                <h1 className="text-6xl font-thin text-gray-300 tracking-[0.5em] text-center">
                    FASHION
                </h1>

                {/* Bottom 2 models */}
                <div className="flex justify-center gap-4">
                    {models.slice(2, 4).map(model => (
                        <ModelItem key={model.id} model={model} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
                    ))}
                </div>
            </div>

            {/* DESKTOP LAYOUT */}
            <div className="hidden sm:grid relative w-full h-full grid-cols-2 md:grid-cols-4 gap-4 items-end">
                {/* FASHION text as background */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <h1
                        className="text-[120px] md:text-[180px] lg:text-[220px] xl:text-[280px] font-thin text-gray-300 tracking-widest"
                        style={{ letterSpacing: '0.1em', lineHeight: '0.9' }}
                    >
                        FASHION
                    </h1>
                </div>

                {models.map(model => (
                    <ModelItem key={model.id} model={model} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />
                ))}
            </div>
        </div>
    );
}

// Reusable model item component
function ModelItem({ model, hoveredItem, setHoveredItem }: ModelItemProps) {
    return (
        <div className="relative group flex flex-col items-center justify-end">
            <div className="relative">
                <Image
                    src={model.src}
                    alt={model.alt}
                    width={200}
                    height={300}
                    className="h-[200px] sm:h-[300px] md:h-[400px] object-contain"
                />
                {model.href && (
                    <Link href={model.href}>
                        <button
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white opacity-80 hover:opacity-100"
                            onMouseEnter={() => setHoveredItem(model.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <span className="text-lg">+</span>
                        </button>
                    </Link>
                )}

            </div>

            {hoveredItem === model.id && (
                <div className="absolute bottom-24 bg-white shadow-lg p-3 rounded w-36 z-30">
                    <ul className="text-sm">
                        {model.styles.map((style: string, idx: number) => (
                            <li key={idx} className="mb-1">{style}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UpdatedSection3;
