import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [listening, setListening] = useState(false)
  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const synth = window.speechSynthesis

  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);

  if (!userData) return <Navigate to="/signin" />;
  if (!userData.assistantImage || !userData.assistantName) {
    return <Navigate to="/customize" />;
  }

  const handleLogout = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const speak = (text) => {
    const utterence = new SpeechSynthesisUtterance(text);
    synth.speak(utterence);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;

    speak(response);

    if (type === "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    if (type === "youtube_search") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }

    if (type === "youtube_play") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }

    if (type === "calculator_open") {
      window.open("https://www.google.com/search?q=calculator", "_blank");
    }

    if (type === "instagram_open") {
      window.open("https://www.instagram.com", "_blank");
    }

    if (type === "instagram_open") {
      const username = userInput?.trim();
      if (username) {
        window.open(`https://www.instagram.com/${username}/`, "_blank");
      } else {
        window.open("https://www.instagram.com", "_blank");
      }
    }

    if (type === "facebook_open") {
      window.open("https://www.facebook.com", "_blank");
    }

    if (type === "weather_show") {
      const query = encodeURIComponent(userInput || "current location weather");
      window.open(`https://www.google.com/search?q=weather+${query}`, "_blank");
    }

    if (type === "spotify_open") {
      const query = encodeURIComponent(userInput || "");
      window.open(`https://open.spotify.com/search/${query}`, "_blank");
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = "en-US";


    recognitionRef.current = recognition

    const isRecognizingRef = {current:false}


    // safe rec

    const safeRecognition = () => {
      try {
        if(!isRecognizingRef && !isRecognizingRef){
        recognition.start()
      }
      } catch (error) {
        if(error.name !== "InvalidStateError"){
          console.error("Start error:", error)
        }
      }
    }

    recognition.onstart = () => {
      console.log("Recognition started");
      isRecognizingRef.current = true;
      setListening(true)
    }

    recognition.onend = () => {
      console.log("Recognition ended");
      isRecognizingRef.current = false;
      setListening(false)

      if(!isSpeakingRef.current){
      setTimeout(() => {
        safeRecognition()
      },1000)
    }

    }


    recognition.onerror = (event) => {
      console.warn("Recognition  error:", event.error)
      isRecognizingRef.current = false
      setListening(false)

      if(event.error !== "aborted" && !isSpeakingRef.current){
        setTimeout(() => {
          safeRecognition()
        },1000)
      }
    }

    


    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log(transcript);

      if (
        transcript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
        const data = await getGeminiResponse(transcript);
        console.log(data);
        handleCommand(data)
      }
    };


  }, []);

  return (
    <div className="w-full h-screen bg-linear-to-t from-[black] to-[#070084] flex justify-center items-center flex-col gap-5 relative">
      <button
        className="min-w-[150px] h-[60px] bg-white rounded-full absolute top-[20px] right-[20px] text-black font-semibold text-[19px] cursor-pointer mb-4"
        onClick={() => navigate("/customize")}
      >
        Customize
      </button>

      <button
        className="min-w-[150px] h-[60px] bg-white rounded-full absolute top-[100px] right-[20px] text-black font-semibold text-[19px] cursor-pointer mb-4"
        onClick={() => handleLogout()}
      >
        Log Out
      </button>

      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={userData?.assistantImage}
          alt="assistant image"
          className="h-full object-cover rounded-2xl"
        />
      </div>

      <h1 className="text-white text-[18px] font-semibold ">
        {" "}
        I'm{" "}
        <span className="text-red-500 font-bold">
          {userData?.assistantName}
        </span>
      </h1>
    </div>
  );
};

export default Home;
