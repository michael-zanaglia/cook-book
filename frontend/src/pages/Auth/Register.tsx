import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Box, Button, Card, Center, Flex, HStack, Input, Link, Stack, Text } from "@chakra-ui/react";
import { Formik, Form, Field as FormikField } from "formik";
import { useEffect, useState } from "react";
import { registerSchema } from "@/utils/validationYup/registerValidation";
import LoadingSVG from "@/components/svg/LoadingSVG";
import { sleep } from "@/utils/helpingFunc/sleep";
import { AxiosErrorType, AxiosResponseType } from "@/utils/types/types";
import user from "@/api/user";
import { AxiosResponse } from "axios";
import { toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router";

const Register = () => {
    const [showCard, setShowCard] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>("")

    const navigate = useNavigate()

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

    async function register(form: any){
        await sleep(3000)
        user.post("/register",{
            form
        },{})
        .then(async (response: AxiosResponse<AxiosResponseType>) => {
            setError("")
            const successful = response.data.message;
            const toast = toaster.create({
                title: successful,
                description: "Vous allez etre redirigé vers la page de connexion...",
                type: "loading",
            })
            await sleep(3000);
            toaster.dismiss(toast)

            navigate("/login");
        })
        .catch((e: AxiosErrorType) => {
            setError(e.response?.data?.message)
        })
        .finally(()=>{
            setIsLoading(false)
        })
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
                <Card.Root  w={'30rem'} minW={'300px'} h={'55%'} minH={'700px'} overflowY={'auto'} variant={'elevated'} style={showCardStyle}>
                    <Card.Header>
                        <Card.Title>Inscription</Card.Title> 
                    </Card.Header>
                    <Formik
                        initialValues={{
                            lastname: "",
                            firstname: "",
                            email: "",
                            birthdate: "",
                            password: "",
                            confirm_password: "",
                            customer_conditions: false,
                        }}  
                        validationSchema={registerSchema}
                        validateOnBlur
                        onSubmit={(val)=> {
                            register(val)
                        }}
                    >
                        {({ handleChange, handleSubmit, handleBlur, values, errors, touched, isValid, dirty }) => (
                            <Form onSubmit={(e)=>{
                                e.preventDefault()
                                setIsLoading(true)
                                handleSubmit()
                            }}>
                                <Card.Body>    
                                    <Stack gap={'0.5em'}>
                                        <Field label='Nom' required>
                                            <Input 
                                                name="lastname" 
                                                type="text" 
                                                focusRingColor={"orange"} 
                                                value={values.lastname} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                disabled={isLoading} 
                                                required
                                            />
                                            {errors.lastname && touched.lastname && <Text color={'#FF0000'} fontSize={'12px'}>{errors.lastname}</Text>}
                                        </Field>

                                        <Field label='Prénom' required>
                                            <Input 
                                                name="firstname" 
                                                type="text" 
                                                focusRingColor={"orange"} 
                                                value={values.firstname} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                disabled={isLoading} 
                                                required
                                            />
                                            {errors.firstname && touched.firstname && <Text color={'#FF0000'} fontSize={'12px'}>{errors.firstname}</Text>}
                                        </Field>
                                
                                        <Field label='Email' required>
                                            <Input 
                                                name="email" 
                                                type="email" 
                                                focusRingColor={"orange"} 
                                                value={values.email} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                disabled={isLoading} 
                                                required
                                            />
                                            {errors.email && touched.email && <Text color={'#FF0000'} fontSize={'12px'}>{errors.email}</Text>}
                                        </Field>
                                    
                                        <Field label='Date de naissance' required>
                                            <Input
                                                name="birthdate" 
                                                type="date" 
                                                focusRingColor={"orange"} 
                                                value={values.birthdate} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                disabled={isLoading} 
                                                required
                                            />
                                            {errors.birthdate && touched.birthdate && <Text color={'#FF0000'} fontSize={'12px'}>{errors.birthdate}</Text>}
                                        </Field>

                                        <Field label='Mot de passe' required>
                                            <Input 
                                                name="password" 
                                                type="password" 
                                                focusRingColor={"orange"} 
                                                value={values.password} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                disabled={isLoading} 
                                                required
                                            />
                                            {errors.password && touched.password && <Text color={'#FF0000'} fontSize={'12px'}>{errors.password}</Text>}
                                        </Field>

                                        <Field label='Confirmer le mot de passe' required>
                                            <Input 
                                                name="confirm_password" 
                                                type="password" 
                                                focusRingColor={"orange"} 
                                                value={values.confirm_password} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                disabled={isLoading} 
                                                required
                                            />
                                            {errors.confirm_password && touched.confirm_password && <Text color={'#FF0000'} fontSize={'12px'}>{errors.confirm_password}</Text>}
                                        </Field>  
                                        <FormikField name="customer_conditions" type="checkbox">
                                            {({ field }: any) => (
                                                <Checkbox
                                                    {...field}
                                                    _checked={{ "& .chakra-checkbox__control": { bg: "orange", borderColor: "orange" } }}
                                                    variant="solid"
                                                    color="#FAFAFA"
                                                    cursor="pointer"
                                                    disabled={isLoading}
                                                >
                                                    Accepter les conditions d'utilisations
                                                </Checkbox>
                                            )}
                                        </FormikField>
                                        {errors.customer_conditions && touched.customer_conditions && <Text color={'#FF0000'} fontSize={'12px'}>{errors.customer_conditions}</Text>}
                                        {/* <ErrorMessage name="customer_conditions" component="div" /> */}
                                        {error && !isLoading && <Text color={'#FF0000'}>{error}</Text>}
                                    </Stack>              
                                </Card.Body>

                                <Center>
                                    <HStack w={'25%'} overflow={'hidden'} position={'relative'}>
                                        <LoadingSVG h={"50px"} sx={loadingStyle}/> 
                                    
                                        <Button type="submit" style={buttonStyle} alignSelf={'center'} bg={{base:'orange', _hover:'orange.700'}} disabled={!(isValid && dirty) || isLoading}>
                                            S'inscrire
                                        </Button> 
                                    </HStack>
                                </Center>
                            </Form> 
                        )}
                    </Formik>
                    <Card.Footer justifyContent={"flex-end"} mt={'1em'}>
                        {!isLoading && <Link href="/login" color={'white'} fontSize={'sm'} focusRing={'none'}>Vous avez deja un compte ?</Link>}
                    </Card.Footer>
                </Card.Root>
            </Flex>
        </Box>
    )
}

export default Register;