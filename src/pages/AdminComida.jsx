import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Heading, Flex, Text, Textarea, Button, Select, Box, Card, CardHeader, CardBody, StackDivider, Stack } from "@chakra-ui/react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";


function AdminComida() {
    const urlauth = "http://localhost:8000/api/authUser"
    const urlAddComida = "http://localhost:8000/api/addComida"
    const urlAddOpcionDia = "http://localhost:8000/api/addOpcion"

    const [data, setData] = useState([])
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
    const dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const años = [2022, 2023]

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

    function handle(e) {
        const cargaSele = { ...comidaMes }
        cargaSele[e.target.id] = e.target.value
        setComidaMes(cargaSele)
    }

    console.log(comidaMes);

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


            <Heading fontSize="60px" my="3%" ml="7%">Cargar Comidas del mes</Heading>

            <Card w="50%" ml="25%" mr="25%">
         
                <Flex direction="column" align="center">
                <Text>Elegir dia</Text>
                <Select placeholder='Elegir dia' id="dia" onChange={(e) => handle(e)}>
                    {dias.map(dia => (
                        <option >{dia}</option>
                    ))}
                </Select>
                <Text>Elegir mes</Text>
                <Select placeholder='Elegir mes' id="mes" onChange={(e) => handle(e)}>
                    {meses.map(mes => (
                        <option >{mes}</option>
                    ))}
                </Select>
                <Text>Elegir año</Text>
                <Select placeholder='Elegir año' id="año" onChange={(e) => handle(e)}>
                    {años.map(año => (
                        <option >{año}</option>
                    ))}
                </Select>
                <Text>Elegir primera opcion</Text>

                <Select placeholder='Elegir opcion 1' id="opcion1" onChange={(e) => handle(e)}>
                    {data.map(opciones => (
                        <option key={opciones.id}>{opciones.comidas}</option>
                    ))}
                </Select>
                <Text>Elegir segunda opcion</Text>
                <Select placeholder='Elegir opcion 2' id="opcion2" onChange={(e) => handle(e)}>
                    {data.map(opciones => (
                        <option key={opciones.id}>{opciones.comidas}</option>
                    ))}
                </Select>
                <Button colorScheme="blue" size="lg" onClick={() => cargarDiaMes()} >Guardar</Button>
                </Flex>

            </Card>
            <Footer />
        </>
    )
}

export default AdminComida;