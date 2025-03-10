import Image from "next/image";
import { Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Utility for class merging

// Assets
import b5 from "../../../../../assets/backgrounds/b5.jpg";
import UploadImage from "../../../../../assets/brandIcons/cloud-upload.svg";

export default function ToUploadSec() {
    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center",
                "p-6 mt-6 rounded-lg overflow-hidden mx-auto",
                "max-w-[90%] min-h-[350px] md:max-w-[80%]"
            )}
        >
            {/* Background Image */}
            <Image
                src={b5.src}
                alt="Upload Section Background"
                width={2000}
                height={2000}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />

            {/* Content Section */}
            <div className="relative flex flex-col items-center text-center text-black space-y-6">
                {/* Sparkle Icon with Responsive Size */}
                <Sparkle className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />

                {/* Heading */}
                <h2 className="text-2xl font-bold leading-relaxed md:text-3xl lg:text-4xl">
                    Click or drag images here to upload
                </h2>

                {/* Upload Button with CloudUpload Icon */}
                <Button
                    className={cn(
                        "group mb-2 w-36 text-primary bg-transparent border border-primary",
                        "hover:bg-black hover:text-white md:w-40 text-[20px] md:text-[22px]",
                        "flex items-center gap-2"
                    )}
                >
                    <Image
                        src={UploadImage.src}
                        alt="Upload Icon"
                        width={24}
                        height={24}
                        className="group-hover:invert transition duration-300"
                    />
                    <span>Upload</span>
                </Button>

                {/* Supported Formats */}
                <p className="text-gray-600 md:text-xl lg:text-2xl">
                    JPG, JPEG, PNG, BMP, WEBP
                </p>
            </div>
        </div>
    );
}