import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Heading, Flex, Text, Textarea, Button, Select, Box, Card, CardHeader, CardBody, StackDivider, Stack, Divider, useColorModeValue, TableContainer, Table, TableCaption, Tr, Th, Thead, Tbody, Td, useToast } from "@chakra-ui/react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "../components/styles/admincomida.css"

export default function AdminComida() {
    const urlauth = "http://localhost:8000/api/authUser"
    const urlAddComida = "http://localhost:8000/api/addComida"
    const urlAddOpcionDia = "http://localhost:8000/api/addOpcion"
    const urlBuscarComida = "http://localhost:8000/api/busquedaPorDia"
    const urlCantComidas = "http://localhost:8000/api/contadores"
    const urlOpcionesComidas = "http://localhost:8000/api/busquedaComidas"
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
    const [rol, setRol] = useState("");
    const [actualizar, setActualizar] = useState(0)
    const [buscarDia, setBuscarDia] = useState({
        dia: "",
        mes: "",
        año: ""
    })
    const navigate = useNavigate();
    const toast= useToast()
    const dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const años = [2022, 2023]
   
    const cantColores= useColorModeValue("blue.700","blue.100")

    /////////////////TRAE LAS OPCIONES DE COMIDAS////////////////
    useEffect(() => {
        (
            async () => {
                await axios.get(urlOpcionesComidas)
                .then((res)=>{
                    setData(res.data)
                })
                .catch((error)=>{
                })
            }
        )();
    }, [actualizar]);

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

     /////////////////HANDLE DE LA CARGA DE LA COMIDA DEL DIA////////////////
     function handle(e) {
        const cargaSele = { ...comidaMes }
        cargaSele[e.target.id] = e.target.value
        setComidaMes(cargaSele)
    }
    ///////////////////HANDLE DE LA BUSQUEDA DEL DIA///////////////////
    function handle2(e) {
        const buscarr = { ...buscarDia }
        buscarr[e.target.id] = e.target.value
        setBuscarDia(buscarr)
    }

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
                    status:"success",
                    position: "top",
                    duration:2000,
                    isClosable: true,
                })

            }).catch((error) => {
                toast({
                    title: "Error. Intente nuevamente.",
                    status:"error",
                    position: "top",
                    duration:2000,
                    isClosable: true,
                })
            })
    }

    ////////////////////CARGAR LOS DIAS DEL MES CON SUS OPCIONES
    const cargarDiaMes = async () => {
        await axios.post(urlAddOpcionDia, {
            dia: comidaMes.dia,
            mes: comidaMes.mes,
            año: comidaMes.año,
            opcion1: comidaMes.opcion1,
            opcion2: comidaMes.opcion2,
        }).then(res => {
            toast({
                title: "Menus del dia guardado correctamente",
                status:"success",
                position: "top",
                duration:2000,
                isClosable: true,
            })
            document.getElementById("dia").value=""
            document.getElementById("mes").value=""
            document.getElementById("año").value=""
            document.getElementById("opcion1").value=""
            document.getElementById("opcion2").value=""
            setComidaMes({})
        }).catch(error => {
            toast({
                title: "Error. Intente nuevamente.",
                status:"error",
                position: "top",
                duration:2000,
                isClosable: true,
            })
        })
    }
    console.log(comidaMes);

    //////////////BUSCAR COMIDAS DEL MES////////////////
    const buscarComida = async () => {
        await axios.post(urlBuscarComida, {
            dia: buscarDia.dia,
            mes: buscarDia.mes,
            año: buscarDia.año,
        }).then(res => {
            setData2(res.data)
        }).catch(error => {
        })
        await axios.post(urlCantComidas, {
            dia: buscarDia.dia,
            mes: buscarDia.mes,
            año: buscarDia.año,
        }).then(res => {
            setData3(res.data)
            toast({
                title: "Busqueda realizada",
                status:"success",
                position: "top",
                duration:2000,
                isClosable: true,
            })
        }).catch(error => {
            toast({
                title: "Error. No se encontraron resultados. Intente nuevamente.",
                status:"error",
                position: "top",
                duration:2000,
                isClosable: true,
            })
            setData3([])
        })
    }

    console.log(data3)

    return (
        <>
            <NavBar />
            <Heading fontSize={[25,35,45,60]} my="3%" ml="7%">Cargar Comidas del distribuidor</Heading>
            <Card w="50%" ml="25%" mr="25%">
                <Flex direction="column" align="center">
                    <CardHeader>
                        <Heading fontSize={[20,30,32,38]}>Ingresar comida</Heading>
                    </CardHeader>
                    <CardBody w="100%">
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Textarea w="100%" id="comidaAdd" onChange={e => setComidaAdd(e.target.value)}></Textarea>
                            </Box>
                            <Box align="center">
                                <Button onClick={cargarComida}>Guardar cambios</Button>
                            </Box>
                        </Stack>
                    </CardBody>
                </Flex>
            </Card>

            {/*////////////////// CARGA DE LOS MENUS DEL MES////////////////////////// */}
            <Heading fontSize={[25,35,45,60]} my="3%" ml="7%">Cargar Comidas del mes</Heading>
            <Flex justify="center">
            <Card w="auto">
            
                    <Flex direction="column" align="center" p="20px">
                        <Flex>
                            <Flex direction="column" mx="10px">
                                <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir dia</Text>
                                <Select placeholder='Seleccionar opcion' id="dia" onChange={(e) => handle(e)} w={[100, 100, 150, 250]}>
                                    {dias.map(dia => (
                                        <option >{dia}</option>
                                    ))}
                                </Select>
                            </Flex>
                            <Flex direction="column" mx="10px">
                                <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir mes</Text>
                                <Select placeholder='Seleccionar opcion' id="mes" onChange={(e) => handle(e)} w={[100, 100, 150, 250]}>
                                    {meses.map(mes => (
                                        <option >{mes}</option>
                                    ))}
                                </Select>
                            </Flex>
                            <Flex direction="column" mx="10px">
                                <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir año</Text>
                                <Select placeholder='Seleccionar opcion' id="año" onChange={(e) => handle(e)} w={[100, 100, 150, 250]}>
                                    {años.map(año => (
                                        <option >{año}</option>
                                    ))}
                                </Select>
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

            <Heading fontSize={[25, 35, 45, 60]} my="3%" ml="7%">Ver comidas del mes</Heading>
            <Flex justify="center" wrap="wrap">
                <Box minW="50%">
                    <Card mt="15px">
                        <CardHeader fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Menu por dia - mes</CardHeader>
                        <Flex justify="space-around" direction="row" >
                        <Select placeholder="Seleccionar opcion" id="dia" onChange={(e) => handle2(e)} w={[100, 100, 100, 150]} my="7px">
                            {dias.map(dia => (
                                <option >{dia}</option>
                            ))}
                        </Select>
                        <Select placeholder='Seleccionar opcion' id="mes" onChange={(e) => handle2(e)} w={[100, 100, 100, 150]} my="7px">
                            {meses.map(mes => (
                                <option >{mes}</option>
                            ))}
                        </Select>
                        <Select placeholder='Seleccionar opcion' id="año" onChange={(e) => handle2(e)} w={[100, 100, 100, 150]} my="7px">
                            {años.map(año => (
                                <option >{año}</option>
                            ))}
                        </Select>
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
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data2.map(comDia => (
                                        <Tr>
                                            <Td>{comDia.dia}/{comDia.mes}/{comDia.año}</Td>
                                            <Td>{comDia.nombre}</Td>
                                            <Td>{comDia.opcion}</Td>
                                            <Td>{comDia.nota}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                                <TableCaption>
                                    {data3.map(cant => (
                                        <>
                                            <Flex justify="center">
                                                <Text fontWeight="bold" color={cantColores}p="5px" borderRadius="7px">{cant.opcion}</Text>
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

            <Footer />
            
 
        </>
    )
}
