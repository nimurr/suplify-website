import { apiSlice } from "../../api/apiSlice";

const protocal = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProtocal: builder.query({
            query: (type) => ({
                url: `/doctor-patients/paginate/doctor-protocol/forPatient`,
                method: "GET",
            }),
            providesTags: ["Protocal"],
        }),
        getAllPlanThisUser: builder.query({
            query: ({ doctorId, pasaintId }) => ({
                url: `/doctor-patients/protocols-for-patient?patientId=${pasaintId}&doctorId=${doctorId}`,
                method: "GET",
            }),
            providesTags: ["Protocal"],
        }),
        getAllPlanThisUserById: builder.query({
            query: ({ protocalId, type }) => ({
                url: `/plan-by-doc/paginate/for-patient?protocolId=${protocalId}&planType=${type}`,
                method: "GET",
            }),
            providesTags: ["Protocal"],
        }),
    }),
});


export const { useGetAllProtocalQuery, useGetAllPlanThisUserQuery  , useGetAllPlanThisUserByIdQuery} = protocal;