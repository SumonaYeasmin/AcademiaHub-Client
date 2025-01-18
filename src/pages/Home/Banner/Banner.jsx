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
             
                <SwiperSlide>
                    <div className="relative h-[300px] md:h-[450px] xl:h-[550px] flex items-center justify-center ">
                        <img
                            src="https://i.ibb.co.com/zx13ww6/360-F-981581247-2-ARc766z3ep-COz-Ijb-Ub-Xna-IG0v-JQIpn6.jpg"
                            className="w-full h-full object-cover brightness-90"
                        />
                        
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="relative h-[300px] md:h-[450px] xl:h-[550px] flex items-center justify-center ">
                        <img
                            src="https://i.ibb.co.com/WcffqKR/Benefits-of-studying-online.jpg"
                            className="w-full h-full object-cover brightness-90"
                        />
                        
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="relative h-[300px] md:h-[450px] xl:h-[550px] flex items-center justify-center ">
                        <img
                            src="https://i.ibb.co.com/b6fpWgw/close-up-student-reading-book-23-2148888822.jpg"
                            className="w-full h-full object-cover brightness-90"
                        />
                       
                    </div>
                </SwiperSlide>

                {/* Slide 4 */}
                <SwiperSlide>
                    <div className="relative h-[300px] md:h-[450px] xl:h-[550px] flex items-center justify-center ">
                        <img
                            src="https://i.ibb.co.com/n0BL6D6/0x0.webp"
                            className="w-full h-full object-cover brightness-90"
                        />
                       
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;

        
          