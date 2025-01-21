import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";



const AllClass = () => {
    const axiosSecure = useAxiosSecure();
    const [progressEnabled, setProgressEnabled] = useState({});
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    });

    const handleApprove = (id) => {
        console.log(`Class with ID ${id} approved!`);
    };
    const handleReject = (id) => {
        console.log(`Class with ID ${id} rejected!`);
    };

    return (

        <div>
            <h2 className=" text-2xl md:text-3xl font-bold text-center mb-6">All Class List</h2>

            <div className="overflow-x-auto">
                <table className="table w-full text-sm md:text-base">
                    <thead>
                        <tr className=" text-base md:text-lg">
                            <th>SI No</th>
                            <th>Class Title</th>
                            <th>Description</th>
                            <th>Instructor Email</th>
                            <th className=" pl-5 md:pl-10">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classItem, index) => (
                            <tr key={classItem._id}>
                                <th>{index + 1}</th>
                                <td>{classItem.title}</td>
                                <td>{classItem.description}</td>
                                <td>{classItem.email}</td>
                                <td>
                                    <div className="flex  items-center justify-around gap-2 ">
                                        <button
                                            onClick={() => handleApprove(classItem._id)}
                                            className="btn btn-success"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(classItem._id)}
                                            className="btn btn-error "
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => handleProgress(classItem._id)}
                                            disabled={!progressEnabled[classItem._id]}
                                            className={`btn  ${progressEnabled[classItem._id]
                                                ? "btn-primary"
                                                : "btn-disabled"
                                                }`}
                                        >
                                            {progressEnabled[classItem._id] ? "View Progress" : "Progress Disabled"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


    );
};

export default AllClass;
