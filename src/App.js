import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Nav from "./components/NavBar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/index" element={<Home />}/>

        <Route path="/putas" element={<h1>LA PUTA MADRE HARRY</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Para que por ej. un index tenga los componentes que lo componen(nav,hero,footer) deberia de crearse un componente llamado Home o Index
// que contenga estos componentes