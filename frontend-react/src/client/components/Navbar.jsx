import { useTheme } from "@/context/ThemeContext";

export default function Navbar({ nombre }) {
  const { theme, toggleTheme } = useTheme();

  return (
   <nav className="w-full flex justify-between mb-6 bg-blue-500 dark:bg-black p-4">
  <img src="/static/logo.png" alt="Logo" className="h-10" />

  <ul className="flex flex-wrap text-sm font-medium text-center text-white dark:text-gray-200">
    <li className="me-2">
      <a
        href="/cliente/perfil"
        className="inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white w-40 h-10"
      >
        Inicio
      </a>
    </li>
    <li>
      <a
        href="/cliente/agendar"
        className="inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white w-40 h-10"
      >
        Agendar cita
      </a>
    </li>
    <li>
      <a
        href="/cliente/mis_citas"
        className="inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white w-40 h-10"
      >
        Mis Citas
      </a>
    </li>
  </ul>

  <div className="flex items-center space-x-2">
  
   <p className="text-sm font-semibold">{nombre}</p>
    
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
    <a href="/logout" className="text-white hover:underline">Cerrar sesión</a>
  </div>
</nav>

  );
}
