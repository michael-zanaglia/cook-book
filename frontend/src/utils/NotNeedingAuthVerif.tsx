import { Outlet } from "react-router";
import { useIsAuthStore } from "@/utils/store/useIsAuthStore";
import { useEffect, useState } from "react";

const NotNeedingAuthVerif = () => {
    const { isAuth, checkAuth } = useIsAuthStore()
    const [isLoad, setIsLoad] = useState(true)
    useEffect(()=>{
        async function check(){
            await checkAuth()
            setIsLoad(false)
        }
        check()
        console.log(isAuth)
    }, [])

    if(isLoad){
        return <div>Chargement...</div>
    }
    return (
        <Outlet/>
    )
}

export default NotNeedingAuthVerif;