import user from '@/api/user';
import { useEffect } from "react";
const Login = ()=>{
    useEffect(()=>{
        user.post("/login", {
            email: "michael.zanaglia@laplateforme.io",
            password: "Pokemine20-"
        },{
            withCredentials: true
        })
        .then(response => console.log(response?.data?.message))
        .catch(e=> console.log("err", e))
    },[])
    return (
        <div>
            Login
        </div>
    )
}

export default Login;