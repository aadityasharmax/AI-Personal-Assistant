import React, { useContext, useState } from "react";
import bg from "../assets/authBg.png";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      navigate("/")
      setUserData(result.data.user);
      console.log("after login setUserData:", result.data.user);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setUserData(null);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000048] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center px-[20px]"
        onSubmit={handleSignIn}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Sign In To AI <span className="text-blue-600">Virtual Assistant</span>
        </h1>

        <input
          type="text"
          placeholder="Enter you email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white px-[20px] py-[10px] rounded-full text-[18px] placeholder-gray-300 mb-6"
        />

        <div className="relative w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] placeholder-gray-300 mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter you password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white px-[20px] py-[10px] rounded-full text-[18px] placeholder-gray-300 mb-6"
          />

          {!showPassword && (
            <FaRegEye
              className="absolute top-5 right-[18px] text-white w-[25px] h-[25px] cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}

          {showPassword && (
            <FaRegEyeSlash
              className="absolute top-5 right-[18px] text-white w-[25px] h-[25px] cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        {err.length > 0 && (
          <p className="text-orange-400 text-lg mb-3">*{err}</p>
        )}

        <button
          className="min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold text-[19px] cursor-pointer mb-4"
          disabled={loading}
        >
          {loading ? "L...oading" : "Sign In"}
        </button>

        <p className="text-white text-18px" onClick={() => navigate("/signup")}>
          Register as New User ?{" "}
          <span className="text-blue-400 cursor-pointer">Sign In</span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
