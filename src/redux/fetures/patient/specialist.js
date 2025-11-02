import { apiSlice } from "../../api/apiSlice";

const specialist = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSpecialist: builder.query({
            query: () => "/doctor-specialist-patient-relation/paginate",
        }),
        getAlldoctorPatientsProtacol: builder.query({
            query: ({ patientId, doctorId }) => ({
                url: `/doctor-patients/protocols-for-patient?patientId=${patientId}&doctorId=${doctorId}`,
                method: "GET",
            }),
        }),
        getAllSuggestionByProtocalId: builder.query({
            query: ({ protocolId, type }) => ({
                url: `/plan-by-doc/with-suggestions/get-all?protocolId=${protocolId}&planType=${type}`,
                method: "GET",
            }),
        }),
        getAllSpecialistPatientsPaginate: builder.query({
            query: () => ({
                url: `/specialist-patients/paginate`,
                method: "GET",
            }),
        }),
        //specialist-patients/paginate/others?page=1
        getAllSpecialistPatientsPaginateOthers: builder.query({
            query: () => ({
                url: `/specialist-patients/paginate/others`,
                method: "GET",
            }),
        }),
        getTrainingPrograms: builder.query({
            query: (id) => ({
                url: `/training-programs/paginate?createdBy=${id}`,
                method: "GET",
            }),
        }),

        getFullPatientStatusDataForSpecialist: builder.query({
            query: ({ trainingProgramId, specialistId }) => ({
                url: `/training-sessions/paginate/for-patient?trainingProgramId=${trainingProgramId}&specialistId=${specialistId}`,
                method: "GET",
            }),
        }),

        getAllScheduleWorkoutClass: builder.query({
            query: ({ specialistId }) => ({
                url: `/workout-schedules/paginate/for-patient?createdBy=${specialistId}`,
                method: "GET",
            }),
        }),

        bookNowSheduleWorkoutClass: builder.mutation({
            query: (id) => ({
                url: `/workout-schedules/bookings/${id}`,
                method: "POST",
            }),
        })

    }),
});



export const { useGetSpecialistQuery, useGetAlldoctorPatientsProtacolQuery, useGetAllSuggestionByProtocalIdQuery, useGetAllSpecialistPatientsPaginateQuery, useGetAllSpecialistPatientsPaginateOthersQuery, useGetTrainingProgramsQuery, useGetFullPatientStatusDataForSpecialistQuery, useGetAllScheduleWorkoutClassQuery , useBookNowSheduleWorkoutClassMutation} = specialist;