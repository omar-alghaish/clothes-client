"use client";   
import { useState, useEffect } from "react";
import ScrollAreaSec from './ScrollAreaSec';
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useAddToCartMutation } from "@/redux/features/cart/cartApi";
import { 
  useAddFavProductMutation, 
  useGetFavProductQuery,
  useDeleteFavProductMutation 
} from "@/redux/features/favorites/favoritesApi";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { toast } from "sonner";
import { Heart } from "lucide-react";

interface Product {
    name: string;
    price: number;
    // Add other product properties as needed
}

interface ContentProps {
    image: string;
    product: Product;
}

export default function Content({ image, product }: ContentProps) {
    const { id } = useParams();
    // API hooks with error handling
    const [addToCart, { isLoading: isCartLoading }] = useAddToCartMutation();
    const [addToFavorite, { isLoading: isAddFavLoading }] = useAddFavProductMutation();
    const [deleteFavorite, { isLoading: isDeleteFavLoading }] = useDeleteFavProductMutation();
    
    // Get favorites data
    const { data: favoritesData, isLoading: isFavoritesLoading } = useGetFavProductQuery();
    
    // State management
    const [selectedTop, ] = useState(null);
    const [selectedBottom, ] = useState(null);
    const [isFav, setIsFav] = useState(false);
    
    const checkAuth = useAuthRedirect();

    // Check if product is in favorites when component mounts or favorites data changes
    useEffect(() => {
        if (favoritesData?.data?.favorites && id) {
            const isInFavorites = favoritesData.data.favorites.some(
                (item) => item._id === id
            );
            setIsFav(isInFavorites);
        }
    }, [favoritesData, id]);

    // Function to handle adding item to cart
    const handleAddToCart = () => {
        if (!product) return;
        
        checkAuth(async () => {
            try {
                await addToCart({
                    id,
                    quantity: "1",
                    price: product.price
                }).unwrap();
                toast.success("Item added to cart!");
            } catch (error) {
                toast.error("Failed to add item to cart!");
                console.error("Failed to add item to cart:", error);
            }
        });
    };
    
    // Function to handle favorite toggle using the API
    const handleLove = () => {
        if (!id) return;
        
        checkAuth(async () => {
            try {
                if (isFav) {
                    // If already in favorites, remove it
                    await deleteFavorite(id).unwrap();
                    toast.success("Removed from favorites!");
                } else {
                    // If not in favorites, add it
                    await addToFavorite(id).unwrap();
                    toast.success("Added to favorites!");
                }
                // No need to manually set isFav as the useEffect will update it when query is refetched
            } catch (error) {
                toast.error("Failed to update favorites!");
                console.error("Failed to update favorites:", error);
            }
        });
    };

    // Sample items for ScrollAreaSec components - with proper keys
    const topItems = Array(10).fill(0).map((_, index) => ({
        id: `top-item-${index}`,
        title: `Top Item ${index + 1}`
    }));
    
    const bottomItems = Array(10).fill(0).map((_, index) => ({
        id: `bottom-item-${index}`,
        title: `Bottom Item ${index + 1}`
    }));

    const isFavLoading = isAddFavLoading || isDeleteFavLoading;

    return (
        <div className="mt-10 flex flex-col md:flex-row p-4 space-y-10 md:space-y-0 md:space-x-6 lg:space-x-10 lg:p-6">
            {/* Product Section */}
            <div className="flex flex-col space-y-3 items-start w-full md:w-1/2 lg:w-1/3 lg:items-center">
                {/* Product image */}
                <div className="w-full rounded-md overflow-hidden flex justify-center" style={{ maxHeight: '650px' }}>
                    <img
                        src={image}
                        alt={product?.name || "Product image"}
                        className="object-contain w-full h-auto max-h-[650px]"
                        style={{ aspectRatio: 'auto' }}
                    />
                </div>

                {/* Action buttons */}
                <div className="flex flex-1 flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-5 w-full justify-center">
                    <Button 
                        className="w-40 bg-primary text-white border border-primary hover:bg-white hover:text-primary lg:w-52"
                        onClick={handleAddToCart}
                        disabled={isCartLoading}
                    >
                        {isCartLoading ? "Adding..." : "Add to cart"}
                    </Button>
                    <Button 
                        className="w-40 bg-white text-primary border border-primary hover:bg-primary hover:text-white lg:w-52"
                        onClick={handleLove}
                        disabled={isFavLoading || isFavoritesLoading}
                    >
                        <Heart className={`mr-2 h-4 w-4 ${isFav ? "fill-primary" : ""}`} />
                        {isFavLoading ? "Updating..." : isFav ? "Remove from favorites" : "Add to favorites"}
                    </Button>
                </div>
            </div>

            {/* Scrollable Sections */}
            <div className="flex flex-col space-y-6 w-full md:w-1/2 lg:w-2/3 lg:p-5">
                {/* Scrollable Top Section */}
                <ScrollAreaSec
                    title="Find your Top"
                    items={topItems}
                    selectedIndex={selectedTop}
                    // onSelect={(index) => setSelectedTop(index)}
                    imageSrc="/api/placeholder/120/160"
                />

                {/* Scrollable Bottom Section */}
                <ScrollAreaSec
                    title="Find your Bottom"
                    items={bottomItems}
                    selectedIndex={selectedBottom}
                    // onSelect={(index) => setSelectedBottom(index)}
                    imageSrc="/api/placeholder/120/160"
                />
            </div>
        </div>
    );
}