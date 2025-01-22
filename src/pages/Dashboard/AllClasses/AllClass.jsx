import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";



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

    // hanlde approve btn
      const handleApprove = async (classId) => {
        try {
          const res = await axiosSecure.patch(`/classes/approve/${classId}`, {
            status: "accepted",
          });
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "class approved successfully!",
              showConfirmButton: false,
              timer: 2000
            });
          
            refetch();
          }
        } catch {
          // console.log(error.code);
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Failed to Approve class!",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
      
      // hanlde reject btn
      const handleReject = async (classId) => {
        try {
          const res = await axiosSecure.patch(`/classes/reject/${classId}`, {
            status: "rejected",
          });
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "top",
              icon: "success",
              title: "class rejected successfully!",
              showConfirmButton: false,
              timer: 2000
            });
            refetch();
          }
        } catch {
          // console.log(error.code);
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Failed to reject class!",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }

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
                            <th>Status</th>
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
                                <td><button className="btn">{classItem.status}</button></td>
                                <td>
                                    <div className="flex  items-center justify-around gap-2 ">
                                        <button
                                            onClick={() => handleApprove(classItem._id)} disabled={classItem.status === 'accepted'}
                                            className="btn btn-success"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(classItem._id)} disabled={classItem.status === "rejected"}
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
                                            {progressEnabled[classItem._id] ? "View Progress" : "Progress"}
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
