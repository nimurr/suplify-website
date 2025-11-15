
const { apiSlice } = require("@/redux/api/apiSlice");


const getMessage = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessage: builder.query({
            query: ({ page, id }) => `/messages/paginate?conversationId=${id}&page=${page}&sortBy=-createdAt`,
            providesTags: [{ type: "Chat" }]
        })

    })
})

export const { useGetMessageQuery } = getMessage