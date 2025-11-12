import { apiSlice } from "../../api/apiSlice";

const specialist = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        spacialistAllPatents: builder.query({
            query: () => ({
                url: `/specialist-patients/all-patients`,
                method: "GET",
            }),
            providesTags: ["specialistKeyPoints"]
        }),
        spacialistPatientById: builder.query({
            query: (id) => ({
                url: `/doctor-patients/paginate/doctor-protocol?patientId=${id}`,
                method: "GET",
            }),
            providesTags: ["specialistKeyPoints"]
        }),
        spacialistPotentialPatient: builder.query({
            query: ({ patientId, doctorId }) => ({
                url: `/doctor-patients/protocols-for-patient?patientId=${patientId}&doctorId=${doctorId}`,
                method: "GET",
            }),
            providesTags: ["specialistKeyPoints"]
        }),
        getMealPlanByProtocolIdAndPatientId: builder.query({
            query: ({ protocolId, patientId }) => ({
                url: `/plan-by-doc/paginate/for-specialist?protocolId=${protocolId}&patientId=${patientId}`,
                method: "GET",
            }),
            providesTags: ["specialistKeyPoints"]
        }),
        getAllMealSuggestion: builder.query({
            query: ({ protocolId }) => ({
                url: `/plan-by-doc/with-suggestions?planByDoctorId=${protocolId}`,
                method: "GET",
            }),
            providesTags: ["specialistKeyPoints"]
        }),
        addSpecialistKeyPoint: builder.mutation({
            query: ({ body, planByDoctorId }) => ({
                url: `/suggestion-by-specialist?planByDoctorId=${planByDoctorId}`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["specialistKeyPoints"]
        }),
        updateDeleteSuggestionForAPlan: builder.mutation({
            query: ({planId}) => ({
                url: `/suggestion-by-specialist/softDelete/${planId}`,
                method: "PUT",
            }),
            invalidatesTags: ["specialistKeyPoints"]
        }),
    })
})

export const {
    useSpacialistAllPatentsQuery,
    useSpacialistPatientByIdQuery,
    useSpacialistPotentialPatientQuery,
    useGetMealPlanByProtocolIdAndPatientIdQuery,
    useGetAllMealSuggestionQuery,
    useAddSpecialistKeyPointMutation,
    
} = specialist;