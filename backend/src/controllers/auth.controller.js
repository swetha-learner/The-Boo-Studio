import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
    // goal : signup user, hash pwd, gen token to authenticate
    //fetch user data
    const { email, fullname,  uname, password, location } = req.body
    try {
        // TODO : add this in if blk --> !fname || !lname ||
        if( !email || !fullname || !uname || !password || !location ){
            return res.status(400).json({ message: "All the fields are required!"})
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters"})
        }

        const user = await User.findOne({email})

        if (user) return res.status(400).json({ message: "Email already exists!"})
        
        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)

        //create new user
        const newUser = new User({
            fullname,
            email,
            uname,
            password:hashpassword,
            location,
            

        })
        if(newUser){
            //generate JWT token --> utils.js
            generateToken(newUser._id, res) //unique id created by MonogoDb i.e, _id
            const savedUser = await newUser.save() //creates user

            res.status(201).json(savedUser)
        }
        else{
            res.status(400).json({message : "Invalid User data"})
        }
    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({message: "Internal server error"})

    }
}

export const login = async (req, res) => {
    const {email , password} = req.body
    try {
        const user = await User.findOne({email})

        if(!email || !password){
            return res.status(400).json({ message: "All the fields are required!"})
        }

        if(!user){
            return res.status(400).json({message: " Account doesn't exists!"})
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"})
        }

        generateToken(user._id,res)

        res.status(200).json({user})
    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ message: "Internal server error"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({ message: "Logged out successfully"})
    } catch (error) {
        console.log("Error in controller", error.message)
        res.status(500).json({ message: "Internal server error"})
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body
        const userId = req.user._id
        
        
        if(!profilePic){
            return res.status(400).json({ message: "Profile pic is required"})
        }

        const uploadRes = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            { profilePic:uploadRes.secure_url },
            { new:true }
        )

        
        
        
        res.status(200).json(updatedUser) //return new profile pic
        
    } catch (error) {
        console.log("Error in updating profile", error)
        res.status(500).json({ message: "Internal server error"})
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user) //check authenticated user
    } catch (error) {
        console.log("Error in checkAuth controller", error.message)
        res.status(500).json({ message: "Internal server error"})
    }
}

export const deleteAccount = async (req, res) => {
    
    try {
        const getid = req.user._id
        await User.findByIdAndDelete({_id: getid})
        res.status(200).json({ message: "Deleted your account"})
    } catch (error) {
        console.log("Error in  deleteAccount controller", error.message)
        res.status(500).json({ message: "Internal server error"})
    }
}
