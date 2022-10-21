import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
<<<<<<< HEAD
import { ChakraProvider, StylesProvider } from '@chakra-ui/react';
// import "./styles.css"
=======
import { ChakraProvider} from '@chakra-ui/react';

>>>>>>> 5ae6562ca74ec6ca985f6f00252e08384b8ec427

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
   <App />
  </ChakraProvider>
);

