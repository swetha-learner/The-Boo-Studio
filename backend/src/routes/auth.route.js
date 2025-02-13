import express from "express"
import { checkAuth, deleteAccount, login, logout, signup, updateProfile,  } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login",login )
router.post("/logout",logout )

router.delete("/delete", protectRoute, deleteAccount)

router.put("/update-profile", protectRoute, updateProfile) //protectRoute --> middleware- checks auth of user

//auth
router.get("/check", protectRoute, checkAuth)

export default router


