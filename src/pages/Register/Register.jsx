import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';


// import { Helmet } from 'react-helmet';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { creatUser, updateProfileInfo } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name, photoUrl, email, password);

        // //password validation
        // const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        // if (!regex.test(password)) {
        //     toast.error("Password must have at least 6 characters, including at least one uppercase and one lowercase letter.");
        //     return;

        creatUser(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Registration Successfully",
                    text: 'Wellcome, Your account has been created',
                    showConfirmButton: false,
                    timer: 2000,
                });
                updateProfileInfo(name, photoUrl);
                navigate(location?.state ? location?.state : '/');
            })
            .catch(error => {
                console.log(error.code);
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${error.code}`,
                    showConfirmButton: false,
                    timer: 2000,
                });

            })
    };


    return (
        <div className="flex flex-col justify-center my-8 shadow-lg rounded-lg p-8 max-w-md mx-auto">
            {/* <Helmet>
                <title>Register | FindMate</title>
            </Helmet> */}
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">

                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-gray-700">
                        Name
                    </label>
                    <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" required />
                </div>
                {/* Photo URL Field */}
                <div>
                    <label htmlFor="photoURL" className="block text-gray-700">
                        Photo URL
                    </label>
                    <input type="text" id="photoURL" name="photoUrl" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your photo URL" required />
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-gray-700">
                        Email
                    </label>
                    <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" required />
                </div>

                {/* Password Field */}
                <div className="relative">
                    <label htmlFor="password" className="block text-gray-700">
                        Password
                    </label>
                    <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" required />
                    <a onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute right-4 bottom-2">
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </a>
                </div>
                {/* Submit Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >Register </button>

                {/* handle Google Login */}
                <SocialLogin></SocialLogin>
            </form>

            <p className="text-gray-600 mt-4 text-center">
                Already have an account?{" "}
                <Link to='/signIn'><span className="text-blue-700 font-bold text-base hover:underline cursor-pointer">
                    Login
                </span></Link>
            </p>
        </div>
    );
}

export default Register;