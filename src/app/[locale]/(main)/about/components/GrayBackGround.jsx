import Image from "next/image"
import b5 from '../../../../../assets/backgrounds/b5.jpg'
export default function GrayBackGround() {
    return (
        <div className="relative mt-20 m-2 w-[calc(100%-16px)] h-[215px]">
            <Image
                src={b5.src}
                alt="Background image"
                fill
                className="object-cover rounded-lg"
            />
            <div className="grid grid-cols-2 gap-6 justify-between w-full absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] lg:grid-cols-4">
                <div className="flex flex-col flex-1 text-center gap-2">
                    <h1 className="text-2xl font-extrabold md:text-4xl  lg:text-6xl">+10</h1>
                    <p className="text-xl md:text-2xl lg:text-4xl">Years</p>
                </div>
                <div className="flex flex-col flex-1 text-center gap-2">
                    <h1 className="text-2xl font-extrabold md:text-4xl lg:text-6xl">+500</h1>
                    <p className="text-xl md:text-2xl lg:text-4xl">Customers</p>
                </div>
                <div className="flex flex-col flex-1 text-center gap-2">
                    <h1 className="text-2xl font-extrabold md:text-4xl  lg:text-6xl">+35</h1>
                    <p className="text-xl md:text-2xl lg:text-4xl">Awards</p>
                </div>
                <div className="flex flex-col flex-1 text-center gap-2">
                    <h1 className="text-2xl font-extrabold md:text-4xl  lg:text-6xl">+100</h1>
                    <p className="text-xl md:text-2xl lg:text-4xl">Satisfied</p>
                </div>
            </div>
        </div>
    )
}