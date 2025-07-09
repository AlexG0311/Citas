import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react'; // Añadido

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <HeroUIProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HeroUIProvider>
 
  </StrictMode>
);