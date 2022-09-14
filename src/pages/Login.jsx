import React, { Component, useState } from "react";
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
    Center 
} from "@chakra-ui/react";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";
import swal from 'sweetalert';

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

    iniciarSesion= async () =>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: this.state.form.password}})
        .then(response=>{
            return response.data;
            // console.log(response.data);
        })
        .then(response=>{
            if(response.length > 0 ){
                var respuesta=response[0];
                cookies.set("id", respuesta.id, {path: "/"});
                cookies.set("apellido", respuesta.apellido, {path: "/"});
                cookies.set("nombre", respuesta.nombre, {path: "/"});
                cookies.set("username", respuesta.username, {path: "/"});
                cookies.set("img", respuesta.img,{path:"/"} );
                window.location.href="./index";
            }else{
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
            <Box w={["full", "md"]} p={[8, 10]} mt={[20, "10vh"]} mx="auto" border={["none", "1px"]} borderColor={["", "gray.300"]} borderRadius={[10]}>
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
                        <Input rounded="none" variant="filled" name="username" onChange={this.handleChange}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Contraseña</FormLabel>
                        <Input rounded="none" variant="filled" type="password" name="password" onChange={this.handleChange}/>
                    </FormControl>

                    <HStack w="full" justify="space-between">
                        <Checkbox>Recordar usuario</Checkbox>
                        <Button variant="link" colorScheme="blue">
                            Olvide mi contraseña
                        </Button>
                    </HStack>

                    <Button rounded="none" colorScheme="blue" w="full" alignSelf="end" onClick={()=> this.iniciarSesion()}>Login</Button>
                </VStack>
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
