import mongoose from "mongoose"
//import validators from "validator"

const userSchema = mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,    
        },
        fullname:{
            type: String,
            required: true, 
        },

        uname:{
            type: String,
            required: true,
            unique: true,
            minlength: 6,
            maxlength: 30,
        },

        password:{
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "" ,
        },
        location: {
            type: String,
        }
        
    },
    { timestamps: true },
)

const User = mongoose.model("User", userSchema)

export default User