import { useState } from "react";
import { useParams } from "react-router-dom";


const MyClassDetails = () => {
    const { id } = useParams();
    console.log(id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateAssignment = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
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
                    <button onClick={() =>setIsModalOpen(true)} class="btn btn-success rounded-full text-white text-base md:text-lg font-normal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-10 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create
                    </button>
                    {isModalOpen && (
                        <div class="modal modal-open">
                            <div class="modal-box">
                                <h3 class="font-bold text-lg">Create Assignment</h3>
                                <form onSubmit={handleCreateAssignment}>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Assignment Title</span>
                                        </label>
                                        <input type="text" placeholder="Type here" class="input input-bordered" required />
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Assignment Deadline</span>
                                        </label>
                                        <input type="datetime-local" class="input input-bordered" required />
                                    </div>
                                    <div class="form-control">
                                        <label class="label">
                                            <span class="label-text">Assignment Description</span>
                                        </label>
                                        <textarea class="textarea textarea-bordered" placeholder="Bio"></textarea>
                                    </div>
                                    <div class="modal-action">
                                        <button type="submit" class="btn btn-success">Add Assignment</button>
                                        <button class="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
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


