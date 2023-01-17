import axios from "axios";
import React,{useState, useEffect} from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Heading, Flex, Text, Button, Box, Card, CardBody, StackDivider, Stack, ModalOverlay,Modal,FormLabel,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
ModalContent,
useDisclosure,useToast } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";


export default function AdminSolicitudes(){
    const urlauth = "http://10.0.0.47:8000/api/authUser"
    const urlTraerAllSolPerm="http://10.0.0.47:8000/api/findSolicitudes"
    const urlAprobarPerm="http://10.0.0.47:8000/api/confirmarSolicitud"
    const urlRechazarPerm="http://10.0.0.47:8000/api/rechazarSolicitud"
    const urlBorrarPerm="http://10.0.0.47:8000/api/eliminarSolicitud"

    const [rol, setRol] = useState("");
    const [allPerm, setAllPerm]=useState([])
    const navigate = useNavigate();
    const toast = useToast()
    const [pag, setPag]= useState(1)
    const [actualizar, setActualizar]=useState(0)
    const [permSelec, setPermSelec]= useState()
    
    /////////////////VERIFICA QUE ES ADMIN///////////////////
    useEffect(() => {
        (
            async () => {
                await axios.get(urlauth, { withCredentials: true })
                    .then((res) => {
                        const usuario = res.data
                        setRol(usuario.rol)
                    }).catch((error) => {
                        swal({ icon: "error", title: "No hay un usuario logeado" })
                        navigate("/")
                    })
            }
        )();
    });

    if (rol === 1) {
        navigate("/index")
        swal({ icon: "error", title: "No tienes permisos" })
    }
    /////////////////////////////////////////////////////////

    ////////////////////////TRAE TODAS LAS SOLICITUDES DE PERM/////////////
    
      useEffect(() => {
       traerHistPerm();
      },[actualizar])
      
      const traerHistPerm= async ()=>{
        await axios.get(urlTraerAllSolPerm)
        .then((res)=>{
          setAllPerm(res.data)
        }).catch((err)=>{

        })
      }
    /////////////////////////////////////////////////////////

    ///////////////CAMBIO DE PAGINAS//////////////
  const handlePag = () => {
    setPag(1)
  }
  const handlePag2 = () => {
    setPag(2)
  }
  console.log(allPerm);
    ////////////////////////////////////////////////////////
    ////////////////APROBAR PEDIDO////////////////////////
    const aprobarPerm= async ()=>{
        await axios.patch(urlAprobarPerm,{
            id:permSelec
        })
        .then((res)=>{
            toast({
                title: "Permiso aprobado correctamente.",
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
            onCloseAprobar()
            setActualizar(actualizar+1)
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

    ////////////////////////////////////////////////////////

    ///////////////////RECHAZAR PERMISO//////////////////////
    const rechazarPerm= async ()=>{
        await axios.patch(urlRechazarPerm,{
            id:permSelec
        })
        .then((res)=>{
            toast({
                title: "Permiso rechazado correctamente.",
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
            onCloseRechazar()
            setActualizar(actualizar+1)

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
    ////////////////////////////////////////////////////////
    //////////////////BORRAR PERMISO/////////////////////
    const borrarPerm= async ()=>{
        await axios.delete(urlBorrarPerm,{
            id:permSelec
        })
        .then((res)=>{
            toast({
                title: "Permiso borrado correctamente.",
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
            setActualizar(actualizar+1)
            onCloseBorrar()
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

    //////////////////SELECCIONAR PERMISO///////////////////
    const permSeleccionado = (permiso, caso)=>{
        setPermSelec(permiso);
        (caso ==="eliminar")?onOpenBorrar():(caso==="aprobar")?onOpenAprobar():onOpenRechazar()
    }
    ////////////////////////////////////////////////////////

    const { isOpen: isOpenBorrar, onOpen: onOpenBorrar, onClose: onCloseBorrar } = useDisclosure()
    const { isOpen: isOpenAprobar, onOpen: onOpenAprobar, onClose: onCloseAprobar } = useDisclosure()
    const { isOpen: isOpenRechazar, onOpen: onOpenRechazar, onClose: onCloseRechazar } = useDisclosure()
    return(
        <>
        <NavBar/>
        <Box minH="100vh">
        <Heading fontSize={[25, 35, 45, 60]} my="2%" ml="7%">Solicitudes de permiso</Heading>
        <Flex ml="10%" wrap="wrap">
            <Button borderRadius="20px" value="1" id="sida" onClick={handlePag} mr="1%">Ver solicitudes de permisos</Button>
            <Button borderRadius="20px" onClick={handlePag2} >Ver historial de solicitudes</Button>
        </Flex>
        {pag===1?
        <>
            <Flex justify="center" wrap="wrap">
            <Flex justify="space-around" w="80%" wrap="wrap" >
              {allPerm.map(perm=>(
                <Card w="48%" my="2%" key={perm.id} pb="1%">
                  <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    {perm.estado==="Pendiente"?
                    <Box bg={"yellow.400"} borderRadius="10px">
                      <Heading size="md" textAlign="center" p="1%" fontSize="x-large">{perm.estado}</Heading>
                    </Box>
                  :null}
                  {perm.estado==="Rechazado"?
                    <Box bg={"red.400"} borderRadius="10px">
                      <Heading size="md" textAlign="center" p="1%" fontSize="x-large">{perm.estado}</Heading>
                    </Box>
                  :null}
                  {perm.estado==="Confirmado"?
                    <Box bg={"green.400"} borderRadius="10px">
                      <Heading size="md" textAlign="center" p="1%" fontSize="x-large">Aprobado</Heading>
                    </Box>
                  :null}
                   <Heading size='md'>
                        {perm.nombre}
                      </Heading>
                  <Flex direction="row" >
                    <Flex direction="column">
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Motivo
                      </Heading>
                      <Text>{perm.motivo}</Text>
                    </Box>
                    {/*  */}
                    {perm.notaM.length!==0 ?
                    <Box>
                    <Heading size='md'>
                      Nota del motivo
                    </Heading>
                    <Text>{perm.notaM}</Text>
                  </Box>
                  :null}
                  {/*  */}
                  <Box>
                      <Heading size='md'>
                        Detalle específico del motivo
                      </Heading>
                      <Text>{perm.detalle}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Dias u horas
                      </Heading>
                      <Text>{perm.DoH}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Cantidad dias u horas
                      </Heading>
                      <Text>{perm.cantDoH}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Inicia
                      </Heading>
                      <Text>{perm.inicia}</Text>
                    </Box>
                    {/*  */}
                    </Flex>

                    {/* /////////////////////////////////////////////////// */}
                    <Flex direction="column">
                    <Box>
                      <Heading size='md'>
                      Finaliza
                      </Heading>
                      <Text>{perm.finaliza}</Text>
                    </Box>
                    {/*  */}
                    
                    <Box>
                      <Heading size='md'>
                        Regresa al puesto de trabajo
                      </Heading>
                      <Text>{perm.vuelve}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Reuniones, cursos o eventos importantes
                      </Heading>
                      <Text>{perm.importante}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Propuesta de compensación
                      </Heading>
                      <Text>{perm.propuesta}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Documentacion de respaldo
                      </Heading>
                      <Text>{perm.documentacion}</Text>
                    </Box>
                    {/*  */}
                    {perm.notaD.length!==0 ?
                    <Box>
                    <Heading size='md'>
                      Nota de la documentacion
                    </Heading>
                    <Text>{perm.notaD}</Text>
                  </Box>
                  :null}
                  </Flex>
                  </Flex>
                    </Stack>
                  </CardBody>
                  <Flex justify="space-evenly">
                    <Button colorScheme="red" onClick={()=>permSeleccionado(perm,"")}>Rechazar<CloseIcon></CloseIcon></Button>
                    <Button colorScheme="green" onClick={()=>permSeleccionado(perm,"aprobar")}>Aprobar<CheckIcon></CheckIcon></Button>
                    <Button colorScheme="blue" onClick={()=>permSeleccionado(perm,"eliminar")}>Borrar<DeleteIcon></DeleteIcon></Button>
                </Flex>
                </Card>
                
    
              ))}
            
            </Flex>
            </Flex>
            </>
        :null
        }
        </Box>
        <Footer/>
        <Modal isOpen={isOpenAprobar} onClose={onCloseAprobar}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Aprobar permiso</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel>Estas seguro que deseas aprobar el permiso de {permSelec&&permSelec.nombre}?</FormLabel>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='green' mr={3} onClick={()=>aprobarPerm()}>Aprobar permiso</Button>
                        <Button onClick={onCloseAprobar}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isOpenRechazar} onClose={onCloseRechazar}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Rechazar permiso</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel>Estas seguro que deseas rechazar el permiso de {permSelec&&permSelec.nombre}?</FormLabel>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={()=>rechazarPerm()}>Rechazar permiso</Button>
                        <Button onClick={onCloseRechazar}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenBorrar} onClose={onCloseBorrar}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Borrar permiso</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel>Estas seguro que deseas borrar el permiso de {permSelec&&permSelec.nombre}?</FormLabel>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={()=>borrarPerm()}>Borrar permiso</Button>
                        <Button onClick={onCloseBorrar}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}