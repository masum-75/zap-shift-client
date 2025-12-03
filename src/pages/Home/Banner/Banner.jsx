import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div className="relative w-full">
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div>
          <img src={bannerImg1} />
        </div>
        <div>
          <img src={bannerImg2} />
        </div>
        <div>
          <img src={bannerImg3} />
        </div>
      </Carousel>

      <div className="absolute top-3/4 left-15 -translate-y-1/2 ">
        <p className="">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle.
          <br />
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
        <div className="flex gap-4 mt-2">
          <button className="bg-[#CAEB66] text-black font-semibold py-3 px-4 rounded-full shadow cursor-pointer hover:opacity-80 transition">
            Track Your Parcel
          </button>
          <button className="bg-white border border-t-amber-950 text-gray-600 font-medium py-2 px-4 rounded-full shadow cursor-pointer hover:bg-gray-100 transition">
            Be A Rider
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
