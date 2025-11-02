import { apiSlice } from "../../api/apiSlice";

const patient = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllYourDoctors: builder.query({
            query: (id) => ({
                url: `/doctor-patients/paginate`,
                method: "GET"
            }),
            providesTags: ["YourDoctors"]
        }),
        getAllOthers: builder.query({
            query: () => ({
                url: `/doctor-patients/paginate/others`,
                method: "GET"
            }),
            providesTags: ["YourDoctors"]
        }),

        getFullData: builder.query({
            query: (id) => ({
                url: `/doctor-appointments/paginate/by/patient?createdBy=${id}&page=1`,
                method: "GET"
            }),
            providesTags: ["YourDoctors"]
        }),

        doctorAppoinmentBooked: builder.mutation({
            query: (id) => ({
                url: `/doctor-appointments/bookings/${id}`,
                method: "POST"
            }),
            providesTags: ["YourDoctors"]
        }),

    }),
});


export const { useGetAllYourDoctorsQuery, useGetAllOthersQuery, useGetFullDataQuery, useDoctorAppoinmentBookedMutation } = patient;