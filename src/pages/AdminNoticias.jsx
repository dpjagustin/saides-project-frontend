import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  Text,
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  ModalContent,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
function cambiarColoresShadow() {
    let colorMode = localStorage.getItem("chakra-ui-color-mode")
    let coloresShadow = ""
    if (colorMode === "dark") {
      coloresShadow = "0px 0px 8px 2px rgba(255,255,255,0.5)"
    } else {
      coloresShadow = "xl"
    }
    return coloresShadow
  }
  const urldelete = "http://localhost:8000/api/deleteNoticia"
  const urlmodificar = "http://localhost:8000/api/updateNoticia"
  const urlauth="http://localhost:8000/api/authUser"


function AdminNoticias(){
  const [data, setData] = useState([])
  const [actualizar, setActualizar] = useState(0)
  const [novAdd, setNovAdd] = useState({
    fecha: "",
    titulo: "",
    subtitulo: "",
    item1: "",
    item2: "",
    item3: ""
  })
  const [novSeleccionada, setNovSeleccionada] = useState({
    id: "",
    fecha: "",
    titulo: "",
    subtitulo: "",
    item1: "",
    item2: "",
    item3: ""
  })
  const [rol, setRol]=useState("");
  const navigate = useNavigate();

  ///////// CAPTURA LO QUE LOS USUARIOS ESCRIBEN EN LOS INPUTS/////////////////

  const handleChange = e => {
    const { name, value } = e.target;
    setNovSeleccionada(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  function handle(e) {
    const noticiaNueva = { ...novAdd }
    noticiaNueva[e.target.id] = e.target.value
    setNovAdd(noticiaNueva)
    console.log(noticiaNueva)
  }
//////////////////////TRAE EL ROL DEL USUARIO///////////////////
  useEffect(() => {
    (
      async () => {
        await axios.get(urlauth, { withCredentials: true })
          .then((res) => {
            const content = res.data

            setRol(content.rol)
          }).catch((error) => {
            swal({ icon: "error", title: "No hay un usuario logeado" })
            navigate("/")
          })
      }
    )();
  });

  ///////////// TRAE LAS NOTICIAS///////////////

  useEffect(() => {
    (
      async () => {
        const response = await fetch("http://localhost:8000/api/FindNoticias", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const content = await response.json();
        setData(content)
      }
    )();
  }, [actualizar]);

  //////////////CREAR NOTICIA//////////////
  const crearNoticia = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/addNoticia", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        fecha: novAdd.fecha,
        titulo: novAdd.titulo,
        subtitulo: novAdd.subtitulo,
        item1: novAdd.item1,
        item2: novAdd.item2,
        item3: novAdd.item3,
      })
    });
    setActualizar(actualizar + 1)
    onCloseCrear();
    setNovAdd([0])
  }

  /////////////// MODIFICAR NOTICIA/////////////

  const peticionPut = async () => {
    await axios.put(urlmodificar, {
      id: novSeleccionada.id,
      fecha: novSeleccionada.fecha,
      titulo: novSeleccionada.titulo,
      subtitulo: novSeleccionada.subtitulo,
      item1: novSeleccionada.item1,
      item2: novSeleccionada.item2,
      item3: novSeleccionada.item3
    })
      .then((response) => {
        setActualizar(actualizar + 1)
        onCloseEditar();
      }).catch(error => {
        console.log(error)
      })
  }

  ////////////////BORRAR NOTICIA///////////////

  const peticionDelete = async () => {
    await axios.post(urldelete, {
      id: novSeleccionada.id
    })
      .then(response => {
        setActualizar(actualizar + 1)
        onCloseBorrar();
      }).catch(error => {
        console.log(error)
      })
  }
  /////////////SELECCIONAR NOTICIA//////////////

  const seleccionarNov = (nov, caso) => {
    setNovSeleccionada(nov);
    (caso === "Editar") ? onOpenEditar() : onOpenBorrar();
  }

  if (rol === 1) {
    navigate("/index")
    swal({ icon: "error", title: "No tienes permisos" })
  }
  ///////////// ESTADOS DE LOS MODALES/////////////////////
  const { isOpen: isOpenCrear, onOpen: onOpenCrear, onClose: onCloseCrear } = useDisclosure()
  const { isOpen: isOpenEditar, onOpen: onOpenEditar, onClose: onCloseEditar } = useDisclosure()
  const { isOpen: isOpenBorrar, onOpen: onOpenBorrar, onClose: onCloseBorrar } = useDisclosure()
  const initialRef = React.useRef(null)
  
    return(
        <>
        <NavBar/>
        <Box>
          <Heading fontSize="70px" my="50px" ml="100px">Noticias</Heading>
        <Flex justify="end" mr="100px">
          <Button onClick={onOpenCrear}w="200px" h="70px" fontSize="30px">Crear noticia</Button>
        </Flex>
        {data.length === 0 &&
          <Box textAlign="center" py={10} px={6}>
          <InfoIcon boxSize={'50px'} color={'blue.300'} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            No hay noticias actualmente
          </Heading>
          <Text color={'gray.500'}>
            Para crear una noticia presione en crear noticia.
          </Text>
        </Box>
        }
        <Flex wrap="wrap" w="90%" justify="center">
          {data.map(nov => (
            <Box p='5' borderWidth='1px' rounded='md' key={nov.id} boxShadow={cambiarColoresShadow()} minW="300px" minHeight="200px" m="30px">
              <Box>
                {nov.fecha}
              </Box>
              <Heading size='md' my='2'>
                <h2>{nov.titulo}</h2>
              </Heading>
              <Text className="subtitulo" mb="3">{nov.subtitulo}</Text>
              <Text>•{nov.item1}<br /></Text>
              <Text>•{nov.item2}<br /></Text>
              <Text>•{nov.item3}<br /></Text>
              <Box >
                <Button onClick={() => seleccionarNov(nov, "Editar")} mx="5px"><EditIcon /></Button>
                <Button mx="5px" onClick={() => seleccionarNov(nov, "Eliminar")}><DeleteIcon /></Button>
              </Box>
            </Box>
          ))}
        </Flex>



      </Box>
      {/* ----------------------------------------------------*/}
      {/* ------------------------- MODALES ------------------*/}
      {/* ----------------------------------------------------*/}

      <Modal isOpen={isOpenCrear} onClose={onCloseCrear}>
        <form onSubmit={crearNoticia}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Crear novedad</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} >
              <FormControl>
                <FormLabel>Fecha</FormLabel>
                <Input id="fecha" onChange={(e) => handle(e)} value={novAdd.fecha} ref={initialRef} placeholder='Fecha' />
              </FormControl>
              <FormControl>
                <FormLabel>Titulo</FormLabel>
                <Input id="titulo" onChange={(e) => handle(e)} value={novAdd.titulo} ref={initialRef} placeholder='Titulo' />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Subtitulo</FormLabel>
                <Textarea id="subtitulo" onChange={(e) => handle(e)} value={novAdd.subtitulo} placeholder='Subtitulo'></Textarea>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Item 1</FormLabel>
                <Textarea id="item1" onChange={(e) => handle(e)} value={novAdd.item1} placeholder='Item 1'></Textarea>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Item 2</FormLabel>
                <Textarea id="item2" onChange={(e) => handle(e)} value={novAdd.item2} placeholder='Item 2'></Textarea>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Item 3</FormLabel>
                <Textarea id="item3" onChange={(e) => handle(e)} value={novAdd.item3} placeholder='Item 3'></Textarea>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} type="submit">
                Crear novedad
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
              <FormLabel>Fecha</FormLabel>
              <Input name="fecha" onChange={handleChange} value={novSeleccionada && novSeleccionada.fecha} />
            </FormControl>
            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input name="titulo" onChange={handleChange} value={novSeleccionada && novSeleccionada.titulo} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Subtitulo</FormLabel>
              <Textarea name="subtitulo" onChange={handleChange} value={novSeleccionada && novSeleccionada.subtitulo}></Textarea>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Item 1</FormLabel>
              <Textarea name="item1" onChange={handleChange} value={novSeleccionada && novSeleccionada.item1}></Textarea>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Item 2</FormLabel>
              <Textarea name="item2" onChange={handleChange} value={novSeleccionada && novSeleccionada.item2}></Textarea>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Item 3</FormLabel>
              <Textarea name="item3" onChange={handleChange} value={novSeleccionada && novSeleccionada.item3}></Textarea>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => peticionPut()}>Guardar modificacion</Button>
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
            <FormLabel>Estas seguro que deseas borrar la nota: <br /> <p id="notaborrar">{novSeleccionada && novSeleccionada.titulo}</p></FormLabel>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => peticionDelete()}>Borrar nota</Button>
            <Button onClick={onCloseBorrar}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            
        <Footer/>
        </>
    )
}



export default AdminNoticias;