import React from "react";
import { Flex, Box, Heading, Text, Stack, SimpleGrid, Icon } from "@chakra-ui/react";
import { FcBusinessman, FcTodoList, FcAdvertising, FcFinePrint, FcRadarPlot, FcSafe } from 'react-icons/fc';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function NuestraVision() {
  return(
    <>
    <Flex>
          <Box textAlign="center" py={10} px={6} mb={"5rem"}>
      {/* <InfoIcon boxSize={'50px'} color={'blue.500'} /> */}
      <Heading as="h2" size="xl" mt={1} mb={2}>
        Nuestra visión
      </Heading>
      <Text color={'gray.500'}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </Text>
    </Box>
    </Flex>
    
    <Flex justifyContent="center" >
    <Flex direction="column" p={4} w="90%" mb={"5rem"} >
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcBusinessman} w={10} h={10} />}
          title={'Panel de usuario'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon={<Icon as={FcTodoList} w={10} h={10} />}
          title={'Organización de actividades'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon={<Icon as={FcAdvertising} w={10} h={10} />}
          title={'Comunicación eficaz'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcFinePrint} w={10} h={10} />}
          title={'Información generalizada'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon={<Icon as={FcRadarPlot} w={10} h={10} />}
          title={'Todo en un sistema'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon={<Icon as={FcSafe} w={10} h={10} />}
          title={'Seguridad de la información'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
      </SimpleGrid>
    </Flex>
    </Flex>
    </>
  )
}

