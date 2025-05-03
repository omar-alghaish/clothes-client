"use client"
import Image from "next/image";
import { useState, useRef } from "react";
import { Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Utility for class merging

// Assets
import b5 from "../../../../../../assets/backgrounds/b5.jpg";
import UploadImage from "../../../../../../assets/brandIcons/cloud-upload.svg";

export default function ToUploadSec() {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        }
    };

    // Handle drag events
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        const imageFiles = droppedFiles.filter(file => 
            file.type.match('image/(jpeg|jpg|png|bmp|webp)')
        );

        if (imageFiles.length > 0) {
            setFiles(prevFiles => [...prevFiles, ...imageFiles]);
        }
    };

    // Handle click on the upload button
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    // Display file list
    const renderFileList = () => {
        if (files.length === 0) return null;

        return (
            <div className="mt-4 p-2 bg-white bg-opacity-80 rounded-md w-full max-w-md">
                <h3 className="font-medium mb-2">Uploaded Files ({files.length})</h3>
                <ul className="max-h-32 overflow-y-auto">
                    {files.map((file, index) => (
                        <li key={index} className="flex justify-between items-center text-sm py-1">
                            <span className="truncate max-w-xs">{file.name}</span>
                            <span className="text-gray-500 text-xs">
                                {(file.size / 1024).toFixed(1)} KB
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center",
                "p-6 mt-6 rounded-lg overflow-hidden mx-auto",
                "max-w-[90%] min-h-[350px] md:max-w-[80%]"
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {/* Background Image */}
            <Image
                src={b5.src}
                alt="Upload Section Background"
                width={2000}
                height={2000}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />

            {/* Overlay for drag state */}
            {isDragging && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                    <p className="text-white text-2xl font-bold">Drop files here</p>
                </div>
            )}

            {/* Content Section */}
            <div className="relative flex flex-col items-center text-center text-black space-y-6">
                {/* Sparkle Icon with Responsive Size */}
                <Sparkle className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />

                {/* Heading */}
                <h2 className="text-2xl font-bold leading-relaxed md:text-3xl lg:text-4xl">
                    Click or drag images here to upload
                </h2>

                {/* Hidden file input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/bmp,image/webp"
                    className="hidden"
                />

                {/* Upload Button with CloudUpload Icon */}
                <Button
                    onClick={handleUploadClick}
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

                {/* File List */}
                {renderFileList()}
            </div>
        </div>
    );
}