import React from "react";

import {
  FormControl,
  Box,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  FormHelperText,
} from "@chakra-ui/react";

function getAllDaysInMonth(year, month) {
  const date = new Date(year, month, 1);

  const dates = [];

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export default function CargaComida() {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
  const now = new Date();
  console.log(getAllDaysInMonth(now.getFullYear(), now.getMonth()));
  let fechas = getAllDaysInMonth(now.getFullYear(), now.getMonth());
  return (
    <Box>
      {fechas.map((dia) => (
        <Box m="5" bg="blue.400">

        
        <FormControl as="fieldset">
          <FormLabel as="legend">Menu del dia: {dia.getDate()} de {monthNames[dia.getMonth()]}</FormLabel>
          <RadioGroup defaultValue="Itachi">
            <HStack spacing="24px">
              <Radio value="Sasuke">Sasuke</Radio>
              <Radio value="Nagato">Nagato</Radio>
              <Radio value="Itachi">Itachi</Radio>
              <Radio value="Sage of the six Paths">Sage of the six Paths</Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText>Select only if you're a fan.</FormHelperText>
        </FormControl>
        </Box>
      ))}
    </Box>
  );
}
