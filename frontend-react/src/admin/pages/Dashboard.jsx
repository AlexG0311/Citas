import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCard from '../components/AdminCard';
import UserProfile from '../components/UserProfile';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const cardsData = [
  { img: "/undraw_doctors_djoj.svg", text: "Servicios", link: "/servicios/listado" },
  { img: "/undraw_to-do-list_eoia.svg", text: "Registro Personal", link: "/personal/listado" },
  { img: "/undraw_following_ztgd.svg", text: "Gestión de citas", link: "/citas" },
  { img: "/undraw_calendar_8r6s.svg", text: "Horario Profesional", link: "/horario" },
  { img: "/undraw_current-location_c8qn.svg", text: "Sedes", link: "/sedes/listado" },
  { img: "/undraw_organizing-data_uns9.svg", text: "Estadísticas", link: "/estadisticas" },
];

function Dashboard() {
  const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const verificarAutenticacion = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin", {
          method: "GET",
          credentials: "include", // 👈 importante para enviar cookies
        });

        if (!res.ok) throw new Error("No autorizado");

      const data = await res.json();

         setAdmin(data.admin);
        setLoading(false); // ✅ Usuario autenticado
      } catch (err) {
        navigate("/login"); // 🔐 Redirige si no está logueado
      }
    };

    verificarAutenticacion();
  }, [navigate]);

  if (loading)  return   <Box  className="flex-col  justify-center min-h-screen items-center"  sx={{ display: 'flex' }}>
      <CircularProgress 
      
      />  Cargando....
    </Box>

  return (
    <div className="min-h-screen bg-white dark:bg-black   from-white-100 to-white-200">
      {/* Barra superior */}
      <nav className="w-full flex justify-end mb-6 bg-blue-500 p-4">
       <UserProfile/>
      </nav>

      {/* Título */}
      <h1 className="text-3xl text-black dark:text-white  font-bold mb-6 text-center">Bienvenido, {admin?.email || 'correo'}</h1>

      {/* Cards */}
      <section className="skeleton  dark:bg-gray-800 bg-blue-500 p-6 rounded-lg  shadow-2xl mx-auto mt-10 max-w-[900px] w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  ">
          {cardsData.map((card, index) => (
            <AdminCard key={index} img={card.img} text={card.text} link={card.link} />
          ))}
        </div>

        
      </section>
    </div>
  );
}

export default Dashboard;
