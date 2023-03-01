import React, { useEffect, useState } from "react";
import {
    Box,
    Heading,
    VStack,
    Text,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Button,
    Image,
    Center,
    Switch
} from "@chakra-ui/react";
import videoplanta from "../resources/videos/videoplanta.mp4"
import "../components/styles/loginstyles.css"
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function cambiarColores() {
    let colorMode = localStorage.getItem("chakra-ui-color-mode")
    let colores = ""
    if (colorMode === "dark") {
        colores = "gray.800"
    } else {
        colores = "gray.200"
    }
    return colores
}
const urllog = "http://10.0.0.47:8000/api/login"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState("")
    const [recordar, setRecordar] = useState(false)
    const navigate = useNavigate();
    
    const loguearse = async () => {
        await axios.post(urllog, {
            username,
            password
        },
            {
                withCredentials: true
            }).then((res) => {
                setRedirect(true)
            }).catch(error => {
                swal({ icon: "error", title: "Usuario o contraseña incorrecta" })
                setPassword("")
                document.getElementById("inputpass").value = ""
                document.getElementById("inputlogin").value = ""
            })
    }
    
    useEffect(() => {
        setUsername(localStorage.getItem("username")) 
        if(localStorage.getItem("recordar")==="false"){
            setUsername("")
        }       
    },[recordar])
    
    
    const asd = localStorage.getItem("recordar")
    
    const handleRecordar = ()=>{
        setRecordar(!recordar)
        localStorage.setItem("recordar",JSON.stringify(!recordar))
        localStorage.setItem("username",username)
    }

    if (redirect) {
        return navigate("/index")
    }else{

    }
    return (
        <Box>
            <video className='videologin' autoPlay loop muted>
                <source src={videoplanta} type='video/mp4' />
            </video>
            <Center h="950">
                <Box w={["full", "md"]} p={[8, 10]} mx="auto" border={["1px", "1px"]} borderColor={["gray.800", "gray.300"]} borderRadius={[10]} bg={cambiarColores()} >
                    <VStack spacing={4} align="flex-start" w="full">
                        <VStack>
                            <Center>
                                <Image src="/resources/logos/LogoSaides.png" w="30%"></Image>
                            </Center>
                        </VStack>

                        <VStack spacing={1} align={["flex-start", "center"]} w="full">
                            <Heading>Login</Heading>
                            <Text id="text1">Ingresa tu usuario</Text>
                        </VStack>
                        <FormControl>
                            <FormControl>
                                <FormLabel>Usuario</FormLabel>
                                <Input rounded="none" variant="filled" name="username" onChange={e => setUsername(e.target.value)} value={username} id="inputlogin" />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Contraseña</FormLabel>
                                <Input rounded="none" variant="filled" type="password" name="password" onChange={e => setPassword(e.target.value)} onSubmit={loguearse} id="inputpass" />
                            </FormControl>
                            <Button rounded="lg" colorScheme="blue" w="full" alignSelf="end" onClick={loguearse} mt="1.8em" >Login</Button>
                        </FormControl>
                        <HStack w="full" justify="space-between">
                            {asd==="true" && <Switch id="recordar" onChange={handleRecordar} isChecked={true}>Recordar usuario</Switch>}
                            {asd==="false" && <Switch id="recordar" onChange={handleRecordar} isChecked={false}>Recordar usuario</Switch>}
                            {asd===null && <Switch id="recordar" onChange={handleRecordar} isChecked={false}>Recordar usuario</Switch>}
                            <Button variant="link" colorScheme="blue">
                                Olvide mi contraseña
                            </Button>
                        </HStack>
                        <HStack w="full" justify="center">
                            <Button variant="link" colorScheme="blue">
                                <a href="/">Volver al inicio</a>
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </Box>

    )
};

export default Login;








