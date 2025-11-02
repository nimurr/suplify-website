

const { apiSlice } = require("@/redux/api/apiSlice");


const getBanners = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBanners: builder.query({
            query: () => `/banner`,
            providesTags: [{type: "Property"}]
        })

    })
})

export const {useGetBannersQuery} = getBanners