import React, { useEffect } from "react";
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
    Modal,
    ModalBody,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalFooter,
    useDisclosure,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useState } from "react";

export default function Micuenta() {
    const urlauth = "http://10.0.0.47:8000/api/authUser"
    const urledit = "http://10.0.0.47:8000/api/editUser"
    const [userData, setUserData] = useState({})
    const [userSeleccionado, setUserSeleccionado] = useState({
        id: "",
        nombre: "",
        apellido: "",
        descripcion: "",
        imagen: ""
    })
    const toast = useToast()

    useEffect(() => {
        (
            async () => {
                await axios.get(urlauth, { withCredentials: true })
                    .then((res) => {
                        setUserData(res.data)
                    }).catch((error) => {

                    })
            }
        )();
    });


    const modificarUsuario = async () => {
        await axios.patch(urledit, {
            id: userSeleccionado.id,
            descripcion: userSeleccionado.descripcion,
            imagen: userSeleccionado.imagen
        }).then(res => {
            toast({
                title: "Usuario modificado correctamente",
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
            onCloseEditar()
        }).catch(error => {
            toast({
                title: "Error. Intente nuevamente.",
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
        })
    }
    const seleccionarUsuario = (user) => {
        setUserSeleccionado(user);
        onOpenEditar();
    }
    const handleChange = e => {
        const { name, value } = e.target;
        setUserSeleccionado(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const { isOpen: isOpenEditar, onOpen: onOpenEditar, onClose: onCloseEditar } = useDisclosure()


    return (
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
                        <Stack direction={['column']} spacing={6}>
                            <Center>
                                <Avatar size="xl" src={userData.imagen}>
                                </Avatar>
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl id="descripcion" >
                        <FormLabel>Descripcion</FormLabel>
                        <HStack justify="space-between">
                            <Box w="100%" padding="8px" borderRadius="8px" bg={useColorModeValue("gray.200", "gray.500")} fontFamily="revert" fontWeight="500" fontSize="16px" h="auto">{userData.descripcion}</Box>
                        </HStack>
                    </FormControl>

                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button bg={'blue.400'} color={'white'} w="full" _hover={{ bg: 'blue.500', }} onClick={() => seleccionarUsuario(userData)}>Modificar</Button>
                    </Stack>
                </Stack>
            </Flex>
            <Footer />






            <Modal isOpen={isOpenEditar} onClose={onCloseEditar}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modificar</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    <FormControl>
                            <FormLabel>Imagen</FormLabel>
                            <Textarea name="imagen" onChange={handleChange} value={userSeleccionado&&userSeleccionado.imagen}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Descripcion</FormLabel>
                            <Textarea name="descripcion" onChange={handleChange} value={userSeleccionado&&userSeleccionado.descripcion}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => modificarUsuario()}>Guardar cambios</Button>
                        <Button onClick={onCloseEditar}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}
