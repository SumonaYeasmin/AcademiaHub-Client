import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const AllClasses = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState(null);
    const itemsPerPage = 10;

    const { data: classes = [] } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            const res = await axiosSecure.get("/classes");
            return res.data.filter(classItem => classItem.status === 'Accepted');
        },
    });

    const shuffledClasses = [...classes].sort(() => Math.random() - 0.5);
    const sortedClasses = sortOrder ? [...classes].sort((a, b) => 
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
    ) : shuffledClasses;

    const totalItems = sortedClasses.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sortedClasses.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        setCurrentPage(1);
    };

    return (
        <div className="p-5 container mx-auto">
            <Helmet>
                <title>AllClasses || AcademiaHub</title>
            </Helmet>
            <h1 className="text-2xl font-bold mb-3 mt-10">Total Classes: {classes.length}</h1>

            <div className="flex justify-end mb-4 space-x-2">
                <button
                    onClick={() => handleSortChange("asc")}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        sortOrder === "asc" ? "bg-blue-500 text-white border-blue-500" : "bg-white text-black font-medium border-blue-500 hover:bg-blue-500 hover:text-white"
                    }`}
                >
                    Sort by Price: Low to High
                </button>
                <button
                    onClick={() => handleSortChange("desc")}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        sortOrder === "desc" ? "bg-blue-500 text-white border-blue-500" : "bg-white text-black font-medium border-blue-500 hover:bg-blue-500 hover:text-white"
                    }`}
                >
                    Sort by Price: High to Low
                </button>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {currentItems.map((classItem) => (
                    <div key={classItem._id} className="w-full rounded-lg shadow-lg p-2">
                        <img
                            src={classItem.photoURL}
                            alt="Class Image"
                            className="w-full h-52 md:h-72 object-cover rounded-lg"
                        />
                        <div className="p-5 bg-white rounded-b-lg">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">{classItem.title}</h2>
                            <p className="text-gray-600 text-lg font-medium">
                                Posted by: <span className="font-medium italic">{classItem.name}</span>
                            </p>
                            <p className="text-gray-700 mb-2">
                                <span className="text-lg font-medium">Description:</span> {classItem.description}
                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-600 mb-4 font-medium text-lg">
                                    <span className="text-lg font-medium">Total Enrolment:</span> {classItem.totalEnrolment}
                                </p>
                                <p className="font-semibold text-blue-600 mb-2">Price: ${classItem.price}</p>
                            </div>
                            <Link to={`/classes/${classItem._id}`} state={{ from: classItem }}>
                                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all">
                                    Enroll
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {currentItems.length > 0 ? (
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
            )}
        </div>
    );
};

export default AllClasses;
