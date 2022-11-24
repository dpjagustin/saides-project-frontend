import React, { useEffect, useState} from "react";
import { Image } from '@chakra-ui/react';
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
  keyframes
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
  const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;
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
                  {rol === 1 &&<>
                    {Links.map((link) => (
                  <NavLink>{link}</NavLink>
                ))}
                  
                  </>}
                
                 
              {rol === 2 &&
                <>
                <NavLink><Link className="links" href="/index">Inicio</Link></NavLink>
                  <NavLink><Link className="links" href="/adminnoticias">Noticias</Link></NavLink>
                  <NavLink><Link className="links" href="/admincomida">Comida</Link></NavLink>
                  <NavLink><Link className="links" href="/adminusuarios">Usuarios</Link></NavLink>
                </>
              }

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