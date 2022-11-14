import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Heading, Box, Flex, Text, Textarea, Button } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";


function AdminComida(){
    const urlauth="http://localhost:8000/api/authUser"
    const urlAddComida="http://localhost:8000/api/addComida"
    const [data, setData]=useState([])
    const [comidaAdd, setComidaAdd]=useState("")
    const [fecha, setFecha]=useState("")
    const [rol, setRol]=useState("");
    const navigate = useNavigate();


    useEffect(() => {
        (
            async () => {
                await axios.get(urlauth, { withCredentials: true })
                    .then((res) => {
                        const content = res.data

                        setRol(content.rol)
                    }).catch((error) => {
                        swal({ icon: "error", title: "No hay un usuario logeado" })
                        navigate("/")
                    })
            }
        )();
    });

    if(rol===1){
        navigate("/index")
        swal({ icon: "error", title: "No tienes permisos" })
    }
    

    const cargarComida = async ()=>{
        await axios.post(urlAddComida,{
            comidas:comidaAdd},
            {
                withCredentials:true
            
        }).then((res)=>{

        }).catch((error)=>{
            swal({icon:"error",title:"No se pudo cargar la comida"})
        })
    }
    
    console.log(fecha)

    
    return (
        <>
            <NavBar />
            <Heading fontSize="60px" my="3%" ml="7%">Cargar Comidas del distribuidor</Heading>
            <Flex w="60%">
                <Text fontSize="3xl">Ingresar comida</Text>
                <Textarea w="40%" id="comidaAdd" onChange={e => setComidaAdd(e.target.value)}></Textarea>
                <Button  onClick={cargarComida}>Guardar cambios</Button>
            </Flex>
            <Heading fontSize="60px" my="3%" ml="7%">Cargar Comidas del mes</Heading>
                <Flex w="60%">
                    <Text>Elegir dia</Text>
                    <DatePicker selected={fecha} onChange={dia=>setFecha(dia)} dateFormat="dd/MM/yyyy" minDate={new Date()}/>
                </Flex>

            <Footer />
        </>
    )
}

export default AdminComida;