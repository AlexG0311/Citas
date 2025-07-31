import { Provider } from "@/components/ui/provider"
import './index.css';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "./context/ThemeContext";
import { HeroUIProvider } from '@heroui/react'; // Añadido

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider  resetCSS={false} >
    <HeroUIProvider>
      <BrowserRouter>
     <ThemeProvider>

     <App/>
        
     </ThemeProvider>
   
      </BrowserRouter>
    </HeroUIProvider>
   </Provider>  
  </StrictMode>
);