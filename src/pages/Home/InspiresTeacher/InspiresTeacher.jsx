import { Link } from "react-router-dom";

const InspiresTeacher = () => {
    return (
        <div>
            <section className="flex flex-wrap items-center justify-between p-10 bg-gradient-to-r from-blue-500 to-teal-500 text-white my-10">
                {/* Left Side: Image */}
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img
                        src="https://i.ibb.co/Zh3X1r2/lovepik-business-mens-virtual-screen-show-action-picture-501787376.jpg"
                        alt="Teacher inspiring students"
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>

                {/* Right Side: Text */}
                <div className="w-full md:w-1/2 md:pl-10 ">
                    <h2 className="text-xl md:text-3xl font-bold mb-4">Empower the Next Generation – Teach with Us!</h2>
                    <p className="text-base lg:text-lg mb-6">
                        Are you passionate about teaching and making a difference? Our platform is the perfect place for educators like you to share knowledge, connect with eager learners, and grow your teaching career.
                        We provide an easy-to-use interface, a supportive community, and opportunities to reach students worldwide. Become part of something that matters—teach, inspire, and make a lasting impact!
                    </p>
                    <Link to={'/teachOnAcademiaHub'}>
                        <button
                            className="px-2 md:px-6 py-3 bg-teal-700  md:text-lg font-semibold rounded-lg transition duration-300 "
                        >
                            Become a Teacher Today!
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default InspiresTeacher;
