import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FcRating } from "react-icons/fc";

const Feedback = () => {
    const axiosSecure = useAxiosSecure();

    const { data: feedbacks = [] } = useQuery({
        queryKey: ["techingReports"],
        queryFn: async () => {
            const res = await axiosSecure.get('/feedback');
            return res.data;
        },
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-center text-teal-600 italic">
                Student Feedback
            </h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, pauseOnMouseEnter: true }}
                loop={true}
                spaceBetween={30}
                slidesPerView={1}
                className="rounded-lg overflow-hidden shadow-xl "
            >
                {feedbacks.map((comment) => (
                    <SwiperSlide key={comment._id}>
                        <div className="flex flex-col md:flex-row items-center p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <img
                                src={comment.photoURL}
                                alt={comment.title}
                                className="w-full h-[250px] md:h-[400px] xl:h-[500px] object-cover rounded-md mb-6 md:mb-0 md:w-[50%]"
                            />
                            <div className="md:w-[50%] pl-0 md:pl-6">
                                <h3 className="text-3xl md:text-5xl py-2 font-semibold  bg-gradient-to-r from-teal-500 via-blue-500 to-green-600 text-transparent bg-clip-text md:mb-3">
                                    {comment.title}
                                </h3>
                                <p className="text-2xl font-medium md:text-2xl text-transparent bg-gradient-to-r from-indigo-400 via-cyan-500 to-fuchsia-500 bg-clip-text leading-relaxed md:mb-2 italic">
                                    FeedBack text: {comment.description}
                                </p>
                                <p className="text-lg font-medium md:text-xl text-transparent bg-gradient-to-r from-blue-800 via-purple-800 to-pink-700 bg-clip-text italic">
                                    Posted by: <span className="font-medium text-gray-700">{comment.name}</span>
                                </p>
                                <p className="flex items-center text-lg font-medium  ">
                                    <span className="mr-2 bg-gradient-to-r from-blue-800 via-purple-800 to-pink-700 bg-clip-text italic">Rating:</span>
                                    <span className="text-cyan-500 text-xl">{comment.rating}</span>
                                    <FcRating className="ml-2 text-xl" />
                                </p>
                                {/* <p className="flex items-center">Rating :{comment.rating}<FcRating /></p> */}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Feedback;
