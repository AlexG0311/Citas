import Navbar from '../components/Navbar'
import Tabla from '../components/Tabla';
import * as config_tabla_horario from '../config/config_tabla_horario';
import { Button } from "@chakra-ui/react"
import ModalChakraUI from '../components/ModalChakraUI';
import ModalEditarHorario from '../components/ModalEditarHorario';
import { useState } from 'react';

const url = "http://localhost:5000/horario";

export default function Horario() {


  const [showModalEditar, setShowModalEditar] = useState(false);
  const [datosAEditar, setDatosAEditar] = useState(null);


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


  const editarHorario = async (data) => {
    const res = await fetch(`${url}/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Error al actualizar Horario!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 px-8 py-6  dark:bg-black bg-white text-black dark:text-white">
              <div className="flex bg-white rounded-lg shadow-md overflow-hidden  dark:bg-gray-800  p-5">
                <div className="w-full">
                  <div className="overflow-x-auto">
                              
              <Button onClick={handleOpen} colorScheme="blue"  className="bg-black text-white px-4 ml-4 mb-2 py-2 rounded hover:bg-gray-400">
                  Crear un Horario
              </Button>

              <ModalEditarHorario
              isOpen={showModalEditar}
              onClose={() => setShowModalEditar(false)}
              datosIniciales={datosAEditar}     //{datos traidos de la tabla}
              onSubmit={editarHorario}
              
              
              />
                  
              <Tabla
                conf_tabla={config_tabla_horario}
                url_api={url}
                  onEdit={(fila) => {
                  console.log('Datos de fila al editar:', fila);  //{ conseguimos los datos de la tabla }
                  setDatosAEditar(fila);
                  setShowModalEditar(true);
                }}
             
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
