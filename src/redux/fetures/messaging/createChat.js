
import { apiSlice } from "../../api/apiSlice";

const creatChat = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        creatChat : builder.mutation({
            query: (data) => ({
                url: `/chating/create`,
                method: "POST",
                body:  data
            })
        })
    })
})

export const {useCreatChatMutation} = creatChat;
