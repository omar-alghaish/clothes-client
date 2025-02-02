import prductQualityImage from './images/productQualityImage.png'
import { BadgeCheck, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
export default function OurProductQuality() {
    return (
        <div className='container flex flex-col items-center mx-auto p-6 mt-20 space-y-8 md:p-10 md:items-center lg:flex-row lg:space-y-0 lg:space-x-20'>
            {/* image */}
            <div className="w-full lg:w-[400px] h-[480px]">
                <Image
                    src={prductQualityImage.src}
                    alt="our story image"
                    width={2000}
                    height={2000}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            {/* content */}
            <div className='flex flex-col flex-1 ml-2 space-y-10 md:ml-10'>
                <h1 className="text-3xl font-bold text-center text-primary md:text-4xl md:text-center lg:text-5xl">Our Product Quality</h1>
                <div className="items-center text-start text-primary md:text-start md:text-xl lg:text-2xl lg:text-center">
                    <p className="font-bold">We make things Comfy, Pretty and Fancy</p>
                    <p className='text-gray-500'> " Bringing you products designed for the perfect blend of comfort, style and elegance,
                        making each day feel effortlessly refined. "</p>
                </div>
                {/* bottom icons  */}
                <div className='flex flex-col items-start space-y-4 ml-2 md:ml-10 lg:items-start lg:flex-row lg:space-y-0 lg:space-x-5'>
                    <div className='space-y-1 md:text-xl lg:text-start lg:flex lg:flex-col'>
                        <BadgeCheck className="w-8 h-8 md:w-10 md:h-12" />
                        <h3 className='font-bold'>100% Trust</h3>
                        <p>"Where trust is more than a promise - it's our commitment"</p>
                    </div>

                    <div className='space-y-1 md:text-xl lg:text-start lg:flex lg:flex-col'>
                        <ShieldCheck className="w-8 h-8 md:w-10 md:h-12" />
                        <h3 className='font-bold lg:text-start'>100% Safety</h3>
                        <p>"Safety isn't just a priority - it's a guarantee"</p>
                    </div>

                </div>
            </div>
        </div>
    )
}