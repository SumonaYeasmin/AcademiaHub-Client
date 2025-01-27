import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const SocialLogin = () => {
    const { loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const { data: users = [], } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            // console.log(res.data);
            return res.data;
        }
    });
    // console.log(users);

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                // console.log(result.user);

                // Save to MongoDB
                const userInfo = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    photoURL: result?.user?.photoURL,
                    role: "Student"
                };

                // Check if the user already exists in the database
                const existingUser = users.find(user => user.email === userInfo.email);

                if (existingUser) {
                    Swal.fire({
                        icon: 'success',
                        title: "Successfully!",
                        text: 'Login With Google Successful!',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    navigate(location?.state ? location?.state : '/');
                }
                else {
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    icon: 'success',
                                    title: "Successfully!",
                                    text: 'Login With Google Successful!',
                                    showConfirmButton: false,
                                    timer: 2000,
                                });
                                navigate(location?.state ? location?.state : '/');
                            }
                        })
                        .catch(error => {
                            // console.log(error.message);
                            Swal.fire({
                                position: "top",
                                icon: "error",
                                title: `${error.code}`,
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        })
                }
            })

    }

    return (
        <div>
            <div className="text-center">
                <button onClick={handleGoogleLogin} className="btn btn-wide text-base bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-green-500 hover:to-blue-500">
                    <FaGoogle className="text-white text-lg" />Continue with Google
                </button>
            </div>

        </div>
    );
};

export default SocialLogin;