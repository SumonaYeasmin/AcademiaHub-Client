import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <Helmet>
                <title>Error | AcademiaHub</title>
            </Helmet>
            <img className="h-2/4" src="https://i.ibb.co.com/jvtPRJrK/404-Error-rafiki-1.png" alt="" />
            <Link to="/" className="text-xl -mt-10 text-teal-600 font-bold border border-teal-500 rounded-full px-4 py-1 hover:bg-teal-500 hover:text-white transition duration-300  bg-white ">
            🔙 Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;