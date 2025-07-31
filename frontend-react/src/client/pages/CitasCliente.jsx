import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAutorizarUser from '@/hooks/useAutorizarUser';
import useCitas from '../hooks/useCitas';
import Navbar from "../components/Navbar";

const CitasCliente = () => {

const {isLoading, isAuthorized} = useAutorizarUser();
const navigate = useNavigate();
const {citas} = useCitas();

const {user} = useAutorizarUser();

useEffect(() => {
  if(!isLoading && !isAuthorized){
    navigate("/cliente/login")
  }
},[isLoading,isAuthorized, navigate]);

if(isLoading){
return <p>Cargando caremonda esperate........</p>
}

return(
<div className="bg-gray-100 dark:bg-black font-sans min-h-screen">
      {/* NAVBAR */}
    <Navbar
       nombre = {user.nombre}/>

      {/* CONTENIDO */}
      <div className="container mx-auto p-4">
        
    <table className="w-full table-auto border dark:text-white text-black border-gray-300 text-sm">
      <thead className="bg-blue-500 dark:bg-gray-800 text-black dark:text-white"  >
        <tr>
          <th className="px-2 py-1 border">Fecha</th>
          <th className="px-2 py-1 border">Hora Inicio</th>
          <th className="px-2 py-1 border">Hora Fin</th>
          <th className="px-2 py-1 border">Doctor</th>
          <th className="px-2 py-1 border">Servicio</th>
          <th className="px-2 py-1 border">Sede</th>
          <th className="px-2 py-1 border">Acción</th>
        </tr>
      </thead>
      <tbody>
        
        {citas.map(cita => ( 
          <tr className="text-center" id="cita" key={cita.id}>
          <td className="border px-2 py-1">{cita.fecha}</td>
          <td className="border px-2 py-1">{cita.hora_inicio}</td>
          <td className="border px-2 py-1">{cita.hora_fin}</td>
          <td className="border px-2 py-1">{cita.profesional}</td>
          <td className="border px-2 py-1">{cita.servicio}</td>
          <td className="border px-2 py-1">{cita.sede}</td>
          <td className="border px-2 py-1">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs">
              Cancelar
            </button>
          </td> 
        </tr>))}
      </tbody>
    </table>
        </div>
</div>




);

}



export default CitasCliente;