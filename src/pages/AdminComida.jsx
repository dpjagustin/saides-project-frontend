import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import axios from "axios";
import {
    Heading, Flex, Text, Textarea, Button, Select, Box, Card, CardHeader, CardBody, StackDivider, Stack, Divider, useColorModeValue, TableContainer, Table, TableCaption, Tr, Th, Thead, Tbody, Td, useToast, useDisclosure, Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalContent,
    FormLabel
} from "@chakra-ui/react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "../components/styles/admincomida.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import es from "date-fns/locale/es";
import { DeleteIcon } from "@chakra-ui/icons";


export default function AdminComida() {
    /////////////URLS API///////////////////////////////////
    const urlauth = "http://localhost:8000/api/authUser"
    const urlAddComida = "http://localhost:8000/api/addComida"
    const urlAddOpcionDia = "http://localhost:8000/api/addOpcion"
    const urlBuscarComida = "http://localhost:8000/api/busquedaPorDia"
    const urlCantComidas = "http://localhost:8000/api/contadores"
    const urlOpcionesComidas = "http://localhost:8000/api/busquedaComidas"
    const urlDeshabilitarMes = "http://localhost:8000/api/updateSeleFalse"
    const urlHabilitarMes = "http://localhost:8000/api/updateSeleTrue"
    const urlBorrarComidaSelecUser = "http://localhost:8000/api/deleteMenu"
    const urlBorrarComidaMes = "http://localhost:8000/api/deleteComidaMes"
    const urlBorrarComidaDiaMes = "http://localhost:8000/api/deleteComidaSele"

    /////////////////////////////////////////////////////////

    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [comidaAdd, setComidaAdd] = useState("")
    const [comidaMes, setComidaMes] = useState({
        dia: "",
        mes: "",
        año: "",
        opcion1: "",
        opcion2: "",
    })
    const [comidaUserSelec, setComidaUserSelec] = useState()
    const [rol, setRol] = useState("");
    const [actualizar, setActualizar] = useState(0)
    const navigate = useNavigate();
    const toast = useToast()
    const [pag, setPag] = useState(1)
    const [fecha, setFecha] = useState(new Date())

    const asd2 = useColorModeValue("2xl", "0px 0px 13px 2px rgba(255,255,255,0.4)")
    const cantColores = useColorModeValue("blue.700", "blue.100")

    /////////////////TRAE LAS OPCIONES DE COMIDAS////////////////
    useEffect(() => {
        (
            async () => {
                await axios.get(urlOpcionesComidas)
                    .then((res) => {
                        setData(res.data)
                    })
                    .catch((error) => {
                    })
            }
        )();
    }, [actualizar]);
    /////////////////////////////////////////////////////////
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

    /////////////////HANDLE DE LA CARGA DE LA COMIDA DEL DIA////////////////
    function handle(e) {
        const cargaSele = { ...comidaMes }
        cargaSele[e.target.id] = e.target.value
        setComidaMes(cargaSele)
    }
    /////////////////////////////////////////////////////////
    ///////////////////CARGAR UNA COMIDA PARA ELEGIR//////////////////////
    const cargarComida = async () => {
        await axios.post(urlAddComida, {
            comidas: comidaAdd
        },
            {
                withCredentials: true

            }).then((res) => {
                setActualizar(actualizar + 1)
                document.getElementById("comidaAdd").value = ""
                toast({
                    title: "Menu guardado correctamente",
                    status: "success",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                })

            }).catch((error) => {
                toast({
                    title: "Error. Intente nuevamente.",
                    status: "error",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                })
            })
    }
    /////////////////////////////////////////////////////////
    ////////////////////CARGAR LOS DIAS DEL MES CON SUS OPCIONES
    const cargarDiaMes = async () => {
        await axios.post(urlAddOpcionDia, {
            dia: formatDia,
            mes: formatMes,
            año: formatAño,
            opcion1: comidaMes.opcion1,
            opcion2: comidaMes.opcion2,
        }).then(res => {
            toast({
                title: "Menus del dia guardado correctamente",
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
            document.getElementById("opcion1").value = ""
            document.getElementById("opcion2").value = ""
            setComidaMes({})
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
    /////////////////////////////////////////////////////////

    //////////////BUSCAR COMIDAS DEL MES////////////////
    const buscarComida = async () => {
        await axios.post(urlBuscarComida, {
            dia: formatDia,
            mes: formatMes,
            año: formatAño,
        }).then(res => {
            setData2(res.data)
        }).catch(error => {
        })
        await axios.post(urlCantComidas, {
            dia: formatDia,
            mes: formatMes,
            año: formatAño,
        }).then(res => {
            setData3(res.data)
            toast({
                title: "Busqueda realizada correctamente",
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
        }).catch(error => {
            toast({
                title: "Error. No se encontraron resultados. Intente nuevamente.",
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
            setData3([])
        })
    }
    /////////////////////////////////////////////////////////
    //////////HABILITAR MES//////////////
    const habilitarMes = async () => {
        await axios.patch(urlHabilitarMes, {
            mes: formatMes,
            año: formatAño
        }).then(res => {
            toast({
                title: "Mes habilitado correctamente.",
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
        }).catch(error => {
            toast({
                title: "Error. No se pudo habilitar. Intente nuevamente.",
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
        })
    }
    /////////////////////////////////////////////////////////

    //////////DESHABILITAR MES//////////////
    const deshabilitarMes = async () => {
        await axios.patch(urlDeshabilitarMes, {
            mes: formatMes,
            año: formatAño
        }).then(res => {
            toast({
                title: "Mes deshabilitado correctamente.",
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
        }).catch(error => {
            toast({
                title: "Error. No se pudo deshabilitar. Intente nuevamente.",
                status: "error",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
        })
    }
    /////////////////////////////////////////////////////////
    ////////////////BORRAR DIA/USUARIO/MENU/NOTA//////////////

    const borrarComidaUserSelec = async () => {
        await axios.post(urlBorrarComidaSelecUser, {
            id: comidaUserSelec
        })
            .then((res) => {
                toast({
                    title: "Comida borrada correctamente.",
                    status: "success",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                })
                onCloseBorrar()
                axios.post(urlBuscarComida, {
                    dia: formatDia,
                    mes: formatMes,
                    año: formatAño,
                }).then(res => {
                    setData2(res.data)
                })
                axios.post(urlCantComidas, {
                    dia: formatDia,
                    mes: formatMes,
                    año: formatAño,
                }).then(res => {
                    setData3(res.data)
                })
            })
            .catch((error) => {
                toast({
                    title: "Error. Intente nuevamente.",
                    status: "error",
                    position: "top",
                    duration: 2000,
                    isClosable: true,
                })
            })
    }
    const seleccionarComida = (comida) => {
        setComidaUserSelec(comida);
        onOpenBorrar()
    }

    //////////////////////////////////////
    ///////////BORRAR MES GUARDADO POR SELE//////////////////
    const borrarComidaMes = async () => {
        await axios.post(urlBorrarComidaMes, {
            mes: formatMes,
            año: formatAño
        }).then((res) => {
            toast({
                title: "Mes borrado correctamente.",
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
                .catch((err) => {
                    toast({
                        title: "Error. Intente nuevamente.",
                        status: "error",
                        position: "top",
                        duration: 2000,
                        isClosable: true,
                    })
                })
        })
    }

    /////////////////////////////////////////////////////////
    /////////////////BORRAR DIA GUARDADO POR SELE/////////////////
    const borrarComidaDiaMes = async () => {
        await axios.post(urlBorrarComidaDiaMes, {
            dia: formatDia,
            mes: formatMes,
            año: formatAño
        }).then((res) => {
            toast({
                title: "Dia borrado correctamente.",
                status: "success",
                position: "top",
                duration: 2000,
                isClosable: true,
            })
                .catch((err) => {
                    toast({
                        title: "Error. Intente nuevamente.",
                        status: "error",
                        position: "top",
                        duration: 2000,
                        isClosable: true,
                    })
                })
        })
    }
    /////////////////////////////////////////////////////////

    //////////////HANDLE DE LAS PAG/////////////
    const handlePag = () => {
        setPag(1)
    }
    const handlePag2 = () => {
        setPag(2)
    }
    const handlePag3 = () => {
        setPag(3)
    }
    const handlePag4 = () => {
        setPag(4)
    }
    const handlePag5 = () => {
        setPag(5)
    }


    //////////////DEVUELVE LA FECHA DE SELECCIONADOR DE FECHAS///////////////
    const formatDia = fecha.getDate()
    const formatMes = fecha.getMonth() + 1
    const formatAño = fecha.getFullYear()
    /////////////////////////////////////////////////////////


    const { isOpen: isOpenBorrar, onOpen: onOpenBorrar, onClose: onCloseBorrar } = useDisclosure()
    return (
        <>
            <NavBar />
            <Box minH="100vh">

                {/*////////////////// CARGA DE LOS MENUS DEL MES////////////////////////// */}
                <Heading fontSize={[25, 35, 45, 60]} my="3%" ml="7%" >Cargar Comidas</Heading>
                <Flex ml="8%" wrap="wrap">
                    <Button onClick={handlePag} boxShadow={asd2} mx="10px" mb="2%">Cargar menus por dia</Button>
                    <Button onClick={handlePag2} boxShadow={asd2} mx="10px" mb="2%">Habilitar-deshabilitar</Button>
                    <Button onClick={handlePag3} boxShadow={asd2} mx="10px" mb="2%">Cargar Comidas del distribuidor</Button>
                    <Button onClick={handlePag4} boxShadow={asd2} mx="10px" mb="2%">Eliminar menus por dia</Button>
                    <Button onClick={handlePag5} boxShadow={asd2} mx="10px" mb="2%">Eliminar mes guardado por usuarios</Button>

                </Flex>

                {pag === 1 ?
                    <Flex justify="center">
                        <Card w="auto" boxShadow={asd2}>
                            <Flex direction="column" align="center" p="20px">
                                <Flex>
                                    <Flex direction="column" align="center" mx="10px">
                                        <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir dia</Text>
                                        <DatePicker className="datepicker" selected={fecha} onChange={(date) => setFecha(date)} dateFormat="dd/MM/yyyy" locale={es} />
                                    </Flex>
                                </Flex>
                                <Divider orientation="horizontal" my="20px" borderWidth="2px" />
                                <Flex>
                                    <Flex direction="column" mx="10px">
                                        <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir primera opcion</Text>
                                        <Select placeholder='Seleccionar opcion' id="opcion1" onChange={(e) => handle(e)} w={[150, 250, 350, 450]}>
                                            {data.map(opciones => (
                                                <option key={opciones.id}>{opciones.comidas}</option>
                                            ))}
                                        </Select>
                                    </Flex>
                                    <Flex direction="column" mx="10px">
                                        <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir segunda opcion</Text>
                                        <Select placeholder='Seleccionar opcion' id="opcion2" onChange={(e) => handle(e)} w={[150, 250, 350, 450]}>
                                            {data.map(opciones => (
                                                <option key={opciones.id}>{opciones.comidas}</option>
                                            ))}
                                        </Select>
                                    </Flex>
                                </Flex>
                                <Button colorScheme="blue" size="lg" onClick={() => cargarDiaMes()} mt="20px">Guardar</Button>
                            </Flex>
                        </Card>
                    </Flex>
                    : null}
                {pag === 2 ?
                    <Flex justify="center">
                        <Card w="auto" boxShadow={asd2}>
                            <Flex direction="column" align="center" p="20px">
                                <Flex>
                                    <Flex direction="column" mx="10px" align="center">
                                        <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir mes y año</Text>
                                        <DatePicker className="datepicker" selected={fecha} onChange={(date) => setFecha(date)} dateFormat="MM/yyyy" showMonthYearPicker locale={es} />
                                    </Flex>

                                </Flex>
                                <Divider orientation="horizontal" my="20px" borderWidth="2px" />
                                <Flex direction="row" wrap="wrap">
                                    <Button colorScheme="blue" size="lg" onClick={() => habilitarMes()} mt="5px" mr="20px">Habilitar</Button>
                                    <Button colorScheme="red" size="lg" onClick={() => deshabilitarMes()} mt="5px">Deshabilitar</Button>
                                </Flex>
                            </Flex>
                        </Card>
                    </Flex>
                    : null}
                {pag === 3 ?
                    <Flex justify="center">
                        <Card w="50%" boxShadow={asd2}>
                            <Flex direction="column" align="center">
                                <CardHeader>
                                    <Heading fontSize={[20, 30, 32, 38]}>Ingresar comida</Heading>
                                </CardHeader>
                                <CardBody w="100%">
                                    <Stack divider={<StackDivider />} spacing='4'>
                                        <Box>
                                            <Textarea w="100%" id="comidaAdd" onChange={e => setComidaAdd(e.target.value)}></Textarea>
                                        </Box>
                                        <Box align="center">
                                            <Button colorScheme="blue" size="lg" onClick={cargarComida}>Guardar cambios</Button>
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Flex>
                        </Card>
                    </Flex>
                    : null}
                {pag === 4 ?
                    <Flex justify="center">
                        <Card w="auto" boxShadow={asd2}>
                            <Flex direction="column" align="center" p="20px">
                                <Flex direction="column" mx="10px" align="center">
                                    <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir dia a borrar</Text>
                                    <DatePicker className="datepicker" selected={fecha} onChange={(date) => setFecha(date)} dateFormat="dd/MM/yyyy" locale={es} />
                                </Flex>
                                <Divider orientation="horizontal" my="20px" borderWidth="2px" />
                                <Button colorScheme="red" size="lg" onClick={() => borrarComidaDiaMes()} mt="5px">Borrar</Button>
                            </Flex>
                        </Card>
                    </Flex>
                    : null}
                {pag === 5 ?
                    <Flex justify="center">
                        <Card w="auto" boxShadow={asd2}>
                            <Flex direction="column" align="center" p="20px">
                                <Flex direction="column" mx="10px" align="center">
                                    <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir mes a borrar</Text>
                                    <DatePicker className="datepicker" selected={fecha} onChange={(date) => setFecha(date)} dateFormat="MM/yyyy" showMonthYearPicker locale={es} />
                                </Flex>
                                <Divider orientation="horizontal" my="20px" borderWidth="2px" />
                                <Button colorScheme="red" size="lg" onClick={() => borrarComidaMes()} mt="5px">Borrar</Button>
                            </Flex>
                        </Card>
                    </Flex>
                    : null}
                <Heading fontSize={[25, 35, 45, 60]} my="3%" ml="7%">Ver comidas del mes</Heading>
                <Flex justify="center" wrap="wrap" mb="2%">
                    <Box minW="50%">
                        <Card mt="15px" boxShadow={asd2}>
                            <CardHeader fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Menu por dia - mes</CardHeader>
                            <Flex justify="center" mb="2%">
                                <Flex w="40%">
                                    <DatePicker className="datepicker" selected={fecha} onChange={(date) => setFecha(date)} dateFormat="dd/MM/yyyy" locale={es} />
                                </Flex>
                            </Flex>
                            <Button colorScheme="blue" size="lg" onClick={() => buscarComida()} >Buscar</Button>
                            <TableContainer>
                                <Table variant='striped' colorScheme='blue'>
                                    <Thead>
                                        <Tr>
                                            <Th>Fecha</Th>
                                            <Th>Usuario</Th>
                                            <Th>Menu</Th>
                                            <Th>Nota</Th>
                                            <Th>Borrar</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {data2.map(comDia => (
                                            <Tr>
                                                <Td>{comDia.dia}/{comDia.mes}/{comDia.año}</Td>
                                                <Td key={comDia.id}>{comDia.nombre}</Td>
                                                <Td>{comDia.opcion}</Td>
                                                <Td>{comDia.nota}</Td>
                                                <Td><Button colorScheme="red" size="sm" onClick={() => seleccionarComida(comDia)}><DeleteIcon></DeleteIcon></Button></Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                    <TableCaption>
                                        {data3.map(cant => (
                                            <>
                                                <Flex justify="center">
                                                    <Text fontWeight="bold" color={cantColores} p="5px" borderRadius="7px">{cant.opcion}</Text>
                                                    <Text p="5px" borderRadius="7px">Cantidad: {cant.cantidad}</Text>
                                                </Flex>
                                            </>
                                        ))}
                                    </TableCaption>
                                </Table>
                            </TableContainer>
                        </Card>
                    </Box>
                </Flex>
            </Box>

            <Footer />



            <Modal isOpen={isOpenBorrar} onClose={onCloseBorrar}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Borrar usuario</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormLabel>Estas seguro que deseas borrar la comida?</FormLabel>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => borrarComidaUserSelec()}>Borrar usuario</Button>
                        <Button onClick={onCloseBorrar}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
