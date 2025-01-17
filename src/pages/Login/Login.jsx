

import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

// import { toast } from 'react-toastify';
// import { Helmet } from 'react-helmet';

const Login = () => {
    // const { loginUser, loginWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        // e.preventDefault();
        // const email = e.target.email.value;
        // const password = e.target.password.value;
        // // console.log(email, password);
        // loginUser(email, password)
        //     .then(result => {
        //         // console.log(result.user);
        //         toast.success("Logged in with Google successfully!");
        //         navigate(location?.state ? location.state : '/');
        //     })
        //     .catch(error => {
        //         // console.log(error.message);
        //         toast.error(error.message)
        //     })
    }

    const handleGoogleLogin = (e) => {
        // loginWithGoogle()
        //     .then(result => {
        //         // console.log(result.user);
        //         toast.success("Login With Google Successful!");
        //         navigate(location?.state ? location.state : '/');
        //     })
        //     .catch(error => {
        //         // console.log(error.message);
        //         toast.error(error.message)
        //     })
    }

    return (
        <div className="flex flex-col justify-center my-8 shadow-lg rounded-lg p-8 max-w-md mx-auto">
            {/* <Helmet>
                <title>Login | FindMate</title>
            </Helmet> */}
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" name="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email"
                        required />
                </div>

                {/* Password Field  */}
                <div>
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" name="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" required />
                    <label className="label">
                        <p className="label-text-alt link link-hover text-sm text-purple-600 hover:underline">Forgot password?</p>
                    </label>
                </div>

                {/* Submit Button */}
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >Login </button>
                <SocialLogin></SocialLogin>
            </form>


            {/* Login with google */}
           
            <p className="text-gray-600 mt-3">
                New to this website? Please <Link to="/register"><span className="text-blue-600 font-bold hover:underline">Register</span></Link></p>
        </div>
    );
};

export default Login;