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
        <Noticias />
      {/* Este flex es la barra blureada que va debajo de noticias (linea separadora con imagen de fondo)   */}
      <Flex
        w={'full'}
        h={'26vh'}
        backgroundImage={
          'url(https://ripipsacobots.com/wp-content/uploads/2020/05/robotica-automotriz.jpg)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
        backgroundAttachment={'fixed'}
        justifyContent={"center"}
        alignItems={'center'}
        >
          <Flex alignItems="center" justifyContent="center" textAlign="center" boxSize="full" backdropFilter='auto' backdropBlur='5px'>
            <Image alt={'Planta industrial'} src={'/resources/logos/logoDescarPng.png'} w={"14rem"} h={"9rem"}/>
            <Image alt={'Planta industrial'} src={'/resources/logos/logoDeplmPng.png'} w={"16rem"} h={"7rem"}/> 
          </Flex>
      </Flex>
          <NuestraVision />
    </>
  );
}
