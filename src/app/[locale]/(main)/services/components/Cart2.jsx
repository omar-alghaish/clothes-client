import Image from "next/image";
import b5 from "@/assets/backgrounds/b5.jpg";

export default function Cart2({ content, icon: IconComponent }) {
    return (
        <div className="relative p-1 shadow-lg rounded-lg 
                        w-full h-75 md:h-80 lg:h-80 md:w-[700px] lg:w-[530px] mx-auto">
            <Image
                src={b5.src}
                alt="gray background"
                width={2000}
                height={2000}
                className="object-cover rounded-lg h-full w-full"
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 text-primary p-6">
                {IconComponent && <IconComponent size={35} className="md:size-45 lg:size-50" />}
                <p className="text-center p-4 text-xl md:text-2xl lg:text-3xl">{content}</p>
            </div>
        </div>
    );
}
