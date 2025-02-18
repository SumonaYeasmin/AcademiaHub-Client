import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
    return (
        <div className="my-16 container mx-auto p-2">
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
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="relative h-[300px] md:h-[450px] xl:h-[550px] flex items-center justify-center text-center">
                        <img
                            src="https://i.ibb.co/zx13ww6/360-F-981581247-2-ARc766z3ep-COz-Ijb-Ub-Xna-IG0v-JQIpn6.jpg"
                            className="w-full h-full object-cover brightness-75"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 bg-black/30">
                            <h1 className="text-3xl md:text-5xl font-bold"> Secure & Advanced Technology</h1>
                            <p className="text-lg md:text-2xl mt-2">Real-time updates, secure payments, and advanced technology for a reliable education system.</p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="relative h-[300px] md:h-[450px] xl:h-[550px] flex items-center justify-center text-center">
                        <img
                            src="https://i.ibb.co/WcffqKR/Benefits-of-studying-online.jpg"
                            className="w-full h-full object-cover brightness-75"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 bg-black/30">
                            <h1 className="text-3xl md:text-5xl font-bold">Smart Class Management</h1>
                            <p className="text-lg md:text-2xl mt-2">Easily manage schedules and track student progress.</p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="relative h-[300px] md:h-[450px] xl:h-[550px] flex items-center justify-center text-center">
                        <img
                            src="https://i.ibb.co/b6fpWgw/close-up-student-reading-book-23-2148888822.jpg"
                            className="w-full h-full object-cover brightness-75"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 bg-black/30">
                            <h1 className="text-3xl md:text-5xl font-bold">Empowering Tutors</h1>
                            <p className="text-lg md:text-2xl mt-2">Advanced tools for seamless course management.</p>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 4 */}
                <SwiperSlide>
                    <div className="relative h-[300px] md:h-[450px] xl:h-[550px] flex items-center justify-center text-center">
                        <img
                            src="https://i.ibb.co/n0BL6D6/0x0.webp"
                            className="w-full h-full object-cover brightness-75"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 bg-black/30">
                            <h1 className="text-3xl md:text-5xl font-bold">Learn Anytime, Anywhere</h1>
                            <p className="text-lg md:text-2xl mt-2">Smart learning solutions for modern education.</p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
