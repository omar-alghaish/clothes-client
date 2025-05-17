import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ItemData {
    _id: string;
    color: string;
    size: string;
    products: {
        name: string;
        img: string;
    };
    brand: {
        brandLogo: string;
    };
}

export interface IOrder {
    _id: string;
    paymentMethod: string;
    totalPrice: string;
    estimatedDate: string;
    items: ItemData[];
}

//response structures
interface ProfileOrderResponse {
    status?: string;
    data: {
        data: { orders?: IOrder[] }
    };
    [key: string]: unknown
};

export const profileOrdersApi = createApi({
    reducerPath: 'profileOrdersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://clothes-server-production.up.railway.app/api/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { token: string } }).auth?.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['orders'],
    endpoints: (builder) => ({
        getOrders: builder.query<ProfileOrderResponse, void>({
            query: () => ({
                url: '/orders/my-orders',
            }),
            providesTags: ['orders']
        }),
    })
});

export const {
    useGetOrdersQuery
} = profileOrdersApi;