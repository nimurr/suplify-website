'use client'
import { useCreateTrainingProgramMutation, useGetTrainingProgramByIdQuery, useUpdateTrainingProgramMutation } from '@/redux/fetures/Specialist/traningProgram';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineCancel } from 'react-icons/md';

const Page = () => {

    const { id } = useParams();

    const { data } = useGetTrainingProgramByIdQuery(id);
    const fullData = data?.data?.attributes;


    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [totalSessions, setTotalSessions] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(file);
        } else {
            alert("Failed to upload the file.");
        }
    }

    const handleRemovePhoto = () => {
        setPhoto(null); // Reset the photo state to remove the image
    }


    const [updateTraningProgram] = useUpdateTrainingProgramMutation();

    const handleSubmit = async () => {

        const formData = new FormData();
        if (photo) {
            formData.append("attachments", photo);
        }
        if (name) {
            formData.append("programName", name);
        }
        if (description) {
            formData.append("description", description);
        }
        if (totalSessions) {
            formData.append("totalSessionCount", totalSessions);
        }
        if (price) {
            formData.append("price", price);
        }
        if (duration) {
            formData.append("durationInMonths", duration);
        }

        try {
            const response = await updateTraningProgram({ id, data: formData }).unwrap();
            console.log(response);
            if (response?.code == 200) {
                toast.success(response?.message)

                photo = null;
                name = '';
                description = '';
                totalSessions = '';
                price = '';
                duration = '';
                window.location.href = `/specialistDs/program`
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message);
        }
        // Show success message 
    }

    return (
        <div className='lg:m-0 m-5' style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f7f7f7', borderRadius: '8px' }}>
            <Toaster />
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Edit Training Program</h1>

            {/* Photo Upload Section */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="photo" style={{ display: 'block', marginBottom: '8px' }}>Photo *</label>
                <input
                    type="file"
                    id="photo"
                    accept=".png,.jpg,.jpeg,.pdf"
                    onChange={handlePhotoUpload}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px' }}
                />
                {/* Display uploaded image */}
                {photo && (
                    <div className='relative' style={{ marginTop: '10px' }}>
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="Uploaded"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxWidth: '300px',
                                borderRadius: '8px',
                            }}
                        />
                        {/* Remove button */}
                        <button
                            onClick={handleRemovePhoto}
                            className='absolute top-2 left-2'
                            style={{
                                backgroundColor: 'red',
                                color: 'white',
                                padding: '5px',
                                borderRadius: '8px',
                                marginTop: '10px',
                                cursor: 'pointer',
                            }}
                        >
                            <MdOutlineCancel className='text-3xl' />
                        </button>
                    </div>
                )}
            </div>

            {/* Name Input */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>Name *</label>
                <input
                    type="text"
                    id="name"
                    defaultValue={fullData?.programName}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Gain chest"
                    style={{ padding: '10px', width: '100%', borderRadius: '8px' }}
                />
            </div>

            {/* Description Input */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: '8px' }}>Description *</label>
                <textarea
                    id="description"
                    defaultValue={fullData?.description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Lorem ipsum dolor sit amet consectetur..."
                    rows="4"
                    style={{ padding: '10px', width: '100%', borderRadius: '8px' }}
                />
            </div>

            {/* Total Sessions Input */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="totalSessions" style={{ display: 'block', marginBottom: '8px' }}>Total Sessions *</label>
                <input
                    type="number"
                    id="totalSessions"
                    defaultValue={fullData?.totalSessionCount}
                    onChange={(e) => setTotalSessions(e.target.value)}
                    min="1"
                    placeholder="Enter total sessions"
                    style={{ padding: '10px', width: '100%', borderRadius: '8px' }}
                />
            </div>

            {/* Price Input */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="price" style={{ display: 'block', marginBottom: '8px' }}>Price *</label>
                <input
                    type="number"
                    id="price"
                    defaultValue={fullData?.price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    placeholder="Enter price"
                    style={{ padding: '10px', width: '100%', borderRadius: '8px' }}
                />
            </div>

            {/* Duration Input */}
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="duration" style={{ display: 'block', marginBottom: '8px' }}>Duration *</label>
                <input
                    type="number"
                    id="duration"
                    defaultValue={fullData?.durationInMonths}
                    onChange={(e) => setDuration(e.target.value)}
                    min="1"
                    placeholder="Enter duration"
                    style={{ padding: '10px', width: '100%', borderRadius: '8px' }}
                />
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: '#ac0000',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default Page;