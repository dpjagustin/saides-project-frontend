import React, {useState, useEffect} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Modal from "../components/Solicitudes/Modal";
import { Flex, Button, Heading, Card, CardHeader, Divider, CardBody, Stack, StackDivider, Box, Select, Input, useColorModeValue, useToast, Text } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import es from "date-fns/locale/es";
import axios from "axios";

export default function Solicitudes() {
  const urlEnvSolPerm="http://localhost:8000/api/crearSolicitud"
  const urlTraerSolPerm="http://localhost:8000/api/findSolicitudNombre"
  const [estadoModal1, cambiarEstadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  const [estadoModal3, cambiarEstadoModal3] = useState(false);
  const [histPerm, setHistPerm]=useState([])
  const [actualizar, setActualizar]=useState(0)
  const [pag, setPag]=useState(1)
  const toast = useToast()
  const [fecha, setFecha] = useState(new Date())
  const [fecha2, setFecha2] = useState(new Date())
  const [fecha3, setFecha3] = useState(new Date())
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  
  const [solicitudPermiso, setSolicitudPermiso]= useState({
    nombre:"",
    motivo:"",
    notaM:"",
    detalle:"",
    DoH:"",
    cantDoH:0,
    inicia:"",
    finaliza:"",
    vuelve:"",
    importante:"",
    propuesta:"",
    documentacion:"",
    notaD:"",
  })
  const motivos=["Medico","Viaje personal", "Examen parcial", "Examen final", "Personal", "Mudanza", "Otros"]
  const documentacion=["Certificado médico","Certificado de exámen","Contrato de locación","Alta de servicio","No requerida","Otros"]
  const asd2 = useColorModeValue("2xl", "0px 0px 13px 5px rgba(255,255,255,0.3)")

  /////////////TRAE EL NOMBRE DEL USUARIO///////////

  useEffect(() => {
    (
      async () => {
        const response = await fetch("http://localhost:8000/api/authUser", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const content = await response.json();
        setNombre(content.nombre)
        setApellido(content.apellido)
      }
    )();
  }, );
   /////////CONSTANTE QUE ARMA EL NOMBRE COMPLETO///////////
  const nombrecompleto = nombre + " " + apellido
  /////////////TRAE EL HISTORIAL DE LAS SOLICITUDES DEL USUARIO////////////
  const traerHistPerm= async ()=>{
    await axios.post(urlTraerSolPerm,{
      nombre:nombrecompleto
    }).then((res)=>{
      setHistPerm(res.data)
    })
  }
  useEffect(() => {
    traerHistPerm();
  },[nombre])
  
  /////////////////HANDLE DE ENVIO DE SOLICITUD//////////////////////
  function handle(e) {
    const solPerm = { ...solicitudPermiso }
    solPerm[e.target.id] = e.target.value
    setSolicitudPermiso(solPerm)
  }
  ////////////////ENVIA LA SOLICITUD DE PERM//////////////////

  const enviarSolPerm = async()=>{
    await axios.post(urlEnvSolPerm,{
      nombre: nombrecompleto,
      motivo: solicitudPermiso.motivo,
      notaM:solicitudPermiso.notaM,
      detalle:solicitudPermiso.detalle,
      DoH:solicitudPermiso.DoH,
      cantDoH:solicitudPermiso.cantDoH,
      inicia:fecha,
      finaliza:fecha2,
      vuelve:fecha3,
      importante:solicitudPermiso.importante,
      propuesta:solicitudPermiso.propuesta,
      documentacion:solicitudPermiso.documentacion,
      notaD:solicitudPermiso.notaD,
    }).then((res)=>{
      toast({
        title: "Permiso enviado correctamente",
        status: "success",
        position: "top",
        duration: 2000,
        isClosable: true,
      })
      document.getElementById("motivo").value=""
      document.getElementById("notaM").value=""
      document.getElementById("detalle").value=""
      document.getElementById("DoH").value=""
      document.getElementById("cantDoH").value=""
      document.getElementById("importante").value=""
      document.getElementById("propuesta").value=""
      document.getElementById("documentacion").value=""
      document.getElementById("notaD").value=""
      setActualizar(actualizar+1)
    }).catch((error)=>{
      toast({
        title: "Error. Intente nuevamente.",
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      })
    })
  }

  ///////////////CAMBIO DE PAGINAS//////////////
  const handlePag = () => {
    setPag(1)
  }
  const handlePag2 = () => {
    setPag(2)
  }

  return(
    <>
      <NavBar /> 
      <Heading fontSize={[25, 35, 45, 60]} my="2%" ml="7%">Solicitudes</Heading>
      <Box minH="100vh">
      <Flex ml="10%" wrap="wrap">
        <Button borderRadius="20px" value="1" id="sida" onClick={handlePag} mr="1%">Cargar solicitud permiso</Button>
        <Button borderRadius="20px" onClick={handlePag2} >Ver historial de solicitudes</Button>
      </Flex>
      {pag===1?
      <Flex justify="center">
      <Card my="30px" w="35%" boxShadow={asd2}>
                <CardHeader>
                  <Heading size='xl'>Solicitud de permiso</Heading>
                </CardHeader>
                <Divider orientation="horizontal" my="5px" borderWidth="2px" w="99%" borderColor="blue.400" />
                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    {/* //// */}
                    <Box>
                      <Heading size='lg'>
                        Elegir motivo
                      </Heading>
                      <Select name="motivo" className="comida" id="motivo" w="90%" placeholder='Elegir motivo' mx="20px" mt="10px" onChange={(e)=>handle(e)}>
                          {motivos.map(mov=>(
                            <option>{mov}</option>
                          ))}
                      </Select>
                      {solicitudPermiso.motivo==="Otros"&& <Input name="notaM" className="notaM" id="notaM" w="90%" mx="20px" placeholder="Detalle sobre el motivo" mt="10px" onChange={(e)=>handle(e)}></Input>}
                    </Box>
                    {/* //// */}
                    <Box>
                      <Heading size='lg'>
                        Detalle específico del motivo
                      </Heading>
                      <Heading size='sm' w="60%">
                        Para exámen parcial o final, por favor colocar materia y carrera a la que corresponde.
                      </Heading>
                      <Input id="detalle" w="90%" mx="20px" placeholder="Detalle sobre el motivo" mt="10px" onChange={(e)=>handle(e)}></Input>
                    </Box>
                    {/* //// */}
                    <Box>
                      <Heading size='lg'>
                        Especifique si son días u horas
                      </Heading>
                      <Select id="DoH" w="90%" placeholder='Elegir motivo' mx="20px" mt="10px" onChange={(e)=>handle(e)}>
                            <option>Dias</option>
                            <option>Horas</option>
                      </Select>
                    </Box>
                  {/* //// */}
                    <Box>
                      <Heading size='lg'>
                        Indique la cantidad de dias/horas
                      </Heading>
                      <Input id="cantDoH" w="90%" mx="20px" placeholder="cantidad de dias/horas" mt="10px" onChange={(e)=>handle(e)}></Input>
                    </Box>
                    {/* //// */}
                    <Box>
                      <Heading size='lg'>
                        Inicia
                      </Heading>
                      <DatePicker className="datepicker" selected={fecha} onChange={(date) => setFecha(date)} dateFormat="dd/MM/yyyy" showTimeSelect timeIntervals={10} locale={es} />
                    </Box>
                    {/* //// */}
                    <Box>
                      <Heading size='lg'>
                        Finaliza
                      </Heading>
                      <DatePicker className="datepicker" selected={fecha2} onChange={(date2) => setFecha2(date2)} dateFormat="dd/MM/yyyy" showTimeSelect timeIntervals={10} locale={es} />
                    </Box>
                    {/* //// */}
                    <Box>
                      <Heading size='lg'>
                        Regresa al puesto de trabajo
                      </Heading>
                      <DatePicker className="datepicker" selected={fecha3} onChange={(date3) => setFecha3(date3)} dateFormat="dd/MM/yyyy" showTimeSelect timeIntervals={10} locale={es} />
                    </Box>
                    {/* //// */}
                    <Box>
                      <Heading size='md'>
                        Hay reuniones, cursos o eventos importantes durante el tiempo que se encontrará fuera de la oficina?
                      </Heading>
                      <Select id="importante" w="90%" placeholder='Elegir motivo' mx="20px" mt="10px" onChange={(e)=>handle(e)}>
                            <option>Si</option>
                            <option>No</option>
                      </Select>
                    </Box>
                    {/* //// */}
                    <Box>
                      <Heading size='lg'>
                        Propuesta de compensación
                      </Heading>
                      <Input id="propuesta" w="90%" mx="20px" placeholder="Propuesta de compensacion" mt="10px" onChange={(e)=>handle(e)}></Input>
                    </Box>
                    {/* //// */}
                    <Box>
                      <Heading size='lg'>
                        Documentacion de respaldo
                      </Heading>
                      <Select id="documentacion" w="90%" placeholder='Elegir motivo' mx="20px" mt="10px" onChange={(e)=>handle(e)}>
                          {documentacion.map(mov=>(
                            <option>{mov}</option>
                          ))}
                      </Select>
                      {solicitudPermiso.documentacion==="Otros"&& <Input id="notaD" w="90%" mx="20px" placeholder="Ingrese la documentacion de respaldo" mt="10px" onChange={(e)=>handle(e)}></Input>}
                    </Box>
                    {/* //// */}
                    <Box>
                      <Flex justify="center">
                        <Button colorScheme="blue" onClick={enviarSolPerm}>Guardar cambios</Button>
                      </Flex>
                    </Box>
                    {/* //// */}
                    
                    
                  </Stack>
                </CardBody>
              </Card>
              </Flex>
      :null}
      {pag===2?
        <>
       <Heading textAlign="center" my="1%">Historial de solicitudes</Heading>
       <Flex justify="center">
        <Flex justify="space-around" w="60%" >
          {histPerm.map(perm=>(
            <Card w="40%">
              <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                {perm.estado==="Pendiente"?
                <Box bg={"yellow.400"} borderRadius="10px">
                  <Heading size="lg" textAlign="center">{perm.estado}</Heading>
                </Box>
              :null}
              {perm.estado==="Rechazado"?
                <Box bg={"red.400"} borderRadius="10px">
                  <Heading size="lg" textAlign="center">{perm.estado}</Heading>
                </Box>
              :null}
              {perm.estado==="Aprovado"?
                <Box bg={"green.400"} borderRadius="10px">
                  <Heading size="lg" textAlign="center">{perm.estado}</Heading>
                </Box>
              :null}
              
                {/*  */}
                <Box>
                  <Heading size='lg'>
                    Motivo
                  </Heading>
                  <Text>{perm.motivo}</Text>
                </Box>
                {/*  */}
                {perm.notaM.length!==0 ?
                <Box>
                <Heading size='lg'>
                  Nota del motivo
                </Heading>
                <Text>{perm.notaM}</Text>
              </Box>
              :null}
              {/*  */}
              <Box>
                  <Heading size='lg'>
                    Detalle específico del motivo
                  </Heading>
                  <Text>{perm.detalle}</Text>
                </Box>
                {/*  */}
                <Box>
                  <Heading size='lg'>
                    Dias u horas
                  </Heading>
                  <Text>{perm.DoH}</Text>
                </Box>
                {/*  */}
                <Box>
                  <Heading size='lg'>
                    Cantidad dias u horas
                  </Heading>
                  <Text>{perm.cantDoH}</Text>
                </Box>
                {/*  */}
                <Box>
                  <Heading size='lg'>
                    Inicia
                  </Heading>
                  <Text>{perm.inicia}</Text>
                </Box>
                {/*  */}
                <Box>
                  <Heading size='lg'>
                  Finaliza
                  </Heading>
                  <Text>{perm.finaliza}</Text>
                </Box>
                {/*  */}
                <Box>
                  <Heading size='lg'>
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
                  <Heading size='lg'>
                    Propuesta de compensación
                  </Heading>
                  <Text>{perm.propuesta}</Text>
                </Box>
                {/*  */}
                <Box>
                  <Heading size='lg'>
                    Documentacion de respaldo
                  </Heading>
                  <Text>{perm.documentacion}</Text>
                </Box>
                {/*  */}
                {perm.notaD.length!==0 ?
                <Box>
                <Heading size='lg'>
                  Nota de la documentacion
                </Heading>
                <Text>{perm.notaD}</Text>
              </Box>
              :null}
                </Stack>
              </CardBody>
            </Card>

          ))}
        
        </Flex>
        </Flex>
        </>
      :null}
      
      {/* <Flex w="100%" minH="67vh" justify="space-between">

        <Flex w="50%" justify="center" alignItems="center">
          <div>
            <Flex p="40px" w="100%" justify="center" wrap="wrap" align-items="center" direction="column" gap="20px">
              <Button display="block" p="10px 30px" borderRadius="100px" color="#fff" border="none" onClick={() => cambiarEstadoModal1(!estadoModal1)}>Propuesta de formación</Button>
              
              <Flex w="100%" gap="1rem">
                <Button display="block" p="10px 30px" borderRadius="100px" color="#fff" border="none" onClick={() => cambiarEstadoModal2(!estadoModal2)}>Reconocimientos</Button>

                <Button display="block" p="10px 30px" borderRadius="100px" color="#fff" border="none" onClick={() => cambiarEstadoModal2(!estadoModal2)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy" viewBox="0 0 16 16">
                <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z"/>
                </svg> </Button>
              </Flex>
            
              <Button display="block" p="10px 30px" borderRadius="100px" color="#fff" border="none" onClick={() => cambiarEstadoModal3(!estadoModal3)}>Solicitud de permiso</Button>
            </Flex> */}

            {/* Modal 1  */}
            {/* <Modal 
              estado = {estadoModal1}
              cambiarEstado = {cambiarEstadoModal1} 
              titulo = "Propuesta de formación"
            >
              <Flex>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdVpG8vqpveNyqSAzagyjO0VF9ehhmbcaP8lfr1AuFTr71hEQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
              </Flex>
            </Modal> */}

            {/* Modal 2 */}
            {/* <Modal 
              estado = {estadoModal2}
              cambiarEstado = {cambiarEstadoModal2} 
              titulo = "Reconocimientos"
            >
              <Flex>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdW-21Qz8XgTiDejBGCMF7BfPxJwEJnQLN24soIAlUCiXZXhQ/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
              </Flex>
            </Modal> */}

            {/* Modal 3 */}
            {/* <Modal 
              estado = {estadoModal3}
              cambiarEstado = {cambiarEstadoModal3} 
              titulo = "Solicitud de permiso"
            >
              <Flex>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSexKaWcE_MDOE_Ytk9w6L5i21J4QYBUSbjRT6X8z-SzkxRqIg/viewform?embedded=true" width="600" height="700" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
              </Flex>
            </Modal>      
          </div>
        </Flex> */}
        
        {/* <Flex w="50%" justify="center" alignItems="center">        
          <iframe loading="lazy" src="https://www.canva.com/design/DAFLj4ommIg/watch?embed" width={560} height={315}></iframe>
        </Flex> */}
      {/* </Flex> */}
      </Box>
      <Footer />

    </>
  )
}


