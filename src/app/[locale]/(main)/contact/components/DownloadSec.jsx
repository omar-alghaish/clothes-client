import { Button } from '@/components/ui/button';
import Image from 'next/image';
import b5 from '@/assets/backgrounds/b5.jpg';
import appstore from '@/assets/brandIcons/app-store-ios-svgrepo-com.svg';
import googleplay from '@/assets/brandIcons/googleplay-svgrepo-com.svg';

export default function DownloadSec() {
    return (
        <div className="relative w-full h-auto flex flex-col items-center mt-10">
            {/* Background Image */}
            <Image
                src={b5.src}
                alt="gray background"
                width={2000}
                height={2000}
                className="w-full h-[710px] object-cover md:h-[510px]"
            />

            {/* Content Section */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <div className="max-w-4xl space-y-10 md:space-y-8 lg:space-y-10">
                    <h1 className="text-xl font-semibold md:text-2xl lg:text-5xl">Glamora</h1>
                    <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                        Download our app store to make shopping faster
                    </h2>
                    <p className="text-xl text-gray-500 md:text-2xl lg:text-3xl">
                        "Download our app from the app store to make shopping faster and easier, with instant access to all your favorite brands and products, right at your fingertips!"
                    </p>

                    {/* Buttons Container */}
                    <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8 md:justify-center">
                        <Button className="group w-48 text-primary bg-transparent border border-primary hover:bg-black hover:text-white md:w-52 md:text-[22px] flex items-center gap-2">
                            <Image
                                src={appstore.src}
                                alt="app store"
                                width={24}
                                height={24}
                                className="group-hover:invert transition duration-300"
                            />
                            App Store
                        </Button>

                        <Button className="group w-48 text-primary bg-transparent border border-primary hover:bg-black hover:text-white md:w-52 md:text-[22px] flex items-center gap-2">
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
        </div>
    );
}