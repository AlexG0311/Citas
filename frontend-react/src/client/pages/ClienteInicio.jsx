import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAutorizarUser from '@/hooks/useAutorizarUser';

const ClienteInicio = () => {
  const navigate = useNavigate();
  const { user, isLoading, isAuthorized } = useAutorizarUser();

  useEffect(() => {
    if (!isLoading && !isAuthorized) {
      navigate("/cliente/login");
    }
  }, [isLoading, isAuthorized, navigate]);

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-500">Cargando perfil...</p>;
  }

  if (!user.nombre) {
    return null; // o un mensaje de error
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 font-sans">
      <nav className="w-full flex justify-between mb-6 bg-blue-500 p-4">
        <img src="/static/logo.png" alt="Logo" className="h-10" />
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="text-sm font-semibold">{user.nombre}</p>
          </div>
          <img src="/static/usuario.png" alt="Usuario" className="w-10 h-10 rounded-full border" />
          <a href="/logout" className="text-white hover:underline ml-2">Cerrar sesión</a>
        </div>
      </nav>

      <section className="text-center mt-8">
        <h1 className="text-3xl font-bold text-blue-700">Bienvenido, {user.nombre}</h1>
      </section>

      <section className="bg-white max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg flex flex-col items-center shadow hover:shadow-lg transition">
            <img src="/static/calendar.png" alt="Agendar" className="w-16 h-16 mb-2" />
            <h2 className="font-semibold text-lg text-gray-700 mb-2">Agendar Cita</h2>
            <a href="/cliente/agendar" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Ir</a>
          </div>

          <div className="bg-green-100 p-4 rounded-lg flex flex-col items-center shadow hover:shadow-lg transition">
            <img src="/static/list.png" alt="Ver Citas" className="w-16 h-16 mb-2" />
            <h2 className="font-semibold text-lg text-gray-700 mb-2">Ver Citas</h2>
            <a href="/cliente/mis_citas" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Ir</a>
          </div>
        </div>
      </section>

      <div className="text-center mt-6">
        <a href="/" className="text-blue-500 hover:underline">Volver a la página principal</a>
      </div>
    </div>
  );
};

export default ClienteInicio;
