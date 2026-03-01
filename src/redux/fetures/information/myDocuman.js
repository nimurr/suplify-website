import { apiSlice } from "@/redux/api/apiSlice";

const myDocuman = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createMyDocuman: builder.mutation({
            query: (data) => ({
                url: "/client-documents",
                method: "POST",
                body: data,
            }),
        }),
        getMyDocuman: builder.query({
            query: ({ page, limit }) => ({
                url: `/client-documents/paginate/patient?page=${page}&limit=${limit}`,
                method: "GET",
            }),
        }),
        deleteMyDocuman: builder.mutation({
            query: (id) => ({
                url: `/client-documents/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useCreateMyDocumanMutation, useGetMyDocumanQuery, useDeleteMyDocumanMutation } = myDocuman;