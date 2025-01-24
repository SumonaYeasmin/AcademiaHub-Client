import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";




const Users = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        console.log(user);
        axiosSecure.patch(`/users/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }

    return (
        <div className="p-4">
            <Helmet>
                <title>Users || AcademiaHub</title>
            </Helmet>
            <h1 className="text-2xl font-bold mb-4">Users List</h1>
            <div className="overflow-x-auto">
                <table className="table w-full text-sm md:text-base">
                    <thead>
                        <tr className=" text-base md:text-lg">
                            <th className="bg-gray-100">SI No</th>
                            <th className="bg-gray-100">Image</th>
                            <th className="bg-gray-100">User Name</th>
                            <th className="bg-gray-100">Email</th>
                            <th className="bg-gray-100">Role</th>
                            <th className="bg-gray-100">Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-12 rounded-full">
                                                <img src={user.photoURL} alt={user.name} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                            {user.role}
                                    </td>
                                    <td>
                                        <button
                                            disabled={user.role === 'Admin'}
                                            className="btn bg-green-400 "
                                            onClick={() => handleMakeAdmin(user)}
                                        >
                                            Make Admin
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;