import { FaGoogle } from "react-icons/fa";


const SocialLogin = () => {
    return (
        <div>
            <div className="text-center">
                <button className="btn btn-wide text-base bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-green-500 hover:to-blue-500">
                    <FaGoogle className="text-white text-lg" />Continue with Google
                </button>
            </div>
            
        </div>
    );
};

export default SocialLogin;