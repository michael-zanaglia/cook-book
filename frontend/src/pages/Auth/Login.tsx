import user from '@/api/user';
import { useNavigate } from 'react-router';
import { Box, Flex } from "@chakra-ui/react";
import { FormEvent, useState } from 'react';
import { Form, AxiosErrorType } from "@/utils/types/types";
import LoginCard from '@/components/LoginCard';
import { sleep } from '@/utils/helpingFunc/sleep';


const Login = ()=>{
    
    const [isLoading, setIsLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | undefined>("");
    const [ form, setForm ] = useState<Form>({
        email: "",
        password: "",
        remember: false,
    });

    const navigate = useNavigate();

    async function handleForm(e: FormEvent){
        e.preventDefault()
        setError("")
        setIsLoading(true)
        await sleep(3000)
        user.post("/login", {
            form
        },{
            withCredentials: true
        })
        .then(response => {
            console.log(response?.data?.message)
            navigate("/")
        })
        .catch((e: AxiosErrorType) => {
            console.log("err", e)
            setError(e.response?.data?.message)
        })
        .finally(()=>setIsLoading(false))
    }




    return (
        <Box bgGradient="to-b" gradientFrom="#F5F5F5" gradientTo="orange" h={'100vh'} w={'100vw'}>
            <Flex as={'div'} justify={'center'} alignItems={'center'} h={'100%'} w={'100%'}>
                <LoginCard 
                    form={form}
                    setForm={setForm} 
                    error={error} 
                    isLoading={isLoading} 
                    action={handleForm}
                />
            </Flex>
        </Box>
    )
}

export default Login;