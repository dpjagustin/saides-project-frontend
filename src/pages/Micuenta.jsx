import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
} from '@chakra-ui/react';
import Cookies from "universal-cookie";

const cookies = new Cookies();


export default function Micuenta(){
    return(
        <>
        <NavBar />
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                Modificar perfil del usuario
                </Heading>
                <FormControl id="userName">
                <FormLabel>Foto de usuario</FormLabel>
                <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                    <Avatar size="xl" src={cookies.get("img")}>
                    </Avatar>
                    </Center>
                    <Center w="full">
                    <Button w="full">Cambiar Imagen</Button>
                    </Center>
                </Stack>
                </FormControl>
                <FormControl id="userName" isRequired>
                <FormLabel>{cookies.get('nombre')}</FormLabel>
                <Input
                    placeholder="UserName"
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                />
                </FormControl>
                <FormControl id="email" isRequired>
                <FormLabel>Direccion Email</FormLabel>
                <Input
                    placeholder="your-email@example.com"
                    _placeholder={{ color: 'gray.500' }}
                    type="email"
                />
                </FormControl>
                <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                    placeholder="password"
                    _placeholder={{ color: 'gray.500' }}
                    type="password"
                />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                <Button
                    bg={'red.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                    bg: 'red.500',
                    }}>
                    Cancelar
                </Button>
                <Button
                    bg={'blue.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                    bg: 'blue.500',
                    }}>
                    Guardar
                </Button>
                </Stack>
            </Stack>
        </Flex>
        <Footer/>
        </>
    )
}
