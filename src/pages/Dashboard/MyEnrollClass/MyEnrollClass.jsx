import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyEnrollClass = () => {
    const axiosSecure = useAxiosSecure();

    const { data: enrollClasse = [] } = useQuery({
        queryKey: ["payments",],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            console.log(res.data);
            return res.data;
        },
    });


    return (

        <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-7">
            {enrollClasse.map((classItem) => (
                <div
                    key={classItem._id}
                    className="bg-white shadow-lg p-2 rounded-lg overflow-hidden transition-transform transform hover:scale-105"
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
                    <button
                        className="mt-auto bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
                    >
                        Continue
                    </button>
                </div>
            

            ))}
        </div>

    );
};

export default MyEnrollClass;