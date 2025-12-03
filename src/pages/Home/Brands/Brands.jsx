import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import amazonVec from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonStar from "../../../assets/brands/moonstar.png";
import randStad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import starPeople from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const brandLogos = [
  amazon,
  amazonVec,
  casio,
  moonStar,
  randStad,
  star,
  starPeople,
];

const Brands = () => {
  return (
    <div>
      <h2 className="font-bold text-2xl text-center mb-4">We've helped thousands of sales teams</h2>
      <Swiper
        loop={true}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {brandLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
