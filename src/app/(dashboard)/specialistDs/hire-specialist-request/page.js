// 'use client'
// import { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import {
//     useGetAllHireSpecialistRequestsQuery,
//     useUpdateHireSpeccialistStatusMutation
// } from '@/redux/fetures/Specialist/HireSpecialistRequest';
// import url from '@/redux/api/baseUrl';

// const Page = () => {
//     const [page, setPage] = useState(1);
//     const limit = 10;

//     const { data, isLoading, refetch } = useGetAllHireSpecialistRequestsQuery({ page, limit });
//     const [updateStatus] = useUpdateHireSpeccialistStatusMutation();

//     const totalPages = data?.data?.attributes?.totalPages || 1;
//     const results = data?.data?.attributes?.results || [];

//     if (isLoading) {
//         return <p className="text-center py-20">Loading...</p>;
//     }

//     const handleAccept = async (id) => {
//         try {
//             const res = await updateStatus({ data: { status: 'approved' }, id }).unwrap();
//             if (res?.code === 200) {
//                 toast.success(res?.message || 'Status Updated Successfully');
//                 refetch();
//             }
//         } catch (error) {
//             toast.error(error?.data?.message || 'Something went wrong');
//         }
//     };

//     const handleDecline = async (id) => {
//         try {
//             const res = await updateStatus({ data: { status: 'rejected' }, id }).unwrap();
//             if (res?.code === 200) {
//                 toast.success(res?.message || 'Status Updated Successfully');
//                 refetch();
//             }
//         } catch (error) {
//             toast.error(error?.data?.message || 'Something went wrong');
//         }
//     };

//     return (
//         <div className="p-4">
//             <div className='mb-5 flex items-center justify-between gap-5'>
//                 <h2 className="text-2xl font-semibold ">Hire Specialist Requests</h2>
//                 <select name="" onChange={(e) => setPage(e.target.value)} className="py-2 px-4 border border-gray-300 rounded-lg " value={page} id="">
//                     <option value="approved">Approved</option>
//                     <option value="pending">Pending</option>
//                     <option value="rejected">Rejected</option>
//                 </select>
//             </div>

//             <div className="overflow-hidden border border-gray-300 rounded-lg">
//                 <table className="min-w-full">
//                     <thead className="bg-red-600 text-white">
//                         <tr>
//                             <th className="py-3 px-4">Patient</th>
//                             <th className="py-3 px-4">Specialist</th>
//                             <th className="py-3 px-4">Date</th>
//                             <th className="py-3 px-4">Status</th>
//                             <th className="py-3 px-4">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-300">
//                         {results.map((item) => (
//                             <tr key={item._HireSpecialistRequestToAdminId}>
//                                 <td className="py-2 px-4 flex items-center gap-2">
//                                     <img
//                                         src={item.patientId?.profileImage?.profileImage?.includes('amazonaws') ? item.patientId?.profileImage?.imageUrl : url + item.patientId?.profileImage?.imageUrl}
//                                         alt={item.patientId.name}
//                                         className="w-8 h-8 rounded-full object-cover"
//                                     />
//                                     <div>
//                                         <p>{item.patientId.name}</p>
//                                         <p className="text-xs text-gray-500">{item.patientId.email}</p>
//                                     </div>
//                                 </td>
//                                 <td >
//                                     <div className="py-2 px-4 flex items-center gap-2">
//                                         <img
//                                             src={item.patientId?.profileImage?.profileImage?.includes('amazonaws') ? item.patientId?.profileImage?.imageUrl : url + item.patientId?.profileImage?.imageUrl}
//                                             alt={item.specialistId.name}
//                                             className="w-8 h-8 rounded-full object-cover"
//                                         />
//                                         <div>
//                                             <p>{item.specialistId.name}</p>
//                                             <p className="text-xs text-gray-500">{item.specialistId.email}</p>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td className="py-2 px-4">
//                                     {new Date(item.createdAt).toLocaleDateString()}
//                                 </td>
//                                 <td className="py-2 px-4 capitalize">{item.status}</td>
//                                 <td className="py-2 px-4 flex items-center justify-center gap-2">
//                                     <button
//                                         onClick={() => handleAccept(item._HireSpecialistRequestToAdminId)}
//                                         className="bg-blue-500 text-white px-2 py-1 rounded"
//                                     >
//                                         Accept
//                                     </button>
//                                     <button
//                                         onClick={() => handleDecline(item._HireSpecialistRequestToAdminId)}
//                                         className="bg-red-500 text-white px-2 py-1 rounded"
//                                     >
//                                         Decline
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-end mt-4 gap-2">
//                 <button
//                     className="px-3 py-1 border rounded disabled:opacity-50"
//                     disabled={page <= 1}
//                     onClick={() => setPage((prev) => prev - 1)}
//                 >
//                     Prev
//                 </button>
//                 {[...Array(totalPages)].map((_, idx) => (
//                     <button
//                         key={idx}
//                         className={`px-3 py-1 border rounded ${page === idx + 1 ? 'bg-red-600 text-white' : ''
//                             }`}
//                         onClick={() => setPage(idx + 1)}
//                     >
//                         {idx + 1}
//                     </button>
//                 ))}
//                 <button
//                     className="px-3 py-1 border rounded disabled:opacity-50"
//                     disabled={page >= totalPages}
//                     onClick={() => setPage((prev) => prev + 1)}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Page;


'use client'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
    useGetAllHireSpecialistRequestsQuery,
    useUpdateHireSpeccialistStatusMutation
} from '@/redux/fetures/Specialist/HireSpecialistRequest';
import url from '@/redux/api/baseUrl';

const Page = () => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('rejected');
    const limit = 10;

    const { data, isLoading, refetch } = useGetAllHireSpecialistRequestsQuery({ page, limit, status: statusFilter });
    const [updateStatus] = useUpdateHireSpeccialistStatusMutation();

    const totalPages = data?.data?.attributes?.totalPages || 1;
    const results = data?.data?.attributes?.results || [];

    if (isLoading) {
        return <p className="text-center py-20 text-gray-500 text-lg">Loading...</p>;
    }

    const handleAccept = async (id) => {
        try {
            const res = await updateStatus({ data: { status: 'approved' }, id }).unwrap();
            if (res?.code === 200) {
                toast.success(res?.message || 'Status Updated Successfully');
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    const handleDecline = async (id) => {
        try {
            const res = await updateStatus({ data: { status: 'rejected' }, id }).unwrap();
            if (res?.code === 200) {
                toast.success(res?.message || 'Status Updated Successfully');
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header + Filter */}
            <div className='mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
                <h2 className="text-2xl font-semibold text-gray-800">Hire Specialist Requests</h2>
                <select
                    onChange={(e) => setStatusFilter(e.target.value)}
                    value={statusFilter}
                    className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    <option value="rejected">Rejected</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Patient</th>
                            <th className="py-3 px-4 text-left">Specialist</th>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {results.length > 0 ? results.map((item) => (
                            <tr key={item._HireSpecialistRequestToAdminId} className="hover:bg-gray-50 transition-colors">
                                {/* Patient */}
                                <td >
                                    <div className="py-3 px-4 flex items-center gap-3">
                                        <img
                                            src={item.patientId?.profileImage?.imageUrl?.includes('amazonaws')
                                                ? item.patientId.profileImage.imageUrl
                                                : url + item.patientId?.profileImage?.imageUrl
                                            }
                                            alt={item.patientId.name}
                                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-700">{item.patientId.name}</p>
                                            <p className="text-xs text-gray-500">{item.patientId.email}</p>
                                        </div>
                                    </div>

                                </td>

                                {/* Specialist */}
                                <td >
                                    <div className="py-3 px-4 flex items-center gap-3">
                                        <img
                                            src={item.specialistId?.profileImage?.imageUrl?.includes('amazonaws')
                                                ? item.specialistId.profileImage.imageUrl
                                                : url + item.specialistId?.profileImage?.imageUrl
                                            }
                                            alt={item.specialistId.name}
                                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-700">{item.specialistId.name}</p>
                                            <p className="text-xs text-gray-500">{item.specialistId.email}</p>
                                        </div>
                                    </div>

                                </td>

                                {/* Date */}
                                <td className="py-3 px-4 text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>

                                {/* Status */}
                                <td className="py-3 px-4 capitalize">
                                    <span className={`px-2 py-1 rounded-full text-sm font-medium
                                        ${item.status === 'approved' ? 'bg-green-100 text-green-700' : ''}
                                        ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                                        ${item.status === 'rejected' ? 'bg-red-100 text-red-700' : ''}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="py-3 px-4 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleAccept(item._HireSpecialistRequestToAdminId)}
                                        className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-3 py-1 rounded-md text-sm"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleDecline(item._HireSpecialistRequestToAdminId)}
                                        className="bg-red-500 hover:bg-red-600 transition-colors text-white px-3 py-1 rounded-md text-sm"
                                    >
                                        Decline
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No requests found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-2 mt-5">
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={page <= 1}
                    onClick={() => setPage(prev => prev - 1)}
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx}
                        className={`px-3 py-1 border rounded ${page === idx + 1 ? 'bg-red-600 text-white' : 'bg-white'}`}
                        onClick={() => setPage(idx + 1)}
                    >
                        {idx + 1}
                    </button>
                ))}

                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={page >= totalPages}
                    onClick={() => setPage(prev => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Page;
