"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import HeaderSec from './HeaderSec';
import ToUploadSec from './ToUploadSec';
import TryMoreSec from './TryMoreSec';
import ResultDialog from './ResultDialog';
import { useTryOnMutation } from '../../../../../../redux/features/ai/aiApi2';
import { useGetProductQuery } from '../../../../../../redux/features/products/productsApi';
import { Button } from "@/components/ui/button";

// Add interface for the try-on response
interface TryOnResponse {
    image_url: string;
    success: boolean;
    format?: string;
    height?: number;
    width?: number;
    public_id?: string;
}

// Update Product interface
interface Product {
    img: string;
    clothingType: string;
    name: string;
    price: number;
    // Add other product properties as needed
}

export default function MainContent() {
    const { id } = useParams();
    const [tryOn, { isLoading: isTryingOn }] = useTryOnMutation();
    // Add type assertion for id
    const { data } = useGetProductQuery(id as string);
    const product = data?.data?.item as Product | undefined;
    
    // Update state types
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [resultData, setResultData] = useState<TryOnResponse | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handle the uploaded image from ToUploadSec
    const handleImageUpload = (file: File) => {
        setUploadedImage(file);
        setResultData(null); // Clear previous result when new image is uploaded
        setDialogOpen(false);
        setError(null); // Clear any previous errors
    };

    // Process try-on when user clicks the button
    const processTryOn = async () => {
        if (!uploadedImage || !product) return;
        
        try {
            setIsProcessing(true);
            setError(null);
            
            const formData = new FormData();
            formData.append('person_image', uploadedImage);
            // Convert number to string
            formData.append('num_inference_steps', '30');
            formData.append('cloth_url', product.img);
            formData.append('cloth_type', product.clothingType);
            
            // Call the tryOn mutation
            const response = await tryOn(formData).unwrap();
            console.log("Try-on response:", response);
            
            // Set the result data from the response
            if (response && response.success) {
                // Ensure image_url is valid by adding a timestamp or query parameter
                // This prevents caching issues in Vercel
                const imageUrl = response.image_url.includes('?') 
                    ? `${response.image_url}&v=${Date.now()}` 
                    : `${response.image_url}?v=${Date.now()}`;
                
                setResultData({
                    ...response,
                    image_url: imageUrl
                });
                setDialogOpen(true);
            } else {
                setError("Failed to process try-on. Please try again.");
            }
        } catch (error) {
            console.error("Try-on process failed:", error);
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col gap-8 pb-10">
            <HeaderSec />
            
            <ToUploadSec onImageUpload={handleImageUpload} />
            
            {uploadedImage && product && !resultData && (
                <div className="flex flex-col items-center mt-4 w-full">
                    <Button
                        onClick={processTryOn}
                        disabled={isProcessing || isTryingOn}
                        className="px-8 py-2 bg-primary text-white hover:bg-primary/90"
                    >
                        {isProcessing || isTryingOn ? "Processing..." : "Try On This Item"}
                    </Button>
                    
                    {error && (
                        <p className="text-red-500 mt-2">{error}</p>
                    )}
                </div>
            )}
            
            {/* Result Dialog component */}
            <ResultDialog
                isOpen={isDialogOpen}
                onClose={() => setDialogOpen(false)}
                resultData={resultData}
                product={product}
            />
            
            <TryMoreSec />
        </div>
    );
}