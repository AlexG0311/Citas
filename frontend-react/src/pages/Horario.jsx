import Navbar from '../components/Navbar'
import Tabla from '../components/Tabla';
import * as config_tabla_horario from '../config/config_tabla_horario';
import { Button } from "@chakra-ui/react"
import ModalChakraUI from '../components/ModalChakraUI';
import { useState } from 'react';


const url = "http://localhost:5000/horario";


export default function Horario() {

 const crearHorario = async (data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al crear profesional');
  };




  
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-8 py-6">
              <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
                <div className="w-full">
                  <div className="overflow-x-auto">
                              
              <Button onClick={handleOpen} colorScheme="blue"  className="bg-black text-white px-4 ml-4 mb-2 py-2 rounded hover:bg-gray-400">
                  Crear un Horario
              </Button>
                  
                <Tabla
                conf_tabla={config_tabla_horario}
                url_api={url}
             
              />        
        
                  </div>
            

              <ModalChakraUI isOpen={isOpen} onClose={handleClose}
               onSubmit={crearHorario} />
  
                </div>
              </div>

          
            </div>
     </div>
     
    
  )
}
