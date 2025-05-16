"use client"
import Image from "next/image";     
import { useState, useRef } from "react";       
import { Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Utility for class merging

// Assets
import b5 from "../../../../../../assets/backgrounds/b5.jpg";
import UploadImage from "../../../../../../assets/brandIcons/cloud-upload.svg";

export default function ToUploadSec({ onImageUpload }: { onImageUpload: (file: File) => void }) {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length > 0) {
            const newFile = selectedFiles[0]; // Take only the first file
            processFile(newFile);
        }
    };

    // Process uploaded file
    const processFile = (file: File) => {
        // Only accept image files
        if (!file.type.match('image/(jpeg|jpg|png|bmp|webp)')) {
            alert("Please upload an image file (JPG, PNG, BMP, WEBP)");
            return;
        }
        
        // Clear previous files and add the new one
        setFiles([file]);
        
        // Create preview URL
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);
        
        // Pass the file to parent component
        if (onImageUpload) {
            onImageUpload(file);
        }
    };

    // Handle drag events
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        if (droppedFiles.length > 0) {
            const imageFile = droppedFiles[0]; // Take only the first file
            processFile(imageFile);
        }
    };

    // Handle click on the upload button
    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); 
        }
    };

    // Handle removing a file
    const handleRemoveFile = () => {
        // Revoke object URL to avoid memory leaks
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        
        setFiles([]);
        setPreviewUrl(null);
        
        // Notify parent component
        if (onImageUpload) {
            onImageUpload(null as unknown as File);
        }
    };

    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center",
                "p-6 mt-6 rounded-lg overflow-hidden mx-auto",
                "w-full"
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
                    <p className="text-white text-2xl font-bold">Drop image here</p>
                </div>
            )}

            {/* Content Section */}
            <div className="relative flex flex-col items-center text-center text-black space-y-6 z-10">
                {!previewUrl ? (
                    <>
                        {/* Sparkle Icon with Responsive Size */}
                        <Sparkle className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />

                        {/* Heading */}
                        <h2 className="text-2xl font-bold leading-relaxed md:text-3xl lg:text-4xl">
                            Click or drag your photo here
                        </h2>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
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
                    </>
                ) : (
                    <div className="bg-white bg-opacity-90 p-4 rounded-lg w-full max-w-md">
                        <h3 className="font-bold text-lg mb-3">Your Photo</h3>
                        
                        <div className="relative">
                            <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className="w-full h-auto max-h-64 object-contain rounded-md"
                            />
                            
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-sm truncate flex-1">
                                    {files[0]?.name}
                                    <span className="text-gray-500 ml-2">
                                        ({(files[0]?.size as number / 1024).toFixed(1)} KB)
                                    </span>
                                </p>
                                
                                <Button 
                                    onClick={handleRemoveFile}
                                    variant="destructive"
                                    size="sm"
                                    className="ml-2"
                                >
                                    Change Photo
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}