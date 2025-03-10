import FavoritesList from "@/app/[locale]/favorites/_components/FavoritesList"
import { CartItem } from "@/components/common";
import i14 from '../../../../../assets/images/i14.jpg'
import hm from '../../../../../assets/brandIcons/hm.png'
export default function TryMoreSec() {
    const favoriteItems = [
        {
            id: "1",
            name: "Jacket",
            price: "35",
            rating: "3.5",
            img: i14.src,
            brandIcon: hm.src
        },
        {
            id: "2",
            name: "Sweater",
            price: "45",
            rating: "4.2",
            img: i14.src,
            brandIcon: hm.src
        },
        {
            id: "3",
            name: "T-Shirt",
            price: "25",
            rating: "4.0",
            img: i14.src,
            brandIcon: hm.src
        },
        {
            id: "4",
            name: "Jeans",
            price: "55",
            rating: "4.5",
            img: i14.src,
            brandIcon: hm.src
        },
        {
            id: "1",
            name: "Jacket",
            price: "35",
            rating: "3.5",
            img: i14.src,
            brandIcon: hm.src
        },
        {
            id: "2",
            name: "Sweater",
            price: "45",
            rating: "4.2",
            img: i14.src,
            brandIcon: hm.src
        },
        {
            id: "3",
            name: "T-Shirt",
            price: "25",
            rating: "4.0",
            img: i14.src,
            brandIcon: hm.src
        },
        {
            id: "4",
            name: "Jeans",
            price: "55",
            rating: "4.5",
            img: i14.src,
            brandIcon: hm.src
        }
    ];
    return (
        <div className="space-y-10">
            <div className="mt-16 flex flex-col flex-1 items-center space-y-2 lg:items-center lg:ml-10">
                <h2 className="text-center text-3xl text-primary font-bold md:text-3xl lg:text-5xl lg:text-center ">Try More Products</h2>
                <p className="text-gray-500 text-center text-[17px] md:text-xl lg:text-2xl">Keep discovering! Try more products to complete your look</p>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {favoriteItems.map((item) => (
                        <CartItem
                            key={item.id} // Better to use item.id instead of index if available
                            img={item.img}
                            name={item.name}
                            brandImage={item.brandIcon}
                            price={item.price}
                            rating={item.rating}
                            id={item.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}