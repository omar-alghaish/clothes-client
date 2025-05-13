

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface FavoritesResponse {
    success: boolean;
    data: {
        favorites: Array<{
            _id: string;
            name: string;
            price: string;
            rating: string;
            images: string[];
            brand: {
                _id: string;
                brandName: string;
                brandLogo: string;
            };
        }>;
    };
}

export const favoritesApi = createApi({
    reducerPath: 'favApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://clothes-server-production.up.railway.app/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { token: string } }).auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Favorites'],
    endpoints: (builder) => ({
        addFavProduct: builder.mutation({
            query: (itemId) => ({
                url: `/favorites/${itemId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Favorites']
        }),

        getFavProduct: builder.query<FavoritesResponse, void>({
            query: () => '/favorites',
            providesTags: ['Favorites']
        }),

        deleteFavProduct: builder.mutation({
            query: (itemId) => ({
                url: `/favorites/${itemId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Favorites']
        })
    })
});

export const {
    useAddFavProductMutation,
    useGetFavProductQuery,
    useDeleteFavProductMutation
} = favoritesApi;
