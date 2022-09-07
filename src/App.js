import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/index" element={<Home />}/>

        <Route path="/putas" element={<h1>LA PUTA MADRE HARRY</h1>}/>

        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Para que por ej. un index tenga los componentes que lo componen(nav,hero,footer) deberia de crearse un componente llamado Home o Index
// que contenga estos componentes