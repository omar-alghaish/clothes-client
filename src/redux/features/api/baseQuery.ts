import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const BASE_URL = "https://clothes-server-production.up.railway.app/api/v1";
export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        return headers;
    },
});
