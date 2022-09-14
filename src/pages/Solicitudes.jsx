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
  const [estadoModal5, cambiarEstadoModal5] = useState(false);
  const [estadoModal6, cambiarEstadoModal6] = useState(false);
  const [estadoModal7, cambiarEstadoModal7] = useState(false);
  const [estadoModal8, cambiarEstadoModal8] = useState(false);

  return(
    <>
      <NavBar /> 

      <ContenedorBody>

        <ContenedorForms>
          <div>
            <ContenedorBotones>
              <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>Propuesta de formación</Boton>
              <Boton onClick={() => cambiarEstadoModal2(!estadoModal2)}>Reconocimiento</Boton>
              <Boton onClick={() => cambiarEstadoModal3(!estadoModal3)}>Solicitud de permiso</Boton>
            </ContenedorBotones>

            {/* Modal 1  */}
            <Modal 
              estado = {estadoModal1}
              cambiarEstado = {cambiarEstadoModal1} 
              titulo = "Propuesta de formación"
            >
              <Contenido>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdVpG8vqpveNyqSAzagyjO0VF9ehhmbcaP8lfr1AuFTr71hEQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
              </Contenido>
            </Modal>

            {/* Modal 2 */}
            <Modal 
              estado = {estadoModal2}
              cambiarEstado = {cambiarEstadoModal2} 
              titulo = "Reconocimiento"
            >
              <Contenido>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdW-21Qz8XgTiDejBGCMF7BfPxJwEJnQLN24soIAlUCiXZXhQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
              </Contenido>
            </Modal>

            {/* Modal 3 */}
            <Modal 
              estado = {estadoModal3}
              cambiarEstado = {cambiarEstadoModal3} 
              titulo = "Solicitud de permiso"
            >
              <Contenido>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSexKaWcE_MDOE_Ytk9w6L5i21J4QYBUSbjRT6X8z-SzkxRqIg/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
              </Contenido>
            </Modal>

            <Modal 
              estado = {estadoModal4}
              cambiarEstado = {cambiarEstadoModal4} 
              titulo = "Solicitud de permiso"
            >
              <Contenido>
                <iframe loading="lazy"  src="https://www.canva.com/design/DAFLj4ommIg/watch?embed" ></iframe>
              </Contenido>
            </Modal>
            
          </div>
        </ContenedorForms>
        
        <ContenedorMedia>        
          <iframe loading="lazy" src="https://www.canva.com/design/DAFLj4ommIg/watch?embed" width={560} height={315}></iframe>
        </ContenedorMedia>
      </ContenedorBody>

      <Footer />

    </>
  )
}

const ContenedorForms = styled.div`
display: flex;
width: 50%;
justify-content: center;
align-items: center;
`;

const ContenedorMedia = styled.div`
  display: flex;
  width: 50%;
  /* height: 30vh; */
  justify-content: center;
  align-items: center;
`

const ContenedorBody = styled.div`
  width: 100%;
  display: flex;
  min-height: 67vh;
  justify-content: space-between;
`;

const ContenedorBotones = styled.div `
  padding: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  gap:20px;
`;

const Boton = styled.button`
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

