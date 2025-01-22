import React, { useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import AdminMenu from './Menu/AdminMenu';
// import TeacherMenu from './Menu/TeacherMenu';

const Sidebar = () => {
    const [isActive, setActive] = useState(true);
    const role = 'admin'
    // const role = 'teacher'

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    return (
        <div>
            {/* Small Screen Navbar */}
            <div className='bg-teal-200 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-2 font-bold'>
                        <Link to='/' className='flex items-center gap-3'>
                            <img
                                className='w-12'
                                src='https://i.ibb.co.com/0yM92pv/299519412-405499358350836-446553208076966245-n.jpg'
                                alt='logo'
                            />
                            <h1 className="text-[27px] font-bold bg-gradient-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">AcademiaHub</h1>
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-teal-500'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10  flex flex-col justify-between overflow-x-hidden w-64 bg-emerald-200 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-amber-50 mx-auto'>
                            <Link to='/' className='flex items-center gap-2'>
                                <img
                                    className='w-12'
                                    src='https://i.ibb.co.com/0yM92pv/299519412-405499358350836-446553208076966245-n.jpg'
                                    alt='logo'
                                />
                                <h1 className="text-2xl -mt-2 font-bold bg-gradient-to-r from-teal-600 to-teal-700 text-transparent bg-clip-text">AcademiaHub</h1>
                            </Link>
                        </div>
                    </div>

                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            {role === 'admin' && <AdminMenu />}
                            {/* {role === 'teacher' && <TeacherMenu />} */}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;