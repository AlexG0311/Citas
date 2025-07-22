import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAutorizarUser from '@/hooks/useAutorizarUser';
import useCitas from '../hooks/useCitas';

const CitasCliente = () => {

const {isLoading, isAuthorized} = useAutorizarUser();
const navigate = useNavigate();
const {citas} = useCitas();

useEffect(() => {
  if(!isLoading && !isAuthorized){
    navigate("/cliente/login")
  }
},[isLoading,isAuthorized, navigate]);

if(isLoading){
return <p>Cargando caremonda esperate........</p>
}

return(
<div className="bg-gray-100 font-sans min-h-screen">
      {/* NAVBAR */}
      <nav className="w-full flex justify-between mb-6 bg-blue-500 p-4">
        <img src="/static/logo.png" alt="Logo" className="h-10" />
        <ul className="flex flex-wrap text-sm font-medium text-center text-white">
          <li className="me-2">
            <a
              href="/cliente/perfil"
              className="inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-40 h-10"
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="/cliente/agendar"
              className="inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-40 h-10"
            >
              Agendar cita
            </a>
          </li>
          <li>
            <a
              href="/cliente/mis_citas"
              className="inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 w-40 h-10"
            >
              Mis Citas
            </a>
          </li>
        </ul>
        
        <div className="flex items-center space-x-2">
             <p className="text-sm font-semibold">usuario</p>
          <img
            src="/static/usuario.png"
            alt="Usuario"
            className="w-10 h-10 rounded-full border"
          />
          <a href="/logout" className="text-white hover:underline">Cerrar sesión</a>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="container mx-auto p-4">
        
    <table className="w-full table-auto border border-gray-300 text-sm">
      <thead className="bg-blue-100">
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
