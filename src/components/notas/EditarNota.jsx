


// import { useParams } from 'react-router-dom';


// function Editarnota(){
//     const {id} = useParams();
//     let puto = {id};
//     return puto
// }
// export default Editarnota;

// export default class EditarNota extends Component {
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
//         let notaId =  this.props.match.params.id;

//         this.setState({
//             titulo:"algo algo algo",
            
//             cuerpoNota:"algov2 algov2"
//         })
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

