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
    Textarea,
    Text,
    Heading
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import "../components/styles/notas.css";
import axios from "axios";

function cambiarColoresBorrar() {
    let colorMode = localStorage.getItem("chakra-ui-color-mode")
    let coloresBorrar = ""
    if (colorMode === "dark") {
        coloresBorrar = "red.800"
    } else {
        coloresBorrar = "red.300"
    }
    return coloresBorrar
}
function cambiarColoresEditar() {
    let colorMode = localStorage.getItem("chakra-ui-color-mode")
    let coloresEditar = ""
    if (colorMode === "dark") {
        coloresEditar = "green.800"
    } else {
        coloresEditar = "green.300"
    }
    return coloresEditar
}


const urldelete = "http://localhost:8000/api/deleteNota"
const urlmodificar = "http://localhost:8000/api/updateNota"

export default function Notas() {
    /////////// CONSTANTES CON ACTUALIZACION DE DATOS////////////
    const [data, setData] = useState([]);
    const [idOwner, setIdOwner] = useState("")
    const [actualizar, setActualizar]=useState(0)
    const [notaAdd, setNotaAdd]=useState({
        titulo:"",
        nota:"",
        id_owner:""
    })
    const [notaSeleccionada, setNotaSeleccionada] = useState({
        id:"",
        titulo: "",
        nota: ""
    })

    ////// captura lo que el usuario escribe en los inputs/////

    const handleChange = e => {
        const { name, value } = e.target;
        setNotaSeleccionada(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function handle(e){
        const notaNueva={...notaAdd}
        notaNueva[e.target.id] = e.target.value
        setNotaAdd(notaNueva)
        console.log(notaNueva)
    }

    ////////////TRAER LAS NOTAS DEL USUARIO/////////////

    useEffect(() =>{
        (
          async ()=>{
            const response = await fetch("http://localhost:8000/api/authUserNotes",{
                headers:{"Content-Type":"application/json"},
                credentials:"include",
            });
    
            const content = await response.json();
            setData(content)
            setActualizar(actualizar+1)
          }
        )();
    },[actualizar]);

    ////////////// TRAER EL IDOWNER ///////////////////

    useEffect(() =>{
        (
          async ()=>{
            const response = await fetch("http://localhost:8000/api/authUser",{
                headers:{"Content-Type":"application/json"},
                credentials:"include",
            });
            const content = await response.json();
            setIdOwner(content.id)
          }
        )();
    },[]);

    ////////////// CREAR NOTA ////////////
    
    const crearNota = async (e)=>{
        e.preventDefault();

        await fetch("http://localhost:8000/api/addNota",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            credentials:"include",
            body: JSON.stringify({
                titulo:notaAdd.titulo,
                nota:notaAdd.nota,
                id_owner:parseInt(idOwner)
            })
            
        });   
        setActualizar(actualizar+1)
        onCloseCrear()
        setNotaAdd([0])
    }

    /////////////// BORRAR NOTAA/////////////

    const peticionDelete = async () => {
        await axios.post(urldelete,{
            id:notaSeleccionada.id
        })
            .then(response => {
                setActualizar(actualizar+1)      
                onCloseBorrar();
            }).catch(error=>{
                console.log(error)
            })  
    }


    ////////////// MODIFICAR NOTA//////////////
    const peticionPut = async () => {
        await axios.put(urlmodificar,{
            id:notaSeleccionada.id,
            titulo:notaSeleccionada.titulo,
            nota:notaSeleccionada.nota
        })
            .then((response) => {
                setActualizar(actualizar+1)
                onCloseEditar();
            }).catch(error=>{
                console.log(error)
            })
    }

    ///////////// SELECCIONAR LA NOTA////////////
    
    const seleccionarNota = (nota, caso) => {
        setNotaSeleccionada(nota);
        (caso === "Editar")?onOpenEditar():onOpenBorrar();
    }


    const { isOpen: isOpenCrear, onOpen: onOpenCrear, onClose: onCloseCrear } = useDisclosure()
    const { isOpen: isOpenEditar, onOpen: onOpenEditar, onClose: onCloseEditar } = useDisclosure()
    const { isOpen: isOpenBorrar, onOpen: onOpenBorrar, onClose: onCloseBorrar } = useDisclosure()
    const initialRef = React.useRef(null)

    return (
        <>
            <NavBar />
            <h1 className="titulo" >Mis notas</h1>
            
            <Box minH="600px">
                <Button onClick={onOpenCrear} mt="30px" ml="100px" size={"lg"}  >Crear nota</Button>
                <Flex justify="center">
                <Accordion p="10px" allowMultiple  w="55%" my="50px">
                        {data.length===0&&
                        <Box textAlign="center" py={10} px={6}>
                        <InfoIcon boxSize={'50px'} color={'blue.300'} />
                        <Heading as="h2" size="xl" mt={6} mb={2}>
                          No hay notas actualmente
                        </Heading>
                        <Text color={'gray.500'}>
                          Para crear una nota presione en crear nota.
                        </Text>
                      </Box>}
                        {data.map(nota => (
                            <AccordionItem key={nota.id}>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left' fontSize="50px" padding="15px">
                                            {nota.titulo}
                                        </Box>
                                        <AccordionIcon fontSize="40px"/>
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4} borderRadius="7px" fontSize="30px" pl="40px" >
                                    {nota.nota}
                                </AccordionPanel>
                                <AccordionPanel pb={4} textAlign="right">
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
                <form onSubmit={crearNota}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear nota</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Titulo</FormLabel>
                            <Input id="titulo" name="titulo" onChange={(e)=> handle(e)} value={notaAdd.titulo} ref={initialRef} placeholder='Titulo' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Nota</FormLabel>
                            <Textarea id="nota" name="nota" onChange={(e)=> handle(e)} value={notaAdd.nota} placeholder='Nota'></Textarea>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type="submit" >
                            Guardar nota
                        </Button>
                        <Button onClick={onCloseCrear}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
                </form>
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
