import React, { ReactNode} from "react";
import { Image } from '@chakra-ui/react';
import Cookies from "universal-cookie";
import "./styles/navbar.css";

import {
  Box,
  Flex,
  Link,
  Button,
  Menu,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  HStack,
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

// Que el nombre en el despegable de usuario sea personalizado

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
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

              </HStack>
          </HStack>
          

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <Link href="/login" style={{textDecoration:"none"}}><Button colorScheme="blue" variant="outline">Iniciar sesión</Button></Link>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}