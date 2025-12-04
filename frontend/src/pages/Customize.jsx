import React, { useContext, useRef, useState } from 'react'
import Card from '../components/Card.jsx'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { LuImagePlus } from "react-icons/lu";
import {userDataContext} from '../context/UserContext.jsx'
import { useNavigate } from "react-router-dom";

const Customize = () => {
  const navigate = useNavigate()
    const {frontendImage,setFrontendImage,backendImage, setBackendImage,selectedImage, setSelectedImage} = useContext(userDataContext)
    const inputImage = useRef()

    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }



  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#1408ff] flex justify-center items-center flex-col p-5 gap-5'>

        <h1 className='text-white text-[30px] text-center mb-6'>Select your <span className='text-purple-500 font-bold'>AI Assistant</span> Image</h1>

        <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-5 mb-4'>

        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image4} />
        <Card image={image5} />
        <Card image={image6} />
        <Card image={image7} />


        <div className={`w-[80px] h-[160px] lg:w-[150px] lg:h-[250px] bg-[#030378] border-2 border-[#0000ffab] flex justify-center items-center rounded-2xl  overflow-hidden hover:shadow-2xl hover:shadow-blue-600 transition-all duration-300 hover:scale-105 hover:border-4 hover:border-white cursor-pointer ${selectedImage == "input" ? "border-4 border-white shadow-2xl transition scale-105":null}`}
        onClick={() => {
          inputImage.current.click()
          setSelectedImage("input")
        }

        }
        >

            {!frontendImage &&   <LuImagePlus className='text-white w-[25px] h-[25px]'/> }

            {frontendImage && <img src={frontendImage} className='h-full object-cover'/> }

  

        
    </div>

    <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>

    
        </div>

        {selectedImage &&  <button className="min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px] cursor-pointer mb-4"
        onClick={() => navigate('/customize2')}
        >Next</button>
}

        
        
    </div>
  )
}

export default Customize