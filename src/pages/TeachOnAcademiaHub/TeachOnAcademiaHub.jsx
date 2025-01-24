import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const TeachOnAcademiaHub =()=> {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()

  const { data: userData = {}, refetch } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      console.log('response data', res.data);
      return res.data;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const experience = form.experience.value;
    const title = form.title.value;
    const category = form.category.value;
    const image = form.image.files[0];

    try {
      // Upload the image
      const formData = new FormData();
      formData.append("image", image);
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      const photoURL = res.data.data.display_url;

      // Create teacher request payload
      const teacherInfo = {
        name,
        photoURL,
        email,
        experience,
        title,
        category,
        status: "Pending",
      };

      // Submit the teacher request
      const response = await axiosSecure.post("/teacher-requests", teacherInfo);
      if (response.data.insertedId) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Request submitted successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
        navigate(location?.state ? location?.state : '/');
      }
    } catch (error) {
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
    <>
      {userData.role === "Teacher" ? (
        <div className="flex justify-center items-center container mx-auto my-10 p-2">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Congratulations! 
            </h1>
            <p className="text-gray-600 mb-6">
            We are excited to have you onboard as part of our esteemed educators' community.
            Share your knowledge, inspire students, and make a difference in their learning journey!"
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md my-10"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Become a Teacher on Academia Hub
          </h1>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              defaultValue={user?.displayName}
              readOnly
              name="name"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Profile Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              defaultValue={user?.email}
              readOnly
              name="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Experience</label>
            <select
              defaultValue=""
              name="experience"
              id="experience"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option disabled value="">
                Select Experience
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Experienced">Experienced</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter Your Title"
              name="title"
              id="title"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Category</label>
            <select
              defaultValue=""
              name="category"
              id="category"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option disabled value="">
                Select Category
              </option>
              <option value="Web Development">Web Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Data Science">Data Science</option>
              <option value="Content Writing">Content Writing</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Submit for Review
          </button>
        </form>
      )}
    </>
  );
}

export default TeachOnAcademiaHub;
