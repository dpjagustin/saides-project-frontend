import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
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
                '/resources/fotosrandom/plantaIndustrial.jpg'
              }
            />
          </Flex>
        </Stack>
      </ContenedorHero>
      
    </>
  );
}


const ContenedorHero = styled.div`
  width: 100%;
  height: 60vh;
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
