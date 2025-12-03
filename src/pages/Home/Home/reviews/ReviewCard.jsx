import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const {
    userName,
    review:testimonial,
    ratings,
    
    // user_photoURL,
    date,
  } = review;
  return (
    <div className="max-w-sm bg-pink-100 p-6 rounded-xl shadow-md">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-2xl text-[#CAEB66] mb-3" />

      {/* Message */}
      <p className="text-gray-700 leading-relaxed mb-4">
       {testimonial}
      </p>

      <div className="flex gap-1 mb-4 text-yellow-500">
        {ratings} <FaStar></FaStar>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-4">
       
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        {/* Circle Avatar */}
        <div className="w-10 h-10 rounded-full bg-[#CAEB66]">
            {/* {user_photoURL} */}
        </div>

        {/* Name + Position */}
        <div>
          <h4 className="font-bold text-gray-800"> {userName}</h4>
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
