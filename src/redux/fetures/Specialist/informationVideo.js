import { apiSlice } from "../../api/apiSlice";

const informationVideo = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createInformationVideo: builder.mutation({
            query: (data) => ({
                url: `/information-videos`,
                method: "POST",
                body: data
            }),
            InvalidatesTags: ["InformationVideo"]
        }),
        getAllInformationVideo: builder.query({
            query: (page) => ({
                url: `/information-videos/paginate`,
                method: "GET"
            }),
            providesTags: ["InformationVideo"]
        }),
        deleteInformationVideo: builder.mutation({
            query: (id) => ({
                url: `/information-videos/softDelete/${id}`,
                method: "PUT"
            }),
            InvalidatesTags: ["InformationVideo"]
        }),
    }),
});

export const { useCreateInformationVideoMutation, useGetAllInformationVideoQuery , useDeleteInformationVideoMutation } = informationVideo