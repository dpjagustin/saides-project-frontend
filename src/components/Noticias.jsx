import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Box,
  Heading,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import axios from "axios";
import { InfoIcon } from "@chakra-ui/icons";

export default function Noticias() {
  const urlnoticias="http://localhost:8000/api/FindNoticias"
  const [data, setData] = useState([])
  const cambiarColoresShadow= useColorModeValue("0px 0px 8px 2px rgba(255,255,255,0.5)", "xl")
  
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
    <Heading fontSize="40px" ml="10%">Noticias</Heading>
      <Flex w="100%" justify="center" alignItems="center" gap="1rem" wrap="wrap">
        <Flex wrap="wrap" w="90%" justify="center">
          {data.length===0?
          <Box textAlign="center" py={10} px={6} bgImage="">
          <InfoIcon boxSize={'50px'} color={'blue.300'} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            No hay noticias actualmente
          </Heading>
        </Box>:null}
          {data.map(nov => (
            <Box p='5' borderWidth='1px' rounded='md' key={nov.id} boxShadow={cambiarColoresShadow} minW="300px" minHeight="200px" m="30px">
              <Box>
                {nov.fecha}
              </Box>
              <Heading size='md' my='2'>
                <h2>{nov.titulo}</h2>
              </Heading>
              <Text className="subtitulo" mb="3">{nov.subtitulo}</Text>
              <Text>•{nov.item1}<br /></Text>
              <Text>•{nov.item2}<br /></Text>
              <Text>•{nov.item3}<br /></Text>
              <Image src={nov.imagen} w="100px"></Image>
            </Box>
          ))}
        </Flex>
        </Flex>
    </>
  )
}
