import React, { useState } from "react";
import {
    Box,
    Heading,
    VStack,
    Text,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Checkbox,
    Button,
    Image,
    Center,
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
const urllog = "http://localhost:8000/api/login"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState("")
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
                swal({icon:"error",title:"Usuario o contraseña incorrecta"})
                setPassword("")
                document.getElementById("inputpass").value = ""
                document.getElementById("inputlogin").value = ""
            })
    }

    if (redirect) {
        return navigate("/index")
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
                                <Input rounded="none" variant="filled" name="username" onChange={e => setUsername(e.target.value)} id="inputlogin" />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Contraseña</FormLabel>
                                <Input rounded="none" variant="filled" type="password" name="password" onChange={e => setPassword(e.target.value)} id="inputpass" />
                            </FormControl>
                            <Button rounded="none" colorScheme="blue" w="full" alignSelf="end" onClick={loguearse} mt="1.8em">Login</Button>
                        </FormControl>
                        <HStack w="full" justify="space-between">
                            <Checkbox className="checkk" id="check" onChange={(e) => this.guardarUsuario(e.target.checked, document.getElementById("inputlogin").value)}
                                defaultChecked={JSON.parse(localStorage.getItem("check"))} >Recordar usuario</Checkbox>
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
// const submit = async (e) => {
//     e.preventDefault();

//     await fetch("http://localhost:8000/api/login",{
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
//         credentials:"include",
//         body: JSON.stringify({
//             username,
//             password
//         })
//     });
//     // setRedirect(true);
// }


//  <FormControl>
//                         <form onSubmit={submit}>
//                             <FormControl>
//                                 <FormLabel>Usuario</FormLabel>
//                                 <Input rounded="none" variant="filled" name="username" onChange={e => setUsername(e.target.value)}  id="inputlogin" />
//                             </FormControl>

//                             <FormControl>
//                                 <FormLabel>Contraseña</FormLabel>
//                                 <Input rounded="none" variant="filled" type="password" name="password" onChange={e => setPassword(e.target.value)} id="inputpass"/>
//                             </FormControl>
//                             <Button rounded="none" colorScheme="blue" w="full" alignSelf="end" type="submit" mt="1.8em">Login</Button>
//                         </form>
//                         </FormControl> 

export default Login;








