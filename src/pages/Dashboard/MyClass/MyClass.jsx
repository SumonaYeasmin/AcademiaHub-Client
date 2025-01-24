
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const MyClass = () => {
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
    const [currentClass, setCurrentClass] = useState(null); // Current class data for the modal;


    const { data: classes = [], refetch } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            const res = await axiosSecure.get("/classes");
            return res.data;
        },
    });

    // handle delete btn
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


    // handle update button
    const handleUpdated = (classItem) => {
        setCurrentClass(classItem); // Set the class data to update
        setIsModalOpen(true); // Open the modal
    };


    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
        setCurrentClass(null); // Reset the current class
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted');

        const updatedData = {
            title: event.target.title.value,
            price: event.target.price.value,
            description: event.target.description.value,
        };
        console.log(updatedData);
        axiosSecure.patch(`/classes/${currentClass._id}`, updatedData)
            .then((res) => {
                console.log(res.data);
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
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
                My Classes
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                    <div
                        key={classItem._id}
                        className="bg-white shadow-md rounded-lg p-2 flex flex-col"
                    >
                        <img
                            src={classItem.photoURL}
                            alt="Class"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
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
                            <Link to={`/dashboard/my-class/${classItem._id}`}>
                                <button
                                    disabled={classItem.status !== 'Accepted'}
                                    className={`px-2 text-sm lg:text-base lg:px-2 py-2 rounded-md transition-all ${classItem.status === 'Accepted'? 'bg-green-500 hover:bg-green-600 text-white': 'bg-gray-300 cursor-not-allowed'}`}
                                >See Details
                                </button>
                            </Link>

                        </div>
                    </div>
                ))}
            </div>

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
