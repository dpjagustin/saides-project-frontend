import Footer from "../components/Footer";
import NavBarLanding from "../components/NavBarLanding";
import HomeLanding from "../components/HomeLanding";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Landing() {
  const urlauth = "http://10.0.0.47:8000/api/authUser"
  const navigate = useNavigate();
  useEffect(() =>{
    (
      async ()=>{
        await axios.get(urlauth,{withCredentials:true})
        .then((res)=>{
          navigate("/index")
        })
      }
    )();
  });

    return (
      <>
        <NavBarLanding />
        <HomeLanding />
        <Footer />
      </>
    )
  }
