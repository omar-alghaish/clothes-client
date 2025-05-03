import Image from "next/image";
import Ai1 from "../../../../../assets/images/Ai1.png";
import Ai2 from "../../../../../assets/images/Ai2.png";
import Ai3 from "../../../../../assets/images/Ai3.png";

export default function VirtualSec() {
    return (
        <section className="p-6 mx-auto mt-14 max-w-[1600px]">
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left: Text + Main Image */}
                <div className="space-y-6">
                    <h2 className="text-center lg:text-start text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                        Virtually Try On Clothes
                    </h2>
                    <p className="text-gray-600 text-start md:text-xl lg:text-2xl leading-relaxed">
                        Our platform allows you to virtually try on clothes before making a purchase, giving you the confidence to choose items that truly suit you. This innovative technology scans your body measurements and creates a realistic simulation, showing exactly how the clothes will look on you.
                    </p>
                    <div className="w-full h-auto max-w-[740px] mx-auto">
                        <Image
                            src={Ai2}
                            alt="Virtual try-on AI image"
                            className="object-cover rounded-lg w-full h-auto"
                        />
                    </div>
                </div>

                {/* Right: Secondary Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                    {secondaryImages.map((image, index) => (
                        <div key={index} className="w-full max-w-[360px] mx-auto">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                className="object-cover rounded-lg w-full aspect-[4/3]"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


const secondaryImages = [
    { src: Ai1, alt: "AI fashion preview" },
    { src: Ai3, alt: "Virtual AI clothing simulation" },
];
