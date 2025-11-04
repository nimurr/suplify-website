import { apiSlice } from "@/redux/api/apiSlice";

const landing = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => `/products/by/category`,
            providesTags: ["Landing"]
        }),
        getAddToCartLangth: builder.query({
            query: () => ({
                url: `/carts/paginate`,
                method: 'GET',
            }),
            providesTags: ["Landing"]
        }),
        addTocartProduct: builder.mutation({
            query: (data) => ({
                url: `/cart-items/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Landing"]
        }),
        getAllcartProducts: builder.query({
            query: () => ({
                url: `/carts/view`,
                method: 'GET',
            }),
            providesTags: ["Landing"]
        }),
        removeAddToCartProduct: builder.mutation({
            query: (id) => ({
                url: `/cart-items/softDelete/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ["Landing"]
        }),

        increseCartProduct: builder.mutation({
            query: ({ id, type }) => ({
                url: `/cart-items/count-update/${id}?type=${type}`,
                method: 'PUT',
            }),
            invalidatesTags: ["Landing"]
        }),

        takeOrder: builder.mutation({
            query: (data) => ({
                url: `/orders`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Landing"]
        }),



        startVideo: builder.query({
            query: () => ({
                url: `/settings/?type=introductionVideo`,
                method: 'GET',
            }),
            providesTags: ["Landing"]
        }),

        getAllInformationVideo: builder.query({
            query: () => ({
                url: `/information-videos/paginate/patient`,
                method: 'GET',
            }),
            providesTags: ["Landing"]
        }),


    })
})


export const {
    useGetAllCategoriesQuery,
    useGetAddToCartLangthQuery,
    useAddTocartProductMutation,
    useGetAllcartProductsQuery,
    useRemoveAddToCartProductMutation,
    useIncreseCartProductMutation,

    useTakeOrderMutation,


    useStartVideoQuery,
    useGetAllInformationVideoQuery
} = landing