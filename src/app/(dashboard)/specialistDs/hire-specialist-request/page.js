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
    const limit = 10;

    const { data, isLoading, refetch } = useGetAllHireSpecialistRequestsQuery({ page, limit });
    const [updateStatus] = useUpdateHireSpeccialistStatusMutation();

    const totalPages = data?.data?.attributes?.totalPages || 1;
    const results = data?.data?.attributes?.results || [];

    if (isLoading) {
        return <p className="text-center py-20">Loading...</p>;
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
        <div className="p-4">
            <div className="overflow-hidden border border-gray-300 rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th className="py-3 px-4">Patient</th>
                            <th className="py-3 px-4">Specialist</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                        {results.map((item) => (
                            <tr key={item._HireSpecialistRequestToAdminId}>
                                <td className="py-2 px-4 flex items-center gap-2">
                                    <img
                                        src={item.patientId?.profileImage?.profileImage?.includes('amazonaws') ? item.patientId?.profileImage?.imageUrl : url + item.patientId?.profileImage?.imageUrl}
                                        alt={item.patientId.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div>
                                        <p>{item.patientId.name}</p>
                                        <p className="text-xs text-gray-500">{item.patientId.email}</p>
                                    </div>
                                </td>
                                <td >
                                    <div className="py-2 px-4 flex items-center gap-2">
                                        <img
                                            src={item.patientId?.profileImage?.profileImage?.includes('amazonaws') ? item.patientId?.profileImage?.imageUrl : url + item.patientId?.profileImage?.imageUrl}
                                            alt={item.specialistId.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <div>
                                            <p>{item.specialistId.name}</p>
                                            <p className="text-xs text-gray-500">{item.specialistId.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-2 px-4">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 capitalize">{item.status}</td>
                                <td className="py-2 px-4 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleAccept(item._HireSpecialistRequestToAdminId)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleDecline(item._HireSpecialistRequestToAdminId)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Decline
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-4 gap-2">
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={page <= 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        key={idx}
                        className={`px-3 py-1 border rounded ${page === idx + 1 ? 'bg-red-600 text-white' : ''
                            }`}
                        onClick={() => setPage(idx + 1)}
                    >
                        {idx + 1}
                    </button>
                ))}
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    disabled={page >= totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Page;
