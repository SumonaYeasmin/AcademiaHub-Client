import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyClass = () => {
    const axiosSecure = useAxiosSecure();

    const { data: classes = [], refetch } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            const res = await axiosSecure.get("/classes");
            return res.data;
        },
    });

    return (
        <div className="container mx-auto my-10 px-4">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
                My Classes
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => (
                    <div
                        key={classItem.id}
                        className="bg-white shadow-md rounded-lg p-2 flex flex-col"
                    >
                        {/* Image */}
                        <img
                            src={classItem.photoURL}
                            alt="Class"
                            className="w-full  object-cover rounded-lg mb-4"
                        />

                        {/* Class Details */}
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

                        {/* Action Buttons */}
                        <div className="flex justify-between gap-1">
                            <button className=" px-2 text-sm  lg:text-base lg:px-2 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all">
                                Update
                            </button>
                            <button className=" px-2 text-sm  lg:text-base lg:px-2 py-2  bg-red-500 text-white rounded-md hover:bg-red-600 transition-all">
                                Delete
                            </button>
                            <button className="px-2 text-sm  lg:text-base lg:px-2 py-2  bg-green-500 text-white rounded-md hover:bg-green-600 transition-all">
                                See Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyClass;
