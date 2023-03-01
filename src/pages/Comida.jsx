import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  Grid,
  Box,
  Select,
  Button,
  Flex,
  Input,
  Stack,
  Card,
  CardBody,
  CardHeader,
  StackDivider,
  Heading,
  useToast,
  Divider,
  useColorModeValue,
  TableContainer,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  Center,
} from "@chakra-ui/react";
import "../components/styles/comida.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { InfoIcon } from "@chakra-ui/icons";
import { formatDistance, getMonth, getYear } from "date-fns";
import { act } from "react-dom/test-utils";

export default function Comida() {
  const urladd = "http://10.0.0.47:8000/api/addMenu";
  const urlbusqueda = "http://10.0.0.47:8000/api/busquedaPorPersonayMes";
  const urlmenusdisponibles = "http://10.0.0.47:8000/api/menuTrue";
  const urlMenuLimpio = "http://10.0.0.47:8000/api/menuTrueLimpio";
  const [data3, setData3] = useState([]);
  const [añoLimpio, setAñoLimpio] = useState("");
  const [mesLimpio, setMesLimpio] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nombrecompleto, setNombrecompleto] = useState("");
  const [data, setData] = useState([]);
  const [envCom, setEnvCom] = useState({
    dia: "",
    mes: "",
    año: "",
    comida: "",
    nota: "",
    nombre: "",
  });
  const [comidajson, setComidajson] = useState([
    {
      dia: "",
      mes: "",
      año: "",
      comida: "",
      nota: "",
      nombre: "",
    },
  ]);
  const [pag, setPag] = useState(1);
  const toast = useToast();
  const asd2 = useColorModeValue(
    "2xl",
    "0px 0px 13px 5px rgba(255,255,255,0.3)"
  );
  const [data2, setData2] = useState([]);
  const [fecha, setFecha] = useState(new Date());
  const [actualizador, setActualizador] = useState(0);
  /////////////TRAE EL NOMBRE DEL USUARIO///////////

  function handleNuevaComida(e, dia, mes, año) {
    let actualizarComida = [...comidajson];
    let objCom = {
      dia: "",
      mes: "",
      año: "",
      comida: "",
      nota: "",
      nombre: "",
    };
    let verificador = false;
    if (actualizarComida.length === 1 && actualizarComida[0].dia === "") {
      actualizarComida[0].dia = dia;
      actualizarComida[0].mes = mes;
      actualizarComida[0].año = año;
      actualizarComida[0][e.target.name] = e.target.value;
      actualizarComida[0].nombre = nombrecompleto;
      setComidajson(actualizarComida);
    } else {
      actualizarComida.map((data, i) => {
        if (data.dia == dia) {
          actualizarComida[i].dia = dia;
          actualizarComida[i].mes = mes;
          actualizarComida[i].año = año;
          actualizarComida[i][e.target.name] = e.target.value;
          actualizarComida[i].nombre = nombrecompleto;
          verificador = true;
        } else {
          objCom.dia = dia;
          objCom.mes = mes;
          objCom.año = año;
          objCom[e.target.name] = e.target.value;
          objCom.nombre = nombrecompleto;
        }
      });
      if (verificador === false) {
        actualizarComida.push(objCom);
        setComidajson(actualizarComida);
        verificador = false;
      } else {
        setComidajson(actualizarComida);
      }
    }
  }

  useEffect(() => {
    (async () => {
      const response = await fetch("http://10.0.0.47:8000/api/authUser", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setNombre(content.nombre);
      setApellido(content.apellido);
      setNombrecompleto(`${content.nombre} ${content.apellido}`);
      console.log(content);
      
      axios
      .get(urlmenusdisponibles)
      .then((res) => {
        setAñoLimpio(res.data.año)
        setMesLimpio(res.data.mes)
      })
      setActualizador(actualizador + 1);
    })();
  }, []);

  useEffect(() => {
    axios
      .post(urlMenuLimpio, {
        nombre: nombrecompleto,
        mes: mesLimpio,
        año: añoLimpio,
      })
      .then((res) => {
        console.log(res);
        setData3(res.data);
        if (res.data.length === 0) {
          toast({
            title:
              "No se encontraron resultados. No tiene comida pendiente por cargar.",
            status: "error",
            position: "top",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error. No se encontraron resultados. Intente nuevamente.",
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      });
    setComidajson([
      {
        dia: "",
        mes: "",
        año: "",
        comida: "",
        nota: "",
        nombre: "",
      },
    ]);
  }, [actualizador]);

  //////////////TRAER LAS COMIDAS DISPONIBLES DEL MES//////////////////

  //////////////////MANEJAR LO QUE EL USUARIO ELIGE Y PONERLO EN LA VARIABLE PARA MANDAR///////////////

  function handle(e, dia, mes, año) {
    const comidaSelec = { ...envCom };
    comidaSelec[e.target.name] = e.target.value;
    comidaSelec["dia"] = dia;
    comidaSelec["mes"] = mes;
    comidaSelec["año"] = año;
    setEnvCom(comidaSelec);
  }

  /////////////////ENVIAR LA COMIDA DEL USUARIO//////////////
  const peticionPost = async () => {
    for (let i = 0; i < comidajson.length; i++) {
      await axios
        .post(urladd, {
          dia: comidajson[i].dia,
          mes: comidajson[i].mes,
          año: comidajson[i].año,
          opcion: comidajson[i].comida,
          nota: comidajson[i].nota,
          nombre: nombrecompleto,
        })
        .then((res) => {
          toast({
            title: `Menú guardado correctamente`,
            status: "success",
            position: "top",
            duration: 2000,
            isClosable: true,
          });
          ////limpia los valores de los campos////
          var limpiarComida = document.querySelectorAll("[id='comida']");
          for (var i = 0; i < limpiarComida.length; i++)
            limpiarComida[i].value = "";
          var limpiarNota = document.querySelectorAll("[id='nota']");
          for (var i2 = 0; i2 < limpiarNota.length; i2++)
            limpiarNota[i2].value = "";
        })
        .catch((error) => {
          toast({
            title: "Error. Intente nuevamente.",
            status: "error",
            position: "top",
            duration: 2000,
            isClosable: true,
          });
        });
    }
    setActualizador(actualizador + 1);
  };
  const handlePag = () => {
    setPag(1);
  };
  const handlePag2 = () => {
    setPag(2);
  };

  const buscarComida = async () => {
    await axios
      .post(urlbusqueda, {
        nombre: nombrecompleto,
        mes: mesLimpio,
        año: añoLimpio,
      })
      .then((res) => {
        setData2(res.data);
        if (res.data.length === 0) {
          toast({
            title: "No se encontraron resultados. Intente nuevamente.",
            status: "error",
            position: "top",
            duration: 4000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Busqueda realizada correctamente",
            status: "success",
            position: "top",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error. No se encontraron resultados. Intente nuevamente.",
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <NavBar />
      <Box minH="100vh" my="3%">
        <Heading fontSize={[25, 35, 45, 60]} my="2%" ml="7%">
          Comidas del mes
        </Heading>
        <Flex ml="10%" wrap="wrap">
          <Button
            borderRadius="20px"
            value="1"
            id="sida"
            onClick={handlePag}
            mr="1%"
          >
            Cargar comidas
          </Button>
          <Button borderRadius="20px" onClick={handlePag2}>
            Ver comidas
          </Button>
        </Flex>

        {pag === 1 && (
          <>
            <Flex justify="center" wrap="wrap" my="3%">
              <Box w="70%">
              <Grid templateColumns='repeat(5, 1fr)' gap={7}>
                  {data3.map(comida => (
                    <Card w="100%"  boxShadow={asd2} p="2%">
                      <Grid templateRows='1fr, 3fr'>
                      <CardHeader py="2.5%" px="0%">
                        <Heading size="xl">
                          {comida.dia}/{comida.mes}/{comida.año}
                        </Heading>
                      <Divider
                        orientation="horizontal"
                        borderWidth="2px"
                        w="99%"
                        borderColor="blue.400"
                        mt="2.5%"
                      />
                      </CardHeader>
                      <CardBody px="3%">
                        <Stack divider={<StackDivider />} spacing="4">
                          <Box>
                            <Heading size="lg">Elegir menu</Heading>
                            <Select
                              name="comida"
                              className="comida"
                              id="comida"
                              w="90%"
                              placeholder="Elegir opcion"
                              onChange={(e) =>
                                handleNuevaComida(
                                  e,
                                  comida.dia,
                                  comida.mes,
                                  comida.año
                                )
                              }
                              mx="20px"
                              mt="10px"
                            >
                              <option>{comida.opcion1}</option>
                              <option>{comida.opcion2}</option>
                            </Select>
                          </Box>
                          <Box>
                            <Heading size="lg">Dejar una nota</Heading>
                            <Input
                              name="nota"
                              className="nota"
                              id="nota"
                              w="90%"
                              mx="20px"
                              onChange={(e) =>
                                handleNuevaComida(
                                  e,
                                  comida.dia,
                                  comida.mes,
                                  comida.año
                                )
                              }
                              placeholder="Nota sobre el pedido"
                              mt="10px"
                            ></Input>
                          </Box>
                        </Stack>
                      </CardBody>
                      </Grid>
                    </Card>
                  ))}
                </Grid>
              </Box>
            </Flex>
          {data3.length === 0 ? <></> :
            <Box h="10%" w="100%" display="flex" justifyContent="center" aling="center" mt="1%" mb="2%">
              <Button colorScheme="blue" onClick={() => peticionPost()}>
                Guardar cambios
              </Button>
            </Box>}
          </>
        )}
        {pag === 1 && data3.length === 0 && (
          <Box textAlign="center" py={10} px={6} bgImage="">
            <InfoIcon boxSize={"50px"} color={"blue.300"} />
            <Heading as="h2" size="xl" mt={6} mb={2}>
              Las comidas no estan habilitadas actualmente
            </Heading>
          </Box>
        )}
        {pag === 2 && (
          <Flex justify="center" wrap="wrap" minH="400px">
            <Box minW="50%">
              <Card mt="15px" boxShadow={asd2}>
                <CardHeader
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  fontSize={[20, 30, 32, 38]}
                >
                  Menu por mes - año
                </CardHeader>
                <Flex justify="center" mb="2%">
                  <Flex w="40%">
                    <DatePicker
                      className="datepicker"
                      selected={fecha}
                      onChange={(date) => {setFecha(date)
                        setMesLimpio(date.getMonth()+1);
                        setAñoLimpio(date.getFullYear());}}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      locale={es}
                    />
                  </Flex>
                </Flex>
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={() => buscarComida()}
                >
                  Buscar
                </Button>
                <TableContainer>
                  <Table variant="striped" colorScheme="blue">
                    <Thead>
                      <Tr>
                        <Th fontSize="100%">Fecha</Th>
                        <Th fontSize="100%">Usuario</Th>
                        <Th fontSize="100%">Menu</Th>
                        <Th fontSize="100%">Nota</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data2.map((comDia) => (
                        <Tr>
                          <Td>
                            {comDia.dia}/{comDia.mes}/{comDia.año}
                          </Td>
                          <Td>{comDia.nombre}</Td>
                          <Td>{comDia.opcion}</Td>
                          <Td>{comDia.nota}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Card>
            </Box>
          </Flex>
        )}
      </Box>
      <Footer />
    </>
  );
}
