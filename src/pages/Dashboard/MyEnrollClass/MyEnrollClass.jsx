import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const MyEnrollClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const itemsPerPage = 10; // Number of items per page

    const { data: enrollClasse = [] } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            console.log(res.data);
            return res.data;
        },
    });

    // Calculate pagination
    const totalItems = enrollClasse.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = enrollClasse.slice(startIndex, startIndex + itemsPerPage);

    // Change Page
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <Helmet>
                <title>MyEnrollClass || AcademiaHub</title>
            </Helmet>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
                {currentItems.map((classItem) => (
                    <div
                        key={classItem._id}
                        className="bg-white shadow-lg p-2 rounded-lg overflow-hidden transition-transform transform"
                    >
                        <img
                            src={classItem.photoURL}
                            alt={classItem.title}
                            className="w-full h-52 object-cover rounded-md"
                        />
                        <h2 className="text-lg font-bold text-gray-800 mb-2">{classItem.title}</h2>
                        <p className="text-gray-600 mb-4">
                            Posted by: <span className="font-medium">{classItem.teacherEmail}</span>
                        </p>
                        <Link
                            to={`/dashboard/myenroll-class/${classItem._id}`}
                            state={{ teacherEmail: classItem.teacherEmail, title: classItem.title }}
                        >
                            <button className="btn bg-teal-600 text-white rounded-md hover:bg-blue-700">
                                Continue
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            {
                currentItems.length > 0 ? <>
                    <div className="flex justify-center items-center mt-6 border-2  bg-teal-400">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`btn mr-2 ${currentPage === 1 ? "cursor-not-allowed" : "bg-teal-600 text-white"}`}
                        >
                            Previous
                        </button>
                        <div className="flex space-x-2">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToPage(index + 1)}
                                    className={`btn ${currentPage === index + 1 ? "bg-teal-600 text-white" : "bg-teal-600 text-white opacity-50"}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`btn ml-2 ${currentPage === totalPages ? "cursor-not-allowed" : "bg-teal-600 text-white"}`}
                        >
                            Next
                        </button>
                    </div>
                </> :
                    <h1 className="text-lg font-medium text-center text-red-500 my-10">No Class Enrolled</h1>
            }

        </div>
    );
};

export default MyEnrollClass;
