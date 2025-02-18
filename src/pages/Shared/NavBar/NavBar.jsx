import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";

import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";



const Navbar = () => {
    const { user, userLogOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);


    const handleLogOut = () => {
        userLogOut()
            .then(() => {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "User Logout Successful",
                    showConfirmButton: false,
                    timer: 2000,
                });
                navigate('/')
            })
            .catch(error => {
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${error.code}`,
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
    }

    // Theme Loaded localStorage 
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    // Theme Changes
    const toggleTheme = () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const links = (
        <div className="lg:flex gap-5 text-base md:text-lg  2xl:text-xl font-semibold items-center justify-center py-2">
            {/* <li> */}
                <NavLink to="/" className={({ isActive }) => isActive ? 'bg-teal-500 text-black px-2 rounded py-1 to-indigo-400 font-semibold text-base md:text-lg  2xl:text-lg' : 'py-1  block'}>Home</NavLink>
            {/* </li> */}
            {/* <li> */}
                <NavLink to="/allClasses" className={({ isActive }) => isActive ? 'bg-teal-500 text-black px-2 rounded py-1 to-indigo-400 font-semibold text-base md:text-lg  2xl:text-lg' : 'py-2  block'}>All Classes</NavLink>
            {/* </li> */}
            {
                user &&
                // <li>
                    <NavLink to="/teachOnAcademiaHub" className={({ isActive }) => isActive ? 'bg-teal-500 text-black px-1 rounded py-1  font-semibold text-base md:text-lg 2xl:text-lg' : 'py-2  block'}>Teach On AcademiaHub</NavLink>
                // </li>
            }



        </div>
    );

    return (

        <div className="sticky top-0 z-50 backdrop-blur-md bg-opacity-50 border-b border-teal-600 bg-teal-400">
             <div className="navbar container mx-auto">

                <div className="navbar-start z-50">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className=" lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-6 w-56 px- shadow">
                            {links}
                        </ul>
                    </div>
                    <div className="flex gap-1 md:gap-2 items-center ml-2 md:ml-5 lg:ml-0">
                        <img
                            alt="Tailwind CSS Navbar component" className=" w-10 rounded-md "
                            src="https://i.ibb.co.com/0yM92pv/299519412-405499358350836-446553208076966245-n.jpg" />
                        <p className="text-xl md:text-3xl">AcademiaHub</p>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end z-50 gap-1">
                     <button
                        onClick={toggleTheme}
                        className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-black shadow-md transition-transform transform hover:scale-110`}
                    >
                        {isDarkMode ? (
                            <MdOutlineLightMode size={24} />
                        ) : (
                            <MdOutlineDarkMode size={24} />
                        )}
                    </button>
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">

                                        {
                                            user && <img
                                                data-tooltip-id="my-tooltip-1"
                                                alt="Profile"
                                                src={
                                                    user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                                } />
                                        }

                                    </div>

                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu md:text-lg dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 shadow">
                                    <p className=" py-2 text-gray-700 font-bold cursor-default">
                                        {user?.displayName || 'Anonymous User'}
                                    </p>
                                    {/* <li> */}
                                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'bg-teal-500 text-base md:text-lg lg:text-sm 2xl:text-lg' : ''}>Dashboard</NavLink>
                                    {/* </li> */}
                                    <button onClick={handleLogOut} className="py-1 my-1  bg-teal-500  hover:bg-teal-700 rounded-lg hover:text-gray-200 transform transition duration-300 font-semibold">Log out</button>
                                </ul>
                            </div>
                            :
                            <Link to="/signIn" className="text-sm md:text-lg text-black px-3 sm:px-4 py-2 bg-teal-500 hover:bg-teal-700 hover:to-indigo-600 rounded-lg hover:text-gray-200 transform transition duration-300 font-semibold">Sign In</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
