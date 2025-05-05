import { create } from "zustand";
// import { persist } from "zustand/middleware"
import user from '@/api/user';
import { isAuthStore } from "../types/types";

export const useIsAuthStore = create<isAuthStore>()(

        (set)=>({
            isAuth: null,
            setIsAuth: (data) => set({isAuth: data}),
            checkAuth: async() => {
                try {
                    const response = await user.get("/auth",{ withCredentials: true})
                    console.log("z", response?.data?.user)
                    set({ isAuth: response?.data?.user })
                } catch(e: any){
                    console.log("zustand", e?.response?.data?.message)
                    set({ isAuth: null })
                }
            }
        })
)

// persist(
//     (set)=>({
//         isAuth: null,
//         setIsAuth: (data) => set({isAuth: data}),
//         checkAuth: async() => {
//             try {
//                 const response = await axios.get("http://localhost:3000/auth",{ withCredentials: true})
//                 set({ isAuth: response?.data?.user })
//                 console.log("z", response?.data?.user)
//             } catch(e){
//                 console.log("zustand", e)
//                 set({ isAuth: null })
//             }
//         }
//     }),{
//         name : "auth-store"
//     }
// )