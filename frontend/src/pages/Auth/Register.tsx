import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Box, Button, Card, Flex, Input, Link, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";


const Register = () => {
    const [showCard, setShowCard] = useState<boolean>(false)
    const showCardStyle:React.CSSProperties = {
        transition: 'all 0.4s ease-in-out',
        transform: showCard ? 'translateY(0)' : 'translateY(-15px)',
        opacity: showCard ? "1" : "0",
    } 
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowCard(true)
        },300)

        return() => clearTimeout(timer);
    },[])
    return (
        <Box bgGradient="to-t" gradientFrom="#F5F5F5" gradientTo="orange" h={'100vh'} w={'100vw'} >
            <Flex as={'div'} justify={'center'} alignItems={'center'} h={'100%'} w={'100%'}>
                <Card.Root as={'form'} w={'30%'} minW={'300px'} variant={'elevated'} style={showCardStyle}>
                    <Card.Header>
                        <Card.Title>Inscription</Card.Title> 
                    </Card.Header>

                    <Card.Body>    
                        <Stack gap={'0.5em'}>
                            <Field label='Nom' required>
                                <Input type="text" focusRingColor={"orange"} required/>
                            </Field>

                            <Field label='Prénom' required>
                                <Input type="text" focusRingColor={"orange"} required/>
                            </Field>
                    
                            <Field label='Email' required>
                                <Input type="email" focusRingColor={"orange"} required/>
                            </Field>

                            <Field label='Mot de passe' required>
                                <Input type="password" focusRingColor={"orange"}  required/>
                            </Field>

                            <Field label='Confirmer le mot de passe' required>
                                <Input type="password" focusRingColor={"orange"}  required/>
                            </Field>  
                            <Checkbox _checked={{"& .chakra-checkbox__control": { bg: "orange", borderColor: "orange" }}} variant={'solid'} color={'#FAFAFA'} cursor={'pointer'}>Accepter les conditions d'utilisations</Checkbox>
                        </Stack>              
                    </Card.Body>
                    
                    <Button type="submit" alignSelf={'center'} bg={{base:'orange', _hover:'orange.700'}}>
                        S'inscrire
                    </Button>

                    <Card.Footer justifyContent={"flex-end"} mt={'1em'}>
                        <Link href="/login" color={'white'} fontSize={'sm'} focusRing={'none'}>Vous avez deja un compte ?</Link>
                    </Card.Footer>
                </Card.Root>
            </Flex>
        </Box>
    )
}

export default Register;