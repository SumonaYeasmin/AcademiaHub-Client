import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const EnrollClassDetails = () => {
    const {id} = useParams()
    // console.log(id);

    const axiosSecure = useAxiosSecure();


    const { data: assignments = [], } = useQuery({
        queryKey: ["assignments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/assignments");
            return res.data;
        },
    });

    const handleSubmit =()=>{
        
    }
    return (
        <div>
                <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border-b">Title</th>
              <th className="px-4 py-2 text-left border-b">Description</th>
              <th className="px-4 py-2 text-left border-b">Deadline</th>
              <th className="px-4 py-2 text-left border-b">Submission</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{assignment.title}</td>
                <td className="px-4 py-2 border-b">{assignment.description}</td>
                <td className="px-4 py-2 border-b">{assignment.deadline}</td>
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center gap-2">
                    {/* <input
                      type="file"
                      className="file-input file-input-bordered file-input-sm w-full max-w-xs "
                    /> */}
                    <label className="cursor-pointer">
  <span className="btn btn-sm btn-outline">Choose File</span>
  <input type="file" className="hidden" />
</label>

                    <button
                      onClick={() => handleSubmit(assignment.id)}
                      className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Submit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </div>
    );
};

export default EnrollClassDetails;