

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: totalClasses = [], isError: classesError } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    });

    const { data: totalUsers = [], isError: usersError } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const { data: totalEnrollments = [], isError: paymentsError } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    // Handle error cases
    if (classesError || usersError || paymentsError) {
        return <div className="text-red-500">Something went wrong while fetching data!</div>;
    }

    return (

        <div>
            <h1 className="text-3xl md:text-4xl text-center font-semibold text-teal-700 italic ">Our Website Statistics</h1>

        <div className="md:flex md:space-x-8 my-10 container mx-auto">
            

            {/* Left Section: Information Cards */}
            <div className="md:w-1/2 space-y-4 lg:space-y-10 text-center">
                <div className="bg-gradient-to-r from-teal-600  to-indigo-400 p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-white">Total Users</h3>
                    <p className="text-xl font-bold text-white">{totalUsers.length}</p>
                </div>
                <div className="bg-gradient-to-r from-teal-600  to-indigo-400 p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-white">Total Classes</h3>
                    <p className="text-xl font-bold text-white">{totalClasses.length}</p>
                </div>
                <div className="bg-gradient-to-r from-teal-600 to-indigo-400 p-6 rounded-lg shadow-lg">
                    <h3 className="text-lg font-semibold text-white">Total Enrollments</h3>
                    <p className="text-xl font-bold text-white">{totalEnrollments.length}</p>
                </div>
            </div>

            {/* Right Section: Image */}
            <div className="md:w-1/2 mt-5 md:mt-0">
                <img
                    src="https://i.ibb.co/f9p5ZDt/hub2academia.jpg"
                    alt="Relevant to my website"
                    className="w-full h-full object-cover rounded-lg shadow-md"
                />
            </div>
        </div>
        </div>
    );
};

export default Statistics;

