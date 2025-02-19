import { CgProfile } from "react-icons/cg";
import { IoMdAddCircle } from "react-icons/io";
import { MdClass } from "react-icons/md";
import { NavLink } from "react-router-dom";


const TeacherMenu = () => {
    return (
        <div className="text-black">
            
            <li>
                <NavLink to="/dashboard/add-class">
                <IoMdAddCircle />Add class</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-class">
                <MdClass />My class</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/profile">
                <CgProfile />Profile</NavLink>
            </li>
        </div>
    );
};

export default TeacherMenu;