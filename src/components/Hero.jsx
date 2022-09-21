import {
  Button,
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  LinkBox,
  LinkOverlay,
  VStack,
  Container
} from '@chakra-ui/react';
import styled from "styled-components";

export default function Hero() {
  return (
    <>
      <ContenedorHero>
        <Stack mb={"300"} minH={'20vh'} maxH={"50vh"} mt={10} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'lg'}>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}
                  _after={{
                    content: "''",
                    width: 'full',
                    height: useBreakpointValue({ base: '20%', md: '30%' }),
                    position: 'absolute',
                    bottom: 1,
                    left: 0,
                    bg: 'blue.400',
                    zIndex: -1,
                  }}>
                  DESCAR
                </Text>
                <br />{' '}
                <Text color={'blue.400'} as={'span'}>
                  Sistema de administración
                </Text>{' '}
              </Heading>
              <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A reiciendis sunt libero porro eius mollitia molestias. Suscipit debitis quae culpa?
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Button
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  <a href='/micuenta'>Mi panel</a>
                </Button>
                <Button rounded={'full'}>¿Como funciona?</Button>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1}>
            <Image
              alt={'Planta industrial'}
              objectFit={'cover'}
              borderRadius={'20px'}
              src={
                '/plantaIndustrial.jpg'
              }
            />
          </Flex>
        </Stack>
      </ContenedorHero>

      {/* <ContenedorComida>
      <h2> Hola</h2>
      </ContenedorComida>
      
      <ContenedorFechas> 

      </ContenedorFechas> */}

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
    </>
  );
}


const ContenedorHero = styled.div`
  width: 100%;
  height: 60vh;
`;

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
