

const AllClass = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Class List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
                <div
                    key={classItem.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                    <img
                        src={classItem.image}
                        alt={classItem.title}
                        className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2 text-gray-800">
                            {classItem.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            {classItem.description.slice(0, 50)}...
                        </p>
                        <p className="text-gray-500 text-xs mb-4">
                            Posted by: {classItem.email}
                        </p>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => handleApprove(classItem.id)}
                                className="bg-green-500 text-white text-sm px-4 py-2 rounded hover:bg-green-600"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleReject(classItem.id)}
                                className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default AllClass;