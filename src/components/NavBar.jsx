import React, { ReactNode, useEffect, useState} from "react";
import { Image } from '@chakra-ui/react';
import Cookies from "universal-cookie";
import Micuenta from "../pages/Micuenta";
import "./styles/navbar.css"

import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  HStack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
 
const Links = [
  <Link className="links" href="/index">Inicio</Link>,
  <Link className="links" href="/solicitudes">Solicitudes</Link>,
  <Link className="links" href="/comida">Comida</Link>,
  <Link className="links" href="/agenda">Agenda</Link>,
  <Link className="links" href="/notas">Mis notas</Link>,]; // Links a paginas



const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);



// Que el nombre en el despegable de usuario sea personalizado


export default function NavBar() {
  const urlauth="http://localhost:8000/api/authUser"
  const { colorMode, toggleColorMode } = useColorMode();
  const [nombre, setNombre]=useState("");
  const [apellido, setApellido]=useState("");
  const [imagen, setImagen]=useState("");
  const [rol, setRol]=useState("");
  const navigate = useNavigate();

  useEffect(() =>{
    (
      async ()=>{
        await axios.get(urlauth,{withCredentials:true})
        .then((res)=>{
          const content = res.data
          setNombre(content.nombre)
          setApellido(content.apellido)
          setImagen(content.imagen)
          setRol(content.rol)
          if(rol===1){
            document.getElementById("itemadmin1").style.display="none";
            document.getElementById("itemadmin2").style.display="none";
            document.getElementById("itemadmin3").style.display="none";
          }
        }).catch((error)=>{
          swal({icon:"error",title:"No hay un usuario logeado"})
          navigate("/")
        })
      }
    )();
  });



  
  const cerrarSesion = async() =>{
    await fetch("http://localhost:8000/api/logout",{
              method:"POST",
              headers:{"Content-Type":"application/json"},
              credentials:"include",
          });
          window.location.href="/"
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
              <Box >
                <a href="/index">
                <Image src='/resources/logos/logoSaidesHundido.png' width="60px"  alt='Logo Descar' id='logoDescar' />
                </a>
              </Box>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink>{link}</NavLink>
                ))}
              </HStack>
          </HStack>
          

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={imagen}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={imagen}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p className="nombreyrol">{nombre} {apellido}</p>
                  </Center>
                  <Center>
                    <p className="nombreyrol">{rol}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem><a href="/micuenta"><Button className="linkscuenta" colorScheme="blue">Mi cuenta </Button></a></MenuItem>
                  {(()=>{
                    if(rol===1){
                      return(<div>AdminNoticias</div>)
                    }
                  })}
                  
                  <MenuItem><a href="/micuenta"><Button className="linkscuenta" colorScheme="blue" id="itemadmin1">Noticias</Button></a></MenuItem>
                  <MenuItem><a href="/micuenta"><Button className="linkscuenta" colorScheme="blue" id="itemadmin2">Comidas</Button></a></MenuItem>
                  <MenuItem><a href="/micuenta"><Button className="linkscuenta" colorScheme="blue" id="itemadmin3">Usuarios</Button></a></MenuItem>
                  <MenuItem><Button className="linkscuenta" colorScheme='red' onClick={()=> cerrarSesion()}>Cerrar sesión</Button></MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}