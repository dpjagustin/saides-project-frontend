import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Box,
  Heading,
} from '@chakra-ui/react';
import styled from "styled-components";
import axios from "axios";

function cambiarColoresShadow() {
  let colorMode = localStorage.getItem("chakra-ui-color-mode")
  let coloresShadow = ""
  if (colorMode === "dark") {
    coloresShadow = "0px 0px 8px 2px rgba(255,255,255,0.5)"
  } else {
    coloresShadow = "xl"
  }
  return coloresShadow
}


export default function Noticias() {
  const urlnoticias="http://localhost:8000/api/FindNoticias"
  const [data, setData] = useState([])
  
  ///////////// TRAE LAS NOTICIAS///////////////

  useEffect(() => {
    (
      async () => {
        await axios.get(urlnoticias)
        .then((res)=>{
          setData(res.data)
        }).catch((error)=>{
        })
      }
    )();
  },[]);

  
  return (
    <>
      <ContenedorNoticias>
        <ContenedorTitulo>
          <h2>Noticias</h2>
        </ContenedorTitulo>
        <Flex wrap="wrap" w="90%" justify="center">
          {data.map(not => (
            <Box p='5' borderWidth='1px' rounded='md' key={not.id} boxShadow={cambiarColoresShadow()} minW="300px" minHeight="200px" m="30px">
              <Box>
                {not.fecha}
              </Box>
              <Heading size='md' my='2'>
                <h2>{not.titulo}</h2>
              </Heading>
              <Text className="subtitulo" mb="3">{not.subtitulo}</Text>
              <Text>•{not.item1}<br /></Text>
              <Text>•{not.item2}<br /></Text>
              <Text>•{not.item3}<br /></Text>
            </Box>
          ))}
        </Flex>
      </ContenedorNoticias>
    </>
  )
}
const ContenedorNoticias = styled.div`
  width: 100%;
  /* height: 250px; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ContenedorTitulo = styled.div`  
  width: 85%;
  padding-left: 2.2rem;

  h2{
    font-weight: 900;
    font-size: 2rem;
  }
`;
