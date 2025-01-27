import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBAr";



const MainLayouts = () => {
    return (
        <div>
             <NavBar></NavBar>
            <div className="min-h-[calc(100vh-550px)]">
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default MainLayouts;