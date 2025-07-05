import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function Personal() {
  const sidebarLinks = [
    { to: '/personal/listado', label: 'Listado' },
    { to: '/personal/crear', label: 'Crear' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenedor principal con márgenes */}
      <div className="flex-1 px-8 py-6">
        <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
          {/* Sidebar a la izquierda */}
          <Sidebar links={sidebarLinks} />

          {/* Contenido principal centrado */}
          <div className="flex-1 p-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
              Registrar Personal
            </h2>
            <form className="max-w-md mx-auto">
              <div className="mb-4">
                <label className="block mb-1">Nombre:</label>
                <input type="text" className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Apellidos:</label>
                <input type="text" className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Número de identificación:</label>
                <input type="text" className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Especialidad:</label>
                <input type="text" className="w-full border px-3 py-2 rounded" />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Contraseña:</label>
                <input type="password" className="w-full border px-3 py-2 rounded" />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Registrar Personal
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Personal
