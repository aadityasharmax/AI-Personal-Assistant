import express from 'express'
import { Login, Logout, signUp } from '../controllers/auth.controller.js'


const authRouter = express.Router()

authRouter.post('/signup',signUp)
authRouter.post('/signin',Login)
authRouter.post('/logout',Logout)



export default authRouter

