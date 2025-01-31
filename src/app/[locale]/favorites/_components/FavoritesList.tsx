import { CartItem } from '@/components/common'
import React from 'react'
import img from "../../../../assets/images/i14.jpg"
import img2 from "../../../../assets/brandIcons/hm.png"

// Create array of favorite items data
const favoriteItems = [
  {
    id: "1",
    name: "Jacket",
    price: "35",
    rating: "3.5",
    img:img.src,
    brandIcon:img2.src
  },
  {
    id: "2",
    name: "Sweater",
    price: "45",
    rating: "4.2",
    img:img.src,
    brandIcon:img2.src
  },
  {
    id: "3",
    name: "T-Shirt",
    price: "25",
    rating: "4.0",
    img:img.src,
    brandIcon:img2.src
  },
  {
    id: "4",
    name: "Jeans",
    price: "55",
    rating: "4.5",
    img:img.src,
    brandIcon:img2.src
  },
  {
    id: "1",
    name: "Jacket",
    price: "35",
    rating: "3.5",
    img:img.src,
    brandIcon:img2.src
  },
  {
    id: "2",
    name: "Sweater",
    price: "45",
    rating: "4.2",
    img:img.src,
    brandIcon:img2.src
  },
  {
    id: "3",
    name: "T-Shirt",
    price: "25",
    rating: "4.0",
    img:img.src,
    brandIcon:img2.src
  },
  {
    id: "4",
    name: "Jeans",
    price: "55",
    rating: "4.5",
    img:img.src,
    brandIcon:img2.src
  }
];

const FavoritesList = () => {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
    )
  }
  
  export default FavoritesList