import React from "react";
import "./loader.css";
function Loader() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flipping">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
