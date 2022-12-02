import { axios } from "axios";
import React,{useState, useEffect} from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function AdminSolicitudes(){
    const urlauth = "http://localhost:8000/api/authUser"
    const [rol, setRol] = useState("");
    const navigate = useNavigate();
    
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
    /////////////////////////////////////////////////////////



    return(
        <>
        <NavBar/>
        <Footer/>
        </>
    )
}