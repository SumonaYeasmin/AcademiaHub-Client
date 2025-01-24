import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';


const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            // console.log(res.data);
            return res.data;
        },
    });


    return (

        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Helmet>
                <title>Profile || AcademiaHub</title>
            </Helmet>
            <div className="w-full max-w-screen-sm p-5">

                <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6">
                    <img
                        className="w-28 h-28 rounded-full object-cover mb-4"
                        src={users.photoURL}
                        alt="User"
                    />
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2"> {users.name}</h2>
                        <p className="text-gray-700 mb-2"><span className='font-medium'>Email: </span>{users.email}</p>
                        <p className="text-gray-500 mb-2"><span className='font-medium'>Role: </span> {users.role}</p>

                    </div>
                </div>


            </div>
        </div>

    );
};

export default Profile;

