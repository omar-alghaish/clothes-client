import { Button } from "@/components/ui/button";
import Image from "next/image";
import b5 from "@/assets/backgrounds/b5.jpg";
import services from "@/assets/images/services.png";
import appstore from '@/assets/brandIcons/app-store-ios-svgrepo-com.svg';
import googleplay from '@/assets/brandIcons/googleplay-svgrepo-com.svg'

export default function ToAi() {
    return (
        <div className="relative w-full h-auto flex flex-col items-center mt-10">
            {/* Background Image */}
            <Image
                src={b5.src}
                alt="gray background"
                width={2000}
                height={2000}
                className="w-full h-[820px] object-cover lg:h-[510px]"
            />

            {/* Content Section */}
            <div className="absolute left-0 w-full grid grid-cols-1 items-center text-start mx-auto rounded-xl shadow-lg lg:grid-cols-2">
                <div className="p-24 w-full md:p-20 md:space-y-6 lg:space-y-12 lg:ml-5">
                    <h2 className="text-3xl font-bold mb-4 md:text-[32px] lg:text-4xl">
                        "We can help you choose the perfect outfit for your special occasions!"
                    </h2>
                    <p className="text-lg text-gray-500 mb-6 lg:text-2xl">
                        On our website, advanced artificial intelligence will guide you to the best outfit choices tailored to your style and occasion.
                    </p>
                    <div className="flex flex-col flex-1 space-y-2 lg:space-y-0 lg:flex-row lg:space-x-10">
                        <Button className="group mb-2 w-32 text-primary bg-transparent border border-primary hover:bg-black hover:text-white md:w-40 md:text-[22px] flex items-center gap-2">
                            <Image
                                src={appstore.src}
                                alt="app store"
                                width={24}
                                height={24}
                                className="group-hover:invert transition duration-300"
                            />
                            App Store
                        </Button>

                        <Button className="group mb-2 w-32 text-primary bg-transparent border border-primary hover:bg-black hover:text-white md:w-40 md:text-[22px] flex items-center gap-2">
                            <Image
                                src={googleplay.src}
                                alt="app store"
                                width={24}
                                height={24}
                                className="group-hover:invert transition duration-300"
                            />
                            Play Store
                        </Button>

                    </div>

                </div>
            </div>

            {/* Bottom Centered Section */}
            <div className=" w-full absolute bottom-0 left-1/2 -translate-x-1/2 rounded-xl shadow-lg md:w-[600px] lg:top-0 lg:right-0 lg:-translate-x-0 lg:w-[700px] lg:h-[500px]">
                <Image
                    src={services.src}
                    alt="ai image"
                    width={2000}
                    height={2000}
                    className="w-full"
                />
            </div>
        </div>
    );
}