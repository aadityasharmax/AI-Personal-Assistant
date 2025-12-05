import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext.jsx'
import axios from "axios"
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Customize2 = () => {
    const {userData,  backendImage,selectedImage, serverUrl,setUserData} = useContext(userDataContext)
    const [assistantName,setAssistantName] = useState(userData?.assistantName || "")
    const navigate = useNavigate()

    const handleUpdateAssistant = async() => {
      try {
        let formData = new FormData()
        formData.append("assistantName",assistantName)
        if(backendImage){
          formData.append("assistantImage",backendImage)
        }else{
          formData.append("imageUrl",selectedImage)
        }
        const result = await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})

        console.log(result.data)
        setUserData(result.data)
      } catch (error) {
        console.log(error)
      }
    }


    
  return (
    <div className='w-full h-screen bg-linear-to-t from-[black] to-[#1408ff] flex justify-center items-center flex-col p-5 gap-5 relative'>

      <IoIosArrowRoundBack className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px] '
      onClick={() => navigate('/customize')}
      />
    
    <h1 className='text-white text-[30px] text-center mb-6'>Enter your <span className='text-purple-500 font-bold'>AI Assistant</span> Name</h1>


    <input
          type="text"
          placeholder="eg., Jarvis"
          required
          onChange={(e) => setAssistantName(e.target.value)}
          value={assistantName}
          className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white px-[20px] py-[10px] rounded-full text-[18px] placeholder-gray-300 mb-6"
        />

        {assistantName && <button className="min-w-[250px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px] cursor-pointer mb-4"
        onClick={() => {
          handleUpdateAssistant()
          navigate('/')
        }}
        >
            Create Assistant
        </button>}


        

    </div>
  )
}

export default Customize2