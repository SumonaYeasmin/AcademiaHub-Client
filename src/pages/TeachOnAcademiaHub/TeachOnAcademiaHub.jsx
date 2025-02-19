import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const TeachOnAcademiaHub = () => {
  const {
    register, reset,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { user } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()

  const { data: userData = {}, refetch } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      // console.log('response data', res.data);
      return res.data;
    }
  });

  const onSubmit = async (data) => {
    // const image = data.image[0];
    // console.log(image);
    // console.log('data is', data);

    try {
      // Upload the image
      // const formData = new FormData();
      // formData.append("image", image);
      // const res = await axiosPublic.post(image_hosting_api, formData, {
      //   headers: { "content-type": "multipart/form-data" },
      // });
      // const photoURL = res.data.data.display_url;
      // console.log(photoURL);

      // Create teacher request payload
      const teacherInfo = {
        name: data.name,
        photoURL: user?.photoURL,
        email: data.email,
        experience: data.experience,
        title: data.title,
        category: data.category,
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
        reset();
        navigate(location?.state ? location?.state : '/');
      }
    }
    catch (error) {
      // console.error("Error occurred:", error);
      Swal.fire({
        position: "top",
        icon: "error",
        title: error.response?.data?.message || "Failed to submit request. Please try again later.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>TeachOnAcademiaHub || AcademiaHub</title>
      </Helmet>
      {userData.role === "Teacher" ? (
        <div className="flex justify-center items-center container mx-auto my-28 p-2 ">

          <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center border border-2 ">

            <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-gray-800 mb-4">
              Congratulations!
            </h1>
            <p className="text-gray-600 mb-6 md:text-lg 2xl:text-xl">
              We are excited to have you onboard as part of our esteemed educators' community.
              Share your knowledge, inspire students, and make a difference in their learning journey!"
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md my-16 border"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Become a Teacher on Academia Hub
          </h1>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text"
              {...register("name", { required: true })}
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
             {errors.name && <span className="text-red-600">name is required</span>}
          </div>

          {/* <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Profile Image
            </label>
            <input
              type="file"
              id="image"
              {...register("image", { required: true })}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

            />{errors.image && <span className="text-red-600">image is required</span>}
          </div> */}

            <label className="block text-gray-700 font-bold mb-2">Email & Image</label>
          <div className="mb-4 flex justify-center items-center gap-2">
            <input
              defaultValue={user?.email}
              readOnly
              {...register("email", { required: true })}
              id="email"
              className="w-full cursor-not-allowed p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          <div className="rounded-full">
            <img className="rounded-full w-16 h-16" src={user?.photoURL} alt="" />
          </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Experience</label>
            <select
              defaultValue=""
              {...register("experience", { required: true })}

              id="experience"
              className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white"

            >
              <option disabled value="">
                Select Experience
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Experienced">Experienced</option>
            </select>
            {errors.experience && <span className="text-red-600">experience is required</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter Your Title"
              {...register("title", { required: true })}

              id="title"
              className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white"

            /> {errors.title && <span className="text-red-600">title is required</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Category</label>
            <select
              defaultValue=""
              {...register("category", { required: true })}
              id="category"
              className="w-full p-3 border border-gray-300 rounded-lg text-black bg-white"

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
            {errors.category && <span className="text-red-600">category is required</span>}
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
