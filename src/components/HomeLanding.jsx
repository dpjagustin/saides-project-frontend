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
import HeroLanding from './landing/HeroLanding';


export default function HomeLanding() {
  return (
    <>
     <HeroLanding />

     <ContenedorNoticias>
        <ContenedorTitulo>
          <h2>Novedades</h2>
        </ContenedorTitulo>

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

const ContenedorTitulo = styled.div`  
  width: 85%;
  padding-left: 2.2rem;

  h2{
    font-weight: 900;
    font-size: 2rem;
  }
`;

const ContenedorComida = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

const ContenedorFechas = styled.div`
  width: 20%;
  height: 400px;
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; */
  /* box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px; */
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