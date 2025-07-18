import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function Servicios() {
  const sidebarLinks = [
    { to: '/servicios/listado', label: 'Listado' },
    { to: '/servicios/crear', label: 'Crear' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenedor con márgenes */}
      <div className="flex-1 px-8 py-6">
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
          {/* Sidebar */}
          <Sidebar links={sidebarLinks} />

          {/* Contenido principal */}
          <div className="flex-1 p-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
              Registrar Servicio
            </h2>
            <form className="max-w-md mx-auto">
              <div className="mb-4">
                <label className="block mb-1">Nombre del servicio:</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Descripción:</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Registrar Servicio
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Servicios
