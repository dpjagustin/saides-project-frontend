import React from 'react'
import {
    useColorModeValue,
    Divider,
    Flex
  } from '@chakra-ui/react';

export default function LineaDivisora() {
    const dividerColor= useColorModeValue("blue.400", "grey.500")
  return (
    <Flex justifyContent="center">
      <Divider orientation="horizontal" my="2%" borderWidth="4px" borderColor={dividerColor} w="85%" borderRadius="7px"/>
    </Flex>
  )
}
