import React, {useState, useEffect} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Box, Select, Button, Flex,  Text, Input, Stack,Card, CardBody,CardHeader,StackDivider, Heading, useToast, Divider, useColorModeValue, TableContainer, Table, Tr, Th, Thead, Tbody, Td  } from "@chakra-ui/react";
import "../components/styles/comida.css"
import axios from "axios";

export default function Comida() {
  const urladd = "http://localhost:8000/api/addMenu"
  const urlbusqueda = "http://localhost:8000/api/busquedaPorPersonayMes"
  const urlmenusdisponibles= "http://localhost:8000/api/menuMes"
  const [nombre, setNombre]=useState("");
  const [apellido, setApellido]=useState("");
  const [data, setData] = useState([]);
  const [envCom, setEnvCom] = useState({
    dia: "",
    mes:"",
    año:"",
    comida: "",
    nota:"",
    nombre:""
  })
  const [pag, setPag]=useState(1)
  const toast= useToast()
  const asd2 = useColorModeValue("2xl", "0px 0px 13px 5px rgba(255,255,255,0.3)")
  const dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const años = [2022, 2023]
  const [buscarDia, setBuscarDia] = useState({
    mes: "",
    año: ""
  })
  const [data2, setData2] = useState([])
  

  //////////////TRAER LAS COMIDAS DISPONIBLES DEL MES//////////////////
  useEffect(() => {
    (
      async () => {
        axios.get(urlmenusdisponibles)
        .then((res)=>{
          setData(res.data)
        })
        .catch((error)=>{
          toast({
            title: "Error. Intente nuevamente.",
            status:"error",
            position: "top",
            duration:2000,
            isClosable: true,
        })
        })


      }
    )();
  },[]);

  useEffect(() => {
    (
      async () => {
        const response = await fetch("http://localhost:8000/api/menuMes", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const content = await response.json();
        setData(content)
      }
    )();
  },[]);

  /////////////TRAE EL NOMBRE DEL USUARIO///////////
  
  useEffect(() =>{
    (
      async ()=>{
        const response = await fetch("http://localhost:8000/api/authUser",{
            headers:{"Content-Type":"application/json"},
            credentials:"include",
        });
        const content = await response.json();
        setNombre(content.nombre)
        setApellido(content.apellido)
      }
    )();
  },[]);

  /////////CONSTANTE QUE ARMA EL NOMBRE COMPLETO///////////
  const nombrecompleto = nombre + " " + apellido


//////////////////MANEJAR LO QUE EL USUARIO ELIGE Y PONERLO EN LA VARIABLE PARA MANDAR///////////////

  function handle(e, dia,mes,año) {
    const comidaSelec = { ...envCom }
    comidaSelec[e.target.id] = e.target.value
    comidaSelec["dia"] = dia
    comidaSelec["mes"] = mes
    comidaSelec["año"] = año
    setEnvCom(comidaSelec)
  }

  /////////////////ENVIAR LA COMIDA DEL USUARIO//////////////
  const peticionPost = async () => {
    await axios.post(urladd, {
      dia:envCom.dia,
      mes:envCom.mes,
      año:envCom.año,
      opcion:envCom.comida,
      nota:envCom.nota,
      nombre:nombrecompleto
    }).then((res) => {
      toast({
        title: "Menu guardado correctamente",
        status:"success",
        position: "top",
        duration:2000,
        isClosable: true,
    })
    ////limpia los valores de los campos////
    var limpiarComida = document.querySelectorAll("[id='comida']");
    for(var i = 0; i < limpiarComida.length; i++)
    limpiarComida[i].value=""
    var limpiarNota = document.querySelectorAll("[id='nota']");
    for(var i2 = 0; i2 < limpiarNota.length; i2++)
    limpiarNota[i2].value=""
    }).catch((error)=>{
      toast({
        title: "Error. Intente nuevamente.",
        status:"error",
        position: "top",
        duration:2000,
        isClosable: true,
    })
    }) 
  }
  console.log(pag);
  const handlePag = () =>{
    setPag(1)
  }
  const handlePag2 = () =>{
    setPag(2)
  }

  const buscarComida = async () => {
    await axios.post(urlbusqueda, {
        mes: buscarDia.mes,
        año: buscarDia.año,
        nombre:nombrecompleto
    }).then(res => {
        setData2(res.data)
    }).catch(error => {
    })
}
function handle2(e) {
  const buscarr = { ...buscarDia }
  buscarr[e.target.id] = e.target.value
  setBuscarDia(buscarr)
}

  return (
    <>
      <NavBar />
      <Heading fontSize={[25, 35, 45, 60]} my="2%" ml="7%">Comidas del mes</Heading>
      <Flex>
        <Button borderRadius="20px" value="1" id="sida" onClick={handlePag}>Cargar comidas</Button> 
        <Button borderRadius="20px" onClick={handlePag2} >Ver comidas</Button>
      </Flex>
      {pag ===1 && <Flex justify="center">
      <Box w="70%">
      <Flex wrap="wrap" justify="space-evenly">
      {data.map(comida => (
          <Card my="30px" w="35%" boxShadow={asd2}>
            <CardHeader>
              <Heading size='xl'>Dia: {comida.dia}/{comida.mes}/{comida.año}</Heading>
            </CardHeader>
            <Divider orientation="horizontal" my="5px" borderWidth="2px" w="99%" borderColor="blue.400" />
            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='lg'>
                    Elegir menu
                  </Heading>
                <Select name="comida" className="comida" id="comida" w="90%" placeholder='Elegir opcion' onChange={(e) => handle(e, comida.dia, comida.mes, comida.año)} mx="20px" mt="10px">
                  <option>{comida.menu1}</option>
                  <option>{comida.menu2}</option>
                </Select>
                </Box>
                <Box>
                  <Heading size='lg'>
                    Dejar una nota
                  </Heading>
                  <Input name="nota" className="nota" id="nota" w="90%" mx="20px" onChange={(e) => handle(e, comida.dia,comida.mes,comida.año)} placeholder="Nota sobre el pedido" mt="10px"></Input>
                </Box>
                <Box>
                  <Heading size='lg'>
                    Guardar menu
                  </Heading>
                  <Button color="primary" onClick={() => peticionPost()}>Guardar cambios</Button>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          ))}
          </Flex>
      </Box>
      </Flex>}
      {pag===2&&
      <Flex justify="center" wrap="wrap">
      <Box minW="50%">
          <Card mt="15px">
              <CardHeader fontFamily="sans-serif" fontWeight="bold" fontSize={[20, 30, 32, 38]}>Menu por dia - mes</CardHeader>
              <Flex justify="space-around" direction="row" >
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
  
                  </Table>
              </TableContainer>
          </Card>
      </Box>
  </Flex>
      }  
      
      <Footer />
    </>

  );
}