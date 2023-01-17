import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Box,
  Heading,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import axios from "axios";
import { InfoIcon } from "@chakra-ui/icons";
import LineaDivisora from "./LineaDivisora";
export default function Noticias() {
  const urlnoticias="http://10.0.0.47:8000/api/FindNoticias"
  const [data, setData] = useState([])
  const cambiarColoresShadow= useColorModeValue("xl","0px 0px 8px 2px rgba(255,255,255,0.5)")

  
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
    <LineaDivisora />
      <Heading fontSize={[25, 35, 45, 60]} ml="7%">Noticias</Heading>
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
                <Box rounded='md' key={nov.id} boxShadow={cambiarColoresShadow} minW="300px" minHeight="200px" maxW="400px" overflow="hidden" m="30px">
                  <Box>
                    <Image src={nov.imagen} w="100%"/>
                  </Box>
                  <Box p="5%">
                    <Box fontWeight="medium" fontSize="lg">
                      {nov.fecha}
                    </Box>
                    <Heading size='lg' my='2'>
                      <h2>{nov.titulo}</h2>
                    </Heading>
                    <Text className="subtitulo" mb="3">{nov.subtitulo}</Text>
                    {nov.item1.length!==0?
                    <Text>•{nov.item1}<br /></Text>
                    :null}
                    {nov.item2.length!==0?
                    <Text>•{nov.item2}<br /></Text>
                    :null}
                    {nov.item3.length!==0?
                    <Text>•{nov.item3}<br /></Text>
                    :null}
                  </Box>
                </Box>
              ))}
        </Flex>
        </Flex>
    </>
  )
}
