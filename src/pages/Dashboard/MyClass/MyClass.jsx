// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import useAuth from "../../../hooks/useAuth";

// const MyClass = () => {
//     const {user} = useAuth()
//     const axiosSecure = useAxiosSecure();
//     const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
//     const [currentClass, setCurrentClass] = useState(null); // Current class data for the modal
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     const { data: classes = [], refetch } = useQuery({
//         queryKey: ["classes", user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/classes/${user?.email}`);
//             return res.data;
//         },
//     });


//     // Calculate pagination
//     const totalItems = classes.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const currentItems = classes.slice(startIndex, startIndex + itemsPerPage);

//     // Change Page
//     const goToPage = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     // Handle delete button
//     const handleDeleteBtn = (classItem) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/classes/${classItem._id}`).then((res) => {
//                     if (res.data.deletedCount > 0) {
//                         refetch();
//                         Swal.fire({
//                             title: "Deleted!",
//                             text: "Your file has been deleted.",
//                             icon: "success",
//                         });
//                     }
//                 });
//             }
//         });
//     };

//     // Handle update button
//     const handleUpdated = (classItem) => {
//         setCurrentClass(classItem); // Set the class data to update
//         setIsModalOpen(true); // Open the modal
//     };

//     const handleModalClose = () => {
//         setIsModalOpen(false); 
//         setCurrentClass(null); 
//     };

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         const updatedData = {
//             title: event.target.title.value,
//             price: event.target.price.value,
//             description: event.target.description.value,
//         };
//         axiosSecure.patch(`/classes/${currentClass._id}`, updatedData)
//             .then((res) => {
//                 if (res.data.modifiedCount > 0) {
//                     Swal.fire({
//                         title: "Updated!",
//                         text: "Class updated successfully.",
//                         icon: "success",
//                     });
//                     refetch();
//                     handleModalClose();
//                 }
//             });
//     };

//     return (
//         <div className="container mx-auto my-10 px-4">
//             <Helmet>
//                 <title>MyClass || AcademiaHub</title>
//             </Helmet>
//             <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
//                 My Classes
//             </h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {currentItems.map((classItem) => (
//                     <div
//                         key={classItem._id}
//                         className="bg-white shadow-md rounded-lg p-2 flex flex-col"
//                     >
//                         <img
//                             src={classItem.photoURL}
//                             alt="Class"
//                             className="w-full h-48 object-cover rounded-lg mb-4"
//                         />
//                         <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                             {classItem.title}
//                         </h2>
//                         <p className="text-gray-600 mb-1">
//                             <span className="font-medium">Teacher Name: </span>
//                             {classItem.name}
//                         </p>
//                         <p className="text-gray-600 mb-1">
//                             <span className="font-medium">Email: </span>
//                             {classItem.email}
//                         </p>
//                         <p className="text-gray-600 mb-1">
//                             <span className="font-medium">Price: </span>${classItem.price}
//                         </p>
//                         <p className="text-gray-600 mb-4">
//                             <span className="font-medium">Description: </span>
//                             {classItem.description}
//                         </p>
//                         <p className="text-sm text-yellow-500 font-medium mb-4">
//                             Status: {classItem.status || "Pending"}
//                         </p>
//                         <div className="flex justify-between gap-1">
//                             <button
//                                 onClick={() => handleUpdated(classItem)}
//                                 className="px-2 text-sm lg:text-base lg:px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
//                             >
//                                 Update
//                             </button>
//                             <button
//                                 onClick={() => handleDeleteBtn(classItem)}
//                                 className="px-2 text-sm lg:text-base lg:px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
//                             >
//                                 Delete
//                             </button>
//                             <Link to={`/dashboard/my-class/${classItem._id}`}>
//                                 <button
//                                     disabled={classItem.status !== 'Accepted'}
//                                     className={`px-2 text-sm lg:text-base lg:px-2 py-2 rounded-md transition-all ${classItem.status === 'Accepted'? 'bg-green-500 hover:bg-green-600 text-white': 'bg-gray-300 cursor-not-allowed'}`}
//                                 >See Details
//                                 </button>
//                             </Link>

//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Pagination */}
//             {/* <div className="flex justify-center items-center mt-6 border-2  bg-teal-400">
//                 <button
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`btn mr-2 ${currentPage === 1 ? "cursor-not-allowed" : "bg-teal-600 text-white"}`}>
//                     Previous
//                 </button>
//                 {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => handlePageChange(index + 1)}
//                         className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-400`}>
//                         {index + 1}
//                     </button>
//                 ))}
//                 <button
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50">
//                     Next
//                 </button>
//             </div> */}


// <div className="flex justify-center items-center mt-6 border-2  bg-teal-400">
//                 <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`btn mr-2 ${currentPage === 1 ? "cursor-not-allowed" : "bg-teal-600 text-white"}`}
//                 >
//                     Previous
//                 </button>
//                 <div className="flex space-x-2">
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => goToPage(index + 1)}
//                             className={`btn ${currentPage === index + 1 ? "bg-teal-600 text-white" : "bg-teal-600 text-white opacity-50"}`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                 </div>
//                 <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`btn ml-2 ${currentPage === totalPages ? "cursor-not-allowed" : "bg-teal-600 text-white"}`}
//                 >
//                     Next
//                 </button>
//             </div>

//             {/* Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
//                         <h2 className="text-xl font-bold mb-4">Update Class</h2>
//                         <form onSubmit={handleFormSubmit}>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 font-medium mb-1">
//                                     Title
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     defaultValue={currentClass?.title}
//                                     className="w-full border border-gray-300 rounded-md p-2"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 font-medium mb-1">
//                                     Price
//                                 </label>
//                                 <input
//                                     type="number"
//                                     name="price"
//                                     defaultValue={currentClass?.price}
//                                     className="w-full border border-gray-300 rounded-md p-2"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-gray-700 font-medium mb-1">
//                                     Description
//                                 </label>
//                                 <textarea
//                                     name="description"
//                                     defaultValue={currentClass?.description}
//                                     className="w-full border border-gray-300 rounded-md p-2"
//                                     rows="4"
//                                 ></textarea>
//                             </div>
//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     onClick={handleModalClose}
//                                     className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyClass;



import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";

const MyClass = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [currentClass, setCurrentClass] = useState(null); // Current class data for the modal
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: classes = [], refetch } = useQuery({
        queryKey: ["classes", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${user?.email}`);
            return res.data;
        },
    });
    // console.log(classes);

    // Calculate pagination
    const totalItems = classes.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = classes.slice(startIndex, startIndex + itemsPerPage);

    // Change Page
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Handle delete button
    const handleDeleteBtn = (classItem) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/classes/${classItem._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    // Handle update button
    const handleUpdated = (classItem) => {
        setCurrentClass(classItem); // Set the class data to update
        setIsModalOpen(true); // Open the modal
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setCurrentClass(null);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const updatedData = {
            title: event.target.title.value,
            price: event.target.price.value,
            description: event.target.description.value,
        };
        axiosSecure.patch(`/classes/${currentClass._id}`, updatedData).then((res) => {
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: "Class updated successfully.",
                    icon: "success",
                });
                refetch();
                handleModalClose();
            }
        });
    };

    return (
        <div className="container mx-auto my-10 px-4">
            <Helmet>
                <title>MyClass || AcademiaHub</title>
            </Helmet>
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
                My Classes
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentItems.map((classItem) => (
                    <div
                        key={classItem._id}
                        className="bg-white shadow-md rounded-lg p-2 flex flex-col"
                    >
                        <img
                            src={classItem.photoURL}
                            alt="Class"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {classItem.title}
                        </h2>
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Teacher Name: </span>
                            {classItem.name}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Email: </span>
                            {classItem.email}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Price: </span>${classItem.price}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <span className="font-medium">Description: </span>
                            {classItem.description}
                        </p>
                        <p className="text-sm text-yellow-500 font-medium mb-4">
                            Status: {classItem.status || "Pending"}
                        </p>
                        <div className="flex justify-between gap-1">
                            <button
                                onClick={() => handleUpdated(classItem)}
                                className="px-2 text-sm lg:text-base lg:px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDeleteBtn(classItem)}
                                className="px-2 text-sm lg:text-base lg:px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                            >
                                Delete
                            </button>
                            <Link
                                to={`/dashboard/my-class/${classItem._id}`}
                                state={{ from: classItem.totalEnrolment }}
                            >
                                <button
                                    disabled={classItem.status !== 'Accepted'}
                                    className={`px-2 text-sm lg:text-base lg:px-2 py-2 rounded-md transition-all ${classItem.status === 'Accepted' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 cursor-not-allowed'}`}
                                >See Details
                                </button>
                            </Link>

                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
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
                </> : <h1 className="text-lg font-medium text-center my-10 text-red-500">No Class availabled</h1>
            }

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
                        <h2 className="text-xl font-bold mb-4">Update Class</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={currentClass?.title}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    defaultValue={currentClass?.price}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    defaultValue={currentClass?.description}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    rows="4"
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyClass;
