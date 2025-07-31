import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAutorizarUser from '@/hooks/useAutorizarUser';
import { useTheme } from "@/context/ThemeContext";
const ClienteInicio = () => {
   const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { user, isLoading, isAuthorized } = useAutorizarUser();

  const handleAction = async () => {
 
      try {
        const res = await fetch("http://localhost:5000/logout", {
          method: "POST",
          credentials: "include", // ✅ Necesario para borrar cookie
        });

        if (res.ok) {
          navigate("/cliente/login"); // 🔐 Redirige al login
        } else {
          console.error("Error al cerrar sesión");
        }
      } catch (error) {
        console.error("Error de red al cerrar sesión", error);
      }
    
  };

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
    <div className="flex flex-col items-center min-h-screen dark:bg-gray-900  bg-gray-100 font-sans">
      <nav className="w-full flex justify-between mb-6 bg-blue-500 dark:bg-black p-4">
        <img src="/static/logo.png" alt="Logo" className="h-10" />

          <div className="flex items-center space-x-2">
            <p className="text-sm font-semibold">{user.nombre}</p>

            <button onClick={toggleTheme} className="p-2 rounded-full  dark:bg-gray-700">
                  {theme === "light" ? (
                    <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M21.64 13a1 1 0 0 0-1.05-.14A8.05 8.05 0 0 1 17.22 13a8.15 8.15 0 0 1-8.14-8.15 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05Z" />
                    </svg>
                  )}
              </button>
               <img src="/static/usuario.png" alt="Usuario" className="w-10 h-10 rounded-full border" />
          <button className="text-white hover:underline ml-2 cursor-pointer" onClick={handleAction}>Cerrar sesión</button>

          </div>
      </nav>

      <section className="text-center mt-8">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-white">Bienvenido, {user.nombre}</h1>
      </section>

      <section className="skeleton bg-white max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md dark:bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg flex dark:bg-gray-900 flex-col items-center shadow hover:shadow-lg transition">
            <img src="/static/calendar.png" alt="Agendar" className="w-16 h-16 mb-2" />
            <h2 className="font-semibold text-lg text-gray-700 mb-2 dark:text-white">Agendar Cita</h2>
            <a href="/cliente/agendar" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Ir</a>
          </div>

          <div className="bg-green-100 p-4 rounded-lg flex  dark:bg-gray-900 flex-col items-center shadow hover:shadow-lg transition">
            <img src="/static/list.png" alt="Ver Citas" className="w-16 h-16 mb-2" />
            <h2 className="font-semibold text-lg text-gray-700  dark:text-white mb-2">Ver Citas</h2>
            <a href="/cliente/mis_citas" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Ir</a>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default ClienteInicio;
