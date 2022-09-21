// import React, { Component } from 'react'
// import { Input, Box, HStack, Button, Textarea } from '@chakra-ui/react';
// import { DeleteIcon, CheckIcon  } from '@chakra-ui/icons';
// import "../styles/notas/editarnota.css";
// import NavBar from '../NavBar'
// import Footer from '../Footer'
// import {Editarnota} from './EditarNota';

// let notaId =  Editarnota.Editarnota()
// console.log(notaId)
// export default class EditarNotav2 extends Component {
//     constructor(props){
//         super(props)
//         this.state={
//             titulo:"",
//             cuerpoNota:"",
//         };
//     }
//     handleTituloChange(e){
//         this.setState({titulo: e.target.value});
//     }
//     handleCuerpoNotaChange(e){
//         this.setState({cuerpoNota: e.target.value});
//     }
//     componentDidMount(){
//         // hace la llamada a la api para agarrar la nota con la id
        
//     }
    


//   render() {
//     return (
//       <>
//       <NavBar />
//       <h1 className='titulo'>Mis notas</h1>
//       <Box>
//         <h2>Titulo de nota</h2>
//         <Input value={this.state.titulo} onChange={this.handleTituloChange.bind(this)}></Input>
//         <h2>Cuerpo de nota</h2>
//         <Textarea value={this.state.cuerpoNota} onChange={this.handleCuerpoNotaChange.bind(this)}></Textarea>
//         <HStack>
//             <Button colorScheme="red">Borrar<DeleteIcon/></Button>
//             <Button colorScheme="blue">Guardar<CheckIcon/></Button>
//         </HStack>
//       </Box>
//       <Footer />
//       </>
//     )
//   }
// }