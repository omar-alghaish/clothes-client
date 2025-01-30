import { CartItem } from '@/components/common'
import React from 'react'
import img from "../../../../assets/images/i1.jpg"
import img2 from "../../../../assets/brandIcons/hm.png";

const ITEMS_PER_PAGE = 8

const Products = ({ searchParams }: { searchParams?: { page?: string } }) => {
  const currentPage = Number(searchParams?.page) || 1

  console.log(currentPage)
  
  // Replace with your actual data fetching
  

  return (
    <div className="space-y-6 flex flex-col gap-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (
          <CartItem
            key={index}
            img={img.src}
            name={"jacket"}
            brandImage={img2.src}
            price={"35"}
            rating={"3.5"}
            id='1'
          />
        ))}
      </div>
      

    </div>
  )
}

export default Products