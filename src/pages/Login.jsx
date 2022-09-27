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
import Cookies from "universal-cookie";
import swal from 'sweetalert';
import "../components/styles/loginstyles.css"
import videoplanta from "../resources/videos/videoplanta.mp4"


const baseUrl="http://localhost:3001/usuarios";
const cookies = new Cookies();


function cambiarColores(){
    let colorMode = localStorage.getItem("chakra-ui-color-mode")
    let colores = ""
    if (colorMode === "dark"){
        colores = "gray.800"
    }else{
        colores = "gray.200"
    }
    return colores
}

class Login extends Component{

    state={
        form:{
            username:"",
            password:"",
        }
    }

    handleChange = async e=>{
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
                cookies.set("email", respuesta.email,{path:"/"} );
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
                            <FormLabel>Usuario</FormLabel>
                            <Input rounded="none" variant="filled" name="username" value={localStorage.getItem("usuario")} onChange={this.handleChange} id="inputlogin" />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Contraseña</FormLabel>
                            <Input rounded="none" variant="filled" type="password" name="password" onChange={this.handleChange} id="inputpass"/>
                        </FormControl>

                        <HStack w="full" justify="space-between">
                            <Checkbox className="checkk" id="check" onChange={(e) => this.guardarUsuario(e.target.checked, document.getElementById("inputlogin").value)} 
                            defaultChecked={JSON.parse(localStorage.getItem("check"))} >Recordar usuario</Checkbox>
                            <Button variant="link" colorScheme="blue">
                                Olvide mi contraseña
                            </Button>
                        </HStack>

                        <Button rounded="none" colorScheme="blue" w="full" alignSelf="end" onClick={()=> this.iniciarSesion()}>Login</Button>

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
    }
}


export default Login;
