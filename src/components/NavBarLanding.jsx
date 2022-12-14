import React, { ReactNode} from "react";
import { Image } from '@chakra-ui/react';
import Cookies from "universal-cookie";
import Micuenta from "../pages/Micuenta";
import "./styles/navbar.css";

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
 
// Mejorar botón de iniciar sesión para que no se subraye con el hover

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
  cookies.remove("rol", {path:"/"});
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

              </HStack>
          </HStack>
          

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <Button colorScheme='linkedin' variant='outline' href="/login" >
                  <Link href="/login">Iniciar sesión</Link>
                </Button>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}