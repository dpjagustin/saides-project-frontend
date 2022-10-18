import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Noticias from "../components/Noticias";
import { useEffect, useState } from "react";



const Home = () =>{
  const [nombre, setNombre]=useState("");
  const [apellido, setApellido]=useState("");
  const [imagen, setImagen]=useState("");
  const [rol, setRol]=useState("");

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
        setImagen(content.imagen)
        setRol(content.rol)

      }
    )();
  });

  
    return(
      <>
        <NavBar />
        <Hero /> 
        <Noticias />
        <Footer />
      </>
    )
}

export default Home;