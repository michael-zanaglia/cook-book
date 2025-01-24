import user from '@/api/user';
import { useNavigate } from 'react-router';
import { 
    Input,
    Box,
    defineStyle,
    Button,
    Link,
    Flex,
    Stack,
    Card,
    Text,
    HStack
} from "@chakra-ui/react";
import { Field } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Form, AxiosError } from "@/utils/types/types";
import LoadingSVG from '@/components/svg/LoadingSVG';


const Login = ()=>{

    const [showCard, setShowCard ] = useState<boolean>(false);
    
    const [isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | undefined>("");
    const [ form, setForm ] = useState<Form>({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    async function handleForm(e: FormEvent){
        e.preventDefault()
        setError("")
        setIsLoading(true)
        user.post("/login", {
            form
        },{
            withCredentials: true
        })
        .then(response => {
            console.log(response?.data?.message)
            navigate(-1)
        })
        .catch((e: AxiosError) => {
            console.log("err", e)
            setError(e.response?.data?.message)
        })
        .finally(()=>setIsLoading(false))
    }

    const showCardStyle: React.CSSProperties = {
        transition: 'all 0.4s ease-in-out',
        transform: showCard ? 'translateY(0)' : 'translateY(15px)',
        opacity: showCard ? "1" : "0",
    } 

    const loadingStyle: React.CSSProperties = {
        transition: 'all 0.4s ease-in-out',
        transform: isLoading ? 'translateX(400%)' : 'translateX(-100%)',
    }

    const buttonStyle: React.CSSProperties = {
        transition: 'all 0.4s ease-in-out',
        transform: isLoading ? 'translateX(400%)' : 'translateX(100%)',
    }
    
    const floatingStyles = defineStyle({
        pos: "absolute",
        bg: "transparent",
        px: "0.5",
        top: "-5",
        insetStart: "2",
        fontWeight: "normal",
        pointerEvents: "none",
        transition: "position",
        _peerPlaceholderShown: {
          color: "fg.muted",
          top: "2.5",
          insetStart: "3",
        },
        _peerFocusVisible: {
          color: "deepViolet",
          top: "-6",
          insetStart: "2",
        },
    })

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowCard(true)
        },300)  

        return() => clearTimeout(timer);
    },[])


    return (
        <Box bgGradient="to-b" gradientFrom="#F5F5F5" gradientTo="orange" h={'100vh'} w={'100vw'}>
            <Flex as={'div'} justify={'center'} alignItems={'center'} h={'100%'} w={'100%'}>
                <Card.Root as={'form'} w={'30%'} minW={'20rem'} variant={'elevated'} style={showCardStyle} onSubmit={handleForm}>
                    <Card.Header>
                        <Card.Title>Connexion</Card.Title> 
                    </Card.Header>

                    <Card.Body>    
                        <Stack gap={'1.5em'}>
                            <Box pos={'relative'}> 
                                <Input 
                                    type="email" 
                                    className="peer" 
                                    placeholder="" 
                                    focusRingColor={"orange"} 
                                    onChange={(e: ChangeEvent<HTMLInputElement>)=>(
                                        setForm({...form, email: e.target.value})
                                    )}
                                    required
                                /> 
                                <Field css={floatingStyles}>Email</Field>
                            </Box>
                            
                            <Box pos={'relative'}> 
                                <Input 
                                    type="password" 
                                    className="peer" 
                                    placeholder="" 
                                    focusRingColor={"orange"} 
                                    onChange={(e: ChangeEvent<HTMLInputElement>)=>(
                                        setForm({...form, password: e.target.value})
                                    )}
                                    required
                                /> 
                                <Field css={floatingStyles}>Mot de passe</Field>
                            </Box>

                            <Checkbox 
                                _checked={{"& .chakra-checkbox__control": { bg: "orange", borderColor: "orange" }}} 
                                variant={'solid'} 
                                color={'softBlack'} 
                                cursor={'pointer'} 
                            >
                                Se souvenir de moi
                            </Checkbox>
                            {error && <Text color={'#FF0000'}>{error}</Text>}
                        </Stack>              
                    </Card.Body>
                    
                    
                        <HStack w={'100%'} overflow={'hidden'} position={'relative'}>
                            <LoadingSVG sx={loadingStyle}/> 
                        
                            <Button style={buttonStyle} type="submit" alignSelf={'center'} bg={{base:'orange', _hover:'orange.700'}} disabled={isLoading}>
                                Se connecter
                            </Button>  
                        </HStack>
                        
                    

                    <Card.Footer justifyContent={"flex-end"} mt={'1em'}>
                        <Link href="/register" color={'white'} fontSize={'sm'} focusRing={'none'}>Vous n'etes pas inscrit ?</Link>
                    </Card.Footer>
                </Card.Root>
            </Flex>
        </Box>
    )
}

export default Login;