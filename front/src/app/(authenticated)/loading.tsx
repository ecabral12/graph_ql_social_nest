import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full p-24">
      <div className="typewriter">
        <div className="slide">
          <i></i>
        </div>
        <div className="paper"></div>
        <div className="keyboard"></div>
      </div>
    </div>
  );
}

export default Loading;
