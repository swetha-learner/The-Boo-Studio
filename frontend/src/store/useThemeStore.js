//save themes in local storage | refresh - theme remains unchanged
import { create } from "zustand";


export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "dracula",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme)
        set({ theme })
    }
}))