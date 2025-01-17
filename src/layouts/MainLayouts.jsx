import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBAr";
import Footer from "../pages/Shared/Footer/Footer";


const MainLayouts = () => {
    return (
        <div>
             <NavBar></NavBar>
            <div className="min-h-[calc(100vh-550px)]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;