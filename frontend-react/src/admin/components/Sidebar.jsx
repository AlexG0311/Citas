import { NavLink } from 'react-router-dom'

function Sidebar({ links = [] }) {
  return (
    <div className="w-48 bg-gray-200 p-4 min-h-screen shadow-md">
      <ul className="divide-y divide-black-200">
        {links.map(({ to, label, icon }, i) => (
          <li key={i}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `block text-sm font-medium p-3 rounded transition-colors duration-200 ${
                  isActive
                    ? 'bg-gray-300 text-black font-semibold'
                    : 'text-gray-700 hover:bg-black-100 hover:text-black'
                }`
              }
            >
              <span className="mr-2">{icon}</span> {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
