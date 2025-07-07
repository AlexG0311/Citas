import { Link } from 'react-router-dom'



function Dashboard() {
  return (
    <div className=" bg-gray-100 ">
      {/* Barra superior */}
      <nav className="w-full flex justify-end mb-6 bg-blue-500 p-4 ">
        <div className="contenedorNavCliente">
          <img
            src="/user.png" // Asegúrate de que esté en `public/`
            alt="Usuario"
            className="w-15 h-10 rounded-full cursor-pointer"
          />
        </div>
      </nav>

      {/* Título */}
      <h1 className="text-3xl font-bold mb-6 text-center">Bienvenido, María</h1>

      {/* Cards de navegación */}
      <section className="bg-blue-500 p-6 rounded-lg shadow-md mx-auto mt-10 max-w-[900px] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            to="/servicios/listado"
            className="bg-white p-4 rounded-lg h-30 shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer text-center"
          >
            Servicios Ofrecidos
          </Link>

          <Link
            to="/personal/listado"
            className="bg-white p-4 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer text-center"
          >
            Registro Personal
          </Link>

          <Link
            to="/citas"
            className="bg-white p-4 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer text-center"
          >
            Servicio de Citas
          </Link>

          <Link
            to="/horario"
            className="bg-white p-4 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer text-center"
          >
            Horario Profesional
          </Link>

          <Link
            to="/sedes"
            className="bg-white p-4 rounded-lg h-30 shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer text-center"
          >
            Sedes
          </Link>

          <Link
            to="/estadisticas"
            className="bg-white p-4 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out cursor-pointer text-center"
          >
            Estadísticas
          </Link>
        </div>
      </section>

 
    </div>
  )
}

export default Dashboard
