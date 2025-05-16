import HeaderSec from './HeaderSec'
import Content from './Content' 

interface Product {
    img: string;
    clothingType: string;
    name: string;
    price: number;
}

export default function ResultTryOn({image, product}: {image: string, product: Product}) {
    return (
        <div>
            <HeaderSec />
            <Content image={image} product={product}/>
        </div>
    )
}