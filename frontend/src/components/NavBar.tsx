import user from "@/api/user";
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import { capitalize } from "@/utils/helpingFunc/capitalize";
import { useIsAuthStore } from "@/utils/store/useIsAuthStore";
import { Button, Link, VStack, Text } from "@chakra-ui/react";
import { PiChefHat } from "react-icons/pi";
import { useNavigate } from "react-router";

const NavBar = () => {
    const { isAuth } = useIsAuthStore();
    const navigate = useNavigate()

    function logout(){
            user.post("/logout",{},{
                withCredentials: true
            })
            .then(response => {
                console.log(response)
                navigate('/login')
            })
            .catch(e =>{
                console.log(e)
            })
    }
    
    return (
        <AccordionRoot 
            collapsible 
            bg="#353535" 
            rounded="sm" 
            variant={'plain'}
            w="100%" 
            maxW={'400px'}
            defaultValue={["menu"]}
            p={2}
        >
            <AccordionItem value="menu">
            <AccordionItemTrigger>
                <Avatar fallback={<PiChefHat />} src={ isAuth ? `http://localhost:3000/${isAuth.profile_image_path.path}` : "#" } variant="subtle" colorPalette="orange" />
                { isAuth ? <Text>{capitalize(isAuth.firstname)}</Text> : <Text>Guest</Text> }
            </AccordionItemTrigger>
            <AccordionItemContent paddingLeft={'4px'}><Link href="/profile">Profile</Link></AccordionItemContent>
            <AccordionItemContent paddingLeft={'4px'}><Link href="/">Home</Link></AccordionItemContent>
            <AccordionItemContent paddingLeft={'4px'}><Link href="/dashboard">Dashboard</Link></AccordionItemContent>
            <AccordionItemContent paddingLeft={'4px'}><Link href="/receipe-edit">Vos Favoris</Link></AccordionItemContent>
            <AccordionItemContent paddingLeft={'4px'}><Link href="/dashboard/new">Partager une recette</Link></AccordionItemContent>
            <AccordionItemContent paddingLeft={'4px'}>
                {
                    isAuth?.id ? (
                        <Button 
                            color={"#f5f5f5"} 
                            bg={{base:'red.600', _hover:'red.700'}}
                            onClick={logout}
                        >
                            Déconnexion
                        </Button>   
                    ) : (
                        <VStack alignItems={'flex-start'}>
                            <Button 
                                color={"#f5f5f5"} 
                                bg={{base:'blue.600', _hover:'blue.700'}}
                                onClick={()=>navigate('/login')}
                            >
                                Connexion
                            </Button>  
                            <Button 
                                color={"#f5f5f5"} 
                                bg={{base:'green.600', _hover:'green.700'}}
                                onClick={()=>navigate('/register')}
                            >
                                Inscription
                            </Button>  
                        </VStack>
                    )

                }
                
            </AccordionItemContent>
            </AccordionItem>
        </AccordionRoot>
    )
}

export default NavBar;