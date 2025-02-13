import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.MODE === "developement" ? "http://localhost:3000" : "/"
 
//set()--> callback func
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    activeUsers: [],

    socket: null,

    checkAuth: async () => {
        try {
            //send req to endpoints
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
            get().connectChat()

        } catch (error) {
            console.log("Error in checkAuth",error)
            set({ authUser: null} )
        } finally{
            set({ isCheckingAuth: false })
        }
        
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data }) //authenticating the user after signing up
            toast.success("Account created successfully!")
            get().connectChat()
        } catch (error) {
            toast.error(error.response.data.message) //error message frm sign in page
        } finally {
            set({ isSigningUp: false })
        }
    },  

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success("Logged in successfully",{
                icon: '❤️'
            })

            get().connectChat()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success("We're gonna miss you", {
                icon: '😟',
              })

            get().disconnectChat()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/auth/update-profile", data)
            set({ authUser: res.data })
            toast.success("Hmm, Nice profile Pic!", {
                icon: '😍',
              })
        } catch (error) {
            console.log("Error in update-profile", error)
            toast.error("error in updateing your profile pic")
        } finally {
            set({ isUpdatingProfile: false })
        }
    },
    
    deleteAccount: async () => {
        try {
            await axiosInstance.delete("/auth/delete")
            toast.success("your boo-mates gonna miss you", {
                icon: '😟',
              })
            set({ authUser: null })
        } catch (error) {
            console.log("Error in del acc",error)
        }
    },

    connectChat: () => {
        // connecting  authenticated users only
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        })
        socket.connect()

        set({ socket: socket }) //state update

        //active user updates
        socket.on("getActiveUsers", (userIds) => {
            set({ activeUsers: userIds})
        })

    },
    disconnectChat: () => {
        if(get().socket?.connected) get().socket.disconnect()
    },

    
}))





// managing states of user. checkAuth() -> to show loader icon while checking the user is authenticated!