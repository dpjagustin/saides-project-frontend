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


export default function HeroLanding() {
  return (
    <>
      <Flex
        w={'full'}
        h={'60vh'}
        backgroundImage={
          'url(https://ripipsacobots.com/wp-content/uploads/2020/05/robotica-automotriz.jpg)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
        backgroundAttachment={'fixed'}>

        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
              textShadow={'7px 7px 10px black' }
              >
              Sistema de administración interna <Span>DESCAR SAIDes</Span> 
            </Text>
            <Stack direction={'row'}>
              <Button
                bg={'blue.400'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}>
                Ingresar al sistema
              </Button>
              <Button
                bg={'whiteAlpha.300'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'whiteAlpha.500' }}>
                Nuestra visión
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>

      {/* Convertir el contenedor noticias en componente*/}
      <ContenedorNoticias>
        <ContenedorTitulo>
          <h2>Novedades</h2>
        </ContenedorTitulo>


        <LinkBox as='article' maxW='sm' p='5' borderWidth='1px' rounded='md'>
            <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
              10/9/2022
            </Box>
            
            <Heading size='md' my='2'>
              <LinkOverlay href='#'>
                Smart integration 
              </LinkOverlay>
            </Heading>

            <Text mb='3'>
              ¡Tu empresa puede ser parte!
              <br /> 
              • Seminario tecnologias 4.0 
              <br />
              • Taller de sensibilización en transformación digital
            </Text>

            <Box as='a' color='teal.400' href='#' fontWeight='bold'>
              Más información
            </Box>
          </LinkBox>

          <LinkBox as='article' maxW='sm' p='5' borderWidth='1px' rounded='md'>
            <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
              10/9/2022
            </Box>
            
            <Heading size='md' my='2'>
              <LinkOverlay href='#'>
                Smart integration 
              </LinkOverlay>
            </Heading>

            <Text mb='3'>
              ¡Tu empresa puede ser parte!
              <br /> 
              • Seminario tecnologias 4.0 
              <br />
              • Taller de sensibilización en transformación digital
            </Text>

            <Box as='a' color='teal.400' href='#' fontWeight='bold'>
              Más información
            </Box>
          </LinkBox>

          <LinkBox as='article' maxW='sm' p='5' borderWidth='1px' rounded='md'>
            <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
              10/9/2022
            </Box>
            
            <Heading size='md' my='2'>
              <LinkOverlay href='#'>
                Smart integration 
              </LinkOverlay>
            </Heading>

            <Text mb='3'>
              ¡Tu empresa puede ser parte!
              <br /> 
              • Seminario tecnologias 4.0 
              <br />
              • Taller de sensibilización en transformación digital
            </Text>

            <Box as='a' color='teal.400' href='#' fontWeight='bold'>
              Más información
            </Box>
          </LinkBox>

          <LinkBox as='article' maxW='sm' p='5' borderWidth='1px' rounded='md'>
            <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
              10/9/2022
            </Box>
            
            <Heading size='md' my='2'>
              <LinkOverlay href='#'>
                Smart integration 
              </LinkOverlay>
            </Heading>

            <Text mb='3'>
              ¡Tu empresa puede ser parte!
              <br /> 
              • Seminario tecnologias 4.0 
              <br />
              • Taller de sensibilización en transformación digital
            </Text>

            <Box as='a' color='teal.400' href='#' fontWeight='bold'>
              Más información
            </Box>
          </LinkBox>

          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
          </a>
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

const Span = styled.span`
  color: orange;
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