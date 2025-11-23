'use client'
import { useCreateInformationVideoMutation, useDeleteInformationVideoMutation, useGetAllInformationVideoQuery } from '@/redux/fetures/Specialist/informationVideo';
import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { CiSearch } from 'react-icons/ci';
import { FaRegEdit } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdOutlineDeleteForever } from 'react-icons/md';

const Page = () => {
    const { data, isLoading: loading, refetch } = useGetAllInformationVideoQuery();
    const fullData = data?.data?.attributes?.results;

    // State to control modal visibility and form fields
    const [isModalOpen, setModalOpen] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [video, setVideo] = useState(null);
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    // Reference to modal content to detect clicks inside
    const modalContentRef = useRef();

    // Function to open and close the modal
    const toggleModal = () => setModalOpen(!isModalOpen);

    // Function to close the modal if clicked outside
    const handleClickOutside = (e) => {
        if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
            setModalOpen(false);
        }
    };

    // Adding the event listener for clicks outside of modal when it is open
    React.useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isModalOpen]);

    // Handle file uploads
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
        }
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
        }
    };

    const [createInformationVideo, { isLoading }] = useCreateInformationVideoMutation();

    // Handle form submission
    const handleSubmitCreateSession = async (e) => {
        e.preventDefault(); // Prevent form submission from refreshing the page

        try {
            // Create a FormData object
            const formData = new FormData();
            formData.append("thumbnail", photo); // field name must match backend: 'thumbnail'
            formData.append("video", video);     // field name must match backend: 'video'
            formData.append("videoLink", link || ""); // optional
            formData.append("title", title || "");
            formData.append("description", description || "");

            // Send form data
            const response = await createInformationVideo(formData); // your API call
            console.log(response);
            refetch();

            if (response?.error?.data?.message) {
                toast.error(response?.error?.data?.message);
                refetch();
            }
            if (response?.data?.message) {
                toast.success(response?.data?.message);
                setModalOpen(false); // Close modal
                refetch();
            }
        } catch (error) {
            console.log(error?.data);
            toast.error(error?.data?.message || "Something went wrong!");
        }
    };



    // Filter the full data based on search term
    const filteredData = fullData?.filter((item) => {
        const itemTitle = item?.title?.toLowerCase() || '';
        const itemDescription = item?.description?.toLowerCase() || '';
        const searchQuery = searchTerm.toLowerCase();
        return itemTitle.includes(searchQuery) || itemDescription.includes(searchQuery);
    });

    console.log(filteredData);

    const [deleteInformationVideo] = useDeleteInformationVideoMutation();

    const handleDelete = async (id) => {

        console.log(id);
        try {
            const res = await deleteInformationVideo(id).unwrap();
            console.log(res);
            if (res?.code == 200) {
                toast.success(res?.message || "Deleted successfully!");
                refetch();
            }
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete");
        }


    }

    return (
        <div className='sm:p-0 p-4'>
            <div className='flex flex-wrap gap-5  items-center justify-between my-10'>
                <h2 className='text-4xl font-semibold'>Informational Video</h2>
                <div className='flex items-center gap-5'>
                    <label className='relative' htmlFor="">
                        <input
                            type="text"
                            placeholder='Search Here ...'
                            className='py-2 px-3 border-2 pr-8 border-gray-300 rounded-xl focus:border-blue-300 outline-none'
                            value={searchTerm} // Bind the value of input to searchTerm state
                            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state
                        />
                        <CiSearch className='absolute top-3 right-3 text-xl' />
                    </label>
                    <button
                        className='py-3 px-8 bg-[#cc2124] text-white rounded-xl flex items-center gap-2'
                        onClick={toggleModal}
                    >
                        <IoIosAddCircleOutline size={24} /> Create New
                    </button>
                </div>
            </div>

            {
                loading && <h2 className='text-2xl font-semibold text-center'>Loading...</h2>
            }

            <div className='grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 my-5 gap-5'>
                {filteredData?.map((item, index) => {
                    return (
                        <div onClick={() => handleEdit(item)} className='border-2 border-gray-300 rounded-xl p-3' key={index}>

                            {item?.videoLink && (
                                // use iframe to display video 
                                <div className='w-full'>
                                    <iframe className='w-full' width='300' height="200"
                                        src={`${item?.videoLink}`}
                                        title="YouTube video player" frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </div>
                            )}
                            <div>
                                {item?.video?.length > 0 && item?.thumbnail?.length > 0 && (
                                    <video
                                        className="w-full h-full rounded-lg"
                                        controls
                                        // autoPlay
                                        muted
                                        poster={item.thumbnail[0].attachment} // Thumbnail image
                                    >
                                        {/* Map through the video array correctly */}
                                        {item.video.map((videoObj, index) => (
                                            <source key={index} src={videoObj.attachment} type="video/mp4" />
                                        ))}

                                        {/* Fallback in case the first video is needed */}
                                        <source src={item.video[0].attachment} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                            <div className='mt-5 space-y-3'>
                                <h2 className='text-2xl font-semibold'>{item?.title}</h2>
                                <p className='text-gray-500'>
                                    {item?.description?.slice(0, 100) + '...'}
                                </p>
                            </div>
                            <div className='flex items-center justify-end gap-3 mt-2'>
                                <button onClick={() => handleDelete(item?._informationVideoId)} className='h-10 w-10 cursor-pointer bg-red-500 flex items-center justify-center rounded-lg text-white'>
                                    <MdOutlineDeleteForever className='text-2xl' />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    onClick={handleClickOutside}
                    className="fixed z-[999] inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
                >
                    <div
                        ref={modalContentRef} // Reference to modal content
                        className="bg-white z-[9999] p-8 rounded-lg max-w-md w-full !min-w-[650px]"
                    >
                        <h3 className="text-xl font-semibold mb-5">Create Session</h3>

                        <form onSubmit={handleSubmitCreateSession}>
                            {/* Photo Upload */}
                            <div className="mb-5">
                                <label className="block mb-2">Photo</label>
                                <input
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg"
                                    className="border-2 border-gray-300 p-4 w-full text-center rounded-xl cursor-pointer"
                                    onChange={handlePhotoUpload}
                                />
                                <p className="text-sm text-gray-500">PNG, JPG, or JPEG up to 10MB</p>
                            </div>

                            {/* Video Upload */}
                            <div className="mb-5">
                                <label className="block mb-2">Video</label>
                                <input
                                    type="file"
                                    accept="video/mp4, video/mov, video/avi"
                                    className="border-2 border-gray-300 p-4 w-full text-center rounded-xl cursor-pointer"
                                    onChange={handleVideoUpload}
                                />
                                <p className="text-sm text-gray-500">MP4, MOV, or AVI up to 10MB</p>
                            </div>
                            {/* Link Input */}

                            {/* <p className="text-center text-gray-500 mb-5">OR</p>

                            <div className="mb-5">
                                <label className="block mb-2">Video Link</label>
                                <input
                                    type="text"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    placeholder="Video Link"
                                    className="py-2 px-3 border-2 border-gray-300 rounded-xl w-full"
                                />
                            </div> */}

                            {/* Title Input */}
                            <div className="mb-5">
                                <label className="block mb-2">Title *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Push up"
                                    className="py-2 px-3 border-2 border-gray-300 rounded-xl w-full"
                                />
                            </div>

                            {/* Description Input */}
                            <div className="mb-5">
                                <label className="block mb-2">Description *</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Type here..."
                                    className="py-2 px-3 border-2 border-gray-300 rounded-xl w-full"
                                    rows="4"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="bg-gray-300 py-2 px-6 rounded-xl text-gray-700"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>
                                <button type='submit' className="bg-red-700 py-2 px-6 rounded-xl text-white">
                                    Create{isLoading ? 'ing...' : ' Info Video'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;