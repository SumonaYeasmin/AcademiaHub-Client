


import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { useLocation, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";



const EnrollClassDetails = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  // console.log(location);
  const teacherEmail = location?.state?.teacherEmail;
  const title = location?.state?.title;
  // console.log(teacherEmail, title);
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);


  const { data: assignments = [], } = useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${teacherEmail}`);
      return res.data;
    },
  });

  const thirdExample = {
    size: 40,
    count: 5,
    isHalf: false,
    value: 4,
    color: "",
    activeColor: "red",
    onChange: newValue => {
      // console.log(`Example 3: new value is ${newValue}`);
      setRating(newValue);
    }
  };


  const {
    register, reset,
    handleSubmit,

    formState: { errors },
  } = useForm();


  // Handle TER submission
  const onSubmit = async (data) => {
    // console.log(data);

    const teachReportInfo = {
      description: data.description,
      rating: rating,
      title: title,
      photoURL: user.photoURL,
      name: user.displayName,



    }
    // console.log(teachReportInfo);

    const response = await axiosSecure.post('/teaching-evaluation', teachReportInfo)
    // console.log(response.data);
    try {
      if (response.data.insertedId) {
        // console.log("Added to mongoDB");
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Teaching Evaluation Report submitted successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        reset()
        setIsModalOpen(false);
      }
    }
    catch (error) {
      console.log('Error', error);
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
    <div>
      <Helmet>
        <title>EnrollClassDetails || AcademiaHub</title>
      </Helmet>

      <div className="p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Teaching Evaluation Report (TER)
        </button>
      </div>

      {/* Assignments Table */}
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border-b">Title</th>
                <th className="px-4 py-2 text-left border-b">Description</th>
                <th className="px-4 py-2 text-left border-b">Deadline</th>
                <th className="px-4 py-2 text-left border-b">Submission</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{assignment.title}</td>
                  <td className="px-4 py-2 border-b">{assignment.description}</td>
                  <td className="px-4 py-2 border-b">{assignment.deadline}</td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer w-full">
                        <textarea
                          className="textarea textarea-bordered "
                          rows="4"
                          placeholder="Write your assignment here..."
                        ></textarea>
                      </label>
                      <button

                        className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Submit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Teaching Evaluation Report */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Teaching Evaluation Report</h2>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Description Field */}
              <textarea
                className={`textarea textarea-bordered w-full mb-4 ${errors.description ? "border-red-500" : ""
                  }`}
                rows="4"
                placeholder="Write your feedback..."
                {...register("description", { required: "Feedback is required" })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}

              {/* Rating Field */}
              <div className="mb-4">
                <p className="mb-2">Rate the Teacher:</p>
                <ReactStars {...thirdExample} />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn bg-gray-300 text-black hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-blue-500 text-white hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
};

export default EnrollClassDetails;
