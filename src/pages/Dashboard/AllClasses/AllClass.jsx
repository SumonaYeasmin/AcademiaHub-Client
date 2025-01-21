import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";



const AllClass = () => {
    const axiosSecure =useAxiosSecure();
    const [progressEnabled, setProgressEnabled] = useState({});
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    })

    const handleApprove = (id) => {
        console.log(`Class with ID ${id} approved!`);
    };
    const handleReject = (id) => {
        console.log(`Class with ID ${id} rejected!`);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
        <h2 className="text-3xl font-bold text-center mb-6">All Class List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
                <div
                    key={classItem._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                    <img
                        src={classItem.photoURL}
                        alt={classItem.title}
                        className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                        <h3 className=" text-xl md:text-2xl font-bold mb-2 text-gray-800">
                            {classItem.title}
                        </h3>
                        <p className="text-gray-600 md:text-lg mb-4">
                            {classItem.description.slice(0, 50)}
                        </p>
                        <p className="text-gray-500  md:text-lg mb-4">
                            Posted by: {classItem.email}
                        </p>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => handleApprove(classItem._id)}
                                className="bg-green-500 text-white  px-4 py-2 rounded hover:bg-green-600"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleReject(classItem._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => handleProgress(classItem.id)}
                                disabled={!progressEnabled[classItem.id]} // Disable by default
                                className={`w-full text-white text-sm px-4 py-2 rounded ${
                                    progressEnabled[classItem.id]
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {progressEnabled[classItem.id] ? "View Progress" : "Progress Disabled"}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default AllClass;