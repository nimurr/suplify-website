
const { apiSlice } = require("@/redux/api/apiSlice");


const getMessage = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessage: builder.query({
            query: (id) => `/messages/${id}`,
            providesTags: [{type: "Chat"}]
        })

    })
})

export const {useGetMessageQuery} = getMessage