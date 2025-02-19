import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Pagination logic
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = users.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="p-4 text-black">
      <Helmet>
        <title>Users || AcademiaHub</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4 text-center">Users List</h1>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm md:text-base">
          <thead>
            <tr className="text-base md:text-lg text-black">
              <th className="bg-gray-100">SI No</th>
              <th className="bg-gray-100">Image</th>
              <th className="bg-gray-100">User Name</th>
              <th className="bg-gray-100">Email</th>
              <th className="bg-gray-100">Role</th>
              <th className="bg-gray-100">Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, index) => (
              <tr key={user._id}>
                <th>{startIndex + index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={user.photoURL} alt={user.name} />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    disabled={user.role === "Admin"}
                    className={`px-2 py-2 rounded-md bg-green-400 text-black hover:text-white hover:bg-green-700 ${
                      user.role === "Admin" && "cursor-not-allowed bg-opacity-50"
                    }`}
                    onClick={() => handleMakeAdmin(user)}
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 border-2  bg-teal-400">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`btn mr-2 ${
            currentPage === 1 ? " cursor-not-allowed" : "bg-teal-600 text-white"
          }`}
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`btn ${
                currentPage === index + 1 ? "bg-teal-600 text-white" : "bg-teal-600 text-white opacity-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`btn ml-2 ${
            currentPage === totalPages ? " cursor-not-allowed" : "bg-teal-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
