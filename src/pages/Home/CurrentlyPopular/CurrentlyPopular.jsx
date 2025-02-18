import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CurrentlyPopular = () => {
    const axiosSecure = useAxiosSecure();

    const { data: topEnrollments = [], isLoading, error } = useQuery({
        queryKey: ["topEnrollments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/top-enrollment");
            return res.data;
        },
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-gray-600">Loading...</span>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="text-xl text-gray-600">{error.message || "Error loading data!"}</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 my-10">
            <h2 className="text-3xl md:text-4xl italic font-bold mb-5 text-center text-teal-700">
                Currently Popular Classes
            </h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
                className="rounded-lg overflow-hidden shadow-lg"
            >
                {topEnrollments.map((classItem) => (
                    <SwiperSlide key={classItem._id}>
                         <div className="flex flex-col md:flex-row items-center bg-gray-100 p-3 rounded-lg shadow-md gap-x-16 border">
                            <img
                                src={classItem.photoURL}
                                alt={classItem.title}
                                className="w-full md:w-1/2 h-[300px] md:h-[450px] object-cover rounded-md"
                            />
                            <div className="text-center md:text-left md:w-1/2 pt-7 pb-10 md:space-y-3">
                                <h3 className="text-4xl font-semibold text-gray-800">{classItem.title}</h3>
                                <p className="text-gray-800 text-xl font-medium">
                                    <span className="font-semibold text-2xl italic">Price:</span> ${classItem.price}
                                </p>
                                <p className="text-gray-800 text-xl font-medium">
                                    <span className="font-semibold italic text-2xl">Enrolled:</span> {classItem.totalEnrolment}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CurrentlyPopular;
