import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { 
    Input,
    Box,
    defineStyle,
    Button,
    Link,
    Stack,
    Card,
    Text,
    HStack,
    Center
} from "@chakra-ui/react";
import { Field } from '@/components/ui/field';
import { Checkbox } from '@/components/ui/checkbox';
import LoadingSVG from '@/components/svg/LoadingSVG';
import { Form } from '@/utils/types/types';


interface LoginCardProps {
    form: Form;
    setForm: (form: Form) => void;
    error: string | undefined;
    isLoading: boolean;
    action: (e: FormEvent) => void;
}


const LoginCard: React.FC<LoginCardProps> = ({ form, setForm, error, isLoading, action}) => {

    const [showCard, setShowCard ] = useState<boolean>(false);

    const showCardStyle: React.CSSProperties = {
        transition: 'all 0.4s ease-in-out',
        transform: showCard ? 'translateY(0)' : 'translateY(15px)',
        opacity: showCard ? "1" : "0",
    } 

    const loadingStyle: React.CSSProperties = {
        transition: 'all 0.3s ease-in-out',
        transform: isLoading ? 'translateX(70%)' : 'translateX(-100%)',
    }

    const buttonStyle: React.CSSProperties = {
        transition: 'all 0.3s ease-in-out',
        transform: isLoading ? 'translateX(100%)' : 'translateX(-50%)',
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
        <Card.Root as={'form'} w={'30rem'} minW={'20rem'} variant={'elevated'} style={showCardStyle} onSubmit={action}>
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
                            disabled={isLoading}
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
                            disabled={isLoading}
                        /> 
                        <Field css={floatingStyles}>Mot de passe</Field>
                    </Box>

                    <Checkbox 
                        _checked={{"& .chakra-checkbox__control": { bg: "orange", borderColor: "orange" }}} 
                        variant={'solid'} 
                        color={'softBlack'} 
                        cursor={'pointer'} 
                        onChange={(e: ChangeEvent<any>)=>(
                            setForm({...form, remember: e.target.checked})
                        )}
                    >
                        Se souvenir de moi
                    </Checkbox>
                    {error && <Text color={'#FF0000'}>{error}</Text>}
                </Stack>              
            </Card.Body>
            
            <Center>
                <HStack w={'25%'} overflow={'hidden'} position={'relative'}>
                    <LoadingSVG h={"50px"} sx={loadingStyle}/> 
                
                    <Button style={buttonStyle} type="submit" alignSelf={'center'} bg={{base:'orange', _hover:'orange.700'}} disabled={isLoading}>
                        Se connecter
                    </Button>  
                </HStack>
            </Center>
            
                
            

            <Card.Footer justifyContent={"flex-end"} mt={'1em'}>
                {!isLoading && <Link href="/register" color={'white'} fontSize={'sm'} focusRing={'none'}>Vous n'etes pas inscrit ?</Link>}
            </Card.Footer>
        </Card.Root>
    )
}

export default LoginCard;