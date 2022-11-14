import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, StylesProvider } from '@chakra-ui/react';
// import "./styles.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ChakraProvider>
   <App />
  </ChakraProvider>
  </React.StrictMode>
);

