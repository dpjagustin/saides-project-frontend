import React, { Component } from "react";
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
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";
import swal from 'sweetalert';
import "../components/styles/loginstyles.css"
import videoplanta from "../resources/videoplanta.mp4"

const baseUrl="http://localhost:3001/usuarios";
const cookies = new Cookies();


class Login extends Component{

    
    state={
        form:{
            username:"",
            password:"",
        }
    }
    handleChange= async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name] : e.target.value
            }
        });
    }
    estaCheckeado(){
        if(localStorage.getItem("check")){
            return true
        }else if(localStorage.getItem("check") === null){
            return false
        }else{
            return false
        }
      // localStorage.getItem("check") 
    }
    guardarUsuario(estaCheck, usuario){
        
        console.log(estaCheck)
        if (estaCheck) {
            
            localStorage.setItem("check", estaCheck)
            localStorage.setItem("usuario", usuario)
            
            console.log("lo guardo  ", usuario)
            
        }else{
            localStorage.setItem("check", estaCheck)
            localStorage.removeItem("usuario", usuario)
            console.log("no lo guardo")
            
        }
    }

    iniciarSesion= async () =>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: this.state.form.password}})
        .then(response=>{
            return response.data;
            // console.log(response.data);
        })
        .then(response=>{
            if(response.length > 0 ){

                let respuesta=response[0];
                console.log(respuesta)
                cookies.set("id", respuesta.id, {path: "/"});
                cookies.set("apellido", respuesta.apellido, {path: "/"});
                cookies.set("nombre", respuesta.nombre, {path: "/"});
                cookies.set("username", respuesta.username, {path: "/"}); 
                cookies.set("img", respuesta.img,{path:"/"} );
                cookies.set("rol", respuesta.rol,{path:"/"} );
                window.location.href="./index";
            } else {
                swal("Error","El usuario o la contraseña son incorrectos", "error");
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    
    componentDidMount() {
        if(cookies.get('username')){
            window.location.href="./index";
        }
    }

    render(){
        return(
        <Box>
            <video className='videologin' autoPlay loop muted>
                <source src={videoplanta} type='video/mp4' />
            </video> 
            <Center h="950">
                <Box w={["full", "md"]} p={[8, 10]} mx="auto" border={["none", "1px"]} borderColor={["", "gray.300"]} borderRadius={[10]} bg="gray.700">
                    <VStack spacing={4} align="flex-start" w="full">
                        <VStack>
                            <Center>
                                <Image src="/LogoSaides.png" w="30%"></Image>

                            </Center>
                        </VStack>
                        <VStack spacing={1} align={["flex-start", "center"]} w="full">
                            <Heading>Login</Heading>
                            <Text>Ingresa tu usuario</Text>  
                        </VStack>
                        <FormControl>
                            <FormLabel>Usuario</FormLabel>
                            <Input rounded="none" variant="filled" name="username" value={localStorage.getItem("usuario")} onChange={this.handleChange} id="inputlogin" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Contraseña</FormLabel>
                            <Input rounded="none" variant="filled" type="password" name="password" onChange={this.handleChange}/>
                        </FormControl>
                        <HStack w="full" justify="space-between">
                            <Checkbox id="check" onChange={(e) => this.guardarUsuario(e.target.checked, document.getElementById("inputlogin").value)} 
                            defaultChecked={JSON.parse(localStorage.getItem("check"))} >Recordar usuario</Checkbox>
                            <Button variant="link" colorScheme="blue">
                                Olvide mi contraseña
                            </Button>
                        </HStack>
                        <Button rounded="none" colorScheme="blue" w="full" alignSelf="end" onClick={()=> this.iniciarSesion()}>Login</Button>
                    </VStack>

                </Box>
            </Center>
        </Box>
        )
    }
}


export default Login;




























// export default function Login(){
//     return (
    // <Box w={["full", "md"]} p={[8, 10]} mt={[20, "10vh"]} mx="auto" border={["none", "1px"]} borderColor={["", "gray.300"]} borderRadius={[10]}>
    //     <VStack spacing={4} align="flex-start" w="full">
    //         <VStack>
    //             <Center>
    //                 <Image src="/LogoSaides.png" w="30%"></Image>

    //             </Center>
    //         </VStack>
    //         <VStack spacing={1} align={["flex-start", "center"]} w="full">
    //             <Heading>Login</Heading>
    //             <Text>Ingresa tu usuario</Text>  
    //         </VStack>
    //         <FormControl>
    //             <FormLabel>Usuario</FormLabel>    
    //             <Input rounded="none" variant="filled" name="username" onChange={this.handleChange}/>
    //         </FormControl>
    //         <FormControl>
    //             <FormLabel>Contraseña</FormLabel>    
    //             <Input rounded="none" variant="filled" type="password" name="password" onChange={this.handleChange}/>
    //         </FormControl>
    //         <HStack w="full" justify="space-between">
    //             <Checkbox>Recordar usuario</Checkbox>
    //             <Button variant="link" colorScheme="blue">
    //                 Olvide mi contraseña
    //             </Button>
    //         </HStack>
    //         <Button rounded="none" colorScheme="blue" w="full" alignSelf="end">Login</Button>

    //     </VStack>
    // </Box>
//     );
// }
