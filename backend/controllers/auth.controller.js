import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genToken } from "../config/token.js";




//                                    <-----------------------------User Signup---------------------------->


export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }

    if (password.length > 20) {
      return res
        .status(400)
        .json({ message: "Password must be less than 20 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

const token = await genToken(user._id)

// setting cookie in browser

res.cookie("token", token,{
    httpOnly:true,
    maxAge: 7*24*60*60*1000,
    sameSite:"strict",
    secure:false
})


return res.status(201).json({message:"Sign In successfull",user})

  } catch (error) {
    return res.status(500).json({message:`Sign up error ${error}`})
  }
};



//                              <---------------------------- Login ------------------------------>


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
    }

const token = await genToken(user._id)

// setting cookie in browser

res.cookie("token", token,{
    httpOnly:true,
    maxAge: 7*24*60*60*1000,
    sameSite:"strict",
    secure:false
})


return res.status(200).json({message:"Logged In successfully",user})

  } catch (error) {
    return res.status(500).json({message:`Log In error ${error}`})
  }
};




//                                    <---------------------------- Logout ------------------------------>

export const Logout = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Logged out successfully"})

    } catch (error) {
        return res.status(500).json({message:`Log Out error ${error}`})
    }
}