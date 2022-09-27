import React from "react";
import "../components/styles/micuenta.css"
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import {
    Box,
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
    Center,
    Link,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalFooter,
    useDisclosure,
    Textarea
} from '@chakra-ui/react';
import Cookies from "universal-cookie";
import { EditIcon } from "@chakra-ui/icons";

const cookies = new Cookies();


export default function Micuenta(){

    const { isOpen: isOpenEditar, onOpen: onOpenEditar, onClose: onCloseEditar } = useDisclosure()

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
                <FormControl id="nombre" isRequired>
                <FormLabel>Nombre</FormLabel>
                <HStack justify="space-between">
                    <Box className="datosedit" w="90%" padding="8px" borderRadius="8px" bg={useColorModeValue("gray.200", "gray.500")} fontFamily="revert" fontWeight="500" fontSize="16px">{cookies.get("nombre")}</Box>
                    <Button colorScheme="blue"><EditIcon /></Button>
                </HStack>
                </FormControl>

                <FormControl id="apellido" isRequired>
                <FormLabel>Apellido</FormLabel>
                <HStack justify="space-between">
                    <Box className="datosedit" w="90%" padding="8px" borderRadius="8px" bg={useColorModeValue("gray.200", "gray.500")} fontFamily="revert" fontWeight="500" fontSize="16px">{cookies.get("apellido")}</Box>
                    <Button colorScheme="blue"><EditIcon /></Button>
                </HStack>
                </FormControl>

                <FormControl id="Email" isRequired>
                <FormLabel>Email</FormLabel>
                <HStack justify="space-between">
                    <Box className="datosedit" w="90%" padding="8px" borderRadius="8px" bg={useColorModeValue("gray.200", "gray.500")} fontFamily="revert" fontWeight="500" fontSize="16px">{cookies.get("email")}</Box>
                    <Button colorScheme="blue" onClick={onOpenEditar}><EditIcon /></Button>
                </HStack>
                </FormControl>
                
                <Stack spacing={6} direction={['column', 'row']}>
                <Link href="./index" id="botonesmicuenta" w="full">
                <Button
                    bg={'blue.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                    bg: 'blue.500',
                    }}>
                    Guardar
                </Button></Link>

                <Modal isOpen={isOpenEditar} onClose={onCloseEditar}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modificar</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input></Input>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >Guardar cambios</Button>
                        <Button onClick={onCloseEditar}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

                </Stack>
            </Stack>
        </Flex>
        <Footer/>
        </>
    )
}
