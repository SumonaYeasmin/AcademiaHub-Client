import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

function TeachOnAcademiaHub() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const experience = e.target.experience.value;
        const title = e.target.title.value;
        const category = e.target.category.value;
        // console.log(name,email,experience,title,category);


        const image = e.target.image.files[0];
        // console.log(image);
        const imageFile = { image };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        // console.log(res.data);
        const photoURL = res.data.data.display_url;
        console.log(photoURL);

        const teacherInfo = {
            name,
           photoURL,
            email,
            experience,
            title,
            category,
            status: "Pending"
        }
        // console.log(teacherInfo);

        const response = await axiosSecure.post('/teacher-requests', teacherInfo)
        // console.log(response.data);
        try {
            if (response.data.insertedId) {
                console.log("Added mongoDB");
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Request submitted successfully!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                form.reset()

            }
        }
        catch {
            // console.log('Error');
            Swal.fire({
                position: "top",
                icon: "error",
                title: "Failed to submit request. Please try again later.",
                showConfirmButton: false,
                timer: 2000,
            });
        }

    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input defaultValue={user?.displayName} readOnly name='name' id='name' className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image</label>
                <input type="file" id="image" name="image" accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                    defaultValue={user?.email}
                    readOnly name='email' id='email'
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Experience</label>
                <select
                    defaultValue='' name='experience' id='experience'
                    className="w-full p-3 border border-gray-300 rounded-lg" required
                >
                    <option disabled value="">Select Experience</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Experienced">Experienced</option>
                    <option value="Mid-level">Mid-level</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                    type="text"
                    placeholder="Title" name='title' id='title'
                    className="w-full p-3 border border-gray-300 rounded-lg" required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Category</label>
                <select
                    defaultValue='' name='category' id='category'
                    className="w-full p-3 border border-gray-300 rounded-lg" required
                >
                    <option disabled value="">Select Category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Content Writing">Content Writing</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
            >
                Submit for Review
            </button>
        </form>

    );
}

export default TeachOnAcademiaHub;
