import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                // console.log(result.user);
                Swal.fire({
                    icon: 'success',
                    title: "Successfully!",
                    text: 'Login With Google Successful!',
                    showConfirmButton: false,
                    timer: 2000,
                });
                navigate(location?.state ? location?.state : '/');
            })
            .catch(error => {
                // console.log(error.message);
                Swal.fire({
                    position: "top",
                    icon: "error",
                    title: `${error.code}`,
                    showConfirmButton: false,
                    timer: 2000,
                });
            })
    }

    return (
        <div>
            <div className="text-center">
                <button onClick={handleGoogleLogin} className="btn btn-wide text-base bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-green-500 hover:to-blue-500">
                    <FaGoogle className="text-white text-lg" />Continue with Google
                </button>
            </div>

        </div>
    );
};

export default SocialLogin;