import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";

const Card = ({ image }) => {
  const {
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);
  return (
    <div
      className={` w-[80px] h-[160px] lg:w-[150px] lg:h-[250px] bg-[#030378] border-2 border-[#0000ffab] rounded-2xl  overflow-hidden hover:shadow-2xl hover:shadow-blue-600 transition-all duration-300 hover:scale-105 cursor-pointer hover:border-4 hover:border-white ${
        selectedImage == image
          ? "border-4 border-white shadow-2xl transition scale-105"
          : null
      }`}
      onClick={() => {
        setSelectedImage(image)
        setBackendImage(null)
        setFrontendImage(null)
      }}
    >
      <img src={image} className="h-full object-cover" />
    </div>
  );
};

export default Card;
