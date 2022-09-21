import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Login from "./Login";
import Cookies from 'universal-cookie';
import { Component } from "react";

const cookies = new Cookies();

class Home extends Component{
  
  componentDidMount(){
    if(!cookies.get("username")){
      window.location.href="./login"
    }
  }
  
  render(){
    return(
      <>
        <NavBar />
        <Hero /> 
        <Footer />
      </>
    )
  }
}

export default Home;