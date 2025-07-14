import { Link } from 'react-router-dom'
import AdminCard from '../components/AdminCard'

const cardsData = [
  { img: "/undraw_doctors_djoj.svg", text: "Servicios", link: "/servicios/listado" },
  { img: "/undraw_to-do-list_eoia.svg", text: "Registro Personal", link: "/personal/listado" },
  { img: "/undraw_following_ztgd.svg", text: "Gestión de citas", link: "/citas" },
  { img: "/undraw_calendar_8r6s.svg", text: "Horario Profesional", link: "/horario" },
  { img: "/undraw_current-location_c8qn.svg", text: "Sedes", link: "/sedes" },
  { img: "/undraw_organizing-data_uns9.svg", text: "Estadísticas", link: "/estadisticas" },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
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
      <h1 className="text-3xl font-bold mb-6 text-center">Bienvenido, Admin</h1>

      {/* Cards de navegación */}
      <section className="bg-blue-500 p-6 rounded-lg shadow-2xl mx-auto mt-10 max-w-[900px] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          {cardsData.map((cardsData) => (
          <AdminCard
           img={cardsData.img}
           text={cardsData.text}
           link={cardsData.link}/>
          ))  
}
      
        </div>
      </section> 
    </div>
  )
}

export default Dashboard
