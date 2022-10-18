import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  LinkBox,
  Box,
  Heading,
  LinkOverlay,
  Image
} from '@chakra-ui/react';
import styled from "styled-components";
import NuestraVision from './NuestraVision';
import Noticias from './Noticias';
import HeroLanding from './HeroLanding';


export default function HomeLanding() {
  return (
    <>
     <HeroLanding />
     <ContenedorNoticias>
        <Noticias />
      </ContenedorNoticias>

      {/* Este flex es la barra blureada que va debajo de noticias (linea separadora con imagen de fondo)   */}
      <Flex
        w={'full'}
        h={'25vh'}
        backgroundImage={
          'url(https://ripipsacobots.com/wp-content/uploads/2020/05/robotica-automotriz.jpg)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
        backgroundAttachment={'fixed'}
        justifyContent={"center"}
        alignItems={'center'}
        >
          <Box sx={innerBoxStyles} backdropFilter='auto' backdropBlur='5px'>
            <Image alt={'Planta industrial'} src={'/resources/logos/logoDescarPng.png'} w={"14rem"} h={"9rem"}/>
            <Image alt={'Planta industrial'} src={'/resources/logos/logoDeplmPng.png'} w={"16rem"} h={"7rem"}/> 
          </Box>
      </Flex>

      {/* Contenedor de parte "Nuestra visión" */}
      <NuestraVisionContenedor>
          {/* <Flex>
            <Image alt={'Planta industrial'} src={'/logoDescarPng.png'} w={"11rem"} h={"7rem"}/>
            <Image alt={'Planta industrial'} src={'/logoDeplmPng.png'} w={"13rem"} h={"6rem"}/>
          </Flex> */}

          <NuestraVision />
      </NuestraVisionContenedor>    
    </>
  );
}

const ContenedorHero = styled.div`
  width: 100%;
  height: 60vh;
`;

const ContenedorNoticias = styled.div`
  margin-top: 5rem;
  margin-bottom: 8rem;
  width: 100%;
  /* height: 250px; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NuestraVisionContenedor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10rem;
  padding-bottom: 5rem;
  padding-top: 5rem;
`;

const NuestraVisionContenedorImagenes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin-bottom: 2rem;
`;

const NuestraVisionTitulo = styled.h1`
  margin-bottom: 5rem;
  font-size: 3rem;
`

const innerBoxStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  boxSize: 'full',
  // color: 'white',
  // textShadow: '0 0 20px black',
  // fontWeight: 'bold',
  // fontSize: '20px',
}


// {/* <NuestraVisionContenedor>
//          

//             <NuestraVisionTitulo>NUESTRA VISIÓN</NuestraVisionTitulo>

//             <NuestraVision />
// </NuestraVisionContenedor>   */}