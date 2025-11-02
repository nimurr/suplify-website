
const { apiSlice } = require("@/redux/api/apiSlice");


const getChatlist = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getChatlist: builder.query({
            query: () => `/chating/getChatlist`,
            providesTags: [{type: "Chat"}]
        })

    })
})

export const {useGetChatlistQuery} = getChatlist