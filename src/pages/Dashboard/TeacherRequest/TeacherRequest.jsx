import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: teachers = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teachers");
      return res.data;
    },
  });

  // Pagination logic
  const totalItems = teachers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = teachers.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle actions (approve, reject, request again)
  const handleApprove = async (email) => {
    try {
      const res = await axiosSecure.patch(`/teachers/approve/${email}`, {
        status: "Accepted",
        role: "Teacher",
      });
      // console.log(res.data);
      if (res.data.resultT.modifiedCount || res.data.resultU.modifiedCount > 0) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Teacher approved successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Failed to Approve teacher!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleReject = async (email) => {
    try {
      const res = await axiosSecure.patch(`/teachers/reject/${email}`, {
        status: "Rejected",
        role: "Student",
      });
      // console.log(res.data);
      if (res.data.resultT.modifiedCount || res.data.resultU.modifiedCount > 0) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Rejected! Teacher request has been rejected!",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Failed to reject teacher request!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleRequestAgain = async (teacherId) => {
    try {
      const res = await axiosSecure.patch(`/teachers/request-again/${teacherId}`, {
        status: "Pending",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Status set to Pending!",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Failed to reset status!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>TeacherRequest || AcademiaHub</title>
      </Helmet>

      <div className="overflow-x-auto">

        <table className="table text-base">
          {/* Table Header */}
          <thead>
            <tr className="text-lg">
              <th>SI No</th>
              <th>Name</th>
              <th>Image</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((teacher, index) => (
              <tr key={teacher._id}>
                <th>{startIndex + index + 1}</th>
                <td>{teacher.name}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={teacher.photoURL} alt="img.." />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{teacher.experience}</td>
                <td>{teacher.title}</td>
                <td>{teacher.category}</td>
                <td>
                  <button
                    className={`${teacher.status === "Accepted" && "bg-green-200"} ${teacher.status === "Rejected" && "bg-red-300"
                      } ${teacher.status === "Pending" && "bg-yellow-200"} px-2 py-1 rounded-full`}
                  >
                    {teacher.status}
                  </button>
                </td>
                <th className="flex gap-1">
                  <button
                    className={`btn bg-green-400 ${teacher.status === "Accepted" && "cursor-not-allowed bg-opacity-30"
                      }`}
                    onClick={() => handleApprove(teacher.email)}
                    disabled={teacher.status === "Rejected"}
                  >
                    Approve
                  </button>
                  <button
                    className="btn bg-red-500"
                    onClick={() => handleReject(teacher.email)}
                    disabled={teacher.status === "Rejected"}
                  >
                    Reject
                  </button>
                  {teacher.status === "Rejected" && (
                    <button
                      className="btn bg-blue-400"
                      onClick={() => handleRequestAgain(teacher._id)}
                    >
                      Request to Another
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Pagination Controls */}
      {
        currentItems.length > 0 ? <>
          <div className="flex justify-center items-center mt-6 border-2  bg-teal-400">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`btn mr-2 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-teal-600 text-white"
                }`}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  className={`btn ${currentPage === index + 1 ? "bg-teal-600 text-white" : "bg-teal-600 text-white opacity-50"
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`btn ml-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-teal-600 text-white"
                }`}
            >
              Next
            </button>
          </div>
        </> :
          <h1 className="text-lg font-medium text-center my-10">No Teacher Request</h1>
      }
    </div>

  );
};

export default TeacherRequest;


