import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();

  const { data: classes = [], refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      const approvedClasses =res.data;
      return approvedClasses.filter(classItem => classItem.status === 'accepted');
      
    },
  });

  return (
    <div className="p-5 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Total Classes: {classes.length}</h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className="rounded-lg shadow-lg ">
            <img
              src={classItem.photoURL}
              alt="Class Image"
              className="w-full object-cover rounded-lg"
            />
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{classItem.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Posted by: <span className="font-medium">{classItem.name}</span>
              </p>
              <p className="text-lg font-semibold text-blue-600 mb-2">
                Price: ${classItem.price}
              </p>
              <p className="text-gray-700 text-sm mb-4">{classItem.description}</p>
              <p className="text-sm text-gray-600 mb-4">
                Total Enrolment: {classItem.totalEnrolment}
              </p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all">
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
