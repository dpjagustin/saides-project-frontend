import React, {useState, useEffect} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Box, Select, Button, Flex,  Text, Textarea, Input  } from "@chakra-ui/react";
import "../components/styles/comida.css"
import axios from "axios";
import Swal from "sweetalert2";



export default function Comida() {

  const urladd = "http://localhost:3005/comidas2"
  const [nombre, setNombre]=useState("");
  const [apellido, setApellido]=useState("");
  const [comida, setComida] = useState("")
  const [dia, setDia] = useState("")
  const [data, setData] = useState([]);
  const [envCom, setEnvCom] = useState({
    dia: "",
    comida: "",
    nota:"",
    nombre:""
  })

  //////////////TRAER LAS COMIDAS DISPONIBLES DEL MES//////////////////

  useEffect(() => {
    (
      async () => {
        const response = await fetch("http://localhost:3004/comidas", {
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
  const nombrecompleto = nombre +" " + apellido


//////////////////MANEJAR LO QUE EL USUARIO ELIGE Y PONERLO EN LA VARIABLE PARA MANDAR///////////////

  function handle(e, dia) {
    const comidaSelec = { ...envCom }
    comidaSelec[e.target.id] = e.target.value
    comidaSelec["dia"] = dia
    setEnvCom(comidaSelec)
  }

  /////////////////ENVIAR LA COMIDA DEL USUARIO//////////////

  const peticionPost = async () => {
    await axios.post(urladd, {
      dia:envCom.dia,
      comida:envCom.comida,
      nota:envCom.nota,
      nombre:nombrecompleto
    }).then(res => {
      console.log(comida);
    }).catch(error=>{
    })
  }

  console.log(envCom);

  return (
    <>
      <NavBar />
      <h1 className="titulo">Comidas del mes</h1>
      <Flex justify="center">
      <Box w="60%">
        {data.map(comida => (
          <Box key={comida.id} my="20px">
            <Flex justify="center">
              <Text fontSize="4xl" as="b" mr="10px" >Dia:</Text>
              <Text fontSize="4xl" name="dia" id="dia" on={(e) => handle(e)} w="10%">  {comida.dia}</Text>
              <Select w="40%" name="comida" id="comida" placeholder='Elegir opcion' onChange={(e) => handle(e, comida.dia)}  mx="20px">
                <option>{comida.comida1}</option>
                <option>{comida.comida2}</option>
              </Select>
              <Input w="30%" mx="20px" id="nota" onChange={(e)=> handle(e)} placeholder="Nota sobre el pedido" value={envCom.nota}></Input>
              <Button color="primary" onClick={() => peticionPost()} >Guardar cambios</Button>
            </Flex>
          </Box>
        ))}
      </Box>
      </Flex>
      <Footer />
    </>

  );
}
