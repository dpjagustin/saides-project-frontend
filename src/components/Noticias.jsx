import React, { useState } from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  LinkBox,
  Box,
  Heading,
  Image,
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
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";

const urlnovedades="http://localhost:3003/novedades"

export default function Noticias() {
  const [data, setData] = useState([]);

  const [novSeleccionada, setNovSeleccionada] = useState({
    id:"",
    fecha:"",
    titulo:"",
    subtitulo:"",
    item1:"",
    item2:"",
    item3:""
  })

  const handleChange = e =>{
    const {name, value} = e.target;
    setNovSeleccionada(prevState =>({
      ...prevState,
      [name]:value
    }))
  }

  const peticionGet = async () =>{
    await axios.get(urlnovedades)
    .then(response => {
      setData(response.data);
    })
  }

  const peticionPost = async () =>{
    await axios.post(urlnovedades, novSeleccionada)
    .then(response => {
      setData(data.concat(response.data))
      onCloseCrear()
    })
  }

  const peticionPut = async () =>{
    await axios.put(urlnovedades+"/"+novSeleccionada.id, novSeleccionada)
    .then((response)=>{
      var dataNueva = data;
      dataNueva.map(nov=>{
        if(nov.id === novSeleccionada.id){
          nov.fecha = novSeleccionada.fecha;
          nov.titulo = novSeleccionada.titulo;
          nov.subtitulo = novSeleccionada.subtitulo;
          nov.item1 = novSeleccionada.item1;
          nov.item2 = novSeleccionada.item2;
          nov.item3 = novSeleccionada.item3;
        }
      })
      setData(dataNueva);
      onCloseEditar();
    }).catch(error=>{
      console.log(error)
    })
  }

  const peticionDelete = async () =>{
    await axios.delete(urlnovedades+"/"+novSeleccionada.id)
    .then(response =>{
      setData(data.filter(nov => nov.id !== novSeleccionada.id));
      onCloseBorrar();
    }).catch(error=>{
      console.log(error)
    })
  }

  const seleccionarNov =(nov, caso) =>{
    setNovSeleccionada(nov);
    (caso === "Editar")?onOpenEditar():onOpenBorrar();
  }

  useEffect(async () =>{
    await peticionGet();
  }, [])
  
  const { isOpen: isOpenCrear, onOpen: onOpenCrear, onClose: onCloseCrear } = useDisclosure()
  const { isOpen: isOpenEditar, onOpen: onOpenEditar, onClose: onCloseEditar } = useDisclosure()
  const { isOpen: isOpenBorrar, onOpen: onOpenBorrar, onClose: onCloseBorrar } = useDisclosure()
  const initialRef = React.useRef(null)

  return(
    <>
    <ContenedorNoticias>
        <ContenedorTitulo>
          <h2>Novedades</h2>
        </ContenedorTitulo>
        <Box>
          <Button onClick={onOpenCrear}>Crear Novedad</Button>
        </Box>
        {data.map(nov=>(
          <Box maxW='sm' p='5' borderWidth='1px' rounded='md' key={nov.id}>
          <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
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
            <Button onClick={()=>seleccionarNov(nov,"Editar")}><EditIcon/></Button>
            <Button onClick={()=>seleccionarNov(nov,"Eliminar")}><DeleteIcon/></Button>
             
          </Box>
        </Box>
        ))}
          </ContenedorNoticias>
          {/* ----------------------------------------------------*/}
            {/* ------------------------- MODALES ------------------*/}
            {/* ----------------------------------------------------*/}

            <Modal isOpen={isOpenCrear} onClose={onCloseCrear}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear novedad</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Fecha</FormLabel>
                            <Input name="fecha" onChange={handleChange} ref={initialRef} placeholder='Fecha' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Titulo</FormLabel>
                            <Input name="titulo" onChange={handleChange} ref={initialRef} placeholder='Titulo' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Subtitulo</FormLabel>
                            <Textarea name="subtitulo" onChange={handleChange} placeholder='Subtitulo'></Textarea>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Item 1</FormLabel>
                            <Textarea name="item1" onChange={handleChange} placeholder='Item 1'></Textarea>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Item 2</FormLabel>
                            <Textarea name="item2" onChange={handleChange} placeholder='Item 2'></Textarea>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Item 3</FormLabel>
                            <Textarea name="item3" onChange={handleChange} placeholder='Item 3'></Textarea>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={peticionPost}>
                            Crear novedad
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
                            <FormLabel>Fecha</FormLabel>
                            <Input name="fecha" onChange={handleChange} value={novSeleccionada&&novSeleccionada.fecha} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Titulo</FormLabel>
                            <Input name="titulo" onChange={handleChange} value={novSeleccionada&&novSeleccionada.titulo} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Subtitulo</FormLabel>
                            <Textarea name="subtitulo" onChange={handleChange} value={novSeleccionada&&novSeleccionada.subtitulo}></Textarea>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Item 1</FormLabel>
                            <Textarea name="item1" onChange={handleChange} value={novSeleccionada&&novSeleccionada.item1}></Textarea>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Item 2</FormLabel>
                            <Textarea name="item2" onChange={handleChange} value={novSeleccionada&&novSeleccionada.item2}></Textarea>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Item 3</FormLabel>
                            <Textarea name="item3" onChange={handleChange} value={novSeleccionada&&novSeleccionada.item3}></Textarea>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={()=>peticionPut()}>Guardar modificacion</Button>
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
                        <FormLabel>Estas seguro que deseas borrar la nota: <br /> <p id="notaborrar">{novSeleccionada&&novSeleccionada.titulo}</p></FormLabel>
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
const ContenedorNoticias = styled.div`
  width: 100%;
  /* height: 250px; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ContenedorTitulo = styled.div`  
  width: 85%;
  padding-left: 2.2rem;

  h2{
    font-weight: 900;
    font-size: 2rem;
  }
`;
