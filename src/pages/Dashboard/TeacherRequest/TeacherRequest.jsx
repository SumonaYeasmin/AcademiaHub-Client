import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const TeacherRequest = () => {

  const axiosSecure = useAxiosSecure();

  const { data: teachers = [], refetch } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axiosSecure.get('/teachers');
      return res.data;
    }
  });

  return (

    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>

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
            teachers.map((teacher, index) =>  <tr key={teacher._id}>
              
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
              <td>{teacher.status}</td>
              <th className="flex gap-1">
                <button className="btn bg-green-400 ">approves</button>
                <button className="btn bg-red-500 ">Reject</button>
               
              </th>
            </tr>)
          }
        

        </tbody>
   
      </table>
    </div>
  );
};

export default TeacherRequest;