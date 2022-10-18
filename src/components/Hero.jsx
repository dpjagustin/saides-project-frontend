import {
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

export default function Hero() {
  return (
    <>
    <Flex
        w={'full'}
        h={'60vh'}
        backgroundImage={
          'url(https://www.electrichybridvehicletechnology.com/wp-content/uploads/2020/11/Comau_New500_2-cropped.jpg)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
        backgroundAttachment={'fixed'} mb="50px">
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
              textShadow={'7px 7px 10px black' }>
                <Text
             >DESCAR <span id="asd1">SAI</span><span id="asd2">Des</span></Text>
              Sistema de Administración Interna 
            </Text>
            <Stack direction={'row'}>
              <Button
                bg={'whiteAlpha.300'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'whiteAlpha.500' }}>
                ¿Como funciona?
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </>
  );
}

