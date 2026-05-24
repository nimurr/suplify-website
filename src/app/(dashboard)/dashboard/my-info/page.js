'use client';
import React, { useState } from 'react';
import { Modal, Button, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCreateMyDocumanMutation, useDeleteMyDocumanMutation, useGetMyDocumanQuery } from '@/redux/fetures/information/myDocuman';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineDeleteForever } from 'react-icons/md';

const Page = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5); // items per page

    const { data, error, isLoading, refetch } = useGetMyDocumanQuery({ page, limit });
    const fullData = data?.data?.attributes?.results || [];
    const totalPages = data?.data?.attributes?.totalPages || 1;

    const [createMyDocuman] = useCreateMyDocumanMutation();

    const [deleteMyDocuman] = useDeleteMyDocumanMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState('');
    const [fileList, setFileList] = useState([]);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('title', text);
            fileList.forEach((file) => formData.append('attachments', file.originFileObj));

            const response = await createMyDocuman(formData).unwrap();
            console.log('Response:', response);
            toast.success('Document uploaded successfully!');
            setIsModalOpen(false);
            setText('');
            setFileList([]);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to upload document.');
        }
    };

    const handleUploadChange = ({ fileList }) => setFileList(fileList);


    const handledeleteMyDocuman = async (id) => {
        try {
            const response = await deleteMyDocuman(id).unwrap();
            console.log('Delete Response:', response);
            refetch();
            toast.success('Document deleted successfully!');
        } catch (error) {
            console.error('Error deleting document:', error);
            toast.error('Failed to delete document.');
        }
    };

    return (
        <div className="mx-auto p-4">
            <Toaster />
            <div className="flex items-center justify-between mb-4">
                <h1 className='text-2xl font-bold mb-4'>My Documents</h1>
                <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded" onClick={showModal}>Add Document</button>
            </div>

            {/* Modal */}
            <Modal
                title="Upload Your Document"
                open={isModalOpen}
                onCancel={handleCancel}
                onOk={handleSubmit}
                okText="Submit"
            >
                <div className="flex flex-col gap-4">
                    <Input.TextArea
                        rows={4}
                        placeholder="Enter your text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false} // prevent auto upload
                    >
                        {fileList.length < 1 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </div>
            </Modal>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {fullData.length > 0 ? (
                    fullData.map((doc) => (
                        <div key={doc._ClientDocumentsId} className="border rounded-lg shadow p-4 flex flex-col items-center gap-2">
                            <div className="self-end cursor-pointer text-red-500 " onClick={() => handledeleteMyDocuman(doc._ClientDocumentsId)}>
                                <MdOutlineDeleteForever size={30} />
                            </div>
                            <img
                                src={doc.attachments[0]?.attachment || '/images/placeholder.png'}
                                alt={doc.title}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h3 className="font-semibold text-center">{doc.title}</h3>
                            <p className="text-xs text-gray-500">Created: {new Date(doc.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className='text-center text-red-600 col-span-full'>No documents found.</p>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-4">
                    <Button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="disabled:opacity-50"
                    >
                        Previous
                    </Button>
                    <span className="font-semibold">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="disabled:opacity-50"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Page;