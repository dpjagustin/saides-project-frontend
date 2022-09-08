import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Home() {
  return(
    <>
      <NavBar />
      <Hero /> 
      <Footer />
    </>
  )
}

export default Home;