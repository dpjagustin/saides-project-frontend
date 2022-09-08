import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../components/styles/solicitudes/Solicitudes.css";



export default function Solicitudes() {
  return(
    <>
      <NavBar /> 
      <div className="containerSolicitudes">
        <div className="containerFormSelector"> 
          <h1 className="formListTitle">Listado de formularios</h1>

          <ul className="formList">
            <li><a href="#">Prueba</a></li>
            <li><a href="#">Prueba</a></li>
            <li><a href="#">Prueba</a></li>
            <li><a href="#">Prueba</a></li>
            <li><a href="#">Prueba</a></li>
            <li><a href="#">Prueba</a></li>
            <li><a href="#">Prueba</a></li>
            <li><a href="#">Prueba</a></li>
          </ul>
        </div>

        <div className="containerForms">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScQZiTVplpdf_59jSNrzxzG_c6RZSlFPUxcmPiqmgYklDirqQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>        
        </div>
      </div>

      <Footer />
    </>
  )
}