import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.mytoken //requesting for the token

        if(!token){
            return res.status(401).json({ message: "Unauthourized access - No Token provided"})    
        }

        const decode_token = jwt.verify(token, process.env.JWT_SECRET)

        if(!decode_token){
            return res.status(401).json({ message: "Unauthourized access - Invalid Token"})    
        }

        const user = await User.findById(decode_token.userId).select("-password")

        if(!user)
        {
            return res.status(404).json({ message: "User not found"})    
        }
        req.user = user

        next() //updateProfile from controller
    } catch (error) {
        console.log("Error in ProtectRoute Middleware")
        res.status(500).json({ message: "Internal error"})    
    }
}

