import React, { useEffect, useState } from "react";
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
  useDisclosure,
  IconButton
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";


////////// Links a paginas usuarios normales//////////////
const Links = [{
  id: "1",
  url: "/index",
  nombre: "Inicio",
  clase: "links"
},
{
  id: "2",
  url: "/solicitudes",
  nombre: "Solicitudes",
  clase: "links"
},
{
  id: "3",
  url: "/comida",
  nombre: "Comida",
  clase: "links"
},
{
  id: "4",
  url: "/usuarios",
  nombre: "Usuarios",
  clase: "links"
},
{
  id: "5",
  url: "/notas",
  nombre: "Mis notas",
  clase: "links"
}]; 

//////LINKS ADMIN//////////
const LinksAdmin = [{
  id: "1",
  url: "/index",
  nombre: "Inicio",
  clase: "links"
},
{
  id: "2",
  url: "/adminnoticias",
  nombre: "Noticias",
  clase: "links"
},
{
  id: "3",
  url: "/admincomida",
  nombre: "Comida",
  clase: "links"
},
{
  id: "4",
  url: "/usuarios",
  nombre: "Usuarios",
  clase: "links"
},
{
  id: "4",
  url: "/adminsolicitudes",
  nombre: "Solicitudes",
  clase: "links"
}]; 


// Que el nombre en el despegable de usuario sea personalizado


export default function NavBar() {

  const urlauth = "http://10.0.0.47:8000/api/authUser"
  const { colorMode, toggleColorMode } = useColorMode();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [imagen, setImagen] = useState("");
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (
      async () => {
        await axios.get(urlauth, { withCredentials: true })
          .then((res) => {
            const content = res.data
            setNombre(content.nombre)
            setApellido(content.apellido)
            setImagen(content.imagen)
            setRol(content.rol)
          }).catch((error) => {
            swal({ icon: "error", title: "No hay un usuario logeado" })
            navigate("/")
          })
      }
    )();
  });

///////////////CERRAR SESION////////////////
  const cerrarSesion = async () => {
    await fetch("http://10.0.0.47:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    navigate("/")
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box >
              <a href="/index">
                <Image src='/resources/logos/logoSaidesHundido.png' width="60px" alt='Logo Descar' id='logoDescar' />
              </a>
            </Box>
            <IconButton
            size={'lg'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {rol === 1 ? 
              <>
                {Links.map((link) => (
                  <Link key={link.id} className={link.clase} href={link.url}>{link.nombre}</Link>
                  
                ))}
              </>:null}
              {rol === 2 ?
              <>
                {LinksAdmin.map((link) => (
                  <Box><Link key={link.id} className={link.clase} href={link.url}>{link.nombre}</Link></Box>
                  
                ))}
              </>:null}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <HStack spacing={7}>
              <Button onClick={toggleColorMode} size="md">
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
                    size={'md'}
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
                  <MenuItem><Button className="linkscuenta" colorScheme='red' onClick={() => cerrarSesion()}>Cerrar sesión</Button></MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <Link key={link.id} className={link.clase} href={link.url}>{link.nombre}</Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}