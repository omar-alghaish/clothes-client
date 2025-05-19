"use client";
import Image from "next/image";
import Link from "next/link";
import { useGetBrandsQuery } from "@/redux/features/category/categoryApi";

// Function to validate and fix URLs
const isValidUrl = (url: string) => {
    try {
        // Check if URL has protocol
        if (!url) return false;
        
        // If URL is relative, ensure it starts with a slash
        if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
            return false;
        }
        
        return true;
    } catch (e) {
        console.error("URL validation error:", e);
        return false;
    }
};

const UpdatedSection2 = () => {
    const { data, isLoading, error } = useGetBrandsQuery();
    const brandsData = data?.data.brands;
    
    // Filter brands to include only those with valid logo URLs AND active status set to true
    const activeBrandsWithLogos = brandsData?.filter(brand =>
        brand?.brandLogo && 
        isValidUrl(brand.brandLogo) && 
        brand.active === true  // Only include active brands
    ) || [];
    
    if (isLoading) {
        return (
            <section className="py-10">
                <div className="container mx-auto text-center">
                    <p>Loading brands...</p>
                </div>
            </section>
        );
    }
    
    if (error) {
        return (
            <section className="py-10">
                <div className="container mx-auto text-center">
                    <p>Error loading brands</p>
                </div>
            </section>
        );
    }
    
    if (activeBrandsWithLogos.length === 0) {
        return (
            <section className="py-10">
                <div className="container mx-auto text-center">
                    <p>No active brands with valid logos available</p>
                </div>
            </section>
        );
    }
    
    return (
        <section className="py-10">
            <div className="container mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
                {activeBrandsWithLogos.map((item, index) => (
                    <Link
                        key={item._id || index}
                        href={`/shop?brand=${encodeURIComponent(item?.brandName)}`}
                    >
                        <div className="w-20 md:w-24 lg:w-28 cursor-pointer">
                            {/* Using next/image safely with error handling */}
                            <div className="relative w-full aspect-video">
                                <Image
                                    className="w-full object-contain grayscale-0 hover:grayscale transition-all duration-300"
                                    src={item.brandLogo}
                                    fill={true}
                                    sizes="(max-width: 768px) 80px, (max-width: 1200px) 96px, 112px"
                                    alt={`Brand Icon ${item?.brandName || 'Brand'}`}
                                    onError={(e) => {
                                        console.log(`Error loading image for ${item?.brandName}`);
                                        // Fallback behavior on error
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default UpdatedSection2;