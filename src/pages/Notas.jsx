import React, { useEffect, useState } from "react";
import {
    Box,
    Accordion,
    AccordionIcon,
    AccordionPanel,
    AccordionButton,
    AccordionItem,
    Flex,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    useDisclosure,
    Textarea
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import "../components/styles/notas.css";
import axios from "axios";

function cambiarColoresBorrar() {
    let colorMode = localStorage.getItem("chakra-ui-color-mode")
    let coloresBorrar = ""
    if (colorMode === "dark") {
        coloresBorrar = "red.800"
    } else {
        coloresBorrar = "red.100"
    }
    return coloresBorrar
}
function cambiarColoresEditar() {
    let colorMode = localStorage.getItem("chakra-ui-color-mode")
    let coloresEditar = ""
    if (colorMode === "dark") {
        coloresEditar = "green.800"
    } else {
        coloresEditar = "green.100"
    }
    return coloresEditar
}

const urlnotas = "http://localhost:3002/notas"

export default function Notas() {
    const [data, setData] = useState([]);
    


    const [notaSeleccionada, setNotaSeleccionada] = useState({
        id:"",
        titulo: "",
        nota: ""
    })

    // captura lo que el usuario escribe en los inputs
    const handleChange = e => {
        const { name, value } = e.target;
        setNotaSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const peticionGet = async () => {
        await axios.get(urlnotas)
            .then(response => {
                setData(response.data);
            })
    }

    const peticionPost = async () => {
        await axios.post(urlnotas, notaSeleccionada)
            .then(response => {
                setData(data.concat(response.data))
                onCloseCrear()
            })
    }

    const peticionPut = async () => {
        await axios.put(urlnotas+"/"+notaSeleccionada.id, notaSeleccionada)
            .then((response) => {
                var dataNueva = data;
                dataNueva.map(nota=>{
                    if (nota.id === notaSeleccionada.id) {
                        nota.titulo = notaSeleccionada.titulo;
                        nota.nota = notaSeleccionada.nota;
                    }
                })
                setData(dataNueva);
                onCloseEditar();
            }).catch(error=>{
                console.log(error)
            })
    }

    const peticionDelete = async () => {
        await axios.delete(urlnotas +"/"+ notaSeleccionada.id)
            .then(response => {      
                setData(data.filter(nota => nota.id !== notaSeleccionada.id));
                onCloseBorrar();
            }).catch(error=>{
                console.log(error)
            })  
    }

    const seleccionarNota = (nota, caso) => {
        setNotaSeleccionada(nota);
        (caso === "Editar")?onOpenEditar():onOpenBorrar();
    }

    useEffect(async () => {
        await peticionGet();
    }, [])

    const { isOpen: isOpenCrear, onOpen: onOpenCrear, onClose: onCloseCrear } = useDisclosure()
    const { isOpen: isOpenEditar, onOpen: onOpenEditar, onClose: onCloseEditar } = useDisclosure()
    const { isOpen: isOpenBorrar, onOpen: onOpenBorrar, onClose: onCloseBorrar } = useDisclosure()
    const initialRef = React.useRef(null)

    return (
        <>
            <NavBar />
            <h1 className="titulo" my="30px" >Mis notas</h1>
            <Box h="800px">
                <Flex justifyContent="center" id="containernotas" >
                    <Accordion p="10px" allowMultiple  w="55%" my="50px">
                        <Button onClick={onOpenCrear} mb="20px">Crear nota</Button>
                        {data.map(nota => (
                            <AccordionItem key={nota.id}>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            {nota.titulo}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {nota.nota}
                                </AccordionPanel>
                                <AccordionPanel pb={4}>
                                    <Button colorScheme="red" mx="10px" onClick={()=>seleccionarNota(nota, "Eliminar")}>Borrar<DeleteIcon color={cambiarColoresBorrar()} /> </Button>
                                    <Button colorScheme="green" onClick={() => seleccionarNota(nota,"Editar")}>Editar<EditIcon color={cambiarColoresEditar()} /></Button>
                                </AccordionPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Flex>
            </Box>
            <Footer />

            {/* ----------------------------------------------------*/}
            {/* ------------------------- MODALES ------------------*/}
            {/* ----------------------------------------------------*/}

            <Modal isOpen={isOpenCrear} onClose={onCloseCrear}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear nota</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Titulo</FormLabel>
                            <Input name="titulo" onChange={handleChange} ref={initialRef} placeholder='Titulo' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Nota</FormLabel>
                            <Input name="nota" onChange={handleChange} placeholder='Nota' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={peticionPost}>
                            Guardar nota
                        </Button>
                        <Button onClick={onCloseCrear}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenEditar} onClose={onCloseEditar}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modificar</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Titulo</FormLabel>
                            <Input name="titulo" onChange={handleChange} value={notaSeleccionada&&notaSeleccionada.titulo} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Nota</FormLabel>
                            <Textarea name="nota" onChange={handleChange} value={notaSeleccionada&&notaSeleccionada.nota}></Textarea>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={()=>peticionPut()}>Guardar nota</Button>
                        <Button onClick={onCloseEditar}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <Modal isOpen={isOpenBorrar} onClose={onCloseBorrar}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Borrar nota</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel>Estas seguro que deseas borrar la nota: <br /> <p id="notaborrar">{notaSeleccionada&&notaSeleccionada.titulo}</p></FormLabel>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => peticionDelete()}>Borrar nota</Button>
                        <Button onClick={onCloseBorrar}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
