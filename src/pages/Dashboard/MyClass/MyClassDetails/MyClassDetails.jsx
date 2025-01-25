import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const MyClassDetails = () => {
    const { id } = useParams();
    // console.log(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosSecure =useAxiosSecure();
    const { register, handleSubmit, formState: { errors },} = useForm();


    const onSubmit = async (data) => {
        console.log(data);
        setIsModalOpen(true);

        const assignmentInfo ={
            deadline: data.deadline,
            description: data.description,
            title:data.title
        }
          const response = await axiosSecure.post('/', assignmentInfo)
                // console.log(response.data);
                try {
                    if (response.data.insertedId) {
                        // console.log("Added to mongoDB");
                        Swal.fire({
                            position: "top",
                            icon: "success",
                            title: "Request submitted successfully!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        reset()
                        navigate('/dashboard/my-class');
                    }
                }
                catch {
                    // console.log('Error');
                    Swal.fire({
                        position: "top",
                        icon: "error",
                        title: "Failed to submit request. Please try again later.",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
        
    }



    return (
        <div>
            <div className="container mx-auto my-10 px-4">
                <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Class Progress</h1>

                {/* Progress Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Total Enrollments Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Enrollments</h3>
                        <p className="text-4xl text-gray-600">0</p> {/* Placeholder for total enrollments */}
                    </div>

                    {/* Total Assignments Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Assignments</h3>
                        <p className="text-4xl text-gray-600">0</p> {/* Placeholder for total assignments */}
                    </div>

                    {/* Total Submissions Card */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Total Submissions</h3>
                        <p className="text-4xl text-gray-600">0</p> {/* Placeholder for total submissions */}
                    </div>
                </div>

                {/* Create Assignment Button */}
                <div className="text-center mt-6">
                    <button onClick={() => setIsModalOpen(true)} class="btn btn-success rounded-full text-white text-base md:text-lg font-normal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-10 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create
                    </button>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                <h3 className="font-bold text-lg mb-4">Create Assignment</h3>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Assignment Title</span>
                                        </label>
                                        <input
                                            type="text"
                                            {...register("title", { required: true })}
                                            placeholder="Type here"
                                            className="input input-bordered w-full"
                                        />
                                        {errors.title && (
                                            <span className="text-red-600">Title is required</span>
                                        )}
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Assignment Deadline</span>
                                        </label>
                                        <input
                                            type="datetime-local"
                                            {...register("deadline", { required: true })}
                                            className="input input-bordered w-full"
                                        />
                                        {errors.deadline && (
                                            <span className="text-red-600">Deadline is required</span>
                                        )}
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Assignment Description</span>
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered w-full"
                                            {...register("description", { required: true })}
                                            placeholder="Bio"
                                        />
                                        {errors.description && (
                                            <span className="text-red-600">Description is required</span>
                                        )}
                                    </div>
                                    <div className="modal-action flex justify-end">
                                        <button
                                            type="submit"
                                            className="btn btn-success mr-2"
                                        >
                                            Add Assignment
                                        </button>
                                        <button
                                            className="btn btn-ghost"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}


                </div>
            </div>

        </div>
    );
};

export default MyClassDetails;


