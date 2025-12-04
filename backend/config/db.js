import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB connnected successfully")
    } catch (error) {
        console.log("DB connection failed", error)
    }
}