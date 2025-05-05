import { Outlet, Navigate } from "react-router";
import { useIsAuthStore } from "@/utils/store/useIsAuthStore";
import { useEffect, useState } from "react";


const NotProtectedRoutes = () => {
    const { isAuth, checkAuth } = useIsAuthStore()
    const [isLoad, setIsLoad] = useState(true)
    useEffect(()=>{
        async function check(){
            await checkAuth()
            setIsLoad(false)
        }
        check()
    }, [])

    if(isLoad){
        return <div>Chargement...</div>
    }
    return (
        isAuth?.id ?
            <Navigate to={"/"}/> :
            <Outlet/> 
    )
}

export default NotProtectedRoutes;