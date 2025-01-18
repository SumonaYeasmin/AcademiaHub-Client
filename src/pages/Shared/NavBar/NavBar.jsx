import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";



const Navbar = () => {
    const { user, userLogOut } = useContext(AuthContext);


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

    const links = (
        <div className="lg:flex gap-3 text-base md:text-lg lg:text-sm 2xl:text-lg font-semibold">
            <li>
                <NavLink to="/" className={({ isActive }) => isActive ? 'bg-gradient-to-r from-purple-400 to-indigo-400 font-semibold text-base md:text-lg lg:text-sm 2xl:text-lg' : ''}>Home</NavLink>
            </li>
            <li>
                <NavLink to="/allClasses" className={({ isActive }) => isActive ? 'bg-gradient-to-r from-purple-400 to-indigo-400 font-semibold text-base md:text-lg lg:text-sm 2xl:text-lg' : ''}>All Classes</NavLink>
            </li>
            <li>
                <NavLink to="/teachOnAcademiaHub" className={({ isActive }) => isActive ? 'bg-gradient-to-r from-purple-400 to-indigo-400 font-semibold text-base md:text-lg lg:text-sm 2xl:text-lg' : ''}>Teach On AcademiaHub</NavLink>
            </li>

        </div>
    );

    return (

        <div className="sticky top-0 z-50 backdrop-blur-md bg-opacity-50 border-b">
            <div className="navbar  container mx-auto">
                <div className="navbar-start z-50">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn -ml-5 btn-ghost text-2xl md:text-3xl">AcademiaHub</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end z-50">
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
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 shadow">
                                    <p className="px-4 py-2 text-gray-700 font-bold cursor-default">
                                        {user?.displayName || 'Anonymous User'}
                                    </p>
                                    <li>
                                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'bg-gradient-to-r from-purple-400 to-indigo-400 font-semibold text-base md:text-lg lg:text-sm 2xl:text-lg' : ''}>Dashboard</NavLink>
                                    </li>
                                    <button onClick={handleLogOut} className="btn md:text-lg  bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-600 hover:to-indigo-600 rounded-lg hover:text-white transform transition duration-300 font-semibold">Log Out</button>
                                </ul>
                            </div>
                            :
                            <Link to="/signIn" className="text-sm md:text-lg btn px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-400 to-indigo-400 hover:from-purple-600 hover:to-indigo-600 rounded-lg hover:text-white transform transition duration-300 font-semibold">Sign In</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
