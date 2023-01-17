import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Noticias from "../components/Noticias";
import { Box } from "@chakra-ui/react";
import LineaDivisora from "../components/LineaDivisora";
const Home = () =>{
    return(
      <>
        <NavBar />
        <Box minH="100vh">
        <Hero /> 
        <Noticias />
        </Box>
        <Footer />
      </>
    )
}
export default Home;