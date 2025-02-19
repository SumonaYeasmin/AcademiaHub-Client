import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';




const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const { creatUser, updateProfileInfo } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {

        // console.log(data);

        //password validation
        // const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        // if (!regex.test(password)) {
        //     toast.error("Password must have at least 6 characters, including at least one uppercase and one lowercase letter.");
        //     return;
        // }    

        creatUser(data.email, data.password)
            .then(result => {
                // console.log(result.user);

                updateProfileInfo(data.name, data.photoUrl)

                    .then(() => {
                        // console.log("user profile info updated")

                        // creat user in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoUrl,
                            role: "Student"
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    // console.log("user added to the database");
                                    // form.reset();
                                    reset()
                                    Swal.fire({
                                        position: "top",
                                        icon: "success",
                                        title: "Registration Successfully",
                                        text: 'Wellcome, Your account has been created',
                                        showConfirmButton: false,
                                        timer: 2000,
                                    });
                                    navigate(location?.state ? location?.state : '/');
                                }
                            })

                    })


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
    };


    return (
        <div className="flex flex-col justify-center my-20 bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto border">
            <Helmet>
                <title>Register | AcademiaHub</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">

                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-gray-700">
                        Name
                    </label>
                    <input type="text" id="name" {...register("name", { required: true })} className="w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" />
                    {errors.name && <p className='text-red-600'>Name is required.</p>}
                </div>
                {/* Photo URL Field */}
                <div>
                    <label htmlFor="photoURL" className="block text-gray-700">
                        Photo URL
                    </label>
                    <input type="photoUrl" id="photoURL" {...register("photoUrl", { required: true })} className="w-full bg-white px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your photo URL" />
                    {errors.photoUrl && <p className='text-red-600'>Name is required.</p>}
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-gray-700">
                        Email
                    </label>
                    <input type="text" id="email" {...register("email", { required: true })} className="w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
                    {errors.email && <p className='text-red-600'>Name is required.</p>}
                </div>

                {/* Password Field */}
                <div className="relative">
                    <label htmlFor="password" className="block text-gray-700">
                        Password
                    </label>
                    <input type={showPassword ? 'text' : 'password'} id="password"  {...register("password", {
                        required: true, minLength: 6, maxLength: 18, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,18}$/
                    })} className="w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" />

                    <a onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute right-4 bottom-2">
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </a>

                </div>
                <div>
                    {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                    {errors.password?.type === ('minLength' || 'maxLength') && <p className='text-red-600'>Password must be between 6 to 18 characters.</p>}
                    {/* {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be between 6 to 18 characters.</p>} */}
                    {errors.password?.type === "pattern" && (
                        <p className='text-red-600'>Password must have one Uppercase and Lowercase, one Number and one Special character. </p>
                    )}
                </div>
                {/* Submit Button */}
                <button className="w-full bg-gradient-to-r from-teal-500 to-teal-500 hover:from-teal-400 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
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