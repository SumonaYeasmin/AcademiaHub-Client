import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseCount from "../../../hooks/useCount";
import { Helmet } from "react-helmet-async";

const ClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    // [, refetch] = UseCount()

    const { data: classDetails, isLoading } = useQuery({
        queryKey: ["classDetails", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-gray-600">Loading...</span>
            </div>
        );
    }

    if (!classDetails) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-gray-600">Class not found!</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-16 p-2">
            <Helmet>
                <title>ClassDetails || AcademiaHub</title>
            </Helmet>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="p-2">
                        <img
                            src={classDetails.photoURL}
                            alt="Class Image"
                            className="w-ful object-cover rounded-md h-52 md:h-72"
                        />
                    </div>

                    {/* Data Section */}
                    <div className="px-10 py-6 flex flex-col justify-between w-full md:w-1/2">
                        <h1 className=" text-2xl md:text-3xl font-semibold text-gray-800">{classDetails.title}</h1>
                        <p className="text-gray-600">
                            Posted by: <span className="font-medium">{classDetails.name}</span>
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Description: </span>{classDetails.description}
                        </p>
                        <p className="text-gray-600 ">
                            <span className="font-medium">Total Enrolment: </span>{classDetails.totalEnrolment}
                        </p>
                        <p className="text-lg font-semibold text-blue-500">
                            Price: ${classDetails.price}
                        </p>
                        <Link
                            to={{
                                pathname: '/payment',
                            }}
                            state={{ class: classDetails }}
                        >
                            <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all mt-auto">
                                Pay Now
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;
