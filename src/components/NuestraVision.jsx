import React from "react";
import FilaGridDescripcion from "../components/nuestravision/FilaGridDescripcion";
import Info from "./nuestravision/Info";
import styled from "styled-components";

export default function NuestraVision() {
  return(
    <Contenedor>
      <Info />
      <FilaGridDescripcion />
    </Contenedor>
  )
}

const Contenedor = styled.div`
  width: 80%;
`