// import axios from 'axios';
// import { useState } from "react";
import { useIsAuthStore } from "@/utils/store/useIsAuthStore";

const Profile = ()=>{
    const { isAuth } = useIsAuthStore();
    console.log(isAuth)
    //const [name] = useState("")
    // useEffect(()=>{
    //     axios.get("http://localhost:3000/profile",{
    //         withCredentials: true
    //     })
    //     .then(response => {
    //         console.log(response)
    //         setName(response?.data?.user?.firstname)
    //     })
    //     .catch(e =>{
    //         if(e.status === 403){
    //             window.location.href = "/login"
    //         }
    //     })
    // },[])
    return (
        <div>
            {`Bienvenue, ${isAuth?.firstname}`}
        </div>
    )
}

export default Profile;