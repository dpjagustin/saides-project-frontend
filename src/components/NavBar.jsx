import React, { ReactNode} from "react";
import ChakraComponent from "@chakra-ui/react";
import { Image } from '@chakra-ui/react';
import Cookies from "universal-cookie";
import Micuenta from "../pages/Micuenta";

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
  useDisclosure,
  useColorModeValue,
  Stack,
  HStack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { logDOM } from "@testing-library/react";

 
const Links = [<Link href="/index">Inicio</Link>, <Link href="/solicitudes">Solicitudes</Link>, <Link href="/comida">Comida</Link>, <Link href="/agenda">Agenda</Link>, <Link href="/sistemas">Sistema gestión</Link>,]; // Links a paginas

const cookies = new Cookies();

const NavLink = ({ children }: { children: ReactNode }) => (
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

function cerrarSesion(){
  cookies.remove("id", {path:"/"});
  cookies.remove("nombre", {path:"/"});
  cookies.remove("apellido", {path:"/"});
  cookies.remove("username", {path:"/"});
  cookies.remove("img", {path:"/"});
  window.location.href="./login"
}

// Que el nombre en el despegable de usuario sea personalizado

export default function NavBar() {


  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
              <Box >
                <a href="/index">
                <Image src='/logoSaidesHundido.png' width="60px"  alt='Logo Descar' id='logoDescar' />
                </a>
              </Box>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
          </HStack>
          

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              {/* {colorMode === 'light' ? document.getElementById("logoDescar").style.backgroundColor = 'grey' : document.getElementById("logoDescar").style.backgroundColor = 'white'} */}

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
                    src={cookies.get("img")}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={cookies.get('img')}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{cookies.get('nombre')} {cookies.get('apellido')}</p>
                  </Center>
                  <Center>
                    <p>DePLM</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem><Button colorScheme="blue"><Link href="/micuenta">Mi cuenta</Link></Button></MenuItem>
                  <MenuItem><Link href="/configuracion">Configuración</Link></MenuItem>
                  <MenuItem><Button colorScheme='red' onClick={()=> cerrarSesion()}>Cerrar sesión</Button></MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}