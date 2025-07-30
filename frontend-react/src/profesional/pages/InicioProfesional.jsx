import { useEffect, useState } from 'react';

export default function InicioProfesional() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const profesional = JSON.parse(localStorage.getItem('profesional'));

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await fetch('http://localhost:5000/profesional/citas/pendientes', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Error al obtener citas');

        const data = await res.json();
        setCitas(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('profesional');
    window.location.href = '/profesional/login';
  };

  const completarCita = async (idCita) => {
    try {
      const res = await fetch(`http://localhost:5000/profesional/citas/${idCita}/completar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Error al completar cita');

      // Filtrar la cita completada del listado
      setCitas(prev => prev.filter(c => c.id !== idCita));
    } catch (error) {
      console.error('Error al completar cita:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Portal Profesional</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">
            {profesional?.nombre} {profesional?.apellido}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Citas Pendientes</h2>

        {loading ? (
          <p className="text-gray-600">Cargando citas...</p>
        ) : citas.length === 0 ? (
          <p className="text-gray-500">No tienes citas pendientes.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow border border-gray-200 rounded">
              <thead className="bg-blue-100 text-gray-800">
                <tr>
                  <th className="px-4 py-2 border">Cliente</th>
                  <th className="px-4 py-2 border">Servicio</th>
                  <th className="px-4 py-2 border">Fecha</th>
                  <th className="px-4 py-2 border">Hora Inicio</th>
                  <th className="px-4 py-2 border">Hora Fin</th>
                  <th className="px-4 py-2 border">Sede</th>
                  <th className="px-4 py-2 border">Acción</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita) => (
                  <tr key={cita.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{cita.cliente}</td>
                    <td className="px-4 py-2 border">{cita.servicio}</td>
                    <td className="px-4 py-2 border">{cita.fecha}</td>
                    <td className="px-4 py-2 border">{cita.hora_inicio}</td>
                    <td className="px-4 py-2 border">{cita.hora_fin}</td>
                    <td className="px-4 py-2 border">{cita.sede}</td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => completarCita(cita.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Completar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
