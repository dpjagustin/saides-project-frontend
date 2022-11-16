import React, {useState, useEffect} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Box, Select, Button, Flex,  Text, Input, Stack,Card, CardBody,CardHeader,StackDivider, Heading  } from "@chakra-ui/react";
import "../components/styles/comida.css"
import axios from "axios";
import toast from "react-hot-toast";


export default function Comida() {
  const urladd = "http://localhost:8000/api/addMenu"
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

  //////////////TRAER LAS COMIDAS DISPONIBLES DEL MES//////////////////

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
const puto= null
  const peticionPost = async () => {
    await axios.post(urladd, {
      dia:envCom.dia,
      mes:envCom.mes,
      año:envCom.año,
      opcion:envCom.comida,
      nota:envCom.nota,
      nombre:nombrecompleto
    }).then(res => {
      const puto = res.data
      console.log(puto)
      
    }).catch(error=>{
    }) 
  }
  if(puto===({message:'success'})){
    console.log("anda bien")
  }
  return (
    <>
      <NavBar />
      <h1 className="titulo">Comidas del mes</h1>
      <Flex justify="center">
      <Box w="70%">
      <Flex wrap="wrap" justify="space-evenly">
      {data.map(comida => (
          <Card my="50px" w="35%">
            <CardHeader>
              <Heading size='xl'>Dia: {comida.dia}/{comida.mes}/{comida.año}</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='lg'>
                    Elegir menu
                  </Heading>
                <Select w="90%" name="comida" id="comida" placeholder='Elegir opcion' onChange={(e) => handle(e, comida.dia, comida.mes, comida.año)} mx="20px">
                  <option>{comida.menu1}</option>
                  <option>{comida.menu2}</option>
                </Select>
                </Box>
                <Box>
                  <Heading size='lg'>
                    Dejar una nota
                  </Heading>
                  <Input w="90%" mx="20px" id="nota" onChange={(e) => handle(e, comida.dia,comida.mes,comida.año)} placeholder="Nota sobre el pedido"></Input>
                </Box>
                <Box>
                  <Heading size='lg'>
                    Guardar menu
                  </Heading>
                  <Button color="primary" onClick={() => peticionPost()} >Guardar cambios</Button>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          ))}
          </Flex>
      </Box>
      </Flex>
      <Footer />
    </>

  );
}