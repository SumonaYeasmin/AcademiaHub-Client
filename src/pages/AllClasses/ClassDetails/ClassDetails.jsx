import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Helmet } from "react-helmet-async";

const ClassDetails = () => {
    // const { id } = useParams();
    // console.log(id);
    const location = useLocation();
    // console.log(location);
    const axiosSecure = useAxiosSecure();

    const classDetails = location?.state?.from;
    // console.log(classDetails);

    if (!classDetails) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-gray-600">Class not found!</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto my-16 ">
            <Helmet>
                <title>ClassDetails || AcademiaHub</title>
            </Helmet>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto py-10">
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="p-2">
                        <img
                            src={classDetails?.photoURL}
                            alt="Class Image"
                            className="w-ful object-cover rounded-md h-52 md:h-72"
                        />
                    </div>

                    {/* Data Section */}
                    <div className=" px-3 flex flex-col justify-between w-full md:w-1/2">
                        <h1 className=" text-2xl lg:text-3xl font-semibold text-gray-800">{classDetails.title}</h1>
                        <p className="text-gray-600">
                            Posted by: <span className="font-medium">{classDetails.name}</span>
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium text-lg">Description: </span>{classDetails.description}
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
