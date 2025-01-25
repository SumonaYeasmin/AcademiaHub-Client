import { ImProfile } from "react-icons/im";
import { MdFlightClass } from "react-icons/md";
import { NavLink } from "react-router-dom";


const StudentMenu = () => {
    return (
        <div>
             <li>
                <NavLink to="/dashboard/my-enroll-class">
                <MdFlightClass /> My enroll class</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/profile">
                <ImProfile /> Profile</NavLink>
            </li>
        </div>
    );
};

export default StudentMenu;