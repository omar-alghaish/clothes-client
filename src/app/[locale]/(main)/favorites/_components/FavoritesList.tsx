
"use client"
import { CartItem } from '@/components/common'
import React from 'react'
import { useGetFavProductQuery } from '@/redux/features/favorites/favoritesApi';
import Loading from '@/app/[locale]/loading';

const FavoritesList = () => {
  const { isLoading, data: favoriteItems, error } = useGetFavProductQuery();

  if (isLoading) {
    return (
        <Loading />
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>
        <p className="text-red-500">Failed to load favorites. Please try again later.</p>
      </div>
    );
  }

  const favorites = favoriteItems?.data?.favorites || [];
  const hasFavorites = favorites.length > 0;

  // console.log(favoriteItems?.data)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Your Favorites</h1>

      {!hasFavorites && (
        <div className="text-center py-10 flex-1">
          <p className="text-gray-800 text-2xl">You haven &apos; t added any favorites yet.</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {hasFavorites && favorites.map((item) => (
          <CartItem
            key={item._id}
            img={item.img}
            name={item.name}
            brand={item.brand}
            price={item.price}
            rating={item.rating}
            _id={item._id}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  )

}

export default FavoritesList