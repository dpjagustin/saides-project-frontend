import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Heading, Flex, Text, Textarea, Button, Select, Box, Card, CardHeader, CardBody, StackDivider, Stack, Divider, useColorModeValue, TableContainer, Table, TableCaption, Tr, Th, Thead, Tbody, Td, useToast } from "@chakra-ui/react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "../components/styles/admincomida.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import es from "date-fns/locale/es";


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
    const navigate = useNavigate();
    const toast= useToast()
    const [pag, setPag]=useState(1)
    const asd2 = useColorModeValue("2xl", "0px 0px 13px 2px rgba(255,255,255,0.4)")
    const cantColores= useColorModeValue("blue.700","blue.100")
    const [fecha, setFecha]=useState(new Date())

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
            dia: formatDia,
            mes: formatMes,
            año: formatAño,
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

    //////////HABILITAR DESHABILITAR MES//////////////

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

    const formatDia = fecha.getDate()
    const formatMes = fecha.getMonth()+1
    const formatAño = fecha.getFullYear()
    
    return (
        <>
            <NavBar />

            {/*////////////////// CARGA DE LOS MENUS DEL MES////////////////////////// */}
            <Heading fontSize={[25,35,45,60]} my="3%" ml="7%" >Cargar Comidas</Heading>
            <Flex ml="8%" wrap="wrap">
                <Button onClick={handlePag} mx="10px" mb="2%">Cargar menus por dia</Button>
                <Button onClick={handlePag2} mx="10px" mb="2%">Habilitar-deshabilitar menus por mes</Button>
                <Button onClick={handlePag3} mx="10px" mb="2%">Eliminar menus por dia</Button>
                <Button onClick={handlePag4} mx="10px" mb="2%">Cargar Comidas del distribuidor</Button>
            </Flex>
            
            {pag===1 &&
            <Flex justify="center">
            <Card w="auto" boxShadow={asd2}>
                    <Flex direction="column" align="center" p="20px">
                        <Flex>
                            <Flex direction="column" align="center" mx="10px">
                                <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir dia</Text>
                                <DatePicker className="datepicker" selected={fecha} onChange={(date) => setFecha(date)} dateFormat="dd/MM/yyyy" locale={es}/>
                                
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
            }
            {pag===2 &&
            <Flex justify="center">
            <Card w="auto" boxShadow={asd2}>
                    <Flex direction="column" align="center" p="20px">
                        <Flex>
                            <Flex direction="column" mx="10px">
                                <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir mes y año</Text>
                                <DatePicker className="datepicker" selected={fecha} onChange={(date) => setFecha(date)} dateFormat="MM/yyyy" showMonthYearPicker locale={es}/>
                            </Flex>
 
                        </Flex>
                        <Divider orientation="horizontal" my="20px" borderWidth="2px" />
                            <Flex direction="row" wrap="wrap">
                                <Button colorScheme="blue" size="lg" onClick={() => cargarDiaMes()} mt="5px" mr="20px">Habilitar</Button>
                                <Button colorScheme="red" size="lg" onClick={() => cargarDiaMes()} mt="5px">Deshabilitar</Button>
                            </Flex>
                    </Flex>
                </Card>
            </Flex>
            }
            {pag===3&&
            
                    <Flex justify="center">
                    <Card w="auto" boxShadow={asd2}>
                            <Flex direction="column" align="center" p="20px">
                                <Flex direction="column" mx="10px" align="center">
                                    <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Elegir dia</Text>
                                    <DatePicker className="datepicker" selected={fecha} onChange={(date) => setFecha(date)} dateFormat="dd/MM/yyyy" locale={es}/>
                                </Flex>
                                <Divider orientation="horizontal" my="20px" borderWidth="2px" />
                                <Button colorScheme="red" size="lg" onClick={() => cargarDiaMes()} mt="5px">Borrar</Button>
                            </Flex>
                        </Card>
                    </Flex>
            }
            {pag===4&&
            <Flex justify="center">
            <Card w="50%"boxShadow={asd2}>
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
                            <Button colorScheme="blue" size="lg" onClick={cargarComida}>Guardar cambios</Button>
                        </Box>
                    </Stack>
                </CardBody>
            </Flex>
        </Card>
        </Flex>
            
            }


            <Heading fontSize={[25, 35, 45, 60]} my="3%" ml="7%">Ver comidas del mes</Heading>
            <Flex justify="center" wrap="wrap">
                <Box minW="50%">
                    <Card mt="15px" boxShadow={asd2}>
                        <CardHeader fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Menu por dia - mes</CardHeader>
                        <Flex justify="center"mb="2%">
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

            <Footer />
            
 
        </>
    )
}
