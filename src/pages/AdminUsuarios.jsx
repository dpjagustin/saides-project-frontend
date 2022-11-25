import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
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
  useToast,
  ModalContent,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";



export default function AdminUsuarios() {
  const ulrUsers = "http://localhost:8000/api/users"
  const urlauth = "http://localhost:8000/api/authUser"
  const urlregister = "http://localhost:8000/api/register"
  const urldeleteuser = "http://localhost:8000/api/deleteUser"
  const [actualizar, setActualizar]=useState(0)
  const [usuarios, setUsuarios] = useState([])
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    username: "",
    password: "",
    imagen: "",
    rol: ""
  })
  const [rol, setRol] = useState("")
  const navigate = useNavigate();
  const [userSeleccionado, setUserSeleccionado] = useState({
    id: "",
  })

  const asd1 = useColorModeValue('white', 'gray.900')
  const { isOpen: isOpenCrear, onOpen: onOpenCrear, onClose: onCloseCrear } = useDisclosure()
  const { isOpen: isOpenBorrar, onOpen: onOpenBorrar, onClose: onCloseBorrar } = useDisclosure()
  const initialRef = React.useRef(null)
  const toast = useToast()
  const asd2 = useColorModeValue("2xl", "0px 0px 13px 2px rgba(255,255,255,0.2)")
  const asd3 = useColorModeValue("2xl", "0px 3px 13px 2px rgba(139, 193, 255, 0.2)")

  /////////////////////TRAE LOS USUARIOS//////////////
  useEffect(() => {
    (
      async () => {
        await axios.get(ulrUsers)
          .then((res) => {
            setUsuarios(res.data)
          }).catch((error) => {
          })
      }
    )();
  },[actualizar]);
  ///////////////////VERIFICA QUE SEA ADMIN/////////////////////
  useEffect(() => {
    (
      async () => {
        await axios.get(urlauth, { withCredentials: true })
          .then((res) => {
            const userRol = res.data
            setRol(userRol.rol)
          }).catch((error) => {
            swal({ icon: "error", title: "No hay un usuario logeado" })
            navigate("/")
          })
      }
    )();
  },[]);
  if (rol === 1) {
    navigate("/index")
    swal({ icon: "error", title: "No tienes permisos" })
  }

  ////////////HANDLE DE CREAR USUARIO///////////
  function handle(e) {
    const nuevoUsuario = { ...newUser }
    nuevoUsuario[e.target.id] = e.target.value
    setNewUser(nuevoUsuario)
    console.log(nuevoUsuario)
  }

  ///////////////CREAR USUARIO////////////

  const crearUsuario = async () => {
    await axios.post(urlregister, {
      nombre: newUser.nombre,
      apellido: newUser.apellido,
      username: newUser.username,
      password: newUser.password,
      rol: newUser.rol,
      imagen: newUser.imagen
    }).then(res => {
      toast({
        title: "Usuario creado correctamente",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
      })
      setActualizar(actualizar+1)
      onCloseCrear()
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
    onOpenBorrar();
  }

///////////////BORRAR USUARIO/////////////////
  const borrarUsuario = async () => {
    await axios.post(urldeleteuser, {
      id: userSeleccionado.id
    }).then(res => {
      toast({
        title: "Usuario borrado correctamente",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
      })
      setActualizar(actualizar+1)
      onCloseBorrar()
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



  return (
    <>
      <NavBar />
      <Heading fontSize={[25, 35, 45, 60]} my="2%" ml="7%">Usuarios</Heading>
      {rol === 2 &&
        <Button size="lg" ml="10%" onClick={onOpenCrear} boxShadow={asd3}>Crear usuario</Button>
      }
      <Flex justifyContent="center">
        <Flex justify="space-evenly" wrap="wrap" w="80%">
          {usuarios.map(user => (
            <Center py={6}>
              <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: '100%', md: '540px' }}
                height={{ sm: '476px', md: '20rem' }}
                direction={{ base: 'column', md: 'row' }}
                bg={asd1}
                boxShadow={asd2}
                padding={4}>
                <Flex flex={1} bg={asd1}>
                  <Image
                    objectFit="cover"
                    boxSize="100%"
                    src={user.imagen}
                    alt={"Imagen de usuario"}
                    borderRadius="7px"
                  />
                </Flex>
                <Stack
                  flex={1}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  p={1}
                  pt={2}>
                  <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {user.nombre} {user.apellido}
                  </Heading>
                  <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                    @{user.username}
                  </Text>
                  <Text
                    textAlign={'center'}
                    color='gray.700'
                    px={3}>
                    {user.descripcion}
                  </Text>
                  <Text textAlign={'center'}
                    color='gray.700'
                    px={3}>Rol: {user.rol}</Text>

                  <Stack
                    width={'100%'}
                    mt={'2rem'}
                    direction={'row'}
                    padding={2}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <Button
                      flex={1}
                      fontSize={'sm'}
                      rounded={'full'}
                      _focus={{
                        bg: 'gray.200',
                      }}>
                      Message
                    </Button>
                    <Button
                      flex={1}
                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      Follow
                    </Button>
                    {rol === 2 &&
                      <Button onClick={() => seleccionarUsuario(user)}><DeleteIcon /></Button>
                    }
                  </Stack>
                </Stack>
              </Stack>
            </Center>
          ))}
        </Flex>
      </Flex>
      <Footer />


      <Modal isOpen={isOpenCrear} onClose={onCloseCrear}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} >
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input id="nombre" onChange={(e) => handle(e)} ref={initialRef} placeholder='Nombre' />
            </FormControl>
            <FormControl>
              <FormLabel>Apellido</FormLabel>
              <Input id="apellido" onChange={(e) => handle(e)} ref={initialRef} placeholder='Apellido' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Usuario</FormLabel>
              <Input id="username" onChange={(e) => handle(e)} ref={initialRef} placeholder='Usuario' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Contraseña</FormLabel>
              <Input id="password" type="password" onChange={(e) => handle(e)} ref={initialRef} placeholder='Contraseña' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Rol</FormLabel>
              <Input id="rol" onChange={(e) => handle(e)} ref={initialRef} placeholder='Rol' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Imagen</FormLabel>
              <Input id="imagen" onChange={(e) => handle(e)} ref={initialRef} placeholder='Imagen' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={crearUsuario}>
              Crear usuario
            </Button>
            <Button onClick={onCloseCrear}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenBorrar} onClose={onCloseBorrar}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Borrar usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Estas seguro que deseas borrar el usuario: <br /> <p id="notaborrar">{userSeleccionado && userSeleccionado.nombre}</p></FormLabel>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={() => borrarUsuario()}>Borrar usuario</Button>
            <Button onClick={onCloseBorrar}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}
