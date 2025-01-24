import { Outlet, Navigate } from "react-router";
import { useIsAuthStore } from "@/utils/store/useIsAuthStore";
import { useEffect, useState } from "react";


const NotAuthRoutes = () => {
    const { isAuth, checkAuth } = useIsAuthStore()
    const [isLoad, setIsLoad] = useState(true)
    useEffect(()=>{
        async function check(){
            await checkAuth()
            setIsLoad(false)
            console.log(isAuth, "dans la func")
        }
        check()
        console.log(isAuth)
    }, [])

    if(isLoad){
        return <div>Chargment...</div>
    }
    return (
        isAuth ?
            <Navigate to={"/"}/> :
            <Outlet/> 
    )
}

export default NotAuthRoutes;