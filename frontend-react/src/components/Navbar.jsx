import { NavLink } from 'react-router-dom'
import UserProfile from './UserProfile'

function Navbar() {
  const tabs = [
    { name: 'Home', path: '/Admin' },
    { name: 'Servicios Ofrecidos', path: '/servicios/listado' },
    { name: 'Registro Personal', path: '/personal/listado' },
    { name: 'Gestionar Citas', path: '/citas' },
    { name: 'Horario Profesional', path: '/horario' },
    { name: 'Sedes', path: '/sedes/listado' },
    { name: 'Estadísticas', path: '/estadisticas' },
  ]

  return (
    <nav className="bg-blue-500 px-6 py-4 flex flex-wrap justify-end gap-4 border-opacity-30  shadow-xl">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `text-white font-medium px-3 py-2 rounded-md hover:bg-blue-600 transition ${
              isActive ? 'bg-blue-700' : ''
            }`
          }
        >
          {tab.name}
        </NavLink>
      ))}
      

      <UserProfile/>

          
    </nav>
  )
}

export default Navbar
