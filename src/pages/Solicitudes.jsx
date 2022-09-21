import React, {useState} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Modal from "../components/Solicitudes/Modal";
import styled from "styled-components";

export default function Solicitudes() {
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [estadoModal3, cambiarEstadoModal3] = useState(false);

  return(
    <>
      <NavBar /> 

      <ContenedorBody>

        <ContenedorForms>
          <div>
            <ContenedorBotones>
              <Boton onClick={() => cambiarEstadoModal1(!estadoModal1)}>Propuesta de formación</Boton>
              
              <ContenedorInternoBotones>
                <Boton onClick={() => cambiarEstadoModal2(!estadoModal2)}>Reconocimientos</Boton>

                <Boton onClick={() => cambiarEstadoModal2(!estadoModal2)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy" viewBox="0 0 16 16">
                <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                </svg> </Boton>
              </ContenedorInternoBotones>
            
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
              titulo = "Reconocimientos"
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

const ContenedorBotones = styled.div`
  padding: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  gap:20px;
`;

const ContenedorInternoBotones = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`

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

