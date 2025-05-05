// import axios from 'axios';
// import { useState } from "react";
import NavBar from "@/components/NavBar";
import { Avatar } from "@/components/ui/avatar";
import { useIsAuthStore } from "@/utils/store/useIsAuthStore";
import { Box, Card, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdMail } from "react-icons/io";

const Profile = ()=>{
    const { isAuth } = useIsAuthStore();
    console.log(isAuth)
    const [age, setAge] = useState<number|null>(null)
    
    useEffect(()=>{
        setAge(findAge())
    },[isAuth])

    function findAge(){
        const currYear = new Date().getFullYear()
        const birthYear =  isAuth?.birthdate && new Date(isAuth?.birthdate)?.getFullYear()
        const currMonth = new Date().getMonth()
        const birthMonth =  isAuth?.birthdate && new Date(isAuth?.birthdate)?.getMonth()
        

        if (birthYear && birthMonth) {
            let age = currYear - birthYear
            let monthDelta = currMonth - birthMonth
            if(monthDelta < 0 || monthDelta === 0) return age--;
        }
        return null
    }

    return (
        <Box 
            backgroundColor="#292929" 
            minH={'100vh'} 
            w={'100vw'} 
            padding={{
                base: '2%',
            }} 
        >
            <HStack>
                <NavBar/>
                <VStack>
                    <Card.Root 
                        border={'3px solid transparent'} 
                        borderImage={"linear-gradient(to bottom right, orange 0%, #000000 60%, orange 85%, #FFFF00 100%)"} 
                        borderImageSlice={1}  
                        p={5}
                        display={"flex"}
                        alignItems={"center"}
                    >
                        <Avatar src={`http://localhost:3000/${isAuth?.profile_image_path?.path}`} h={"128px"} w={"128px"}/>
                        <Card.Title>{isAuth?.firstname && isAuth?.firstname?.charAt(0)?.toUpperCase() + isAuth?.firstname?.slice(1)} {isAuth?.lastname.toUpperCase()}</Card.Title>
                        <Card.Description alignSelf={"start"}>
                                
                                <span style={{display: "flex", alignItems: "center", gap: "5px"}}><IoMdMail />{isAuth?.email}</span>
                                {age && <span style={{display: "flex", alignItems: "center", gap: "5px"}}><IoMdMail />{age} ans</span>}
                                
                        </Card.Description>
                    </Card.Root>
                </VStack>
            </HStack>
            
        </Box>
        
    )
}

export default Profile;