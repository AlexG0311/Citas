
export default function Navbar({nombre}){

  return( 

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
             <p className="text-sm font-semibold">{nombre}</p>
          <img
            src="/static/usuario.png"
            alt="Usuario"
            className="w-10 h-10 rounded-full border"
          />
          <a href="/" className="text-white hover:underline">Cerrar sesión</a>
        </div>
      </nav>
      
    
    );





}