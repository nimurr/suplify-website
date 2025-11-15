
const { apiSlice } = require("@/redux/api/apiSlice");


const getChatlist = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getChatlist: builder.query({
            query: (page) => `/conversations/paginate?page=${page}`,
            providesTags: [{ type: "Chat" }]
        }),
        getChatUserInfo: builder.query({
            query: (id) => ({
                url: `/conversations/participants/other?conversationId=${id}`,
                method: "GET"
            }),
            providesTags: [{ type: "Chat" }]
        })

    })
})

export const { useGetChatlistQuery , useGetChatUserInfoQuery } = getChatlist;