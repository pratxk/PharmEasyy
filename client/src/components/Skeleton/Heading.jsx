import React from "react";

const Heading = ({ text, textColor}) => {
  return (
    <div className="text-center my-10">
      <h1 className={`text-4xl font-bold mb-2 ${textColor ? textColor : 'text-neutral'}`}>
        {text}
      </h1>
      <div className={`h-2 bg-gradient-to-r from-red-500 to-primary rounded-full w-1/4 mx-auto`}></div>
    </div>
  );
};

export default Heading;