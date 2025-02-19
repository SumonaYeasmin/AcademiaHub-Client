import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { IoGitPullRequestSharp } from 'react-icons/io5';
import { SiGoogleclassroom } from 'react-icons/si';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <div className='text-black'>
            <li>
                <NavLink to="/dashboard/teacher-request">
                <IoGitPullRequestSharp /> Teacher Request</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/users">
                <FaRegUser /> Users</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/all-class">
                <SiGoogleclassroom /> All Classes</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/profile">  
                <ImProfile /> profile</NavLink>
            </li>
           
            </div>
    );
};

export default AdminMenu;