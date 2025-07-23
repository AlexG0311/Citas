import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAutorizarProfesional from '../hooks/useAutorizarProfesional';

const CitasProfesional = () => {
  const navigate = useNavigate();
  const { user, isLoading, isAuthorized } = useAutorizarProfesional();
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      navigate("/login/profesional");
    }
  }, [isLoading, isAuthorized, navigate]);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/profesionales/${user.id}/citas`)
        .then(res => res.json())
        .then(data => setCitas(data))
        .catch(err => console.error(err));
    }
  }, [user]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Citas Programadas
        </h1>
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-2 py-1 border">Fecha</th>
              <th className="px-2 py-1 border">Hora Inicio</th>
              <th className="px-2 py-1 border">Hora Fin</th>
              <th className="px-2 py-1 border">Cliente</th>
              <th className="px-2 py-1 border">Servicio</th>
              <th className="px-2 py-1 border">Sede</th>
            </tr>
          </thead>
          <tbody>
            {citas.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No hay citas programadas
                </td>
              </tr>
            ) : (
              citas.map(cita => (
                <tr key={cita.id}>
                  <td className="border px-2 py-1">{cita.fecha}</td>
                  <td className="border px-2 py-1">{cita.hora_inicio}</td>
                  <td className="border px-2 py-1">{cita.hora_fin}</td>
                  <td className="border px-2 py-1">{cita.cliente_nombre}</td>
                  <td className="border px-2 py-1">{cita.servicio}</td>
                  <td className="border px-2 py-1">{cita.sede}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CitasProfesional;
