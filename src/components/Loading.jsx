import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full h-full border-4  border-gray-600 rounded-lg">
      <h1 className="text-2xl">Loading</h1>
      <RotatingLines
        strokeColor="#fb923c"
        strokeWidth="5"
        animationDuration="0.75"
        width="120"
        visible={true}
      />
    </div>
  );
};

export default Loading;
