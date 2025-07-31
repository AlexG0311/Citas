import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAutorizarUser from "@/hooks/useAutorizarUser";
import fetchModalidad from "@/admin/services/fetchModalidad";
import { fetchServicios } from "@/admin/services/fetchServicios";
import BuscarProfesional from "../services/BuscarProfesional";
import Horarios from "../services/Horarios";
import agendar from "../services/agendar";
import Navbar from "../components/Navbar";

const AgendarCita = () => {

  const [servicios, setServicios] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [modalidadSeleccionada, setModalidadSeleccionada] = useState("");
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [fecha, setFecha] = useState('');
  const [documento, setDocumento] = useState('');
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();



  const {user,isLoading, isAuthorized} = useAutorizarUser();
    useEffect(() => {

      if(!isLoading && !isAuthorized){
         navigate("/cliente/login")
      }
      setDocumento(user.cedula)
      setUsuario(user);

     }, [navigate,isLoading, isAuthorized]);

  useEffect(() => {
      fetchServicios().then(servicio => setServicios(servicio))

       fetchModalidad().then(modalidad => setModalidades(modalidad))
  }, []);

  
  const {profesionales} = BuscarProfesional({servicioSeleccionado});

  const handleServicioChange = (e) => {
    setServicioSeleccionado(e.target.value);
    setMostrarTabla(true); // Aquí podrías cargar los doctores disponibles
  };

  const handleModalidadChange = (e) => {
    setModalidadSeleccionada(e.target.value);
  };

 const buscarHorarios = async () => {

  const {data} = await Horarios({servicioSeleccionado,modalidadSeleccionada,profesionalSeleccionado,fecha });
  setHorarios(data);

  };
  
async function handledAgendar (h){
 await agendar({h, documento, profesionalSeleccionado, servicioSeleccionado})
 await buscarHorarios();
}


if (!usuario) {
    return <p className="text-center mt-10 text-gray-500">Cargando perfil...</p>;
}

  return (
  <div> 
    <div className="bg-white dark:bg-gray-900   font-sans min-h-screen" >
      {/* NAVBAR */}
     <Navbar
     nombre = {user.nombre}/>
     

      {/* CONTENIDO */}
  
        <div className="container mx-auto p-4 ">
          <h1 className="text-2xl font-bold text-center dark:text-white text-blue-700 mb-4">Agendar Cita</h1>

           {/* Formulario Servicio */}
          <div className="bg-white  dark:bg-black p-4 rounded shadow mb-6">
          <div className="mb-4">
            <label htmlFor="servicio" className="block font-medium text-black dark:text-white">Servicio</label>
            <select
              id="servicio"
              className="w-full border rounded p-2 text-black dark:text-white"
              value={servicioSeleccionado}
              onChange={handleServicioChange}
            >
              <option  className="dark:bg-gray-800">Selecciona un servicio</option>
              {servicios.map((servicio) => (
                <option
                className="dark:bg-gray-800"   
                key={servicio.id} 
                value={servicio.id}>
                  {servicio.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

           <div className="bg-white p-4 rounded shadow mb-6 dark:bg-black">
             <label className="block text-sm font-medium  dark:text-white  text-black">Profesional</label>
                <select
                value={profesionalSeleccionado}
                onChange={e => setProfesionalSeleccionado(e.target.value)}
                className="border px-3 py-2 rounded w-full mt-1 text-black dark:bg-black dark:text-white"
                >
               <option className="dark:bg-gray-800">Seleccione un profesional</option>
               {profesionales.map(p => (
               <option className="dark:bg-gray-800"   key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>
              ))}
               </select>
            </div>

        {/* Formulario Modalidad */}
        <div className="bg-white p-4 rounded shadow text-black mb-6 dark:text-white dark:bg-black">
          <div className="mb-4">
            <label htmlFor="modalidad" className="block font-medium  ">Modalidad:</label>
            <select
              id="modalidad"
              className="w-full border rounded p-2  dark:text-white dark:bg-black"
              required
              value={modalidadSeleccionada}
              onChange={handleModalidadChange}
            >
              <option value="">Seleccione una modalidad</option>
              {modalidades.map((modalidad) => (
                <option key={modalidad.id} value={modalidad.id}>
                  {modalidad.nombre}
                </option>
              ))}
            </select>
          </div>

        <div>
            <label className="block text-sm font-medium">Fecha (opcional)</label>
            <input type="date"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            className="border px-3 py-2 rounded w-full mt-1"
                />
        </div>     

        <button
            onClick={buscarHorarios}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Buscar horarios disponibles
       </button>         
        </div>

        {/* Tabla de doctores */}
        {mostrarTabla && (
          <div>
            <h2 className="text-xl font-bold text-center text-green-700 mb-4">
              Doctores y Horarios Disponibles
            </h2>
            <div className="bg-white p-4 rounded shadow overflow-x-auto dark:text-white dark:bg-gray-800">
              <table className="w-full text-sm text-left border border-gray-300 dark:text-white dark:bg-gray-800">
             <thead>
                      <tr>
                        <th className="border p-2">Fecha</th>
                        <th className="border p-2">Hora Inicio</th>
                        <th className="border p-2">Hora Fin</th>
                        <th className="border p-2">Profesional</th>
                        <th className="border p-2">Estado</th>
                        <th className="border p-2">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {horarios.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center p-4">No hay horarios disponibles</td>
                        </tr>
                      ) : (
                        horarios.map((h) => (
                          <tr key={h.id}>
                            <td className="border p-2">{h.fecha}</td>
                            <td className="border p-2">{h.hora_inicio}</td>
                            <td className="border p-2">{h.hora_fin}</td>
                            <td className="border p-2">{h.profesional_nombre}</td>
                            <td className="border p-2">{h.estado}</td>
                            <td className="border p-2">
                              <button
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                onClick={() => handledAgendar(h)}
                              >
                                Agendar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
              </table>
            </div>
          </div>
        )}
        </div>

    </div>
  </div>   
  );
};

export default AgendarCita;
