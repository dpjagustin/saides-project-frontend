import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Heading, Flex, Text, Textarea, Button, Select, Box, Card, CardHeader, CardBody, StackDivider, Stack, HStack, Divider, useColorModeValue, Center } from "@chakra-ui/react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "../components/styles/admincomida.css"

export default function AdminComida() {
    const urlauth = "http://localhost:8000/api/authUser"
    const urlAddComida = "http://localhost:8000/api/addComida"
    const urlAddOpcionDia = "http://localhost:8000/api/addOpcion"
    const urlBuscarComida = "http://localhost:8000/api/busquedaPorDia"

    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
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
    const dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const años = [2022, 2023]

        
    const asd1= useColorModeValue("blue.400","gray.400")
    const diasmes1= useColorModeValue("orange.400","blue.400")
    const diasmes2= useColorModeValue("orange.300","blue.300")
    const diasmes3= useColorModeValue("orange.200","blue.200")
    const diasmes4= useColorModeValue("orange.100","blue.100")
    

    /////////////////TRAE LAS OPCIONES DE COMIDAS////////////////
    useEffect(() => {
        (
            async () => {
                const response = await fetch("http://localhost:8000/api/busquedaComidas", {
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                const content = await response.json();
                setData(content)
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

            }).catch((error) => {
                swal({ icon: "error", title: "No se pudo cargar la comida" })
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
        }).catch(error => {
        })
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




    //////////////BUSCAR COMIDAS DEL MES////////////////
    const buscarComida = async () => {
        await axios.post(urlBuscarComida, {
            dia: buscarDia.dia,
            mes: buscarDia.mes,
            año: buscarDia.año,
        }).then(res => {
            const puto = res.data
            setData2(puto)
        }).catch(error => {
        })
    }

    console.log(comidaMes);
    console.log(data2)

    return (
        <>
            <NavBar />
            <Heading fontSize="60px" my="3%" ml="7%">Cargar Comidas del distribuidor</Heading>
            <Card w="50%" ml="25%" mr="25%">
                <Flex direction="column" align="center">
                    <CardHeader>
                        <Heading size='2xl'>Ingresar comida</Heading>
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
            <Heading fontSize="60px" my="3%" ml="7%">Cargar Comidas del mes</Heading>
            <Card w="50%" ml="25%" mr="25%">
            
                <Flex direction="column" align="center" p="20px">
                    <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20,30,32,38]}>Seleccionar dia</Text>
                    <Select placeholder='Seleccionar opcion' id="dia" onChange={(e) => handle(e)}>
                        {dias.map(dia => (
                            <option >{dia}</option>
                        ))}
                    </Select>
                    <Divider orientation="horizontal" my="20px" borderWidth="2px"/>
                    <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20,30,32,38]}>Elegir mes</Text>
                    <Select placeholder='Seleccionar opcion' id="mes" onChange={(e) => handle(e)}>
                        {meses.map(mes => (
                            <option >{mes}</option>
                        ))}
                    </Select>
                    <Divider orientation="horizontal" my="20px" borderWidth="2px"/>
                    <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20,30,32,38]}>Elegir año</Text>
                    <Select placeholder='Seleccionar opcion' id="año" onChange={(e) => handle(e)}>
                        {años.map(año => (
                            <option >{año}</option>
                        ))}
                    </Select>
                    <Divider orientation="horizontal" my="20px" borderWidth="2px"/>
                    <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20,30,32,38]}>Elegir primera opcion</Text>

                    <Select placeholder='Seleccionar opcion' id="opcion1" onChange={(e) => handle(e)}>
                        {data.map(opciones => (
                            <option key={opciones.id}>{opciones.comidas}</option>
                        ))}
                    </Select>
                    <Divider orientation="horizontal" my="20px" borderWidth="2px"/>
                    <Text fontFamily="sans-serif" fontWeight="bold" fontSize={[20,30,32,38]}>Elegir segunda opcion</Text>
                    <Select placeholder='Seleccionar opcion' id="opcion2" onChange={(e) => handle(e)}>
                        {data.map(opciones => (
                            <option key={opciones.id}>{opciones.comidas}</option>
                        ))}
                    </Select>
                    <Button colorScheme="blue" size="lg" onClick={() => cargarDiaMes()} >Guardar</Button>
                </Flex>
            </Card>

            <Heading fontSize="60px" my="3%" ml="7%">Ver comidas del mes</Heading>

            <Flex justify="center" wrap="wrap">
                <Flex w="80%" justify="space-around" wrap="wrap">
                    <Box w={[350,350,450,550]}>
                        <Card mt="15px"> 
                            <CardHeader fontFamily="sans-serif" fontWeight="bold" fontSize={[20,30,32,38]}>Elegir dia</CardHeader>
                            <Flex direction="column" align="center">
                            <Select placeholder="Seleccionar opcion" id="dia" onChange={(e) => handle2(e)} w={[150,250,350,450]} my="7px">
                                {dias.map(dia => (
                                    <option >{dia}</option>
                                ))}
                            </Select>
                            <Select placeholder='Seleccionar opcion' id="mes" onChange={(e) => handle2(e)} w={[150,250,350,450]} my="7px">
                                {meses.map(mes => (
                                    <option >{mes}</option>
                                ))}
                            </Select>
                            <Select placeholder='Seleccionar opcion' id="año" onChange={(e) => handle2(e)} w={[150,250,350,450]} my="7px">
                                {años.map(año => (
                                    <option >{año}</option>
                                ))}
                            </Select>
                            </Flex>
                            <Button colorScheme="blue" size="lg" onClick={() => buscarComida()} >Buscar</Button>
                        </Card>
                    </Box>
                    <Box w={[400,500,600,700]}>
                        <Card mt="15px">
                            <CardHeader fontFamily="sans-serif" fontWeight="bold" fontSize={[20,30,32,38]}>Menu por dia</CardHeader>
                            {data2.map(comDia => (
                                <CardBody >
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Box>
                                            <HStack fontFamily="sans-serif" bg={asd1} p="10px" borderRadius="7px" wrap="wrap">
                                                <Text fontWeight="bold" bg={diasmes1} color="black" borderRadius="7px" textAlign="center" py="2px" px="4px" my="5px">{comDia.dia}/{comDia.mes}/{comDia.año}</Text>
                                                <HStack bg={diasmes2} borderRadius="7px" py="2px" px="4px" my="5px">
                                                    <Text fontWeight="bold" color="black" textAlign="center">Usuario:</Text>
                                                    <Text >{comDia.nombre}</Text>
                                                </HStack>
                                                <HStack bg={diasmes3} borderRadius="7px" py="2px" px="4px" my="5px">
                                                    <Text fontWeight="bold" color="black" textAlign="center">Menu:</Text>
                                                    <Text >{comDia.opcion}</Text>
                                                </HStack>
                                                <HStack bg={diasmes4} borderRadius="7px" py="2px" px="4px" my="5px">
                                                    <Text fontWeight="bold" color="black" textAlign="center">Nota:</Text>
                                                    <Text>{comDia.nota}</Text>
                                                </HStack>
                                            </HStack>
                                        </Box>
                                    </Stack>

                                </CardBody>
                            ))}
                        </Card>
                    </Box>
                </Flex>
            </Flex>        

            <Footer />
            

        </>
    )
}
