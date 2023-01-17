import React from 'react'
import { Flex, Button, Heading, Card, CardHeader, Divider, CardBody, Stack, StackDivider, Box, Select, Input, useColorModeValue, useToast, Text} from "@chakra-ui/react";


export default function PageSolicitudes(histPermRol) {
    console.log(histPermRol)
  return (
    <>
       <Heading textAlign="center" my="1%">Historial de solicitudes</Heading>
       <Flex justify="center" wrap="wrap">
        <Flex justify="space-around" w="80%" wrap="wrap">
          {histPermRol.map(perm=>(
            <Card w="48%" my="2%" key={perm.id} pb="1%">
            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                {perm.estado === "Pendiente" ?
                  <Box bg={"yellow.400"} borderRadius="10px">
                    <Heading size="md" textAlign="center" p="1%" fontSize="x-large">{perm.estado}</Heading>
                  </Box>
                  : null}
                {perm.estado === "Rechazado" ?
                  <Box bg={"red.400"} borderRadius="10px">
                    <Heading size="md" textAlign="center" p="1%" fontSize="x-large">{perm.estado}</Heading>
                  </Box>
                  : null}
                {perm.estado === "Confirmado" ?
                  <Box bg={"green.400"} borderRadius="10px">
                    <Heading size="md" textAlign="center" p="1%" fontSize="x-large">Aprobado</Heading>
                  </Box>
                  : null}
                <Heading size='md'>
                  {perm.nombre}
                </Heading>
                <Flex direction="row" >
                  <Flex direction="column" w="50%">
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Motivo
                      </Heading>
                      <Text>{perm.motivo}</Text>
                    </Box>
                    {/*  */}
                    {perm.notaM.length !== 0 ?
                      <Box>
                        <Heading size='md'>
                          Nota del motivo
                        </Heading>
                        <Text>{perm.notaM}</Text>
                      </Box>
                      : null}
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Detalle específico del motivo
                      </Heading>
                      <Text>{perm.detalle}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Dias u horas
                      </Heading>
                      <Text>{perm.DoH}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Cantidad dias u horas
                      </Heading>
                      <Text>{perm.cantDoH}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Inicia
                      </Heading>
                      <Text>{perm.inicia}</Text>
                    </Box>
                    {/*  */}
                  </Flex>

                  {/* /////////////////////////////////////////////////// */}
                  <Flex direction="column"  w="50%">
                    <Box>
                      <Heading size='md'>
                        Finaliza
                      </Heading>
                      <Text>{perm.finaliza}</Text>
                    </Box>
                    {/*  */}

                    <Box>
                      <Heading size='md'>
                        Regresa al puesto de trabajo
                      </Heading>
                      <Text>{perm.vuelve}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Reuniones, cursos o eventos importantes
                      </Heading>
                      <Text>{perm.importante}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Propuesta de compensación
                      </Heading>
                      <Text>{perm.propuesta}</Text>
                    </Box>
                    {/*  */}
                    <Box>
                      <Heading size='md'>
                        Documentacion de respaldo
                      </Heading>
                      <Text>{perm.documentacion}</Text>
                    </Box>
                    {/*  */}
                    {perm.notaD.length !== 0 ?
                      <Box>
                        <Heading size='md'>
                          Nota de la documentacion
                        </Heading>
                        <Text>{perm.notaD}</Text>
                      </Box>
                      : null}
                  </Flex>
                </Flex>
              </Stack>
            </CardBody>
          </Card>

          ))}
        
        </Flex>
        </Flex>
        </>
  )
}
