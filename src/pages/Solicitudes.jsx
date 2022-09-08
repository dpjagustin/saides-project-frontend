import React, {useState} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Modal from "../components/Solicitudes/Modal";
import styled from "styled-components";
// import "../components/styles/solicitudes/Solicitudes.css";

// No me toquen nada a menos que crean necesario

export default function Solicitudes() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [estadoModal3, cambiarEstadoModal3] = useState(false);
  const [estadoModal4, cambiarEstadoModal4] = useState(false);

  return(
    <>
      <NavBar />

      <div>
        <ContenedorBotones>
          <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>Formulario ejemplo 1</Boton>
          <Boton onClick={() => cambiarEstadoModal2(!estadoModal2)}>Formulario ejemplo 2</Boton>
          <Boton onClick={() => cambiarEstadoModal3(!estadoModal3)}>Formulario ejemplo 3</Boton>
          <Boton onClick={() => cambiarEstadoModal4(!estadoModal4)}>Formulario ejemplo 4</Boton>
        </ContenedorBotones>


        {/* Modal 1  */}
        <Modal 
          estado = {estadoModal1}
          cambiarEstado = {cambiarEstadoModal1} 
          titulo = "Formulario ejemplo 1"
        >
          <Contenido>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScQZiTVplpdf_59jSNrzxzG_c6RZSlFPUxcmPiqmgYklDirqQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
          </Contenido>
        </Modal>

        {/* Modal 2 */}
        <Modal 
          estado = {estadoModal2}
          cambiarEstado = {cambiarEstadoModal2} 
          titulo = "Formulario ejemplo 2"
        >
          <Contenido>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScQZiTVplpdf_59jSNrzxzG_c6RZSlFPUxcmPiqmgYklDirqQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
          </Contenido>
        </Modal>

        {/* Modal 3 */}
        <Modal 
          estado = {estadoModal3}
          cambiarEstado = {cambiarEstadoModal3} 
          titulo = "Formulario ejemplo 3"
        >
          <Contenido>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScQZiTVplpdf_59jSNrzxzG_c6RZSlFPUxcmPiqmgYklDirqQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
          </Contenido>
        </Modal>

        {/* Modal 4 */}
        <Modal 
          estado = {estadoModal4}
          cambiarEstado = {cambiarEstadoModal4} 
          titulo = "Formulario ejemplo 4"
        >
          <Contenido>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScQZiTVplpdf_59jSNrzxzG_c6RZSlFPUxcmPiqmgYklDirqQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
          </Contenido>
        </Modal>

      </div>
      
      <ContenedorFooter>
        <Footer />
      </ContenedorFooter>
    </>
  )
}

const ContenedorFooter = styled.div `
  margin-top: 480px;
`

const ContenedorBotones = styled.div `
  padding: 40px;
  display: flex;
  flex-wrap: wap;
  justify-content: center;
  gap:20px
`;

const Boton = styled.button `
  display: block;
  padding: 10px 30px;
  border-radius: 100px;
  color: #fff;
  border: none;
  background: #1766DC;
  cursor: pointer;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: 500;
  transition: .3s ease all;

  &:hover {
    background: #0066FF;
  }
`;

const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    vertical-align: top;
    border-radius: 3px;
  }
`;


{/* <div className="containerSolicitudes">
        <div className="containerFormSelector"> 
          <h1 className="formListTitle">Listado de formularios</h1>

          <ul className="formList">
            <li><a href="#" id="btn1" onClick={() => setShow(!show)}>Prueba</a></li>
            <li><a href="#" id="btn2" onClick={() => setShow(!show)}>Prueba</a></li>
            <li><a href="#" id="btn3" onClick={() => setShow(!show)}>Prueba</a></li>
            <li><a href="#">Prueba</a></li>
            <li><a href="#">Prueba</a></li>
            <li><a href="#">Prueba</a></li>
            <li><a href="#">Prueba</a></li>
            <li><a href="#">Prueba</a></li>
          </ul>
        </div> */}

        {/* Id's en desuso */}
        {/* Aplicar modal */}

        {/* <div className="containerForms">
          <div className="containerForm1" id="form1">
            { src="https://docs.google.com/forms/d/e/1FAIpQLScQZiTVplpdf_59jSNrzxzG_c6RZSlFPUxcmPiqmgYklDirqQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>}
          </div>
          <div className="containerForm2" id="form2">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScQZiTVplpdf_59jSNrzxzG_c6RZSlFPUxcmPiqmgYklDirqQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>        
          </div>

          <div className="containerForm3" id="form3">
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScQZiTVplpdf_59jSNrzxzG_c6RZSlFPUxcmPiqmgYklDirqQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>        
          </div>
        </div>
      </div> */}


 // const btn1 = document.querySelector("#btn1");
  // const containerForm1 = document.querySelector(".containerForm1");

  // function cambiarForm() {
  //   return (containerForm1.style.display === "none" ? containerForm1.style.display === "block" : containerForm1.style.display = "none");
  // };

  // return btn1.addEventListener("click", cambiarForm());

  // const [show, setShow] = useState(false);