import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";


const MyEnrollClass = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: enrollClasse = [] } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            console.log(res.data);
            return res.data;
        },
    });


    return (

        <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
            <Helmet>
                <title>MyEnrollClass || AcademiaHub</title>
            </Helmet>
            {enrollClasse.map((classItem) => (
                <div
                    key={classItem._id}
                    className="bg-white shadow-lg p-2 rounded-lg overflow-hidden transition-transform transform"
                >
                    {/* Image Section */}
                    <img
                        src={classItem.photoURL}
                        alt={classItem.title}
                        className="w-full h-52 object-cover rounded-md"
                    />

                    {/* Card Content */}


                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                        {classItem.title}
                    </h2>
                    <p className=" text-gray-600 mb-4">
                        Posted by:{" "}
                        <span className="font-medium">{classItem.teacherEmail}</span>
                    </p>

                    {/* Continue Button */}
                    <Link
                        to={`/dashboard/myenroll-class/${classItem._id}`}
                        state={{ teacherEmail: classItem.teacherEmail, title: classItem.title }}
                    >
                        <button
                            className="btn bg-teal-600 text-white rounded-md hover:bg-blue-700 ">
                            Continue
                        </button>
                    </Link>
                </div>
                // `/dashboard/my-class/${classItem._id}`

            ))}
        </div>

    );
};

export default MyEnrollClass;