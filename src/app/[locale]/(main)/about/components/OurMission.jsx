import Image from "next/image"
import ourMissionImage from './images/ourMissionImage.png'
import GrayBackGround from './GrayBackGround'
export default function OurMission() {
    return (
        <>
            <div className="container flex flex-col items-center mx-auto mt-20 p-6 space-y-8 md:p-10 md:items-center lg:flex-row-reverse lg:space-y-0 lg:space-x-30">
                {/* content */}
                <div className="flex flex-col flex-1 ml-2 space-y-10 md:ml-10">
                    <h1 className="text-3xl font-bold text-center text-primary md:text-4xl md:text-center lg:text-5xl lg:text-center">Our Mission</h1>
                    <div className="items-center text-start text-primary md:text-start md:text-xl lg:text-2xl lg:text-center">
                        <p className="font-bold">At Glamora, we’re dedicated to providing high-quality, on-trend pieces that are both timeless and distinctive.</p>
                        <p className="text-gray-500"> Our mission is to inspire confidence through style, ensuring that each garment is crafted with care and designed to make you look and feel incredible.
                            We are committed to sustainability, choosing fabrics and materials that not only feel luxurious but are also gentle on our planet.</p>
                    </div>
                </div>
                {/* image */}
                <div className="w-full lg:w-[400px] h-[480px]">
                    <Image
                        src={ourMissionImage.src}
                        alt="our story image"
                        width={2000}
                        height={2000}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
            <GrayBackGround />
        </>
    )
}