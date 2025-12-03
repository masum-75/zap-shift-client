import React from "react";
import data from "../../../public/data/howItWorks.json";

const HowItWorks = () => {
  return (
    <div className="py-12 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">How it works.</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition"
          >
            <img className="w-10 h-10 mx-auto mb-4" src={item.icon} alt="" />
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
