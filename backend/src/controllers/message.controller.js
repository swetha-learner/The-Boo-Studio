import Message from "../models/message.model.js";
import User from "../models/user.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverChatId, myserver } from "../lib/socket.io.js";

export const getUsersInSidebar = async(req, res) => {
    try {
        const loggedInUserId = req.user._id; //protected route, so get id by req
        const filtterdUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

        res.status(200).json(filtterdUsers)
    } catch (error) {
        console.error("Error in getUsersInSidebar",error.message)
        req.status(500).json({error: "Internal server error"})
    }
}

export const getMessages = async(req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId},
                { senderId: userToChatId, receiverId: myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controllers", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export const sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      let imageUrl;
      if (image) {
        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
  
      await newMessage.save();
  
      //real-time logic
      const receiverChatId = getReceiverChatId(receiverId);
      //user online? send message in RT
      if (receiverChatId) {
        myserver.to(receiverChatId).emit("newMessage", newMessage);
      }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };