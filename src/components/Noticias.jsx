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

export default function Noticias() {
  return(
    <>
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
    </>
  )
}