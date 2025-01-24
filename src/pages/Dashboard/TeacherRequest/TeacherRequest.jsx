import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const TeacherRequest = () => {

  const axiosSecure = useAxiosSecure();

  const { data: teachers = [], refetch } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/teachers');
      return res.data;
    }
  });

  // handle approve btn
  const handleApprove = async (email) => {
    console.log(email);
    try {
      const res = await axiosSecure.patch(`/teachers/approve/${email}`, {
        status: "Accepted",
        role: "Teacher",
      });
      if (res.data.modifiedCount > 0) {
        // const response = await axiosSecure.patch(`users/role/${id}`)
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Teacher approved successfully!",
          showConfirmButton: false,
          timer: 2000
        });
        refetch();
      }
    } catch {
      console.log(error.code);
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Failed to Approve teacher!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }


  // handle rejecte btn
  const handleReject = async (teacherId) => {
    try {
      const res = await axiosSecure.patch(`/teachers/reject/${teacherId}`, {
        status: "rejected",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Rejected! Teacher request has been rejected!",
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
        title: "Failed to reject teacher request!",
        showConfirmButton: false,
        timer: 2000,
      });

    }
  };



  return (

    <div className="overflow-x-auto ">
      <table className="table text-base">
        {/* head */}
        <thead>
          <tr className="text-lg">

            <th>SI No</th>
            <th>Name</th>
            <th>Image</th>
            <th>Experience</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>
        <tbody>
          {
            teachers.map((teacher, index) => <tr key={teacher._id}>

              <th>{index + 1}</th>
              <td>{teacher.name}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={teacher.photoURL}
                        alt="img.." />
                    </div>
                  </div>
                </div>
              </td>
              <td>{teacher.experience}</td>
              <td>{teacher.title}</td>
              <td>{teacher.category}</td>
              <td><button className="btn">{teacher.status}</button></td>
              <th className="flex gap-1">
                <button
                  className="btn bg-green-400"
                  onClick={() => handleApprove(teacher.email)}
                  disabled={teacher.status === "rejected"}>
                  Approve
                </button>
                <button
                  className="btn bg-red-500"
                  onClick={() => handleReject(teacher._id)}
                  disabled={teacher.status === "rejected"}>
                  Reject
                </button>
              </th>
            </tr>)
          }


        </tbody>

      </table>
    </div>
  );
};

export default TeacherRequest;