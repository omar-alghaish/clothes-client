import Image from "next/image"
import ourStoryImage from './images/ourStoryImage.png'
export default function OurStory() {
    return (
        <div className="container flex flex-col items-center mx-auto p-6 space-y-8 md:p-10 md:items-center lg:flex-row lg:space-y-0 lg:space-x-20 ">
            {/* content */}
            <div className="flex flex-col flex-1 ml-2 space-y-10 md:ml-6">
                <h1 className="text-3xl font-bold text-center text-primary md:text-4xl md:text-center lg:text-5xl lg:text-center">Our Story</h1>
                <div className="items-center text-start text-primary md:text-start md:text-xl lg:text-2xl lg:text-center">
                    <p className="font-bold">Welcome to Glamora, where fashion meets individuality.</p>
                    <p className="text-gray-500"> Founded in 2024, our brand was born from a passion for style, creativity, and authenticity.
                        We believe that fashion is a way to express who you are and celebrate your uniqueness.
                        From our humble beginnings in egypt, we’ve grown into a brand that empowers everyone to embrace their style.</p>
                </div>
            </div>
            {/* image */}
            <div className="w-full lg:w-[400px] h-[480px]">
                <Image
                    src={ourStoryImage.src}
                    alt="our story image"
                    width={2000}
                    height={2000}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

        </div>
    )
}