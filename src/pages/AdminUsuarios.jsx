import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";



export default function AdminUsuarios() {
    const ulrUsers="http://localhost:8000/api/users"
    const urlauth="http://localhost:8000/api/authUser"
    const [usuarios, setUsuarios]=useState([])
    const [rol, setRol]=useState("")
    const navigate = useNavigate();

    /////////////////////TRAE LOS USUARIOS//////////////
    useEffect(() => {
        (
            async () => {
                await axios.get(ulrUsers)
                    .then((res) => {
                        setUsuarios(res.data)
                    }).catch((error) => {
                    })
            }
        )();
    });
    ///////////////////VERIFICA QUE SEA ADMIN/////////////////////
    useEffect(() => {
        (
            async () => {
                await axios.get(urlauth, { withCredentials: true })
                    .then((res) => {
                        const userRol = res.data
                        setRol(userRol.rol)
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



    return (
        <>
        <NavBar/>
        <Box>
        {usuarios.map(user=>(
                <h1>{user.nombre}</h1>
        ))}
        </Box>
        <Footer/>
        </>
    )
}

