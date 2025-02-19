import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllClass = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of classes per page

  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

  // Pagination logic
  const totalItems = classes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = classes.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleApprove = async (classId) => {
    try {
      const res = await axiosSecure.patch(`/classes/approve/${classId}`, {
        status: "Accepted",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Class approved successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Failed to approve class!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleReject = async (classId) => {
    try {
      const res = await axiosSecure.patch(`/classes/reject/${classId}`, {
        status: "Rejected",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Class rejected successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      }
    } catch {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Failed to reject class!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleProgress = () => {
    // console.log("Progress button clicked");
  };

  return (
    <div>
      <Helmet>
        <title>AllClass || AcademiaHub</title>
      </Helmet>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-black">
        All Class List
      </h2>

      <div className="overflow-x-auto text-black">
        <table className="table w-full text-sm md:text-base">
          <thead>
            <tr className="text-base md:text-lg text-black">
              <th>SI No</th>
              <th>Class Title</th>
              <th>Description</th>
              <th>Instructor Email</th>
              <th>Status</th>
              <th className="pl-5 md:pl-10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((classItem, index) => (
              <tr key={classItem._id}>
                <th>{startIndex + index + 1}</th>
                <td>{classItem.title}</td>
                <td>{classItem.description}</td>
                <td>{classItem.email}</td>
                <td>
                  <button
                    className={`${
                      classItem.status === "Accepted" && "bg-green-200"
                    } ${classItem.status === "Rejected" && "bg-red-300"} ${
                      classItem.status === "Pending" && "bg-yellow-200"
                    } px-2 py-1 rounded-full`}
                  >
                    {classItem.status}
                  </button>
                </td>
                <td>
                  <div className="flex items-center justify-around gap-2">
                    <button
                      onClick={() => handleApprove(classItem._id)}
                      disabled={classItem.status === "Accepted"}
                      className="btn bg-green-400 hover:bg-green-600 rounded-md text-black"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(classItem._id)}
                      disabled={classItem.status === "Rejected"}
                      className="btn btn-error "
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleProgress(classItem._id)}
                      className={`btn ${
                        classItem.status === "Accepted" && "btn-primary text-white"
                      }`}
                      disabled={classItem.status !== "Accepted"}
                    >
                      Progress
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {
           
            currentItems.length > 0 ? (
              <div className="flex justify-center items-center mt-6 border-2 bg-teal-400  rounded-lg">
                  <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-3 rounded-lg mr-2 ${
                          currentPage === 1 ? "cursor-not-allowed bg-teal-600 opacity-50 text-white" : "bg-teal-600 text-white border border-white"
                      }`}
                  >
                      Previous
                  </button>
                  <div className="flex space-x-2">
                      {Array.from({ length: totalPages }, (_, index) => (
                          <button
                              key={index}
                              onClick={() => goToPage(index + 1)}
                              className={`px-4 py-3 rounded-lg ${
                                  currentPage === index + 1 ? "bg-teal-600 text-white border border-white" : "bg-teal-500 text-white opacity-70"
                              }`}
                          >
                              {index + 1}
                          </button>
                      ))}
                  </div>
                  <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-3 rounded-lg ml-2 ${
                          currentPage === totalPages ? "cursor-not-allowed bg-teal-600 text-white opacity-50" : "bg-teal-600 text-white border border-white"
                      }`}
                  >
                      Next
                  </button>
              </div>
          ) : (
              <h1 className="text-lg font-medium text-center text-red-500 my-10">No Class Available</h1>
          )
      }
    </div>
  );
};

export default AllClass;
