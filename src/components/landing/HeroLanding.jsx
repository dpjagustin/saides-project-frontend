import React from "react";
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


export default function HeroLanding() {
  return(
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
  )
}

const Span = styled.span`
  color: orange;
`;