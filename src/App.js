import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Solicitudes from "./pages/Solicitudes";
import NotFoundPage from "./pages/NotFoundPage";
import Comida from "./pages/Comida";
import Micuenta from "./pages/Micuenta";
import Notas from "./pages/Notas";
import Landing from "./pages/Landing";
import  Agenda from "./pages/Agenda";
import { Provider } from "react-redux";
import {store} from "./store";



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>

          <Route path="/index" element={<Home />}/>

          <Route path="/solicitudes" element={<Solicitudes />}/>

          <Route path="/comida" element={<Comida />}/>

          <Route path="*" element={<NotFoundPage />} />

          <Route path="/login" element={<Login/>}/>

          <Route path="/micuenta" element={<Micuenta/>}/>
        
          <Route path="/notas" element={<Notas />}/>

          <Route path="/agenda" element={<Agenda />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;

// Para que por ej. un index tenga los componentes que lo componen(nav,hero,footer) deberia de crearse un componente llamado Home o Index
// que contenga estos componentes