import user from '@/api/user';
import { useEffect } from "react"

const Dashboard = ()=>{
    useEffect(()=>{
        user.post("/logout",{},{
            withCredentials: true
        })
        .then(response => {
            console.log(response)
        })
        .catch(e =>{
            console.log(e)
        })
    },[])
    return (
        <div>DashBoard</div>
    )
}

export default Dashboard;