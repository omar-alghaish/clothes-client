

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CategoryResponse {
    success: boolean;
    data: {
        categories: Array<{
            _id: string;
            name: string;
        }>;
    };
    }

interface BrandResponse {
    success: boolean;
    data: {
        brands: Array<{
            _id: string;
            brandName: string;
            brandLogo: string;
        }>;
    };
}

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
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
    tagTypes: ['Category', 'Brand'],
    endpoints: (builder) => ({

        getCategories: builder.query<CategoryResponse, void>({
            query: () => '/categories',
            providesTags: ['Category']
        }),
        getBrands: builder.query<BrandResponse, void>({
            query: () => '/brands',
            providesTags: ['Brand']
        })

    })
});

export const {
    useGetCategoriesQuery,
    useGetBrandsQuery
} = categoryApi;
