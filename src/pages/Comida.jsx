import React from "react";
import NavBar from "../components/NavBar";
import CargaComida from "../components/comida/CargaComida";
import Calendario from "../components/comida/Calendario";

export default function Comida() {
    return(
      <>
        
        <NavBar /> 
        <CargaComida /> 
        <Calendario />
      </>  

        
    )
  }