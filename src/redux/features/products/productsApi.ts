import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/features/api/baseQuery";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery,
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params?: Record<string, string | number | (string | number)[]>) => {
                const queryParams = new URLSearchParams();

                const defaultParams = {
                    page: 1,
                    limit: 20,
                    sort: 'newest'
                };

                const mergedParams = { ...defaultParams, ...params };

                Object.entries(mergedParams).forEach(([key, value]) => {
                    if (value === undefined || value === null) return;

                    if (Array.isArray(value)) {
                        value.forEach(val => {
                            if (val !== undefined && val !== null) {
                                queryParams.append(key, String(val));
                            }
                        });
                    } else {
                        queryParams.append(key, String(value));
                    }
                });
                console.log(params)
                return {
                    url: `/items`,
                    params: queryParams
                };
            },
        }),
        getProduct: builder.query({
            query: (id: string) => `/items/${id}`,
        }),
        getFeaturedProducts: builder.query({
            query: () => `/items/featured`,
        }),
        getNewArrivalsProducts: builder.query({
            query: () => `/items/new-arrivals`,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductQuery, useGetFeaturedProductsQuery, useGetNewArrivalsProductsQuery } = productsApi;