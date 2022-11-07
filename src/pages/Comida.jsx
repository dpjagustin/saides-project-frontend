import React, {useState, useEffect} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Grid, GridItem, HStack, Center, Square, Circle, Box, Select, Button } from "@chakra-ui/react";
import "../components/styles/comida.css"
import axios from "axios";



export default function Comida() {

  const urladd = "http://localhost:3005/comidas2"
  const [comida, setComida] = useState("")
  const [dia, setDia] = useState("")
  const [data, setData] = useState([]);

  const [envCom, setEnvCom] = useState({
    dia: "",
    comida: ""
  })

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
  }, []);



  function handle(e) {
    const comidaSelec = { ...comida }
    comidaSelec[e.target.id] = e.target.value
    setComida(comidaSelec)
    console.log(comidaSelec)
  }


  const peticionPost = async () => {
    await axios.post(urladd, {
      dia:envCom.dia,
      comida:envCom.comida
    }).then(res => {
      console.log(comida);
      setComida("")
    })
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setEnvCom(prevState => ({
        ...prevState,
        [name]: value
    }))
    
}
console.log(envCom);

const seleccionarEnvCom = (comida) => {
  setEnvCom(comida);
}
  

  return (
    <>
    <NavBar/>
    <h1 className="titulo">Comidas del mes</h1>
    <Box>
      {data.map(comida =>(
        <HStack key={comida.id} my="20px">
          <h1 name="dia" onChange={handleChange}>{comida.dia}</h1>
          <Box>Elegi la comida</Box>
          <Select name="comida"placeholder='Elegir opcion' onChange={handleChange} w="50%">
            <option>{comida.comida1}</option>
            <option>{comida.comida2}</option>
          </Select>
          <Button color="primary" onClick={()=>peticionPost()} >Insertar</Button>
        </HStack>
      ))}
    </Box>
    
      {/* <Grid
        templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
        gap="50"
        fontWeight="bold"
      >
        <GridItem area={"header"}>
          <NavBar />
        </GridItem>
        <GridItem pl="2" bg="" area={"nav"}>
          <Center>
            <CargaComida />
          </Center>
        </GridItem>
        <GridItem pl="2" bg="" area={"main"}>
          <Center>
            <Calendario />
          </Center>
        </GridItem>
        <GridItem pl="2" bg="" area={"footer"}>
          <Center>Footer</Center>
        </GridItem>
      </Grid> */}

      <Footer />
    </>
  );
}
