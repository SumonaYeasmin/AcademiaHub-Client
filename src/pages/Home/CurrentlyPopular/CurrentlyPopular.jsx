import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Swiper, SwiperSlide } from "swiper/react";
// import { SwiperSlide } from "swiper/react";
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
    console.log(topEnrollments);

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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Curently Popular Classes</h2>
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
                        {/* <div className="p-4 border border-gray-300 rounded-lg shadow-md"> */}
                            <img
                                src={classItem.photoURL}
                                alt={classItem.title}
                                className="w-full h-[300px] md:h-[450px] xl:h-[550px] object-cover rounded-md mb-4"
                            />
                            <h3 className="text-2xl font-semibold">{classItem.title}</h3>
                            {/* <p className=" text-gray-700">{classItem.description}</p> */}
                            <p className=" text-gray-500">Price: ${classItem.price}</p>
                            <p className="mt-2 text-gray-800">Enrolled: {classItem.totalEnrolment}</p>
                        {/* </div> */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CurrentlyPopular;