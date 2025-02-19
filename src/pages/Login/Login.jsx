

import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

    const { loginUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        // console.log(data);
       loginUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                Swal.fire({
                    icon: 'success',
                    title: "Successfully Login",
                    text: 'User login successfully.',
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  navigate(location?.state ? location?.state : '/');
            })
            .catch(error => {
                // console.log(error.code);
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${error.code}`,
                    showConfirmButton: false,
                    timer: 2000,
                  });
                
            })
    }

    return (
        <div className="flex flex-col justify-center my-20 bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
            <Helmet>
                <title>Login | AcademiaHub</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" {...register("email", { required: true })} id="email" className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email"
                        required /> {errors.email && <span className='text-red-600'>email is required</span>}
                </div>

                {/* Password Field  */}
                <div>
                    <label htmlFor="password" className="block text-gray-700 ">Password</label>
                    <input type="password" {...register("password", { required: true })} id="password" className="w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" />{errors.password && <span className='text-red-600'>password is required</span>}
                </div>

                {/* Submit Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >Login </button>
                <SocialLogin></SocialLogin>
            </form>
            <p className="text-gray-600 mt-3">
                New to this website? Please <Link to="/register"><span className="text-blue-600 font-bold hover:underline">Register</span></Link></p>
        </div>
    );
};

export default Login;