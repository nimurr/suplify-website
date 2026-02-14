import { apiSlice } from "../../api/apiSlice";

export const HireSpecialistRequest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllHireSpecialistRequests: builder.query({
            query: ({ page, limit }) => {
                return {
                    url: `/hire-specialist/paginate?page=${page}&limit=${limit}`,
                    method: "GET",
                }
            },
        }),
        updateHireSpeccialistStatus: builder.mutation({
            query: ({ data, id }) => ({
                url: `/hire-specialist/change-status/${id}`,
                method: "PUT",
                body: data
            })
        })
    }),
})

export const { useGetAllHireSpecialistRequestsQuery, useUpdateHireSpeccialistStatusMutation } = HireSpecialistRequest;