import HeaderSec from './HeaderSec'
import Content from './Content'
import { useEffect } from 'react'

interface Product {
    img: string;
    clothingType: string;
    name: string;
    price: number;
}

export default function ResultTryOn({image, product}: {image: string, product: Product}) {
    console.log("ResultTryOn - image URL:", image);
    
    // Pre-load the image to ensure it's cached
    useEffect(() => {
        if (image) {
            const preloadImage = new Image();
            preloadImage.src = image;
        }
    }, [image]);
    
    return (
        <div>
            <HeaderSec />
            <Content image={image} product={product}/>
        </div>
    )
}