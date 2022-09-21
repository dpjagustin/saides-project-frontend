import React, { Component } from "react";
import {
    Box,
    Accordion,
    AccordionIcon,
    AccordionPanel,
    AccordionButton,
    AccordionItem,
    Flex,
    Button,
    Input
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import "../components/styles/notas.css";
import { Link } from "react-router-dom";
import notas from "../components/notas/notas.json"


function cambiarColoresBorrar(){
    let colorMode = localStorage.getItem("chakra-ui-color-mode")
    let coloresBorrar = ""
    if (colorMode === "dark"){
        coloresBorrar = "red.800"
    }else{
        coloresBorrar = "red.100"
    }
    return coloresBorrar
}
function cambiarColoresEditar(){
    let colorMode = localStorage.getItem("chakra-ui-color-mode")
    let coloresEditar = ""
    if (colorMode === "dark"){
        coloresEditar = "green.800"
    }else{
        coloresEditar = "green.100"
    }
    return coloresEditar
}



export default class Notas extends Component{



    render(){
        return(
            <>
            <NavBar />
            <h1 className="titulo" my="30px" >Mis notas</h1>
            <Box h="800px">
                <Box className="buscarbox">
                </Box>
                <Flex justifyContent="center" id="containernotas" >
                        <Accordion p="10px" allowMultiple w="55%" my="50px">
                        <Button mb="20px">Crear nota</Button>
                            {notas.map((nota) =>{
                                    return(
                                    <AccordionItem  id={nota.id}>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex='1' textAlign='left'>
                                                {nota.id}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        {nota.nota}
                                    </AccordionPanel>
                                    <AccordionPanel pb={4}>
                                        <Button colorScheme="red" mx="10px">Borrar<DeleteIcon   color={cambiarColoresBorrar()}  /> </Button>
                                        <Link to={`../notas/${nota.id}/EditarNota`} key={nota.id}>
                                            <Button colorScheme="green">Editar<EditIcon color={cambiarColoresEditar()}/></Button>
                                        </Link>
                                    </AccordionPanel>
                                </AccordionItem>)
                            })}
                        </Accordion>
                </Flex>
            </Box>
            <Footer />
            </>
        )
    }
}