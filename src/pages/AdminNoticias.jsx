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
  useColorModeValue,
  useToast,
  Image,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import es from "date-fns/locale/es";

function AdminNoticias(){
  const urlCrearNoticia="http://10.0.0.47:8000/api/addNoticia"
  const urlDeleteNoticia = "http://10.0.0.47:8000/api/deleteNoticia"
  const urlModificarNoticia = "http://10.0.0.47:8000/api/updateNoticia"
  const urlTraerNoticias="http://10.0.0.47:8000/api/FindNoticias"
  const urlauth="http://10.0.0.47:8000/api/authUser"
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
  const asd3 =useColorModeValue("2xl", "0px 3px 13px 2px rgba(139, 193, 255, 0.2)")
  const cambiarColoresShadow= useColorModeValue("xl","0px 0px 8px 2px rgba(255,255,255,0.5)")
  const toast= useToast()
  const [fecha, setFecha] = useState(new Date())
  const isError = novAdd.imagen === ""

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
    const traerNoticias = async()=>{
      await axios.get(urlTraerNoticias)
      .then((res)=>{
        setData(res.data)
      })
    }
    return traerNoticias
  }, [actualizar]);

  //////////////CREAR NOTICIA//////////////
  const crearNoticia = async ()=>{
    await axios.post(urlCrearNoticia,{
      fecha: fechaCompleta,
        titulo: novAdd.titulo,
        subtitulo: novAdd.subtitulo,
        item1: novAdd.item1,
        item2: novAdd.item2,
        item3: novAdd.item3,
        imagen: novAdd.imagen
    })
    .then((res)=>{
      toast({
        title: "Noticia creada correctamente",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
    })
    setActualizar(actualizar+1)
    onCloseCrear()
    setNovAdd([0])
    }).catch((err)=>{
      toast({
        title: "Error. Intente nuevamente.",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
    })

    })
  }
  /////////////// MODIFICAR NOTICIA/////////////

  const peticionPut = async () => {
    await axios.put(urlModificarNoticia, {
      id: novSeleccionada.id,
      fecha: novSeleccionada.fecha,
      titulo: novSeleccionada.titulo,
      subtitulo: novSeleccionada.subtitulo,
      item1: novSeleccionada.item1,
      item2: novSeleccionada.item2,
      item3: novSeleccionada.item3,
      imagen: novSeleccionada.imagen
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
    await axios.post(urlDeleteNoticia, {
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
  //////////////DEVUELVE LA FECHA DE SELECCIONADOR DE FECHAS///////////////
  const formatDia = fecha.getDate()
  const formatMes = fecha.getMonth() + 1
  const formatAño = fecha.getFullYear()
  const fechaCompleta=formatDia+"/"+formatMes+"/"+formatAño
  /////////////////////////////////////////////////////////

  
    return(
        <>
        <NavBar/>
        <Box minH="100vh">
          <Box>
            <Heading fontSize="70px" my="50px" ml="100px">Noticias</Heading>
            <Flex justify="end" mr="100px">
              <Button size="lg" ml="10%" onClick={onOpenCrear} boxShadow={asd3}>Crear noticia</Button>
            </Flex>
            {data.length === 0 ?
              <Box textAlign="center" py={10} px={6}>
                <InfoIcon boxSize={'50px'} color={'blue.300'} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                  No hay noticias actualmente
                </Heading>
                <Text color={'gray.500'}>
                  Para crear una noticia presione en crear noticia.
                </Text>
              </Box>
              : null}
            <Flex wrap="wrap" w="90%" justify="center">
              
              {data.map(nov => (
                <Box rounded='md' key={nov.id} boxShadow={cambiarColoresShadow} minW="300px" minHeight="200px" maxW="400px" overflow="hidden" m="30px">
                  <Box>
                    <Image src={nov.imagen} w="100%"/>
                  </Box>
                  <Box p="5%">
                    <Box fontWeight="medium" fontSize="lg">
                      {nov.fecha}
                    </Box>
                    <Heading size='lg' my='2'>
                      <h2>{nov.titulo}</h2>
                    </Heading>
                    <Text className="subtitulo" mb="3">{nov.subtitulo}</Text>
                    {nov.item1.length!==0?
                    <Text>•{nov.item1}<br /></Text>
                    :null}
                    {nov.item2.length!==0?
                    <Text>•{nov.item2}<br /></Text>
                    :null}
                    {nov.item3.length!==0?
                    <Text>•{nov.item3}<br /></Text>
                    :null}
                    <Box >
                      <Button onClick={() => seleccionarNov(nov, "Editar")} mx="5px"><EditIcon /></Button>
                      <Button mx="5px" onClick={() => seleccionarNov(nov, "Eliminar")}><DeleteIcon /></Button>
                    </Box>
                  </Box>
                </Box>
              ))}
        </Flex>



      </Box>
      
      </Box>
        <Footer/>
        {/* ----------------------------------------------------*/}
      {/* ------------------------- MODALES ------------------*/}
      {/* ----------------------------------------------------*/}

      <Modal isOpen={isOpenCrear} onClose={onCloseCrear}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Crear novedad</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} >
              <FormControl>
                <FormLabel>Fecha</FormLabel>
                <DatePicker className="datepicker" selected={fecha} onChange={(date) => setFecha(date)} dateFormat="dd/MM/yyyy" locale={es} />
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
              <FormControl mt={4} isInvalid={isError}>
                <FormLabel>Imagen</FormLabel>
                <Input id="imagen" onChange={(e) => handle(e)} value={novAdd.imagen} placeholder='Imagen'></Input>
                {!isError ? (<FormHelperText></FormHelperText>) :(<FormErrorMessage>Imagen requerida</FormErrorMessage>)} 
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={crearNoticia}>
                Crear noticia
              </Button>
              <Button onClick={onCloseCrear}>Cancelar</Button>
              <Text></Text>
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
              <FormLabel>Fecha</FormLabel>
              <DatePicker className="datepicker" selected={fecha} onChange={(date) => setFecha(date)} dateFormat="dd/MM/yyyy" locale={es} />
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
            <FormControl mt={4}>
              <FormLabel>Imagen</FormLabel>
              <Input name="imagen" onChange={handleChange} value={novSeleccionada && novSeleccionada.imagen}></Input>
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
            <Button colorScheme='red' mr={3} onClick={() => peticionDelete()}>Borrar noticia</Button>
            <Button onClick={onCloseBorrar}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
}



export default AdminNoticias;